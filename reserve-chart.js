/**
 * 資源エネルギー庁「石油備蓄の状況（推計値の速報）」PDF の表に基づく時系列。
 * 更新時は pl001 の最新 PDF を確認し、本配列を差し替えてください。
 */
/** SVG は UA/CSS によって stroke が効かず黒塗りになることがあるため、主要な色は属性でも指定する */
const CHART_LINE_STROKE = '#ff8c00';
const CHART_LINE_WIDTH = 2.75;
const CHART_GRID_STROKE = 'rgba(255,255,255,0.14)';
const CHART_POINT_FILL = '#1a1528';
const CHART_POINT_STROKE = '#ffb84d';

const RESERVE_HISTORY = [
  { published: '2026-03-17', asOf: '2026-03-14', national: 146, private: 90, joint: 6, total: 242 },
  { published: '2026-03-18', asOf: '2026-03-15', national: 146, private: 89, joint: 6, total: 241 },
  { published: '2026-03-19', asOf: '2026-03-16', national: 146, private: 89, joint: 6, total: 241 },
  { published: '2026-03-20', asOf: '2026-03-17', national: 146, private: 90, joint: 6, total: 242 },
  { published: '2026-03-21', asOf: '2026-03-18', national: 146, private: 92, joint: 6, total: 244 },
  { published: '2026-03-22', asOf: '2026-03-19', national: 146, private: 90, joint: 6, total: 242 },
  { published: '2026-03-23', asOf: '2026-03-20', national: 146, private: 89, joint: 6, total: 241 },
  { published: '2026-03-24', asOf: '2026-03-21', national: 146, private: 88, joint: 6, total: 240 },
  { published: '2026-03-25', asOf: '2026-03-22', national: 146, private: 86, joint: 6, total: 238 },
  { published: '2026-03-26', asOf: '2026-03-23', national: 146, private: 87, joint: 6, total: 239 },
  { published: '2026-03-27', asOf: '2026-03-24', national: 146, private: 87, joint: 6, total: 239 },
  { published: '2026-03-28', asOf: '2026-03-25', national: 146, private: 87, joint: 6, total: 239 },
  { published: '2026-03-29', asOf: '2026-03-26', national: 146, private: 87, joint: 6, total: 239 },
  { published: '2026-03-30', asOf: '2026-03-27', national: 146, private: 85, joint: 6, total: 237 },
  { published: '2026-03-31', asOf: '2026-03-28', national: 146, private: 85, joint: 6, total: 237 },
  { published: '2026-04-01', asOf: '2026-03-29', national: 146, private: 83, joint: 6, total: 235 },
  { published: '2026-04-02', asOf: '2026-03-30', national: 146, private: 82, joint: 6, total: 234 },
  { published: '2026-04-03', asOf: '2026-03-31', national: 146, private: 82, joint: 6, total: 234 },
  { published: '2026-04-04', asOf: '2026-04-01', national: 146, private: 83, joint: 6, total: 235 },
  { published: '2026-04-05', asOf: '2026-04-02', national: 146, private: 81, joint: 6, total: 233 },
  { published: '2026-04-06', asOf: '2026-04-03', national: 146, private: 80, joint: 6, total: 232 },
  { published: '2026-04-07', asOf: '2026-04-04', national: 145, private: 80, joint: 6, total: 231 },
  { published: '2026-04-08', asOf: '2026-04-05', national: 143, private: 81, joint: 6, total: 230 },
  { published: '2026-04-09', asOf: '2026-04-06', national: 143, private: 81, joint: 6, total: 230 },
  { published: '2026-04-10', asOf: '2026-04-07', national: 143, private: 80, joint: 5, total: 228 },
  { published: '2026-04-11', asOf: '2026-04-08', national: 142, private: 80, joint: 5, total: 227 },
  { published: '2026-04-12', asOf: '2026-04-09', national: 141, private: 80, joint: 5, total: 226 },
  { published: '2026-04-13', asOf: '2026-04-10', national: 141, private: 78, joint: 5, total: 225 },
  { published: '2026-04-14', asOf: '2026-04-11', national: 141, private: 78, joint: 5, total: 224 },
  { published: '2026-04-15', asOf: '2026-04-12', national: 139, private: 78, joint: 5, total: 222 },
  { published: '2026-04-16', asOf: '2026-04-13', national: 138, private: 79, joint: 4, total: 221 },
  { published: '2026-04-17', asOf: '2026-04-14', national: 138, private: 78, joint: 4, total: 220 },
  { published: '2026-04-18', asOf: '2026-04-15', national: 136, private: 79, joint: 4, total: 218 },
  { published: '2026-04-19', asOf: '2026-04-16', national: 136, private: 78, joint: 3, total: 217 },
  { published: '2026-04-20', asOf: '2026-04-17', national: 135, private: 78, joint: 3, total: 216 },
  { published: '2026-04-21', asOf: '2026-04-18', national: 134, private: 79, joint: 3, total: 216 },
  { published: '2026-04-22', asOf: '2026-04-19', national: 133, private: 79, joint: 3, total: 215 },
  { published: '2026-04-23', asOf: '2026-04-20', national: 132, private: 80, joint: 3, total: 215 },
];

function formatMd(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${m}/${d}`;
}

function formatJaDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}

/** 横軸ラベルが重ならないよう、等間隔で最大 max 個のインデックスだけ返す */
function xLabelIndices(n, max) {
  if (n <= 0) return [];
  if (n <= max) return Array.from({ length: n }, (_, i) => i);
  const raw = [];
  for (let k = 0; k < max; k++) {
    raw.push(Math.round((k / (max - 1)) * (n - 1)));
  }
  return [...new Set(raw)].sort((a, b) => a - b);
}

function buildChart() {
  const wrap = document.getElementById('reserveChartWrap');
  const hint = document.getElementById('chartHint');
  const tbody = document.getElementById('reserveHistoryBody');
  if (!wrap || !tbody) return;

  const defaultChartHint =
    (hint && hint.textContent.trim()) ||
    '横軸の日付は見やすさのため間引きです。全件は下の表で確認できます。点にマウスを当てると公表日・データ時点・内訳が表示されます。';

  const data = RESERVE_HISTORY;
  const vals = data.map((r) => r.total);
  const yMin = Math.min(...vals) - 2;
  const yMax = Math.max(...vals) + 2;

  const W = 720;
  const H = 260;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 52;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = data.length;

  const xAt = (i) => padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const yAt = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const points = data.map((row, i) => ({
    x: xAt(i),
    y: yAt(row.total),
    row,
    i,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const yTicks = 4;
  let gridAndY = '';
  for (let t = 0; t <= yTicks; t++) {
    const v = yMin + (t / yTicks) * (yMax - yMin);
    const y = yAt(v);
    gridAndY += `<line class="reserve-chart-grid" x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="${CHART_GRID_STROKE}" stroke-width="1" />`;
    gridAndY += `<text class="reserve-chart-ytick" x="${padL - 8}" y="${y + 4}">${Math.round(v)}</text>`;
  }

  const maxXLabels = 11;
  const xIdx = xLabelIndices(n, maxXLabels);
  let xLabels = '';
  xIdx.forEach((i) => {
    const p = points[i];
    xLabels += `<text class="reserve-chart-xtick" text-anchor="middle" x="${p.x}" y="${H - 22}">${formatMd(p.row.asOf)}</text>`;
  });

  let circles = '';
  points.forEach((p) => {
    const title = `公表: ${formatJaDate(p.row.published)} / データ時点: ${formatJaDate(p.row.asOf)} / 合計 ${p.row.total}日分（国${p.row.national}・民${p.row.private}・産油国${p.row.joint}）`;
    circles += `<circle class="reserve-chart-point" role="button" tabindex="0" cx="${p.x}" cy="${p.y}" r="6" data-i="${p.i}" fill="${CHART_POINT_FILL}" stroke="${CHART_POINT_STROKE}" stroke-width="2">
      <title>${title}</title>
    </circle>`;
  });

  wrap.innerHTML = `
    <svg class="reserve-chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" aria-label="備蓄日数合計の推移">
      ${gridAndY}
      <text class="reserve-chart-axis-label" x="${(padL + W - padR) / 2}" y="${H - 4}" text-anchor="middle">データ時点（月/日）</text>
      ${pathD ? `<path class="reserve-chart-line" d="${pathD}" fill="none" stroke="${CHART_LINE_STROKE}" stroke-width="${CHART_LINE_WIDTH}" stroke-linecap="round" stroke-linejoin="round" />` : ''}
      ${circles}
      ${xLabels}
    </svg>
  `;

  tbody.innerHTML = data
    .slice()
    .reverse()
    .map(
      (r) =>
        `<tr>
          <td>${formatJaDate(r.published)}</td>
          <td>${formatJaDate(r.asOf)}</td>
          <td>${r.national}</td>
          <td>${r.private}</td>
          <td>${r.joint}</td>
          <td><strong>${r.total}</strong></td>
        </tr>`,
    )
    .join('');

  wrap.querySelectorAll('.reserve-chart-point').forEach((el) => {
    const i = Number(el.getAttribute('data-i'));
    const row = data[i];
    const text = `公表 ${formatJaDate(row.published)} ／ データ時点 ${formatJaDate(row.asOf)} ／ 合計 ${row.total}日分（国家${row.national}・民間${row.private}・産油国${row.joint}）`;
    el.addEventListener('mouseenter', () => {
      if (hint) hint.textContent = text;
    });
    el.addEventListener('mouseleave', () => {
      if (hint) hint.textContent = defaultChartHint;
    });
    el.addEventListener('focus', () => {
      if (hint) hint.textContent = text;
    });
    el.addEventListener('blur', () => {
      if (hint) hint.textContent = defaultChartHint;
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildChart);
} else {
  buildChart();
}
