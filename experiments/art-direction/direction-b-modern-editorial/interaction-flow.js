/* Shift the non-interactive ambient color field with the visible reading section. */
(() => {
  if (document.documentElement.classList.contains('static')) return;
  const layer = document.createElement('div');
  layer.className = 'scroll-aurora';
  layer.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(layer, document.body.firstChild);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const sections = [...document.querySelectorAll('main > section, main section[id], main .about-block, .cs-body .cs-marker[id]')];
  let pending = false;
  function update() {
    pending = false;
    const readingLine = innerHeight * .43;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) active = section;
    }
    const index = Math.max(0, sections.indexOf(active));
    const rect = active?.getBoundingClientRect();
    const within = rect ? Math.max(0, Math.min(1, (readingLine - rect.top) / Math.max(rect.height, 1))) : 0;
    layer.style.setProperty('--flow-x', `${(index % 2 ? -13 : 10) + within * 9}vw`);
    layer.style.setProperty('--flow-y', `${(index % 3 - 1) * 9 + within * 8}vh`);
    layer.dataset.section = active?.id || active?.className.split(' ')[0] || 'top';
  }
  const schedule = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  update();
})();
