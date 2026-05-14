/**
 * 公式・準公式へのリンク集。見出し・注記は運営側の要約。内容は必ずリンク先で確認してください。
 *
 * NEWS_DATED … 省庁・首相官邸等「出来事」の手動メモ（{ date, title, source, url, note? }）。
 * DATA_SOURCE_HUBS … 本サイトの数値の元になる省庁の公表データ（記事ではない）。
 * MINISTRY_HUBS / DIET_HUBS … 石油・エネルギー等に関連し得る府省庁・国会の公式入口。
 */

/** 出来事・公表メモ（公表日で降順ソート表示。URLは公式で確認済みのもののみ）。 */
const NEWS_DATED = [
  {
    date: '2026-04-30',
    title: 'ペゼシュキアン・イラン大統領との電話会談についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0430kaiken.html',
  },
  {
    date: '2026-04-30',
    title: '第6回 中東情勢に関する関係閣僚会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202604/30kaigi_middle-east.html',
  },
  {
    date: '2026-04-24',
    title: '第2弾の国家備蓄原油の放出を行います',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2026/04/20260424009/20260424009.html',
    note: '第2弾。放出開始は5月1日以降順次（プレス本文）。',
  },
  {
    date: '2026-04-15',
    title: 'エネルギー強靱化に関するＡＺＥＣ＋オンライン首脳会合についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0415kaiken.html',
  },
  {
    date: '2026-04-10',
    title: '第3回 中東情勢に関する関係閣僚会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202604/10kaigi_middle-east.html',
  },
  {
    date: '2026-04-07',
    title: '令和８年度予算成立及び中東情勢への対応等についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0407kaiken.html',
  },
  {
    date: '2026-03-31',
    title: '第2回 中東情勢に関する関係閣僚会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202603/31kaigi_middle-east.html',
  },
  {
    date: '2026-03-24',
    title: '国家備蓄原油の放出を行います',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2025/03/20260324004/20260324004.html',
    note: '第1弾。3月26日以降順次放出（プレス本文）。',
  },
  {
    date: '2026-03-13',
    title:
      '自由民主党・エネルギーの安定供給確保及び海上輸送途絶対策に向けた緊急提言申入れ',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202603/13teigen.html',
  },
  {
    date: '2026-03-11',
    title: 'Ｇ７首脳オンライン会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202603/11tv_kaigi.html',
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

/**
 * 内閣府・省・デジタル庁のうち、石油・エネルギー・中東情勢・燃料供給・エネルギー税制などに
 * 公式で触れている入口。省庁トップのみのものは注記で用途を限定。
 */
const MINISTRY_HUBS = [
  {
    title: '中東情勢・重要物資の供給（関係閣僚会議・タスクフォース）',
    note:
      '同じ内閣官房管内で、原油価格・物価高騰閣僚会議（/genyukakaku_bukkakoutou/）、エネルギー・食料等閣僚会議（/enerugi/）など各会議体のページも参照。',
    source: '内閣官房',
    url: 'https://www.cas.go.jp/jp/seisaku/chyutoujyousei/index.html',
  },
  {
    title: '内閣府（トップ）',
    note: '府の所管は幅広い。物価・エネルギー価格は経済財政諮問会議等の資料や、下記経済産業省・資源エネルギー庁の公表と併せて確認。',
    source: '内閣府',
    url: 'https://www.cao.go.jp/',
  },
  {
    title: 'デジタル庁（トップ）',
    note: '主としてデジタル政策。エネルギー・石油備蓄の専用ポータルは別省庁を参照。',
    source: 'デジタル庁',
    url: 'https://www.digital.go.jp/',
  },
  {
    title: '報道発表（ニュースリリース一覧）',
    note: '省としての政策公表の入口。キーワード検索はサイト内機能を利用。',
    source: '総務省',
    url: 'https://www.soumu.go.jp/menu_news/s-news/',
  },
  {
    title: '法務省（トップ）',
    note: '石油・備蓄の専用ページはないが、政府の法務・登記行政の公式入口。',
    source: '法務省',
    url: 'https://www.moj.go.jp/',
  },
  {
    title: 'エネルギー安全保障',
    note: '資源外交・IEA 等の国際連携の説明。アクセス不能な場合はブラウザで再試行。',
    source: '外務省',
    url: 'https://www.mofa.go.jp/mofaj/gaiko/energy/index.html',
  },
  {
    title: '自動車関係諸税・エネルギー関係諸税（概要）',
    note: '揮発油税・石油石炭税など、石油・エネルギーに関わる税制資料の入口。',
    source: '財務省',
    url: 'https://www.mof.go.jp/tax_policy/summary/consumption/d10.htm',
  },
  {
    title: '文部科学省（トップ）',
    note: '石油政策の主務ではない。研究開発・大学等は文科省の一般情報からたどる。',
    source: '文部科学省',
    url: 'https://www.mext.go.jp/',
  },
  {
    title: '中東情勢関連対策ワンストップポータル',
    note: '医薬品・医療機器等の供給。エネルギー備蓄そのものは経済産業省管轄。',
    source: '厚生労働省',
    url: 'https://www.mhlw.go.jp/stf/chuto-josei.html',
  },
  {
    title: '中東情勢関連対策（農林水産省）',
    note: '肥料・農業資材・燃料油等。石油石炭税（農林水産省の一覧表）等も所管ページから。',
    source: '農林水産省',
    url: 'https://www.maff.go.jp/chuto_josei.html',
  },
  {
    title: '中東情勢関連ワンストップポータル',
    note: '石油備蓄・国家備蓄原油放出のプレスは METI ニュースリリースと併覧。',
    source: '経済産業省',
    url: 'https://www.meti.go.jp/chuto_josei/index.html',
  },
  {
    title: '中東情勢関連対策ワンストップポータル',
    note: '燃料油・石油製品の供給相談窓口などはポータル内・関連ページから。',
    source: '国土交通省',
    url: 'https://www.mlit.go.jp/sogoseisaku/chuto_josei.html',
  },
  {
    title: '中東情勢対策ポータル',
    note: '廃棄物処理分野の燃料・石油製品相談など。温室効果ガス算定（エネルギー分野）は環境省の別ページ。',
    source: '環境省',
    url: 'https://www.env.go.jp/page_00348.html',
  },
  {
    title: '防衛白書・出版物（トップ）',
    note: '自衛隊の燃料確保などは白書・資料の該当章で言及。最新版はこの一覧から。',
    source: '防衛省',
    url: 'https://www.mod.go.jp/j/publication/hakusho/index.html',
  },
];

/** 国会審議・法令・会議録の公式検索入口 */
const DIET_HUBS = [
  {
    title: '立法情報（議案・審議経過などの入口）',
    note: '議案の回次一覧は「議案情報」から。石油・エネルギー関連語は議案名検索で追う。',
    source: '衆議院',
    url: 'https://www.shugiin.go.jp/Internet/index.nsf/html/rippo_top.htm',
  },
  {
    title: '議案情報（国会回次一覧）',
    note: '回次を選び、予算・法律案・承諾等を閲覧。',
    source: '衆議院',
    url: 'https://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/menu_all.htm',
  },
  {
    title: '今国会情報',
    note: '開会中の国会の案内。議案情報・公報への導線あり。',
    source: '参議院',
    url: 'https://www.sangiin.go.jp/japanese/kon_kokkaijyoho/index.html',
  },
  {
    title: '法令・法案検索（現行法令・法律案など）',
    note: '国会図書館の一次検索。石油備蓄・エネルギー法の改正履歴のたどり方として利用。',
    source: '国立国会図書館',
    url: 'https://hourei.ndl.go.jp/',
  },
  {
    title: '国会会議録検索システム',
    note: '委員会・本会議の発言録。キーワードで石油備蓄・エネルギー審議を検索。',
    source: '国立国会図書館',
    url: 'https://kokkai.ndl.go.jp/',
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

function appendHubRows(ul, hubs) {
  for (const hub of hubs) {
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

    ul.appendChild(li);
  }
}

function buildNewsTimeline() {
  const listEl = document.getElementById('newsTimelineList');
  const hubsEl = document.getElementById('newsTimelineHubs');
  const ministryHubsEl = document.getElementById('newsTimelineMinistryHubs');
  const dietHubsEl = document.getElementById('newsTimelineDietHubs');
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
  appendHubRows(hubsEl, allHubs);

  if (ministryHubsEl) {
    ministryHubsEl.replaceChildren();
    appendHubRows(ministryHubsEl, MINISTRY_HUBS);
  }
  if (dietHubsEl) {
    dietHubsEl.replaceChildren();
    appendHubRows(dietHubsEl, DIET_HUBS);
  }
}

buildNewsTimeline();
