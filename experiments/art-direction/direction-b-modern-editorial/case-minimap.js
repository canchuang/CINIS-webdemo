/* Chapter thumbnails and reading position; shared by all case studies. */
(() => {
const catalog = {"cinis": [{"id": "case-cover", "zh": "作品封面", "en": "Project cover", "image": "assets/char-traveler.png"}, {"id": "ov", "zh": "项目概述", "en": "Overview", "image": null}, {"id": "bg", "zh": "背景与问题", "en": "Background & Problem", "image": null}, {"id": "goal", "zh": "设计目标", "en": "Design Goals", "image": null}, {"id": "research", "zh": "研究依据", "en": "Research Basis", "image": null}, {"id": "strategy", "zh": "产品策略 · 三模式", "en": "Strategy · Three Modes", "image": "assets/char-traveler.png"}, {"id": "chapter-extra-1", "zh": "失败分支", "en": "Failure Branches", "image": "assets/screen-terminal.png"}, {"id": "ia", "zh": "信息架构", "en": "Information Architecture", "image": null}, {"id": "flow", "zh": "核心流程", "en": "Core Flow", "image": "assets/screen-today.png"}, {"id": "interact", "zh": "关键交互 · 魂火成长", "en": "Key Interactions · Soulflame", "image": "assets/growth-scene.png"}, {"id": "visual", "zh": "视觉系统", "en": "Visual System", "image": null}, {"id": "ui", "zh": "最终界面", "en": "Final UI", "image": "assets/screen-today.png"}, {"id": "chapter-extra-2", "zh": "原型体验", "en": "Prototype", "image": null}, {"id": "reflect", "zh": "反思", "en": "Reflection", "image": null}], "pes": [{"id": "case-cover", "zh": "作品封面", "en": "Project cover", "image": "assets/pes/render-hero.jpg"}, {"id": "ov", "zh": "项目概述", "en": "Overview", "image": null}, {"id": "bg", "zh": "背景与问题", "en": "Background & Problem", "image": null}, {"id": "users", "zh": "用户与场景", "en": "Users & Scenarios", "image": "assets/pes/scenario.jpg"}, {"id": "goal", "zh": "设计目标", "en": "Design Goals", "image": null}, {"id": "concept", "zh": "方案推演", "en": "Concept", "image": null}, {"id": "structure", "zh": "结构与模块", "en": "Structure & Modules", "image": "assets/pes/exploded.jpg"}, {"id": "ports", "zh": "接口与补能", "en": "Ports & Replenishment", "image": "assets/pes/interface.jpg"}, {"id": "flow", "zh": "使用流程", "en": "Workflow", "image": "assets/pes/workflow.jpg"}, {"id": "cmf", "zh": "CMF 与细节", "en": "CMF & Details", "image": "assets/pes/details.jpg"}, {"id": "final", "zh": "最终方案", "en": "Final Board", "image": "assets/pes/board-01.jpg"}, {"id": "reflect", "zh": "说明与反思", "en": "Notes & Reflection", "image": null}], "mova": [{"id": "case-cover", "zh": "作品封面", "en": "Project cover", "image": "assets/mova/09-seat-select.png"}, {"id": "ov", "zh": "项目概述", "en": "Overview", "image": null}, {"id": "bg", "zh": "背景与研究", "en": "Background & Research", "image": null}, {"id": "interview", "zh": "访谈发现", "en": "Interview Findings", "image": null}, {"id": "comp", "zh": "竞品与设计机会", "en": "Competitors & Opportunity", "image": null}, {"id": "pos", "zh": "产品定位", "en": "Positioning", "image": null}, {"id": "ia", "zh": "信息架构", "en": "Information Architecture", "image": null}, {"id": "flow", "zh": "用户流程", "en": "User Flow", "image": null}, {"id": "detail", "zh": "影片详情", "en": "Movie Detail", "image": "assets/mova/04-movie-about.png"}, {"id": "sessions", "zh": "筛选场次", "en": "Sessions", "image": "assets/mova/06-sessions-by-time.png"}, {"id": "seat", "zh": "选座交互", "en": "Seat Selection", "image": "assets/mova/08-seat-overview.png"}, {"id": "pay", "zh": "确认订单 · 支付 · 电子票", "en": "Checkout · Payment · E-Ticket", "image": "assets/mova/11-checkout.png"}, {"id": "spec", "zh": "视觉规范", "en": "Visual System", "image": null}, {"id": "proto", "zh": "交互原型", "en": "Interactive Prototype", "image": null}, {"id": "reflect", "zh": "总结", "en": "Reflection", "image": null}]};
  const main = document.querySelector('main.cs');
  const chapters = (catalog[document.body.dataset.page] || []).map(c=>({...c,target:document.getElementById(c.id)})).filter(c=>c.target);
  if(!main || !chapters.length)return;
  document.body.classList.add('has-case-map');
  const el=(tag,cls)=>{const n=document.createElement(tag);n.className=cls;return n;};
  const root=el('aside','case-map'),panel=el('div','case-map-panel'),nav=el('nav','case-map-list');panel.id='case-map-panel';
  const toggle=el('button','case-map-toggle');toggle.type='button';toggle.setAttribute('aria-controls',panel.id);
  const icon=el('span','case-map-icon');icon.textContent='▤';icon.setAttribute('aria-hidden','true');
  const counter=el('span','case-map-toggle-text');toggle.append(icon,counter);panel.append(nav);root.append(panel,toggle);document.body.append(root);
  const selection=el('span','case-map-selection');selection.setAttribute('aria-hidden','true');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),desktop=matchMedia('(min-width:1280px)');
  let active=0,expanded=desktop.matches,raf=0,manualUntil=0,pending=null,drag=null,dragFrame=0,suppressClick=0,previewTimer=0,hideTimer=0;
  let holdTimer=0,inertiaFrame=0,browsing=false,selectionMade=false,programmaticNavUntil=0,outsidePointer=null,outsideTouch=null;
  let box={x:0,y:0,width:0,height:0};
  const english=()=>document.documentElement.lang==='en';
  const title=c=>english()?c.en:c.zh;
  const links=chapters.map((c,i)=>{
    const link=el('a','case-map-item');link.href='#'+c.id;link.draggable=false;
    const thumb=el('span','case-map-thumb');thumb.setAttribute('aria-hidden','true');
    link.append(thumb);nav.append(link);
    link.addEventListener('click',event=>{
      if(event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
      event.preventDefault();if(performance.now()<suppressClick)return;navigate(i);
    });
    return link;
  });
  panel.append(selection);
  function label(i){
    counter.textContent=String(i+1).padStart(2,'0')+'/'+String(chapters.length).padStart(2,'0');
    toggle.setAttribute('aria-label',(english()?'Chapter preview, current: ':'章节预览，当前：')+title(chapters[i]));
  }
  function position(i,freeY){
    if(!expanded)return;
    const n=panel.getBoundingClientRect(),t=links[i].querySelector('.case-map-thumb').getBoundingClientRect();
    box={x:t.left-n.left-4,y:freeY??(t.top-n.top-4),width:t.width+8,height:t.height+8};
    selection.style.width=box.width+'px';selection.style.height=box.height+'px';
    selection.style.transform='translate3d('+box.x+'px,'+box.y+'px,0)';
  }
  function follow(i){
    if(!expanded||browsing||performance.now()<manualUntil)return;
    const link=links[i],top=link.offsetTop;
    if(top<nav.scrollTop+5||top+link.offsetHeight>nav.scrollTop+nav.clientHeight-5){programmaticNavUntil=performance.now()+100;nav.scrollTop=Math.max(0,top-nav.clientHeight/2+link.offsetHeight/2);}
  }
  function show(i){label(i);follow(i);position(i);}
  function localize(){
    nav.setAttribute('aria-label',english()?'Case study chapters':'作品章节预览');
    toggle.title=english()?'Expand or collapse chapter preview':'展开或收起章节预览';
    chapters.forEach((c,i)=>{links[i].title=title(c);links[i].setAttribute('aria-label',(i+1)+' / '+chapters.length+' · '+title(c));});
    label(pending?.index??active);queuePreviews();
  }
  // Scaled copies of the actual chapter markup, including its headings, text and layout.
  // No placeholder cards, screenshot service, iframe or external rendering dependency.
  function renderPreviews(){
    if(!expanded)return;
    const width=main.clientWidth;
    chapters.forEach((c,i)=>{
      const thumb=links[i].querySelector('.case-map-thumb');
      const preview=el('div','case-map-preview '+main.className.replace('page-fade',''));
      preview.setAttribute('inert','');preview.setAttribute('aria-hidden','true');
      const body=c.target.classList.contains('cs-cover')?preview:el('div','cs-body');
      const start=c.target.getBoundingClientRect().top;
      const scale=thumb.clientWidth/width;
      let node=c.target;
      while(node){
        if(node!==c.target&&(node.classList.contains('cs-marker')||node.classList.contains('next-work')))break;
        const copy=node.cloneNode(true);
        copy.removeAttribute('id');copy.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
        copy.querySelectorAll('script,canvas,.inner-aurora-layer').forEach(n=>n.remove());
        copy.querySelectorAll('.rv,.split').forEach(n=>n.classList.add('in'));
        body.append(copy);
        if(c.target.classList.contains('cs-cover')||node.getBoundingClientRect().bottom-start>thumb.clientHeight/Math.max(scale,.01))break;
        node=node.nextElementSibling;
      }
      if(body!==preview)preview.append(body);
      preview.style.width=width+'px';preview.style.transform='scale('+scale+')';
      thumb.replaceChildren(preview);
    });
    if(!browsing&&!drag)position(pending?.index??active);
  }
  function queuePreviews(){clearTimeout(previewTimer);previewTimer=setTimeout(renderPreviews,80);}
  function setExpanded(value){
    clearTimeout(hideTimer);clearTimeout(holdTimer);cancelAnimationFrame(inertiaFrame);
    expanded=value;
    if(value){selectionMade=false;browsing=false;manualUntil=0;root.classList.remove('is-browsing');}
    toggle.setAttribute('aria-expanded',String(value));
    panel.setAttribute('aria-hidden',String(!value));panel.inert=!value;
    if(value){
      panel.hidden=false;
      // Establish the small surface first, then let the same surface grow upward.
      root.getBoundingClientRect();root.classList.add('is-open');
      renderPreviews();root.style.setProperty('--map-height',(nav.getBoundingClientRect().height+46)+'px');
      show(pending?.index??active);schedule();
    }else{
      root.classList.remove('is-open');
      if(reduce.matches)panel.hidden=true;
      else hideTimer=setTimeout(()=>{if(!expanded)panel.hidden=true;},370);
    }
  }
  function navigate(index){
    clearTimeout(holdTimer);cancelAnimationFrame(inertiaFrame);manualUntil=0;browsing=false;selectionMade=true;root.classList.remove('is-browsing');
    pending={index,until:performance.now()+2000};show(index);
    const target=chapters[index].target,offset=(document.querySelector('.site-nav')?.getBoundingClientRect().height||76)+20;
    target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    const url=new URL(location.href);url.hash=target.id;history.pushState(null,'',url);
    window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-offset),behavior:reduce.matches?'instant':'smooth'});
    schedule();
  }
  function update(){
    raf=0;const offset=(document.querySelector('.site-nav')?.getBoundingClientRect().height||76)+24;
    let index=0;chapters.forEach((c,i)=>{if(c.target.getBoundingClientRect().top<=offset)index=i;});
    const changed=active!==index;active=index;
    links.forEach((n,i)=>{if(i===active)n.setAttribute('aria-current','location');else n.removeAttribute('aria-current');});
    if(pending&&(pending.index===active||performance.now()>pending.until))pending=null;
    if(!drag&&!browsing&&(changed||pending))show(pending?.index??active);
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(update);}
  function nearest(y){let best=0,distance=Infinity;links.forEach((n,i)=>{const d=Math.abs(n.offsetTop+n.offsetHeight/2-y);if(d<distance){distance=d;best=i;}});return best;}
  function showLiveChapter(index){
    const target=chapters[index].target,offset=(document.querySelector('.site-nav')?.getBoundingClientRect().height||76)+20;
    pending=null;selectionMade=true;
    // Live scrubbing must not trail the finger behind a smooth-scroll animation.
    window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-offset),behavior:'instant'});
    active=index;links.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  }
  function dragTick(){
    dragFrame=0;if(drag?.mode!=='scrub')return;
    const r=nav.getBoundingClientRect(),p=panel.getBoundingClientRect(),local=drag.y-r.top;
    const edge=local<28?-Math.min(10,(28-local)/3):local>r.height-28?Math.min(10,(local-r.height+28)/3):0;
    if(edge)nav.scrollTop+=edge;
    const y=Math.max(r.top-p.top+1,Math.min(r.bottom-p.top-box.height-1,drag.y-p.top-box.height/2));
    const index=nearest(nav.scrollTop+local);
    if(drag.liveIndex!==index){showLiveChapter(index);drag.liveIndex=index;}
    drag.index=index;label(index);position(index,y);
    dragFrame=requestAnimationFrame(dragTick);
  }
  function beginScrub(){
    if(drag?.mode!=='pending')return;
    drag.mode='scrub';drag.liveIndex=-1;browsing=false;pending=null;
    root.classList.remove('is-browsing');root.classList.add('is-dragging');
    dragTick();
  }
  function startInertia(velocity){
    if(reduce.matches||Math.abs(velocity)<.12)return;
    let last=performance.now();
    function tick(now){
      const dt=Math.min(32,now-last);last=now;
      const before=nav.scrollTop;nav.scrollTop-=velocity*dt;
      velocity*=Math.pow(.92,dt/16);
      if(Math.abs(velocity)>.025&&Math.abs(nav.scrollTop-before)>.1)inertiaFrame=requestAnimationFrame(tick);
    }
    inertiaFrame=requestAnimationFrame(tick);
  }
  nav.addEventListener('dragstart',event=>event.preventDefault());
  nav.addEventListener('contextmenu',event=>event.preventDefault());
  nav.addEventListener('pointerdown',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    const link=event.target.closest('.case-map-item');if(!link)return;
    cancelAnimationFrame(inertiaFrame);clearTimeout(holdTimer);pending=null;
    manualUntil=Infinity;
    drag={id:event.pointerId,start:event.clientY,y:event.clientY,lastY:event.clientY,lastTime:performance.now(),velocity:0,scrollStart:nav.scrollTop,index:links.indexOf(link),mode:'pending'};
    nav.setPointerCapture(event.pointerId);
    holdTimer=setTimeout(beginScrub,360);
  });
  nav.addEventListener('pointermove',event=>{
    if(!drag||drag.id!==event.pointerId)return;
    const now=performance.now();drag.y=event.clientY;
    if(drag.mode==='pending'&&Math.abs(drag.y-drag.start)>8){
      clearTimeout(holdTimer);drag.mode='browse';browsing=true;root.classList.add('is-browsing');
    }
    if(drag.mode==='browse'){
      const delta=drag.y-drag.lastY,dt=Math.max(1,now-drag.lastTime);
      drag.velocity=drag.velocity*.3+(delta/dt)*.7;
      nav.scrollTop=drag.scrollStart-(drag.y-drag.start);
    }
    drag.lastY=drag.y;drag.lastTime=now;
  });
  function endDrag(event,cancelled){
    if(!drag||drag.id!==event.pointerId)return;
    clearTimeout(holdTimer);cancelAnimationFrame(dragFrame);dragFrame=0;
    const finished=drag;drag=null;root.classList.remove('is-dragging');
    suppressClick=performance.now()+400;
    if(nav.hasPointerCapture(event.pointerId))nav.releasePointerCapture(event.pointerId);
    if(cancelled){if(finished.mode!=='browse'){manualUntil=0;position(active);}return;}
    event.preventDefault();
    if(finished.mode==='pending'){navigate(finished.index);return;}
    if(finished.mode==='browse'){
      startInertia(performance.now()-finished.lastTime<90?finished.velocity:0);return;
    }
    // A scrub already updated the main page while held. Only settle the frame and URL here.
    browsing=false;manualUntil=0;selectionMade=true;show(finished.index);
    const url=new URL(location.href);url.hash=chapters[finished.index].id;history.pushState(null,'',url);
    chapters[finished.index].target.setAttribute('tabindex','-1');chapters[finished.index].target.focus({preventScroll:true});
  }
  nav.addEventListener('pointerup',e=>endDrag(e,false));nav.addEventListener('pointercancel',e=>endDrag(e,true));
  nav.addEventListener('wheel',()=>{clearTimeout(holdTimer);if(drag?.mode==='pending')drag.mode='browse';pending=null;browsing=true;manualUntil=Infinity;root.classList.add('is-browsing');},{passive:true});
  nav.addEventListener('scroll',()=>{
    if(!drag&&performance.now()>programmaticNavUntil){browsing=true;manualUntil=Infinity;root.classList.add('is-browsing');}
    // The frame is on the panel, outside the scrolling strip: browsing never moves it.
  },{passive:true});
  toggle.addEventListener('click',()=>setExpanded(!expanded));
  root.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded){setExpanded(false);toggle.focus();e.preventDefault();}});
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',()=>{queuePreviews();schedule();},{passive:true});
  function outsideSlide(){
    if(expanded&&selectionMade){pending=null;setExpanded(false);}
  }
  addEventListener('wheel',event=>{if(!root.contains(event.target)&&Math.abs(event.deltaY)>1)outsideSlide();},{passive:true});
  addEventListener('pointerdown',event=>{if(!root.contains(event.target))outsidePointer={id:event.pointerId,y:event.clientY};},{passive:true});
  addEventListener('pointermove',event=>{if(outsidePointer?.id===event.pointerId&&Math.abs(event.clientY-outsidePointer.y)>10)outsideSlide();},{passive:true});
  ['pointerup','pointercancel'].forEach(type=>addEventListener(type,()=>{outsidePointer=null;},{passive:true}));
  addEventListener('touchstart',event=>{outsideTouch=!root.contains(event.target)?event.touches[0]?.clientY:null;},{passive:true});
  addEventListener('touchmove',event=>{if(outsideTouch!=null&&Math.abs(event.touches[0].clientY-outsideTouch)>10)outsideSlide();},{passive:true});
  addEventListener('touchend',()=>{outsideTouch=null;},{passive:true});
  addEventListener('keydown',event=>{if(!root.contains(event.target)&&['ArrowDown','ArrowUp','PageDown','PageUp',' '].includes(event.key))outsideSlide();});
  new ResizeObserver(schedule).observe(main);
  new MutationObserver(localize).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  main.querySelectorAll('img').forEach(image=>image.addEventListener('load',()=>{queuePreviews();schedule();},{once:true}));
  desktop.addEventListener('change',()=>setExpanded(desktop.matches));
  new ResizeObserver(()=>{
    if(!expanded)return;
    const width=main.clientWidth;
    links.forEach(link=>{const thumb=link.querySelector('.case-map-thumb'),copy=thumb.firstElementChild;if(copy)copy.style.transform='scale('+(thumb.clientWidth/width)+')';});
    root.style.setProperty('--map-height',(nav.getBoundingClientRect().height+46)+'px');
    if(!drag&&!browsing)position(pending?.index??active);
  }).observe(nav);
  root.addEventListener('transitionend',e=>{if(e.target===root&&e.propertyName==='height'&&expanded){renderPreviews();if(!browsing&&!drag)position(pending?.index??active);}});
  localize();setExpanded(expanded);update();show(active);
})();
