/**
 * 公式・準公式へのリンク集。見出し・注記は運営側の要約。内容は必ずリンク先で確認してください。
 *
 * NEWS_DATED … 省庁プレス等「出来事」の手動メモ（{ date, title, source, url, note? }）。
 * DATA_SOURCE_HUBS … 本サイトの数値の元になる省庁の公表データ（記事ではない）。
 */

/** 出来事・公表メモ（必要に応じ追記・新しい日付が上に来るよう公表日で並べ替え表示）。 */
const NEWS_DATED = [
  {
    date: '2026-04-24',
    title: '第2弾の国家備蓄原油の放出を行います',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2026/04/20260424009/20260424009.html',
    note: '第2弾。放出開始は5月1日以降順次（プレス本文）。',
  },
  {
    date: '2026-03-24',
    title: '国家備蓄原油の放出を行います',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2025/03/20260324004/20260324004.html',
    note: '第1弾。3月26日以降順次放出（プレス本文）。',
  },
  {
    date: '2026-03-11',
    title:
      'IEA、加盟国による最大規模の協調在庫放出を決定（中東の市場混乱への対応）',
    source: 'International Energy Agency（公式・英語）',
    url: 'https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict',
    note: '英語リリース。実施の詳細や日本の取組は経産省・資源エネルギー庁の公表を参照。',
  },
];

/** 本サイトの起算の参照先（公表データ。ニュース記事ではない） */
const DATA_SOURCE_HUBS = [
  {
    primary: true,
    title: '石油備蓄の状況（推計値・日次PDF）',
    note:
      '庁が公表する推計の表です（報道ではありません）。公表日・データ時点・内訳はPDF表頭と本文を参照。毎営業日更新が基本。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/pdf-oil-res/oil_daily.pdf',
  },
  {
    primary: true,
    title: '石油備蓄の現況（一覧・速報への案内）',
    note: '速報PDF以外の関連資料への入口。最新の公開物は一覧からたどってください。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/',
  },
];

/** そのほかの参照ハブ（公式・国際機関・主要通信社のトピックなど） */
const NEWS_HUBS = [
  {
    title: '石油・LPガス統計（月次・各種トップ）',
    note: '速報PDFとは別の確報統計やテーマ別ページへのハブ。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/',
  },
  {
    title: 'IEA（国際エネルギー機関）',
    note: '加盟国の在庫・緊急時協調など。ニュース・レポートは公式で追うのが確実。',
    source: 'International Energy Agency',
    url: 'https://www.iea.org/',
  },
  {
    title: 'Petroleum & other liquids（データ一覧）',
    note: '在庫・生産など。世界需給の参照用（米国政府統計）。',
    source: 'U.S. Energy Information Administration',
    url: 'https://www.eia.gov/petroleum/data.php',
  },
  {
    title: 'Energy',
    note: '一次国防・省庁の代わりではないが、市場動向の速報把握用（原文・出典リンクを確認）。',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/',
  },
  {
    title: 'IEAと備蓄義務の概要',
    note: '当サイト内ガイド。法令・数値の最終確認は必ず省庁・IEA本体へ。',
    source: '本サイト（ガイド）',
    url: 'guide/international-comparison.html',
  },
  {
    title: '緊急放出と国際協調（入門）',
    note: '当サイト内ガイド。',
    source: '本サイト（ガイド）',
    url: 'guide/emergency-release-overview.html',
  },
];

function formatNewsDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}

function setText(el, s) {
  el.textContent = s;
}

function buildNewsTimeline() {
  const listEl = document.getElementById('newsTimelineList');
  const hubsEl = document.getElementById('newsTimelineHubs');
  if (!listEl || !hubsEl) return;

  const sorted = [...NEWS_DATED].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  listEl.replaceChildren();
  listEl.classList.toggle('news-timeline-list--empty', sorted.length === 0);

  if (sorted.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'news-timeline-empty';
    setText(
      empty,
      '省庁プレスなどを時系列で残したくなったら、news-timeline.js の NEWS_DATED に1件ずつ追加するだけです（自動取得はしません）。本サイトの数値の出所は下の「本サイトの起算元」から確認してください。'
    );
    listEl.appendChild(empty);
  }

  for (const item of sorted) {
    const row = document.createElement('article');
    row.className = 'news-timeline-item';

    const dateEl = document.createElement('time');
    dateEl.className = 'news-timeline-date';
    dateEl.dateTime = item.date;
    setText(dateEl, formatNewsDate(item.date));

    const body = document.createElement('div');
    body.className = 'news-timeline-body';

    const title = document.createElement('h3');
    title.className = 'news-timeline-item-title';
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    setText(link, item.title);
    title.appendChild(link);

    const meta = document.createElement('p');
    meta.className = 'news-timeline-meta';
    setText(meta, item.source);

    body.appendChild(title);
    body.appendChild(meta);

    if (item.note) {
      const note = document.createElement('p');
      note.className = 'news-timeline-note';
      setText(note, item.note);
      body.appendChild(note);
    }

    row.appendChild(dateEl);
    row.appendChild(body);
    listEl.appendChild(row);
  }

  hubsEl.replaceChildren();
  const allHubs = DATA_SOURCE_HUBS.concat(NEWS_HUBS);
  for (const hub of allHubs) {
    const li = document.createElement('li');
    li.className = 'news-timeline-hub' + (hub.primary ? ' news-timeline-hub--primary' : '');

    const link = document.createElement('a');
    link.href = hub.url;
    if (/^https?:\/\//i.test(hub.url)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    setText(link, hub.title);

    const meta = document.createElement('span');
    meta.className = 'news-timeline-hub-source';
    setText(meta, ` — ${hub.source}`);

    const head = document.createElement('div');
    head.className = 'news-timeline-hub-head';
    head.appendChild(link);
    head.appendChild(meta);

    li.appendChild(head);

    if (hub.note) {
      const note = document.createElement('p');
      note.className = 'news-timeline-hub-note';
      setText(note, hub.note);
      li.appendChild(note);
    }

    hubsEl.appendChild(li);
  }
}

buildNewsTimeline();
