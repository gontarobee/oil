/**
 * 背景ニュース・公式情報（一次・準一次ソースへのリンクのみ）。
 * 見出し・注記は運営側の要約。内容は必ずリンク先で確認してください。
 * 速報やプレスが増えたら NEWS_DATED に { date, ... } を追記（古いニュースは残してOK）。
 */

const NEWS_DATED = [
  {
    date: '2026-05-01',
    title: '石油備蓄の現況・推計値速報（日次PDF）',
    note:
      '本サイトの備蓄日数の起算元。公表日・データ時点・内訳はPDF表頭と本文表を参照。毎営業日更新が基本。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/pdf-oil-res/oil_daily.pdf',
  },
  {
    date: '2026-05-01',
    title: '石油備蓄の現況（一覧・速報への案内）',
    note: '速報PDF以外の関連資料・トピックへの入口。最新の公開物はこの一覧からたどる。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/',
  },
];

/** 日付を並べない「常設」の参照先（公式・国際機関・主要通信社のトピックページ） */
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
  for (const hub of NEWS_HUBS) {
    const li = document.createElement('li');
    li.className = 'news-timeline-hub';

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
