/* DIRECTION B — motion system (progressive enhancement) */
(function () {
  var STATIC = /[?&]static/.test(location.search);
  if (STATIC) document.documentElement.classList.add('static');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || STATIC;

  /* ---- Split text (word-level) for elements with .split (plain text only) ---- */
  function splitWords(el) {
    var text = el.textContent.trim();
    if (!text) return;
    el.textContent = '';
    text.split(/(\s+)/).forEach(function (part) {
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(' ')); return; }
      var w = document.createElement('span');
      w.className = 'w';
      var inner = document.createElement('span');
      inner.textContent = part;
      w.appendChild(inner);
      el.appendChild(w);
    });
  }
  document.querySelectorAll('.split').forEach(function (el) {
    if (!reduce) splitWords(el);
  });

  /* ---- Scroll reveal ---- */
  var revealTargets = document.querySelectorAll('.rv, .split');
  if (reduce || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Safety: never leave content hidden if reveal fails ---- */
  setTimeout(function () {
    document.querySelectorAll('.rv, .split').forEach(function (el) { el.classList.add('in'); });
  }, 2600);

  /* ---- Active nav link ---- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---- Page transition: fade out on internal navigation ---- */
  if (!reduce) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' || /^https?:/i.test(href) || href.indexOf('mailto:') === 0) return;
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        document.body.classList.add('leaving');
        setTimeout(function () { location.href = href; }, 200);
      });
    });
  }

  /* ---- Prototype iframe: graceful fallback if it cannot load ---- */
  var fr = document.querySelector('.screenif');
  if (fr) {
    var shown = false;
    var t = setTimeout(function () { if (!shown && fr.parentNode) { fr.parentNode.classList.add('iframe-slow'); } }, 3500);
    fr.addEventListener('load', function () { shown = true; clearTimeout(t); });
  }
})();
