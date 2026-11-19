/* Direction C interactions: kinetic type, cursor glow, scroll reveal, filters */
(function(){
  var STATIC = location.search.indexOf('static') > -1;
  if(STATIC){ document.documentElement.classList.add('static'); }
  // Kinetic split for elements with .kin
  document.querySelectorAll('.kin').forEach(function(el){
    var text = el.textContent;
    el.textContent='';
    var i=0;
    text.split('').forEach(function(ch){
      if(ch===' '){ el.appendChild(document.createTextNode('\u00A0')); i++; return; }
      var s=document.createElement('span');
      s.textContent=ch;
      s.style.animationDelay=(0.02*i+0.1)+'s';
      el.appendChild(s); i++;
    });
  });

  // Cursor glow
  var cur=document.querySelector('.cursor');
  if(cur && matchMedia('(pointer:fine)').matches){
    window.addEventListener('pointermove',function(e){
      cur.style.transform='translate('+(e.clientX-210)+'px,'+(e.clientY-210)+'px)';
    });
  }

  // Scroll reveal
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Project card glow follow
  document.querySelectorAll('.pcard').forEach(function(c){
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect();
      c.style.setProperty('--mx',(e.clientX-r.left)+'px');
      c.style.setProperty('--my',(e.clientY-r.top)+'px');
    });
  });

  // Filters
  var f=document.getElementById('filters');
  if(f){ f.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    f.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});
    var k=b.dataset.f;
    document.querySelectorAll('[data-cat]').forEach(function(card){
      card.style.display=(k==='all'||card.dataset.cat===k)?'':'none';
    });
  });}
})();
