// 備蓄日数: 毎日 https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/
// の「石油備蓄の状況（推計値の速報）はこちら」PDFを見て RESERVE_DAYS 等を更新（README参照）
const RESERVE_DAYS = 240;
const RESERVE_CAPACITY = 240;
const REFERENCE = new Date('2026-03-24T00:00:00');

const SCENARIOS = {
  full: {
    importLoss: 1.0,
    saving: 0,
    label: '完全輸入停止',
    explain: '石油の輸入が完全にゼロ。備蓄240日分だけが頼り。'
  },
  hormuz: {
    importLoss: 0.87,
    saving: 0.10,
    label: 'ホルムズ海峡封鎖',
    explain: '中東からの輸入87%が途絶。残り13%は米国等から継続。国民が10%節約に協力。'
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
    el.innerHTML = '<div class="result-text">備蓄は減りません。</div>';
    return;
  }
  const remainDays = Math.floor(remaining);

  let html = `<div class="result-text">`;
  html += sc.explain + '<br>';
  html += `残り約 <strong>${remainDays}日分</strong> → `;
  html += `<strong>${formatDate(date)}</strong> に枯渇`;
  if (sc.saving > 0) {
    const withoutSaving = Math.floor(RESERVE_DAYS / sc.importLoss);
    const withSaving = Math.floor(RESERVE_DAYS / (sc.importLoss * (1 - sc.saving)));
    const extended = withSaving - withoutSaving;
    html += `<br>（節約により約<strong>${extended}日</strong>延命）`;
  }
  html += '</div>';
  el.innerHTML = html;
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
