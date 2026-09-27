/* Uzm. Psk. Esra Taşdemiroğlu — site etkileşimleri */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) Dosyadan (file://) açıldığında temiz bağlantıları .html'e çevir.
        Sunucuda (GitHub Pages) /hakkimda -> hakkimda.html zaten çalışır;
        bu sadece bilgisayarda çift tıklayıp açınca klasör listesine düşmeyi önler. */
  if (location.protocol === 'file:') {
    var map = { '/': 'index.html', '/hakkimda': 'hakkimda.html', '/teknikler': 'teknikler.html', '/iletisim': 'iletisim.html' };
    document.querySelectorAll('a[href^="/"]').forEach(function (a) {
      var raw = a.getAttribute('href');
      var parts = raw.split('#');
      var target = map[parts[0]];
      if (target) a.setAttribute('href', target + (parts[1] ? '#' + parts[1] : ''));
    });
  }

  /* 1b) Randevu: telefonda doğrudan arama, bilgisayarda iletişim sayfası */
  if (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    document.querySelectorAll('a[data-tel]').forEach(function (a) { a.setAttribute('href', a.getAttribute('data-tel')); });
  }

  /* 2) Mobil menü */
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    if (!nav || !btn) return;
    nav.classList.toggle('open', open);
    header && header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
    });
  }

  /* 3) Kaydırma: üst bar, gizle/göster, okuma çubuğu, güneş, yukarı dön */
  var lastY = window.scrollY, ticking = false;
  var progress = document.querySelector('.read-progress');
  var sun = document.querySelector('.arch-sun');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      var menuOpen = nav && nav.classList.contains('open');
      if (!menuOpen && y > 320 && y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 320) header.classList.remove('is-hidden');
    }
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    }
    if (sun && !reduce && y < window.innerHeight * 1.2) {
      sun.style.transform = 'translateY(' + (-y * 0.12).toFixed(1) + 'px)';
    }
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var skip = document.querySelector('.brand'); if (skip) skip.focus({ preventScroll: true });
  });

  /* 4) Görünür olunca yumuşak belirme */
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* 5) Teknikler: içindekiler listesinde aktif başlık */
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').split('#')[1]] = a; });
    var visible = {};
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      document.querySelectorAll('.technique').forEach(function (s) { if (!current && visible[s.id]) current = s.id; });
      if (current) tocLinks.forEach(function (a) {
        var on = a === byId[current];
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    document.querySelectorAll('.technique').forEach(function (s) { so.observe(s); });
  }

  /* 6) E-posta / telefon kopyalama */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () {
        var old = b.textContent; b.textContent = 'Kopyalandı';
        setTimeout(function () { b.textContent = old; }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done);
      else {
        var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t);
        t.select(); try { document.execCommand('copy'); done(); } catch (e) {} document.body.removeChild(t);
      }
    });
  });

  /* 7) Yıl */
  var yil = document.getElementById('yil'); if (yil) yil.textContent = new Date().getFullYear();
})();
