(function () {
  var isGuide = location.pathname.indexOf('/guide') !== -1;
  var prefix = isGuide ? '../' : '';

  var nav = document.createElement('nav');
  nav.className = 'hamburger-nav';
  nav.innerHTML =
    '<button class="hamburger-btn" aria-label="メニュー" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
    '<div class="hamburger-overlay"></div>' +
    '<div class="hamburger-drawer">' +
      '<div class="drawer-header">メニュー</div>' +
      '<ul>' +
        '<li><a href="' + prefix + 'index.html">枯渇カウンター（トップ）</a></li>' +
        '<li class="drawer-divider">読み物・ガイド</li>' +
        '<li><a href="' + prefix + 'guide/index.html">ガイド一覧</a></li>' +
        '<li><a href="' + prefix + 'guide/oil-reserve-basics.html">石油備蓄とは？</a></li>' +
        '<li><a href="' + prefix + 'guide/how-days-calculated.html">「〇〇日」の計算</a></li>' +
        '<li><a href="' + prefix + 'guide/hormuz-japan-imports.html">ホルムズ海峡と輸入</a></li>' +
        '<li><a href="' + prefix + 'guide/international-comparison.html">国際比較・IEA</a></li>' +
        '<li><a href="' + prefix + 'guide/emergency-release-overview.html">緊急時の備蓄</a></li>' +
        '<li><a href="' + prefix + 'guide/faq.html">FAQ・注意事項</a></li>' +
        '<li class="drawer-divider">その他</li>' +
        '<li><a href="' + prefix + 'privacy-policy.html">プライバシーポリシー</a></li>' +
      '</ul>' +
    '</div>';

  document.body.insertBefore(nav, document.body.firstChild);

  var btn = nav.querySelector('.hamburger-btn');
  var drawer = nav.querySelector('.hamburger-drawer');
  var overlay = nav.querySelector('.hamburger-overlay');

  function toggle() {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function close() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', toggle);
  overlay.addEventListener('click', close);
  drawer.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
