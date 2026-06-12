/**
 * 公式・準公式へのリンク集。見出し・注記は運営側の要約。内容は必ずリンク先で確認してください。
 *
 * NEWS_DATED … 出来事メモ（{ date, title, source, url, summary?, note? }）。summary はリンク先を踏まえた運営による要約（事実の短い説明。詳細は必ず公式ページで）。
 * DATA_SOURCE_HUBS … 数値の根拠データ（{ title, source, url, summary?, note?, primary? }）。
 * MINISTRY_HUBS / DIET_HUBS … 府省庁・国会の公式入口（summary で中身の要約、note で補足）。
 */

/** 出来事・公表メモ（公表日で降順ソート表示。URLは公式で確認済みのもののみ）。 */
const NEWS_DATED = [
  {
    date: '2026-06-11',
    title: '石油備蓄の状況（推計値の速報）令和8年6月11日公表（6月8日時点）',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/pdf-oil-res/oil_daily.pdf',
    summary:
      '推計値の速報として、データ時点6月8日時点の合計201日分（国家107・民間92・産油国共同3）が示されている旨の公表更新（表の区分に基づく運営側の要約。確定の内訳・定義はPDFの表で確認）。',
    note: '一覧ページは pl001/。速報PDFは毎営業日更新の oil_daily.pdf。',
  },
  {
    date: '2026-05-25',
    title: '中東情勢を踏まえた令和８年度補正予算等についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0525kaiken.html',
    summary:
      '中東情勢を踏まえた補正予算（約3兆円強）と「中東情勢等対応予備費」の創設、7〜9月の電気・ガス料金支援、ガソリン全国平均170円前後への抑制継続などを説明。原油は6月のホルムズ迂回代替調達見通しが8割程度に、ナフサ由来製品は年を越え供給可能との見通しも述べられている。',
  },
  {
    date: '2026-05-11',
    title: '山田経済産業副大臣がアラブ首長国連邦、カタール国、クウェート国及びオマーン国に出張しました',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2026/05/20260511001/20260511001.html',
    summary:
      '5月5〜9日、山田副大臣がUAE・カタール・クウェート・オマーンを訪問し、原油等の安定供給拡大、産油国共同備蓄の迅速な補充、日本国内での原油備蓄増加、パワー・アジアに基づく域内備蓄拡大などを各国に提案した旨の経産省公表。',
  },
  {
    date: '2026-04-30',
    title: 'ペゼシュキアン・イラン大統領との電話会談についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0430kaiken.html',
    summary:
      'イランのペゼシュキアン大統領との再びの電話会談後の会見。総理は米伊協議の早期再開と合意形成への期待を伝え、日本人乗組員が乗る日本関係船がホルムズ海峡を無事通過したことへの評価と、邦人保護・全船舶の安全航行確保を改めて求めた旨が説明されている。イラン側の見通しの説明や、今後も緊密に意思疎通する旨で一致したことが述べられている。',
  },
  {
    date: '2026-04-30',
    title: '第6回 中東情勢に関する関係閣僚会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202604/30kaigi_middle-east.html',
    summary:
      '第6回中東情勢に関する関係閣僚会議の官邸記録。総理は原油は年を越えて必要量を確保できる見通し、ホルムズ迂回の代替調達が5月時点で約6割にめどがつくこと、国家備蓄の第2弾では放出を20日分まで抑制しつつ調整すること、ガソリン全国平均170円前後への抑制継続などを説明。ナフサ由来製品・医療・食品包装・廃棄物処理など生活関連の「目詰まり」解消や、過剰発注抑制の周知を各省に指示する内容が要約されている。',
  },
  {
    date: '2026-04-24',
    title: '第2弾の国家備蓄原油の放出を行います',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2026/04/20260424009/20260424009.html',
    summary:
      '経済産業省が国家備蓄原油の第2弾放出を公表したプレスリリース。放出の規模・スケジュール等の政府説明の一次ソースとして参照。',
    note: '第2弾。放出開始は5月1日以降順次（プレス本文）。',
  },
  {
    date: '2026-04-15',
    title: 'エネルギー強靱化に関するＡＺＥＣ＋オンライン首脳会合についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0415kaiken.html',
    summary:
      'アジア各国首脳らが参加した「AZEC＋」オンライン首脳会合後の会見。中東情勢を踏まえ、エネルギー・重要物資のサプライチェーン強靱化を目的とした会合だった旨と、域内の調達・融資・備蓄整備等に取り組む「パワー・アジア」（協力総額約100億ドル規模の説明）を表明したことなどが冒頭で説明されている。問答では日本の備蓄原油の単純融通ではないことも述べられている。',
  },
  {
    date: '2026-04-10',
    title: '第3回 中東情勢に関する関係閣僚会議',
    source: '政府広報オンライン（首相会見・記者会見等）',
    url: 'https://www.gov-online.go.jp/press_conferences/prime_minister/202604/video-309616.html',
    summary:
      '令和8年4月10日開催の中東情勢に関する関係閣僚会議に、高市総理が官邸で出席した旨を政府広報オンラインが公表するページ（映像・関連リンクへの入口）。会合の具体的な指示・数値は、当時の映像・官邸・各省の公表で確認。',
    note: '官邸「総理の一日」の当該詳細ページは再編で取得できない場合があるため、本会合は政府広報の該当ページをリンク先とした。',
  },
  {
    date: '2026-04-07',
    title: '令和８年度予算成立及び中東情勢への対応等についての会見',
    source: '首相官邸（総理の演説・記者会見）',
    url: 'https://www.kantei.go.jp/jp/105/statement/2026/0407kaiken.html',
    summary:
      '令和8年度予算成立を受けた首相の記者会見。予算の骨子や物価高対策の補正執行状況に加え、中東情勢に伴う約45日分の石油備蓄国際協調放出、ホルムズ迂回の代替調達進展、ガソリン等への激変緩和で価格を抑えたこと、医療・化学製品など重要物資の「目詰まり」対策と相談窓口の案内などが冒頭で述べられている。',
  },
  {
    date: '2026-03-31',
    title: '第2回 中東情勢に関する関係閣僚会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202603/31kaigi_middle-east.html',
    summary:
      '第2回中東情勢に関する関係閣僚会議の官邸記録。総理が首脳外交やIEAとの連携、燃料価格補助と備蓄放出、ホルムズ迂回でタンカーが入港したこと、燃料不足・重要物資（医療等）の安定供給、赤澤大臣を担当とする重要物資安定確保とタスクフォース設置などを指示した内容がまとめられている。',
  },
  {
    date: '2026-03-24',
    title: '国家備蓄原油の放出を行います',
    source: '経済産業省（プレスリリース）',
    url: 'https://www.meti.go.jp/press/2025/03/20260324004/20260324004.html',
    summary:
      '経済産業省が国家備蓄原油の放出（第1弾）を公表したプレスリリース。放出の趣旨・時期など政府説明の一次ソース。',
    note: '第1弾。3月26日以降順次放出（プレス本文）。',
  },
  {
    date: '2026-03-13',
    title:
      '自由民主党・エネルギーの安定供給確保及び海上輸送途絶対策に向けた緊急提言申入れ',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202603/13teigen.html',
    summary:
      '自由民主党から「エネルギーの安定供給確保及び海上輸送途絶対策に向けた緊急提言」が総理に申し入れられ、総理が官邸で受け取った旨の記録ページ（写真中心で、提言の全文は政党側公表と併せて確認）。',
  },
  {
    date: '2026-03-11',
    title: 'Ｇ７首脳オンライン会議',
    source: '首相官邸（総理の一日）',
    url: 'https://www.kantei.go.jp/jp/105/actions/202603/11tv_kaigi.html',
    summary:
      'G7首脳オンライン会議に高市総理が公邸から出席した旨の官邸「総理の一日」ページ。議題の詳細は首脳声明・各国リリースなど関連公式情報で確認。',
  },
  {
    date: '2026-03-11',
    title:
      'IEA、加盟国による最大規模の協調在庫放出を決定（中東の市場混乱への対応）',
    source: 'International Energy Agency（公式・英語）',
    url: 'https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict',
    summary:
      'IEA加盟32か国が、中東の紛争に伴う市場混乱へ対応し、加盟国の緊急在庫から計4億バレル相当を市場に供給する協調行動で一致したとする英文リリース。ホルムズ海峡の混乱で海上輸送量が大きく減少している前提が説明されている。',
    note: '英語リリース。実施の詳細や日本の取組は経産省・資源エネルギー庁の公表を参照。',
  },
];

/** 本サイトの起算の参照先（公表データ。ニュース記事ではない） */
const DATA_SOURCE_HUBS = [
  {
    primary: true,
    title: '石油備蓄の状況（推計値・日次PDF）',
    summary:
      '毎営業日更新が目安の「石油備蓄の状況」推計。国家・民間・産油国の備蓄日分が表で載る公式PDF（報道記事ではない）。',
    note: '公表日・データ時点・内訳はPDFの表頭と本文を確認。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/pdf-oil-res/oil_daily.pdf',
  },
  {
    primary: true,
    title: '石油備蓄の現況（一覧・速報への案内）',
    summary:
      '速報PDFへのリンクや関連資料への導線をまとめた資エネ庁の「石油備蓄の現況」一覧ページ。',
    note: '最新PDFはページ内の案内から開く。',
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
    summary:
      '中東情勢とエネルギー安定供給・重要物資を扱う内閣官房の特設ページ。関係閣僚会議やタスクフォースの開催情報への入口。',
    note:
      '原油価格・物価高騰閣僚会議（/genyukakaku_bukkakoutou/）、エネルギー・食料等閣僚会議（/enerugi/）は別ページ。',
    source: '内閣官房',
    url: 'https://www.cas.go.jp/jp/seisaku/chyutoujyousei/index.html',
  },
  {
    title: '内閣府（トップ）',
    summary: '内閣府の政策・会議・審議会情報の公式起点。所管は広く、エネルギー単独窓口ではない。',
    note: '物価・エネルギー価格は府資料と資エネ庁公表の併覧が実用的。',
    source: '内閣府',
    url: 'https://www.cao.go.jp/',
  },
  {
    title: 'デジタル庁（トップ）',
    summary: '行政のデジタル化・デジタル社会政策の省庁サイト。石油備蓄の専用ポータルは別府省。',
    source: 'デジタル庁',
    url: 'https://www.digital.go.jp/',
  },
  {
    title: '報道発表（ニュースリリース一覧）',
    summary: '総務省のニュースリリース一覧。総務省発の政策はここから検索しやすい。',
    source: '総務省',
    url: 'https://www.soumu.go.jp/menu_news/s-news/',
  },
  {
    title: '法務省（トップ）',
    summary: '法制度・民事・刑事・登記などの法務行政入口。石油備蓄とは無直接。',
    source: '法務省',
    url: 'https://www.moj.go.jp/',
  },
  {
    title: 'エネルギー安全保障',
    summary: '外務省が説明するエネルギー安全保障・資源外交・国際機関との連携の概要ページ。',
    note: '取得エラーになる環境はブラウザで再試行。',
    source: '外務省',
    url: 'https://www.mofa.go.jp/mofaj/gaiko/energy/index.html',
  },
  {
    title: '自動車関係諸税・エネルギー関係諸税（概要）',
    summary: '揮発油税・石油石炭税・航空機燃料税など、石油・エネルギーに関わる主要税目の説明資料。',
    source: '財務省',
    url: 'https://www.mof.go.jp/tax_policy/summary/consumption/d10.htm',
  },
  {
    title: '文部科学省（トップ）',
    summary: '教育・科学技術・スポーツの省庁サイト。エネルギー政策の主務ではない。',
    source: '文部科学省',
    url: 'https://www.mext.go.jp/',
  },
  {
    title: '中東情勢関連対策ワンストップポータル',
    summary:
      '厚労省の中東関連ポータル。医薬品・医療機器・医療物資の供給や相談窓口が中心。',
    note: '国家石油備蓄は経済産業省側の公表が本線。',
    source: '厚生労働省',
    url: 'https://www.mhlw.go.jp/stf/chuto-josei.html',
  },
  {
    title: '中東情勢関連対策（農林水産省）',
    summary:
      '農水省の中東情勢対策ページ。肥料・農業資材・燃料油など農業・食品物流に絡む情報の入口。',
    source: '農林水産省',
    url: 'https://www.maff.go.jp/chuto_josei.html',
  },
  {
    title: '中東情勢関連ワンストップポータル',
    summary:
      '経産省の中東関連ワンストップ。備蓄放出や物価・供給対策など経済サイドの公式情報が集約。',
    note: '放出の詳細はプレスリリースも併覧。',
    source: '経済産業省',
    url: 'https://www.meti.go.jp/chuto_josei/index.html',
  },
  {
    title: '中東情勢関連対策ワンストップポータル',
    summary:
      '国交省の中東関連ポータル。航空・海事・物流で燃料・石油製品の供給が論点になるときの窓口案内。',
    source: '国土交通省',
    url: 'https://www.mlit.go.jp/sogoseisaku/chuto_josei.html',
  },
  {
    title: '中東情勢対策ポータル',
    summary:
      '環境省の中東・燃料関連ポータル。廃棄物処理などで燃料・石油製品の相談窓口を案内。',
    note: '温室効果ガス算定（エネルギー分野）は環境省の別ページ。',
    source: '環境省',
    url: 'https://www.env.go.jp/page_00348.html',
  },
  {
    title: '防衛白書・出版物（トップ）',
    summary: '防衛白書等の一覧。自衛隊の燃料確保や持続性などは各年版の該当章で触れられる。',
    source: '防衛省',
    url: 'https://www.mod.go.jp/j/publication/hakusho/index.html',
  },
];

/** 国会審議・法令・会議録の公式検索入口 */
const DIET_HUBS = [
  {
    title: '立法情報（議案・審議経過などの入口）',
    summary: '衆議院の立法情報トップ。法律案・予算・条約など国会審議の公式起点。',
    note: '石油・エネルギー関連は議案名・会派公表と突き合わせ。',
    source: '衆議院',
    url: 'https://www.shugiin.go.jp/Internet/index.nsf/html/rippo_top.htm',
  },
  {
    title: '議案情報（国会回次一覧）',
    summary: '国会回次を選び、衆議院側の議案一覧・経過・本文へ進むデータベース。',
    source: '衆議院',
    url: 'https://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/menu_all.htm',
  },
  {
    title: '今国会情報',
    summary: '参議院の「今国会」案内。開会中の議案・日程・公報への導線。',
    source: '参議院',
    url: 'https://www.sangiin.go.jp/japanese/kon_kokkaijyoho/index.html',
  },
  {
    title: '法令・法案検索（現行法令・法律案など）',
    summary:
      '国立国会図書館の法令・法律案検索。現行法と国会提出法案を横断してキーワード検索できる。',
    source: '国立国会図書館',
    url: 'https://hourei.ndl.go.jp/',
  },
  {
    title: '国会会議録検索システム',
    summary:
      '衆参の委員会・本会議の発言録データベース。石油備蓄・エネルギーなど発言をキーワード検索。',
    source: '国立国会図書館',
    url: 'https://kokkai.ndl.go.jp/',
  },
];

/** そのほかの参照ハブ（公式・国際機関・主要通信社のトピックなど） */
const NEWS_HUBS = [
  {
    title: '石油・LPガス統計（月次・各種トップ）',
    summary:
      '資エネ庁の石油・LPガス統計ポータル。月次確報やテーマ別ページ。速報PDF（備蓄日数）とは別系統。',
    source: '資源エネルギー庁（経済産業省）',
    url: 'https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/',
  },
  {
    title: 'IEA（国際エネルギー機関）',
    summary:
      'IEA公式サイト。加盟国の在庫・緊急時協調・市場レポートなどの一次情報。',
    source: 'International Energy Agency',
    url: 'https://www.iea.org/',
  },
  {
    title: 'Petroleum & other liquids（データ一覧）',
    summary: '米国エネルギー情報局の石油・液体燃料データ。世界需給・在庫把握の参照用。',
    source: 'U.S. Energy Information Administration',
    url: 'https://www.eia.gov/petroleum/data.php',
  },
  {
    title: 'Energy',
    summary:
      'ロイターのエネルギー市場報道トピック。速報把握用（政府・公的統計の代替にはならない）。',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/',
  },
  {
    title: 'IEAと備蓄義務の概要',
    summary: '当サイト内ガイド。IEAと主要国の備蓄義務のざっくり比較。',
    note: '詳細は省庁・IEA原文で確認。',
    source: '本サイト（ガイド）',
    url: 'guide/international-comparison.html',
  },
  {
    title: '緊急放出と国際協調（入門）',
    summary: '当サイト内ガイド。備蓄の緊急放出と国際協調の入門。',
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

    if (hub.summary) {
      const summary = document.createElement('p');
      summary.className = 'news-timeline-hub-summary';
      setText(summary, hub.summary);
      li.appendChild(summary);
    }

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

    if (item.summary) {
      const summary = document.createElement('p');
      summary.className = 'news-timeline-summary';
      setText(summary, item.summary);
      body.appendChild(summary);
    }

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
