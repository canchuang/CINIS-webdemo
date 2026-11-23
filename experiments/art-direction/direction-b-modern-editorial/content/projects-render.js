/* Render project cards on Home + Works from the single data source (window.PROJECTS).
   Data is generated from content/projects.json by _tools/build_projects.mjs. */
(function () {
  var ALL = (window.PROJECTS || []).slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function imgs(cover) {
    var list = (cover && cover.images) || [];
    return list.map(function (i) { var im = document.createElement('img'); im.src = i.src; im.alt = i.alt || ''; return im; });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- HOME ---------- */
  function renderHome() {
    var featureHost = document.getElementById('homeFeature');
    var secondaryHost = document.getElementById('homeSecondary');
    if (!featureHost && !secondaryHost) return;
    var list = ALL.filter(function (p) { return p.showOnHome; });
    var feature = list.filter(function (p) { return p.homeLayout === 'feature'; })[0] || null;
    var secondary = list.filter(function (p) { return p !== feature; });

    if (featureHost && feature) {
      var a = el('a', 'feature rv'); a.href = feature.page;
      var fhead = el('div', 'fhead');
      fhead.appendChild(el('span', 'num', feature.homeMeta || pad(feature.order)));
      fhead.appendChild(el('span', 'cat', feature.homeCat || feature.worksMeta));
      var layout = el('div', 'layout');
      var band = el('div', 'phones-band');
      imgs(feature.cover).forEach(function (im) { band.appendChild(im); });
      var info = el('div', 'info');
      info.appendChild(el('h3', null, feature.title));
      info.appendChild(el('p', null, feature.homeSummary || feature.summary));
      var cta = el('span', 'cta'); cta.appendChild(document.createTextNode('查看案例 '));
      var arw = el('span', 'arw', '→'); cta.appendChild(arw); info.appendChild(cta);
      layout.appendChild(band); layout.appendChild(info);
      a.appendChild(fhead); a.appendChild(layout); featureHost.appendChild(a);
    }
    if (secondaryHost) {
      secondary.forEach(function (p) {
        var a = el('a', 'item rv'); a.href = p.page;
        var cov = el('div', 'cover');
        imgs(p.cover).forEach(function (im) { cov.appendChild(im); });
        a.appendChild(cov);
        a.appendChild(el('div', 'meta', (p.worksMeta || '').replace(/^\d+\s*[—-]\s*/, '')));
        a.appendChild(el('h3', null, p.title));
        a.appendChild(el('p', null, p.homeSummary || p.summary));
        a.appendChild(el('span', 'case-link', '查看案例 →'));
        secondaryHost.appendChild(a);
      });
    }
    var marker = document.getElementById('homeProjectCount');
    if (marker) marker.textContent = pad(list.length) + ' 个项目';
  }

  /* ---------- WORKS ---------- */
  function renderWorks() {
    var grid = document.getElementById('grid');
    if (!grid) return;
    var list = ALL.filter(function (p) { return p.showInWorks; });
    var filters = document.getElementById('filters');
    var status = document.getElementById('filterStatus');

    list.forEach(function (p) {
      var a = el('a', 'wcard ' + (p.worksLayout || 'small') + ' ' + (p.coverClass || '') + ' rv');
      a.href = p.page;
      a.setAttribute('data-cat', p.filter || '');
      a.setAttribute('aria-label', p.title + ' — ' + String(p.worksMeta || '').replace(/^\d+\s*—\s*/, '') + '，查看案例');
      var frame = el('div', 'frame');
      imgs(p.cover).forEach(function (im) { frame.appendChild(im); });
      var cap = el('div', 'cap');
      var h3 = el('h3', 'zh', p.title);
      cap.appendChild(h3);
      cap.appendChild(el('span', 'n', p.worksMeta));
      a.appendChild(frame); a.appendChild(cap);
      a.appendChild(el('p', 'desc zh-body', p.summary));
      grid.appendChild(a);
    });

    var buttons = filters ? [].slice.call(filters.querySelectorAll('button')) : [];
    var allBtn = buttons.filter(function (b) { return b.getAttribute('data-f') === 'all'; })[0];
    if (allBtn) allBtn.textContent = '全部 (' + pad(list.length) + ')';
    var countEl = document.getElementById('worksProjectCount');
    if (countEl) countEl.textContent = pad(list.length) + ' projects — 2024–2026';

    function apply(k, activeBtn) {
      var visible = 0, names = [];
      [].forEach.call(grid.querySelectorAll('[data-cat]'), function (c) {
        var show = (k === 'all' || c.getAttribute('data-cat') === k);
        c.style.display = show ? '' : 'none';
        c.hidden = !show;
        if (show) { visible++; var t = c.querySelector('.cap h3'); if (t) names.push((ALL.find(function (p) { return p.page === c.getAttribute('href'); }) || {}).title || t.textContent.trim()); }
      });
      buttons.forEach(function (x) {
        var on = (x === activeBtn);
        x.classList.toggle('on', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (status) status.textContent = '已显示 ' + visible + ' 个项目：' + names.join('、');
    }
    if (filters) filters.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      apply(b.getAttribute('data-f'), b);
    });
    if (buttons.length) apply('all', buttons[0]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { renderHome(); renderWorks(); });
  else { renderHome(); renderWorks(); }
})();
