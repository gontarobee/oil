// 備蓄日数: 毎日 https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/
// の「石油備蓄の状況（推計値の速報）はこちら」PDFを見て RESERVE_DAYS 等を更新（README参照）
const RESERVE_DAYS = 207;
const RESERVE_CAPACITY = 207;
// REFERENCE は速報の「データ時点」（公表日と別のときあり）。日本の公表に合わせ JST 0 時で固定する。
const REFERENCE = new Date('2026-05-11T00:00:00+09:00');

const SCENARIOS = {
  full: {
    importLoss: 1.0,
    saving: 0,
    label: '完全輸入停止',
    explain: '石油の輸入が完全にゼロ。備蓄207日分だけが頼り。'
  },
  hormuz: {
    importLoss: 0.959,
    saving: 0.10,
    label: 'ホルムズ海峡封鎖・通航困難',
    explain: '直近統計の中東依存度95.9%を試算前提に、当該輸入が途絶。その他地域からの輸入は継続し、国民が10%節約に協力。'
  },
  half: {
    importLoss: 0.50,
    saving: 0.05,
    label: '輸入半減',
    explain: '輸入量が半分に減少。国民が5%の節約に協力。'
  }
};

let currentScenario = 'full';

const $ = id => document.getElementById(id);

function escapeHtml(text) {
  const tmp = document.createElement('div');
  tmp.textContent = text;
  return tmp.innerHTML;
}

function calcDepletion() {
  const sc = SCENARIOS[currentScenario];
  const dailyDraw = sc.importLoss * (1 - sc.saving);
  if (dailyDraw <= 0) return { days: Infinity, date: null, pct: 100, dailyDraw: 0 };

  const effectiveDays = RESERVE_DAYS / dailyDraw;
  const depletionDate = new Date(REFERENCE.getTime() + effectiveDays * 86400000);

  const now = new Date();
  const elapsed = Math.max(0, (now - REFERENCE) / 86400000);
  const consumed = elapsed * dailyDraw;
  const remaining = Math.max(0, RESERVE_DAYS - consumed);
  const pct = (remaining / RESERVE_CAPACITY) * 100;

  return { days: effectiveDays, date: depletionDate, pct, dailyDraw, remaining };
}

function updateCountdown() {
  const { date, pct, dailyDraw, remaining } = calcDepletion();
  const now = new Date();

  if (!date || !isFinite(date.getTime())) {
    $('daysNum').textContent = '∞';
    $('hoursNum').textContent = '--';
    $('minsNum').textContent = '--';
    $('secsNum').textContent = '--';
    $('depletionDate').textContent = '枯渇しません';
    $('gaugeBar').style.width = '100%';
    $('gaugeBar').style.background = 'linear-gradient(90deg, #1a6b1a, #2ecc40)';
    $('gaugePercent').textContent = '100%';
    $('countdownSection').className = 'countdown-section danger-low';
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
    el.innerHTML =
      '<p class="scenario-result-empty">この条件では、試算上は備蓄がほとんど減りません。</p>';
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
          <span class="scenario-metric-label">在庫の厚み</span>
          <span class="scenario-metric-value">${remainDays}<span class="scenario-metric-unit">日分</span></span>
          <span class="scenario-metric-hint">公表の「日分」と同じ物差し</span>
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
          <p><strong>日分</strong>は、いま手元にある備蓄を「平常1日あたり」で換算した厚みです。</p>
          <p><strong>カウントダウンの日数</strong>は、カレンダーでいまからその時刻までの日です。輸入が一部続くと、1日あたり備蓄だけで埋める穴が小さくなるので、同じ在庫でも<strong>カレンダー上は長く見えます</strong>。</p>
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
