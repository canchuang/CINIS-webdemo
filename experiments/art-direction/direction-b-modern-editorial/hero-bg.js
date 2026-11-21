/* Phase 24 — Hero background scheme switch (no dependencies, no cursor interaction) */
(function () {
  var hero = document.querySelector('.hero-v2x');
  if (!hero) return;
  var btns = document.querySelectorAll('.bg-switch button');
  function set(v) {
    hero.setAttribute('data-bg', v);
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-bgset') === v ? 'true' : 'false');
    }
  }
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      set(this.getAttribute('data-bgset'));
    });
  }
  set(hero.getAttribute('data-bg') || 'aurora');
})();
