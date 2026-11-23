/* Shared case-to-case navigation, sourced from the existing project data. */
(() => {
  const host = document.querySelector('[data-next-work]');
  const projects = (window.PROJECTS || []).slice().sort((a, b) => a.order - b.order);
  if (!host || !projects.length) return;

  const currentPage = location.pathname.split('/').pop();
  const currentIndex = projects.findIndex(project => project.page === currentPage);
  if (currentIndex < 0) return;

  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value != null) node.textContent = value;
    return node;
  };
  const image = item => {
    const node = document.createElement('img');
    node.src = item.src;
    node.alt = item.alt || '';
    node.loading = 'lazy';
    return node;
  };
  const imageSet = (project, className) => {
    const visual = element('div', className);
    (project.cover?.images || []).forEach(item => visual.appendChild(image(item)));
    return visual;
  };

  const inner = element('div', 'next-work-inner');
  const heading = element('div', 'next-work-heading');
  heading.appendChild(element('span', 'next-work-eyebrow', '继续看作品'));
  heading.appendChild(element('span', 'next-work-count', `${String(currentIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`));
  inner.appendChild(heading);

  const grid = element('div', 'next-work-grid');
  const next = projects[currentIndex + 1];
  const mainLink = element('a', 'next-work-card');
  mainLink.href = next ? next.page : 'works.html';
  mainLink.appendChild(next ? imageSet(next, 'next-work-visual') : (() => {
    const visual = element('div', 'next-work-visual next-work-visual-all');
    projects.forEach(project => {
      const first = project.cover?.images?.[0];
      if (first) visual.appendChild(image(first));
    });
    return visual;
  })());

  const copy = element('div', 'next-work-copy');
  copy.appendChild(element('span', 'next-work-category', next ? next.worksMeta.replace(/^\d+\s*[—-]\s*/, '') : 'CINIS · 镇岳 · MOVA'));
  copy.appendChild(element('h2', null, next ? next.title : '全部作品'));
  copy.appendChild(element('p', null, next ? next.summary : '返回作品列表，浏览完整案例。'));
  copy.appendChild(element('span', 'next-work-action', next ? '进入案例 →' : '返回全部作品 →'));
  mainLink.appendChild(copy);
  grid.appendChild(mainLink);

  if (next) {
    const allLink = element('a', 'next-work-all');
    allLink.href = 'works.html';
    const thumbnails = element('div', 'next-work-thumbs');
    projects.forEach(project => {
      const first = project.cover?.images?.[0];
      if (first) thumbnails.appendChild(image(first));
    });
    allLink.appendChild(thumbnails);
    allLink.appendChild(element('span', 'next-work-all-label', '全部作品'));
    allLink.appendChild(element('span', 'next-work-all-arrow', '查看列表 →'));
    grid.appendChild(allLink);
  } else {
    grid.classList.add('next-work-grid-single');
  }
  inner.appendChild(grid);
  host.appendChild(inner);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let leaving = false;
  host.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reduced.matches || leaving) return;
    event.preventDefault();
    leaving = true;
    document.documentElement.classList.add('case-leaving');
    setTimeout(() => { location.href = link.href; }, 180);
  });
})();
