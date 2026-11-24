/* Local, reversible Chinese / English translation; no external translation service. */
(() => {
  const dictionary = window.PORTFOLIO_EN || {};
  const originals = new WeakMap(), attributes = new WeakMap();
  let language = 'zh-CN', pending = false;
  try { language = localStorage.getItem('portfolio-language') || language; } catch (_) {}
  const requested = new URLSearchParams(location.search).get('lang');
  if (requested === 'en' || requested === 'zh-CN' || requested === 'zh') language = requested === 'en' ? 'en' : 'zh-CN';
  const button = document.createElement('button');
  button.className = 'language-toggle'; button.type = 'button';
  document.querySelector('.site-nav .inner')?.appendChild(button);
  function english(value) {
    if (dictionary[value]) return dictionary[value];
    if (/^已显示 \d+ 个项目：/.test(value)) return value.replace(/^已显示 (\d+) 个项目：/, 'Showing $1 projects: ').replaceAll('镇岳','Zhenyue').replaceAll('、',', ').replace('Showing 1 projects:', 'Showing 1 project:');
    if (/^\d+ 个项目$/.test(value)) return value.replace(' 个项目',' projects');
    return value.replaceAll('。','.').replace(/^(\d+\s*[—–-]\s*)?(UI\/UX · 产品设计|产品设计 · 工业设计|UI\/UX 设计 · 票务)$/, (_,n,c) => (n || '') + (dictionary[c] || c));
  }
  const observer = new MutationObserver(() => { if (!pending) { pending = true; queueMicrotask(() => { pending = false; apply(); }); } });
  function apply() {
    observer.disconnect();
    if (document.documentElement.lang !== language) document.documentElement.lang = language;
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'en' ? 'en_US' : 'zh_CN');
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script,style,.language-toggle,.case-map')) continue;
      let record = originals.get(node);
      if (!record || node.nodeValue !== record.last) record = {source:node.nodeValue};
      const source = record.source, trimmed = source.trim();
      const translated = language === 'en' ? english(trimmed) : trimmed;
      const value = trimmed ? source.replace(trimmed,translated) : source;
      if (node.nodeValue !== value) node.nodeValue = value;
      record.last = value; originals.set(node,record);
    }
    document.querySelectorAll('[aria-label],img[alt],meta[name="description"],meta[property="og:title"],meta[property="og:description"]').forEach(el => {
      if (el.closest('.case-map')) return;
      const attr = el.tagName === 'IMG' ? 'alt' : el.tagName === 'META' ? 'content' : 'aria-label';
      let saved = attributes.get(el); const current = el.getAttribute(attr);
      if (!saved || current !== saved.last) saved = {source:current};
      let value = saved.source;
      if (language === 'en') {
        value = english(value);
        if (/[\u4e00-\u9fff]/.test(value)) {
          if (attr === 'alt') value = (el.closest('figure')?.querySelector('figcaption')?.textContent.trim() || 'Original project artwork / Chinese interface');
          else value = value.replaceAll('产品设计 · 工业设计','Product · Industrial Design').replaceAll('UI/UX 设计 · 票务','UI/UX Design · Ticketing').replaceAll('UI/UX · 产品设计','UI/UX · Product Design').replaceAll('镇岳','Zhenyue').replaceAll('颜夕和','Yan Xihe').replaceAll('，查看案例',', view case study');
        }
      }
      if (current !== value) el.setAttribute(attr,value);
      saved.last = value; attributes.set(el,saved);
    });
    button.textContent = language === 'en' ? '中文' : 'EN';
    button.lang = language === 'en' ? 'zh-CN' : 'en';
    button.setAttribute('aria-label',language === 'en' ? '切换为中文' : 'Switch to English');
    button.setAttribute('title',language === 'en' ? '切换为中文' : 'Switch to English');
    observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  }
  button.addEventListener('click', () => {
    language = language === 'en' ? 'zh-CN' : 'en';
    try { localStorage.setItem('portfolio-language',language); } catch (_) {}
    const url = new URL(location.href); url.searchParams.set('lang',language === 'en' ? 'en' : 'zh');
    history.replaceState(null,'',url); apply();
    window.ScrollTrigger?.refresh();
  });
  // Persist explicit URL choices too, including navigation to another page.
  try { localStorage.setItem('portfolio-language',language); } catch (_) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
})();
