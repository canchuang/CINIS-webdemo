/* Project navigation and filtering: restrained FLIP-inspired motion, no external runtime. */
(() => {
  const projects = window.PROJECTS || [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const byPage = new Map(projects.map(project => [project.page, project]));
  let leaving = false;

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    const project = byPage.get(url.pathname.split('/').pop());
    if (!project || reduced.matches || document.documentElement.classList.contains('static') || leaving) return;
    event.preventDefault();
    leaving = true;

    const curtain = document.createElement('div');
    curtain.className = 'work-switch-curtain';
    curtain.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('div');
    copy.className = 'copy';
    const eyebrow = document.createElement('span');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = '即将进入 / ' + (project.worksMeta || 'CASE STUDY');
    const title = document.createElement('strong');
    title.className = 'title';
    title.textContent = project.title;
    copy.append(eyebrow, title);
    const visual = document.createElement('div');
    visual.className = 'visual';
    (project.cover?.images || []).forEach(item => {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      visual.append(img);
    });
    curtain.append(copy, visual);
    document.body.append(curtain);
    const go = () => { location.assign(url.href); };
    try {
      const animation = curtain.animate(
        [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
        { duration: 560, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }
      );
      animation.finished.then(go, go);
      setTimeout(go, 900);
    } catch (_) { go(); }
  });

  const filters = document.getElementById('filters');
  const grid = document.getElementById('grid');
  if (!filters || !grid) return;
  filters.addEventListener('click', event => {
    if (!event.target.closest('button[data-f]') || reduced.matches || !Element.prototype.animate) return;
    const before = new Map([...grid.querySelectorAll('.wcard:not([hidden])')].map(card => [card, card.getBoundingClientRect()]));
    requestAnimationFrame(() => {
      grid.querySelectorAll('.wcard:not([hidden])').forEach(card => {
        const old = before.get(card);
        if (!old) {
          card.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,0,.2,1)' });
          return;
        }
        const next = card.getBoundingClientRect();
        const dx = old.left - next.left, dy = old.top - next.top;
        if (Math.abs(dx) + Math.abs(dy) < 2) return;
        card.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.2,0,.2,1)' });
      });
    });
  }, { capture: true });
})();
