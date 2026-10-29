(function(){
  // WHATSAPP: troque pelo número da clínica (55 + DDD + número, só dígitos). Ex.: '5511999998888'
  var WHATSAPP='55DDDNUMERO';
  var MSG='Olá, Dra. Mylene! Vim pelo site e quero agendar uma avaliação.';

  var doc=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.classList.add('js');

  // todos os botões de WhatsApp usam o mesmo número; data-msg troca a mensagem
  document.querySelectorAll('[data-wa]').forEach(function(a){
    a.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(a.dataset.msg?'Olá, Dra. Mylene! '+a.dataset.msg:MSG);
  });

  // topo
  var top=document.getElementById('top');
  function onScroll(){top.classList.toggle('scrolled',window.scrollY>30)}
  addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // menu do celular
  var burger=document.getElementById('burger'), nav=document.getElementById('nav');
  function setMenu(open){
    nav.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    document.body.style.overflow=open?'hidden':'';
  }
  burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  // elementos aparecem ao rolar, em sequência dentro do mesmo grupo
  var els=document.querySelectorAll('.reveal');
  els.forEach(function(e){
    var sib=[].filter.call(e.parentElement.children,function(c){return c.classList.contains('reveal')});
    e.style.setProperty('--d',(sib.indexOf(e)*0.08)+'s');
  });
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')});
  }else{
    var io=new IntersectionObserver(function(en){
      en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}});
    },{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e)});
  }

  // destaca no menu a seção visível
  var links={};
  nav.querySelectorAll('a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(en){
      en.forEach(function(x){var a=links[x.target.id]; if(a) a.classList.toggle('active',x.isIntersecting)});
    },{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(links).forEach(function(id){var s=document.getElementById(id); if(s) so.observe(s)});
  }

  var fine=!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches;

  // luz do hero segue o mouse
  var hero=document.getElementById('hero');
  if(fine&&hero){
    hero.addEventListener('mousemove',function(e){
      var r=hero.getBoundingClientRect();
      hero.style.setProperty('--sx',((e.clientX-r.left)/r.width*100)+'%');
      hero.style.setProperty('--sy',((e.clientY-r.top)/r.height*100)+'%');
    });
  }

  if(fine){
    // brilho dos cards segue o mouse
    document.querySelectorAll('.card').forEach(function(c){
      c.addEventListener('mousemove',function(e){
        var r=c.getBoundingClientRect();
        c.style.setProperty('--mx',(e.clientX-r.left)+'px');
        c.style.setProperty('--my',(e.clientY-r.top)+'px');
      });
    });
    // botões principais "puxados" pelo mouse
    document.querySelectorAll('.magnet').forEach(function(b){
      b.addEventListener('mousemove',function(e){
        var r=b.getBoundingClientRect();
        b.style.transform='translate('+((e.clientX-r.left-r.width/2)*0.18)+'px,'+((e.clientY-r.top-r.height/2)*0.3)+'px)';
      });
      b.addEventListener('mouseleave',function(){b.style.transform=''});
    });
  }

  // balão do WhatsApp aparece uma vez depois de alguns segundos
  var fl=document.querySelector('.float');
  if(fl){
    setTimeout(function(){fl.classList.add('tip')},4000);
    setTimeout(function(){fl.classList.remove('tip')},10000);
  }

  // FAQ: uma resposta aberta por vez
  var ds=document.querySelectorAll('.faq details');
  ds.forEach(function(d){d.addEventListener('toggle',function(){
    if(d.open) ds.forEach(function(o){if(o!==d) o.open=false});
  })});
})();
