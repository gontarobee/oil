// 備蓄日数: 毎日 https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/
// の「石油備蓄の状況（推計値の速報）はこちら」PDFを見て RESERVE_DAYS 等を更新（README参照）
const RESERVE_DAYS = 201;
const RESERVE_CAPACITY = 201;
// 仮想シナリオは「ページを開いた時点から起きた場合」として試算する。
const SIMULATION_START = new Date();

const SCENARIOS = {
  current: {
    importLoss: 0,
    saving: 0,
    label: '現在の供給見通し',
    explain:
      '政府は7月の原油調達が前年平月比で約100%まで回復し、必要量を上回る見通しを示しています。この見通しでは、備蓄だけを継続的に取り崩す前提を置けないため、枯渇日は算出しません。'
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
  const pct = (remaining / RESERVE_CAPACITY) * 100;

  return { days: effectiveDays, date: depletionDate, pct, dailyDraw, remaining };
}

function updateCountdown() {
  const { date, pct, dailyDraw, remaining } = calcDepletion();
  const now = new Date();

  if (!date || !isFinite(date.getTime())) {
    $('daysNum').textContent = '—';
    $('hoursNum').textContent = '--';
    $('minsNum').textContent = '--';
    $('secsNum').textContent = '--';
    $('depletionDate').textContent = '現在の見通しでは枯渇日を算出しません';
    $('gaugeBar').style.width = '100%';
    $('gaugeBar').style.background = 'linear-gradient(90deg, #1a6b1a, #2ecc40)';
    $('gaugePercent').textContent = '100%';
    $('countdownSection').className = 'countdown-section status-current';
    return;
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
        <p class="scenario-result-empty">これは政府が6月11日に示した7月の調達見通しです。確定した月次輸入実績ではなく、情勢や契約・入港状況により変わる可能性があります。</p>
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
  document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  updateCountdown();
  updateResultText();
}

updateCountdown();
updateResultText();
setInterval(updateCountdown, 1000);
