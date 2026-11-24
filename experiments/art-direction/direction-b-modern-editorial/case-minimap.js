/* Chapter thumbnails and reading position; shared by all case studies. */
(() => {
const catalog = {"cinis": [{"id": "case-cover", "zh": "作品封面", "en": "Project cover", "image": "assets/char-traveler.png"}, {"id": "ov", "zh": "项目概述", "en": "Overview", "image": null}, {"id": "bg", "zh": "背景与问题", "en": "Background & Problem", "image": null}, {"id": "goal", "zh": "设计目标", "en": "Design Goals", "image": null}, {"id": "research", "zh": "研究依据", "en": "Research Basis", "image": null}, {"id": "strategy", "zh": "产品策略 · 三模式", "en": "Strategy · Three Modes", "image": "assets/char-traveler.png"}, {"id": "chapter-extra-1", "zh": "失败分支", "en": "Failure Branches", "image": "assets/screen-terminal.png"}, {"id": "ia", "zh": "信息架构", "en": "Information Architecture", "image": null}, {"id": "flow", "zh": "核心流程", "en": "Core Flow", "image": "assets/screen-today.png"}, {"id": "interact", "zh": "关键交互 · 魂火成长", "en": "Key Interactions · Soulflame", "image": "assets/growth-scene.png"}, {"id": "visual", "zh": "视觉系统", "en": "Visual System", "image": null}, {"id": "ui", "zh": "最终界面", "en": "Final UI", "image": "assets/screen-today.png"}, {"id": "chapter-extra-2", "zh": "原型体验", "en": "Prototype", "image": null}, {"id": "reflect", "zh": "反思", "en": "Reflection", "image": null}], "pes": [{"id": "case-cover", "zh": "作品封面", "en": "Project cover", "image": "assets/pes/render-hero.jpg"}, {"id": "ov", "zh": "项目概述", "en": "Overview", "image": null}, {"id": "bg", "zh": "背景与问题", "en": "Background & Problem", "image": null}, {"id": "users", "zh": "用户与场景", "en": "Users & Scenarios", "image": "assets/pes/scenario.jpg"}, {"id": "goal", "zh": "设计目标", "en": "Design Goals", "image": null}, {"id": "concept", "zh": "方案推演", "en": "Concept", "image": null}, {"id": "structure", "zh": "结构与模块", "en": "Structure & Modules", "image": "assets/pes/exploded.jpg"}, {"id": "ports", "zh": "接口与补能", "en": "Ports & Replenishment", "image": "assets/pes/interface.jpg"}, {"id": "flow", "zh": "使用流程", "en": "Workflow", "image": "assets/pes/workflow.jpg"}, {"id": "cmf", "zh": "CMF 与细节", "en": "CMF & Details", "image": "assets/pes/details.jpg"}, {"id": "final", "zh": "最终方案", "en": "Final Board", "image": "assets/pes/board-01.jpg"}, {"id": "reflect", "zh": "说明与反思", "en": "Notes & Reflection", "image": null}], "mova": [{"id": "case-cover", "zh": "作品封面", "en": "Project cover", "image": "assets/mova/09-seat-select.png"}, {"id": "ov", "zh": "项目概述", "en": "Overview", "image": null}, {"id": "bg", "zh": "背景与研究", "en": "Background & Research", "image": null}, {"id": "interview", "zh": "访谈发现", "en": "Interview Findings", "image": null}, {"id": "comp", "zh": "竞品与设计机会", "en": "Competitors & Opportunity", "image": null}, {"id": "pos", "zh": "产品定位", "en": "Positioning", "image": null}, {"id": "ia", "zh": "信息架构", "en": "Information Architecture", "image": null}, {"id": "flow", "zh": "用户流程", "en": "User Flow", "image": null}, {"id": "detail", "zh": "影片详情", "en": "Movie Detail", "image": "assets/mova/04-movie-about.png"}, {"id": "sessions", "zh": "筛选场次", "en": "Sessions", "image": "assets/mova/06-sessions-by-time.png"}, {"id": "seat", "zh": "选座交互", "en": "Seat Selection", "image": "assets/mova/08-seat-overview.png"}, {"id": "pay", "zh": "确认订单 · 支付 · 电子票", "en": "Checkout · Payment · E-Ticket", "image": "assets/mova/11-checkout.png"}, {"id": "spec", "zh": "视觉规范", "en": "Visual System", "image": null}, {"id": "proto", "zh": "交互原型", "en": "Interactive Prototype", "image": null}, {"id": "reflect", "zh": "总结", "en": "Reflection", "image": null}]};
  const page = document.body.dataset.page;
  const chapters = (catalog[page] || []).map(c => ({...c,target:document.getElementById(c.id)})).filter(c => c.target);
  if (!chapters.length) return;
  document.body.classList.add('has-case-map');
  const create = (tag,cls) => { const el = document.createElement(tag); el.className = cls; return el; };
  const root = create('aside','case-map');
  const panel = create('div','case-map-panel'); panel.id = 'case-map-panel';
  const heading = create('div','case-map-heading');
  const name = create('span','case-map-name');
  const count = create('span','case-map-count'); heading.append(name,count);
  const nav = create('nav','case-map-list');
  const toggle = create('button','case-map-toggle'); toggle.type = 'button';
  toggle.setAttribute('aria-controls',panel.id);
  const icon = create('span','case-map-icon'); icon.setAttribute('aria-hidden','true'); icon.textContent = '▤';
  const toggleText = create('span','case-map-toggle-text');
  const chevron = create('span','case-map-chevron'); chevron.setAttribute('aria-hidden','true'); chevron.textContent = '⌃';
  toggle.append(icon,toggleText,chevron); panel.append(heading,nav); root.append(panel,toggle); document.body.append(root);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1280px)');
  let active = -1, expanded = desktop.matches, frame = 0, manualUntil = 0, programmatic = false;
  let boundaries = [];
  const isEnglish = () => document.documentElement.lang === 'en';
  const title = c => isEnglish() ? c.en : c.zh;
  const links = chapters.map((c,i) => {
    const link = create('a','case-map-item'); link.href = '#' + c.id;
    const visual = create('span','case-map-thumb'); visual.setAttribute('aria-hidden','true');
    if (c.image) {
      const image = document.createElement('img'); image.src = c.image; image.alt = ''; image.loading = 'lazy'; image.decoding = 'async'; visual.append(image);
    } else {
      visual.classList.add('case-map-thumb-text');
      const tiny = create('span','case-map-tiny-title');
      const lines = create('span','case-map-lines');
      for (let n = 0; n < 4; n++) lines.append(create('i',''));
      visual.append(tiny,lines);
    }
    const viewport = create('span','case-map-viewport'); visual.append(viewport);
    const label = create('span','case-map-label');
    const number = create('span','case-map-number'); number.textContent = String(i+1).padStart(2,'0');
    const text = create('span','case-map-title');label.append(number,text);link.append(visual,label);nav.append(link);
    link.addEventListener('click',event => {
      if(event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const offset = (document.querySelector('.site-nav')?.getBoundingClientRect().height || 76) + 20;
      const top = Math.max(0,c.target.getBoundingClientRect().top + scrollY - offset);
      if (!desktop.matches) setExpanded(false);
      c.target.setAttribute('tabindex','-1');c.target.focus({preventScroll:true});
      const url = new URL(location.href);url.hash = c.id;history.pushState(null,'',url);
      window.scrollTo({top,behavior:reduce.matches ? 'instant' : 'smooth'});
      manualUntil = 0;
      schedule();
    });
    return link;
  });
  function setExpanded(value) {
    expanded = value;panel.hidden = !value;toggle.setAttribute('aria-expanded',String(value));root.classList.toggle('is-open',value);
    if (value) { measure();update();follow(); }
  }
  function follow() {
    if (!expanded || active < 0 || performance.now() < manualUntil) return;
    const el = links[active],top = el.offsetTop;
    if(top < nav.scrollTop || top+el.offsetHeight > nav.scrollTop+nav.clientHeight) {
      programmatic = true;
      nav.scrollTop = Math.max(0,top-nav.clientHeight/2+el.offsetHeight/2);
      programmatic = false;
    }
  }
  function localize() {
    name.textContent = isEnglish() ? 'Chapter preview' : '章节预览';
    nav.setAttribute('aria-label',isEnglish() ? 'Case study chapters' : '作品章节预览');
    chapters.forEach((c,i) => {
      const t = title(c); links[i].querySelector('.case-map-title').textContent = t;
      const tiny = links[i].querySelector('.case-map-tiny-title');if(tiny) tiny.textContent = t;
      links[i].setAttribute('aria-label',(i+1)+' / '+chapters.length+' · '+t);
      links[i].title = t;
    });
    updateLabel();measure();schedule();
  }
  function updateLabel() {
    const current = Math.max(0,active),c = chapters[current];
    const position = String(current+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');
    count.textContent = position;
    toggleText.textContent = position.replaceAll(' ', '');
    toggle.setAttribute('aria-label',(isEnglish() ? 'Chapter preview, current: ' : '章节预览，当前：')+title(c));
    toggle.title = isEnglish() ? 'Expand or collapse chapter preview' : '展开或收起章节预览';
  }
  function measure() {
    boundaries = chapters.map(c => c.target.getBoundingClientRect().top + scrollY);
  }
  function update() {
    frame = 0;
    measure(); // Account for reveal transforms, font changes and late image reflow.
    const navHeight = document.querySelector('.site-nav')?.getBoundingClientRect().height || 76;
    const line = scrollY+navHeight+24;
    let index = 0;
    for(let i = 1;i<boundaries.length;i++) if(boundaries[i]<=line) index=i;
    if(index !== active) {
      active=index;
      links.forEach((link,i)=>{link.classList.toggle('is-current',i===index);if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
      updateLabel();follow();
    }
    const end = boundaries[active+1] || (document.querySelector('.next-work')?.getBoundingClientRect().top + scrollY) || document.documentElement.scrollHeight;
    const length = Math.max(1,end-boundaries[active]);
    const size = Math.max(.1,Math.min(1,(innerHeight-navHeight)/length));
    const within = Math.max(0,Math.min(1-size,(line-boundaries[active])/length));
    const box = links[active].querySelector('.case-map-viewport');
    box.style.height = (size*100)+'%';box.style.top = (within*100)+'%';
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}
  toggle.addEventListener('click',()=>setExpanded(!expanded));
  root.addEventListener('keydown',event=>{if(event.key==='Escape'&&expanded){setExpanded(false);toggle.focus();event.preventDefault();}});
  ['wheel','touchstart','pointerdown','keydown'].forEach(type=>nav.addEventListener(type,()=>{if(!programmatic)manualUntil=performance.now()+4000;},{passive:true}));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{measure();schedule();},{passive:true});
  addEventListener('hashchange',schedule);
  new ResizeObserver(()=>{measure();schedule();}).observe(document.querySelector('main'));
  new MutationObserver(()=>{localize();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  // Captions and image dimensions can reflow after the initial document render.
  document.querySelectorAll('main img').forEach(image=>image.addEventListener('load',()=>{measure();schedule();},{once:true}));
  desktop.addEventListener('change',()=>setExpanded(desktop.matches));
  localize();setExpanded(expanded);measure();update();
})();
