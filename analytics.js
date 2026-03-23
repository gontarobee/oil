/**
 * Google Analytics 4（GA4）
 *
 * 設定手順:
 * 1. https://analytics.google.com/ でプロパティを作成
 * 2. 「データストリーム」→ Web → サイトの URL を登録
 * 3. 表示される「測定ID」（G- で始まる）を下の GA_MEASUREMENT_ID に貼り付け
 *
 * 空文字のままコミットすると解析は動きません（本番反映前に必ず設定）。
 */
const GA_MEASUREMENT_ID = 'G-2NFR9EY9W8';

(function () {
  if (!GA_MEASUREMENT_ID || !/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) {
    return;
  }

  var s = document.createElement('script');
  s.async = true;
  s.src =
    'https://www.googletagmanager.com/gtag/js?id=' +
    encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();
