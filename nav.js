(function () {
  var isGuide = location.pathname.indexOf('/guide') !== -1;
  var p = isGuide ? '../' : '';

  var header = document.createElement('header');
  header.className = 'site-nav';
  header.innerHTML =
    '<div class="site-nav-inner">' +
      '<a class="site-nav-title" href="' + p + 'index.html">日本石油備蓄枯渇カウンター</a>' +
      '<button class="nav-toggle" aria-label="メニュー" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>' +
    '<nav class="nav-menu">' +
      '<a class="nav-menu-primary" href="' + p + 'index.html">カウンター（トップ）</a>' +
      '<a href="' + p + 'guide/index.html">ガイド一覧</a>' +
      '<a href="' + p + 'guide/oil-reserve-basics.html">備蓄とは</a>' +
      '<a href="' + p + 'guide/how-days-calculated.html">日数の計算</a>' +
      '<a href="' + p + 'guide/hormuz-japan-imports.html">ホルムズ海峡</a>' +
      '<a href="' + p + 'guide/international-comparison.html">国際比較</a>' +
      '<a href="' + p + 'guide/emergency-release-overview.html">緊急時の備蓄</a>' +
      '<a href="' + p + 'guide/faq.html">FAQ</a>' +
      '<a href="' + p + 'privacy-policy.html">プライバシーポリシー</a>' +
    '</nav>';

  document.body.insertBefore(header, document.body.firstChild);

  var btn = header.querySelector('.nav-toggle');
  var menu = header.querySelector('.nav-menu');

  function toggle() {
    var open = header.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  }
  function close() {
    header.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', toggle);
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
