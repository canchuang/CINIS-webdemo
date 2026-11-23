/* Scroll-driven project showcase (GSAP ScrollTrigger; graceful stacked fallback). */
(function () {
  const stage = document.getElementById('showcaseStage');
  const section = document.getElementById('work');
  if (!stage || !section) return;
  const projects = (window.PROJECTS || []).filter(p => p.showOnHome).sort((a, b) => (a.order || 0) - (b.order || 0));
  if (!projects.length) return;

  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  projects.forEach((p, i) => {
    const panel = el('article', 'showcase-panel' + (i === 0 ? ' is-active' : ''));
    panel.setAttribute('data-slug', p.slug);
    panel.style.setProperty('--panel-accent', (p.showcase && p.showcase.accent) || '#E9E4FF');
    panel.setAttribute('aria-label', p.title + ' — ' + (p.worksMeta || '').replace(/^\d+\s*[—–-]\s*/, ''));

    const bg = el('div', 'panel-bg'); bg.setAttribute('aria-hidden', 'true'); panel.appendChild(bg);
    const inner = el('div', 'panel-inner');

    const copy = el('div', 'panel-copy');
    const idx = el('div', 'panel-index');
    idx.appendChild(el('span', 'cat', (p.worksMeta || '').replace(/^\d+\s*[—–-]\s*/, '')));
    copy.appendChild(idx);
    copy.appendChild(el('h2', 'panel-title', p.title));
    copy.appendChild(el('p', 'panel-desc', p.homeSummary || p.summary || ''));
    if (p.showcase && p.showcase.label) copy.appendChild(el('div', 'panel-label', p.showcase.label));
    if (p.showcase && p.showcase.note) copy.appendChild(el('p', 'panel-note', p.showcase.note));
    const cta = el('a', 'btn panel-cta'); cta.href = p.page; cta.textContent = '查看案例';
    copy.appendChild(cta);

    const visual = el('div', 'panel-visual ' + ((p.showcase && p.showcase.visual) || 'screens'));
    const imgs = (p.showcase && p.showcase.images && p.showcase.images.length ? p.showcase.images : (p.cover && p.cover.images) || []);
    imgs.forEach(item => { const im = document.createElement('img'); im.src = item.src; im.alt = item.alt || (p.title + ' 画面'); im.loading = i === 0 ? 'eager' : 'lazy'; im.decoding = 'async'; visual.appendChild(im); });

    inner.appendChild(copy); inner.appendChild(visual); panel.appendChild(inner); stage.appendChild(panel);
  });

  const panels = [...stage.querySelectorAll('.showcase-panel')];
  const total = panels.length;
  const railIndex = document.getElementById('showcaseIndex');
  const railFill = document.getElementById('showcaseFill');
  const railTotal = document.querySelector('.showcase-rail .rail-count i');
  if (railTotal) railTotal.textContent = '/ ' + pad(total);
  const homeCount = document.getElementById('homeProjectCount'); if (homeCount) homeCount.textContent = pad(total) + ' 个项目';

  function activate(i) {
    panels.forEach((p, j) => {
      p.classList.toggle('is-active', j === i);
      const hidden = section.classList.contains('is-enhanced') && j !== i;
      p.setAttribute('aria-hidden', String(hidden));
      p.inert = hidden;
    });
    if (railIndex) railIndex.textContent = pad(i + 1);
    section.style.setProperty('--rail-ink', panels[i]?.dataset.slug === 'pes' ? '#edf2fa' : '#263743');
  }
  activate(0);

  const gsap = window.gsap, ST = window.ScrollTrigger;
  const staticMode = document.documentElement.classList.contains('static');
  if (!gsap || !ST || staticMode) return;

  gsap.registerPlugin(ST);
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    section.classList.add('is-enhanced');
    gsap.set(panels, { opacity: 0, visibility: 'hidden', scale: 0.94, clipPath: 'inset(10% 6% 10% 6% round 20px)' });
    gsap.set(panels[0], { opacity: 1, visibility: 'visible', scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)' });
    activate(0);
    const tl = gsap.timeline({
      onUpdate() {
        const t = this.time();
        let active = 0;
        for (let i = 1; i < total; i++) if (t >= i + 0.05) active = i;
        activate(active);
        if (railFill) railFill.style.width = (this.progress() * 100).toFixed(2) + '%';
      },
      scrollTrigger: {
        trigger: '#showcaseViewport',
        start: 'top top',
        end: () => '+=' + (total > 1 ? (total - 1) * 100 : 0) + '%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,

      }
    });
    tl.to({}, { duration: 0.3 });
    for (let i = 1; i < total; i++) {
      tl.to(panels[i - 1], { opacity: 0, scale: 1.045, clipPath: 'inset(6% 4% 6% 4% round 20px)', duration: 0.55, ease: 'power1.inOut' }, i - 0.35);
      tl.fromTo(panels[i], { opacity: 0, visibility: 'visible', scale: 0.95, clipPath: 'inset(12% 6% 12% 6% round 20px)' }, { opacity: 1, visibility: 'visible', scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.8, ease: 'power2.out' }, i - 0.2);
    }
    tl.to({}, { duration: 0.25 });
    const heroTween = gsap.to('.hero-v2x .wrap', {
      yPercent: -10, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero-v2x', start: 'top top', end: 'bottom top', scrub: true }
    });
    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill();
      heroTween.scrollTrigger && heroTween.scrollTrigger.kill(); heroTween.kill();
      section.classList.remove('is-enhanced');
      gsap.set(panels, { clearProps: 'opacity,visibility,transform,clipPath' });
      panels.forEach((p, j) => p.setAttribute('aria-hidden', 'false'));
      activate(0);
    };
  });

  mm.add('(max-width: 1023px)', () => {
    section.classList.remove('is-enhanced');
    activate(0);
    panels.forEach(p => p.setAttribute('aria-hidden', 'false'));
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    section.classList.remove('is-enhanced');
    panels.forEach(p => p.setAttribute('aria-hidden', 'false'));
  });
})();
