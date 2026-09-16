// 備蓄日数: 毎日 https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/
// の「石油備蓄の状況（推計値の速報）はこちら」PDFを見て RESERVE_DAYS 等を更新（README参照）
const RESERVE_DAYS = 201;
const SCENARIO_BASE_DAYS = RESERVE_DAYS;
// 仮想シナリオは「ページを開いた時点から起きた場合」として試算する。
const SIMULATION_START = new Date();

/** 「現在の供給見通し」ダッシュボード表示（index.html の現状カードと揃える） */
const CURRENT_SUPPLY = {
  asOfLabel: '9月13日',
  national: 102,
  private: 94,
  joint: 4,
  importYoY: 117.0,
  subsidyPerL: 51,
  publishedLevelPct: 82.4,
  maxHistorical: 244,
};

const DEFAULT_COUNTDOWN_NOTE =
  '※ これは実際の枯渇予測ではありません。最新公表の201日分を出発点に、選択した仮定が<strong>ページを開いた時点から始まる</strong>として線形計算します。実際の輸入、需要、製油所稼働、追加政策は織り込んでいません。';

const SCENARIOS = {
  current: {
    importLoss: 0,
    saving: 0,
    label: '現在の供給見通し',
    explain:
      '7月の原油輸入は前年同月比117.0%（8月31日公表の月次速報）。現在の供給見通しでは、備蓄だけを継続的に取り崩す前提を置けないため、枯渇日は算出しません。'
  },
  full: {
    importLoss: 1.0,
    saving: 0,
    label: '今日から完全輸入停止',
    explain: `ページを開いた時点から石油輸入が完全にゼロになり、備蓄${RESERVE_DAYS}日分だけで需要を支える仮定です。`
  },
  hormuz: {
    importLoss: 0.739,
    saving: 0.10,
    label: '5月実績の中東分が途絶',
    explain:
      '2026年5月の中東依存度73.9%を比較用の前提に、その分の輸入がページを開いた時点から途絶。その他地域からの輸入は継続し、需要を10%抑える仮定です。'
  },
  half: {
    importLoss: 0.50,
    saving: 0.05,
    label: '輸入半減',
    explain: '輸入量が半分に減少。国民が5%の節約に協力。'
  },
  /** 代替で不足の多くを埋める想定。数値は説明用の仮定（公的統計の直接引用ではない）。 */
  alternatives: {
    importLoss: 0.35,
    saving: 0.05,
    label: '代替取引先の増加',
    explain:
      '主要ルートが減っても、他国・他ルートの代替で不足の多くを埋める想定。試算では国民が5%節約に協力。備蓄への負担は「輸入半減」より小さい仮定。'
  }
};

let currentScenario = 'current';
let countdownViewMode = null;

const $ = id => document.getElementById(id);

function escapeHtml(text) {
  const tmp = document.createElement('div');
  tmp.textContent = text;
  return tmp.innerHTML;
}

/**
 * 線形モデル（guide/how-days-calculated.html#formula と同じ式）
 * dailyDraw = importLoss * (1 - saving)   … 1カレンダー日あたり減る「日分」
 * effectiveDays = RESERVE_DAYS / dailyDraw
 * depletionDate = SIMULATION_START + effectiveDays（ミリ秒換算）
 * elapsed = max(0, (now - SIMULATION_START) / 1日)
 * remaining = max(0, RESERVE_DAYS - elapsed * dailyDraw)
 */
function calcDepletion() {
  const sc = SCENARIOS[currentScenario];
  const dailyDraw = sc.importLoss * (1 - sc.saving);
  if (dailyDraw <= 0) {
    return { days: Infinity, date: null, pct: 100, dailyDraw: 0, remaining: RESERVE_DAYS };
  }

  const effectiveDays = RESERVE_DAYS / dailyDraw;
  const depletionDate = new Date(SIMULATION_START.getTime() + effectiveDays * 86400000);

  const now = new Date();
  const elapsed = Math.max(0, (now - SIMULATION_START) / 86400000);
  const consumed = elapsed * dailyDraw;
  const remaining = Math.max(0, RESERVE_DAYS - consumed);
  const pct = (remaining / SCENARIO_BASE_DAYS) * 100;

  return { days: effectiveDays, date: depletionDate, pct, dailyDraw, remaining };
}

function formatMdJa(iso) {
  const [, m, d] = iso.split('-').map(Number);
  return `${m}月${d}日`;
}

function getReserveTrendSummary(windowDays = 14) {
  const hist = window.RESERVE_HISTORY;
  if (!hist || hist.length < 2) {
    return { text: '履歴データを読み込み中…', delta: null, latest: null };
  }
  const tail = hist.slice(-windowDays);
  const totals = tail.map((r) => r.total);
  const min = Math.min(...totals);
  const max = Math.max(...totals);
  const latest = tail[tail.length - 1];
  const compareIdx = Math.max(0, hist.length - 1 - 7);
  const weekAgo = hist[compareIdx];
  const delta = latest.total - weekAgo.total;
  const deltaText =
    delta === 0 ? '±0日分' : delta > 0 ? `+${delta}日分` : `${delta}日分`;
  const rangeText =
    min === max ? `${min}日分で横ばい` : `${min}〜${max}日分`;
  return {
    text: `直近${tail.length}公表日は${rangeText}（1週間前比 ${deltaText}）`,
    delta,
    latest,
  };
}

function renderSupplyDashboard() {
  const labelEl = $('countdownLabel');
  const displayEl = $('countdownDisplay');
  const dashboardEl = $('supplyDashboard');
  const noteEl = $('countdownNote');
  const trend = getReserveTrendSummary();

  labelEl.innerHTML =
    '現在の<span class="highlight supply-highlight">供給見通し</span>（公表データ）';
  displayEl.hidden = true;
  dashboardEl.hidden = false;

  $('supplyDaysNum').textContent = String(RESERVE_DAYS);
  $('supplyHeroCaption').textContent =
    `公表備蓄（${CURRENT_SUPPLY.asOfLabel}時点）　国${CURRENT_SUPPLY.national}・民${CURRENT_SUPPLY.private}・産油${CURRENT_SUPPLY.joint}`;

  $('supplyChipRow').innerHTML = `
    <span class="supply-chip">原油輸入 <strong>${CURRENT_SUPPLY.importYoY}%</strong><span class="supply-chip-sub">7月・前年同月比</span></span>
    <span class="supply-chip">燃料油補助 <strong>${CURRENT_SUPPLY.subsidyPerL}円/L</strong><span class="supply-chip-sub">9/17〜</span></span>
    <span class="supply-chip">公表水準 <strong>${CURRENT_SUPPLY.publishedLevelPct}%</strong><span class="supply-chip-sub">最高${CURRENT_SUPPLY.maxHistorical}日分比</span></span>
  `;

  const asOfNote = trend.latest
    ? `（最新データ時点 ${formatMdJa(trend.latest.asOf)}）`
    : '';
  $('supplyTrend').textContent = `${trend.text}${asOfNote}`;

  const fullStopDays = RESERVE_DAYS;
  $('supplyCompare').innerHTML =
    `参考：<button type="button" class="supply-compare-link" id="supplyCompareBtn">今日から完全輸入停止</button>なら、同じ${RESERVE_DAYS}日分で試算上 <strong>約${fullStopDays}日</strong> 持つ仮定`;

  $('depletionDate').textContent =
    '輸入が続く見通しのため、枯渇日は算出しません';
  noteEl.innerHTML =
    '※ 上記は公表速報・月次実績に基づく<strong>現在の供給状況</strong>です。危機シナリオの枯渇試算は上のボタンから選べます。';
  $('gaugeBar').style.width = '100%';
  $('gaugeBar').style.background = 'linear-gradient(90deg, #1a6b1a, #2ecc40)';
  $('gaugePercent').textContent = '100%';
  $('countdownSection').className = 'countdown-section status-current';
}

function renderCrisisCountdown() {
  const labelEl = $('countdownLabel');
  const displayEl = $('countdownDisplay');
  const dashboardEl = $('supplyDashboard');
  const noteEl = $('countdownNote');

  labelEl.innerHTML =
    '選択した仮定での<span class="highlight warning-pulse">備蓄枯渇</span>まで';
  displayEl.hidden = false;
  dashboardEl.hidden = true;
  noteEl.innerHTML = DEFAULT_COUNTDOWN_NOTE;
}

function updateCountdown() {
  const { date, pct } = calcDepletion();
  const now = new Date();

  if (!date || !isFinite(date.getTime())) {
    if (countdownViewMode !== 'supply') {
      renderSupplyDashboard();
      countdownViewMode = 'supply';
    }
    return;
  }

  if (countdownViewMode !== 'crisis') {
    renderCrisisCountdown();
    countdownViewMode = 'crisis';
  }

  const diff = date - now;

  if (diff <= 0) {
    $('daysNum').textContent = '0';
    $('hoursNum').textContent = '00';
    $('minsNum').textContent = '00';
    $('secsNum').textContent = '00';
    $('depletionDate').textContent = '石油備蓄は枯渇しました';
    $('gaugeBar').style.width = '0%';
    $('gaugeBar').style.background = '#333';
    $('gaugePercent').textContent = '0%';
    $('countdownSection').className = 'countdown-section danger-high';
    return;
  }

  const totalSecs = Math.floor(diff / 1000);
  const d = Math.floor(totalSecs / 86400);
  const h = Math.floor((totalSecs % 86400) / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  $('daysNum').textContent = d;
  $('hoursNum').textContent = String(h).padStart(2, '0');
  $('minsNum').textContent = String(m).padStart(2, '0');
  $('secsNum').textContent = String(s).padStart(2, '0');

  $('depletionDate').textContent = `枯渇予測日: ${formatDate(date)}`;

  const clampPct = Math.max(0, Math.min(100, pct));
  $('gaugeBar').style.width = clampPct + '%';
  $('gaugePercent').textContent = clampPct.toFixed(1) + '%';

  const section = $('countdownSection');
  if (clampPct > 50) {
    $('gaugeBar').style.background = 'linear-gradient(90deg, #cc6600, #ff8c00, #ffa500)';
    section.className = 'countdown-section danger-low';
  } else if (clampPct > 20) {
    $('gaugeBar').style.background = 'linear-gradient(90deg, #cc3300, #ff6600)';
    section.className = 'countdown-section danger-mid';
  } else {
    $('gaugeBar').style.background = 'linear-gradient(90deg, #880000, #ff2020)';
    section.className = 'countdown-section danger-high';
  }
}

function formatDate(d) {
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  const da = d.getDate();
  const h = d.getHours();
  const mi = d.getMinutes();
  if (h === 0 && mi === 0) return `${y}年${mo}月${da}日`;
  return `${y}年${mo}月${da}日 ${String(h).padStart(2,'0')}:${String(mi).padStart(2,'0')}頃`;
}

function updateResultText() {
  const sc = SCENARIOS[currentScenario];
  const { date, remaining } = calcDepletion();
  const el = $('scenarioResult');
  if (!date || !isFinite(date.getTime())) {
    el.innerHTML = `
      <div class="scenario-result-layout">
        <p class="scenario-tagline">${escapeHtml(sc.explain)}</p>
        <p class="scenario-result-empty">7月の117.0%は確定した月次速報ですが、それ以降の入港・契約・情勢は日々変わります。将来の供給見通しを保証するものではありません。</p>
      </div>
    `;
    return;
  }
  const remainDays = Math.floor(remaining);
  const now = new Date();
  const diffMs = date - now;
  const calendarDaysRemain = diffMs <= 0 ? 0 : Math.floor(diffMs / 86400000);

  let savingBlock = '';
  if (sc.saving > 0) {
    const withoutSaving = Math.floor(RESERVE_DAYS / sc.importLoss);
    const withSaving = Math.floor(RESERVE_DAYS / (sc.importLoss * (1 - sc.saving)));
    const extended = withSaving - withoutSaving;
    savingBlock = `<div class="scenario-saving-chip" role="note">
      <span class="scenario-saving-chip-label">節約の効果</span>
      <span class="scenario-saving-chip-text">同じ輸入条件で<strong>節約なし</strong>と比べ、試算上 <strong>約${extended}日</strong> 長く持つ</span>
    </div>`;
  }

  el.innerHTML = `
    <div class="scenario-result-layout">
      <p class="scenario-tagline">${escapeHtml(sc.explain)}</p>
      <div class="scenario-metric-grid" aria-label="試算の見方">
        <div class="scenario-metric-card">
          <span class="scenario-metric-label">いま残っている備蓄</span>
          <span class="scenario-metric-value">${remainDays}<span class="scenario-metric-unit">日分</span></span>
          <span class="scenario-metric-hint">輸入が全部止まった場合の目安</span>
        </div>
        <div class="scenario-metric-card scenario-metric-card--focus">
          <span class="scenario-metric-label">枯渇の目安</span>
          <span class="scenario-metric-value scenario-metric-value--datetime">${escapeHtml(formatDate(date))}</span>
          <span class="scenario-metric-hint">上の大型カウントダウンの「日」≈ <strong>${calendarDaysRemain}</strong> 日</span>
        </div>
      </div>
      ${savingBlock}
      <details class="scenario-details">
        <summary class="scenario-details-summary"><span class="scenario-details-chevron" aria-hidden="true"></span>2つの数字が違う理由</summary>
        <div class="scenario-details-body">
          <p><strong>「日分」</strong>は、輸入が完全に止まったら何日もつか、という目安です。</p>
          <p><strong>カウントダウン</strong>は、実際のカレンダーであと何日かを出しています。輸入がまだ続くほど、備蓄の減り方はゆっくりになります。そのため、同じ備蓄量でも<strong>枯渇までの日数は長くなります</strong>。</p>
        </div>
      </details>
    </div>
  `;
}

function setScenario(type, btnEl) {
  currentScenario = type;
  countdownViewMode = null;
  document.querySelectorAll('.scenario-btn').forEach((b) => b.classList.remove('active'));
  const btn =
    btnEl || document.querySelector(`.scenario-btn[onclick*="'${type}'"]`);
  if (btn) btn.classList.add('active');
  updateCountdown();
  updateResultText();
}

const supplyDashboardEl = $('supplyDashboard');
if (supplyDashboardEl) {
  supplyDashboardEl.addEventListener('click', (e) => {
    const btn = e.target.closest('#supplyCompareBtn');
    if (!btn) return;
    const fullBtn = document.querySelector('.scenario-btn[onclick*="full"]');
    setScenario('full', fullBtn);
    $('countdownSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

updateCountdown();
updateResultText();
setInterval(updateCountdown, 1000);
