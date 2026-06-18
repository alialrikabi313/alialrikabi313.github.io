/* Shared behaviour: language toggle (persisted) + scroll reveal + year */
(function(){
  var root = document.documentElement;
  var saved = null;
  try{ saved = localStorage.getItem('lang'); }catch(e){}
  if(saved === 'en' || saved === 'ar'){
    applyLang(saved);
  } else {
    // No saved preference: respect the visitor's browser language.
    // Arabic browsers keep the Arabic default; everyone else starts in English.
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if(nav && nav.indexOf('ar') !== 0){ applyLang('en'); }
  }

  function applyLang(next){
    root.setAttribute('data-lang', next);
    root.setAttribute('lang', next);
    root.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
    var btn = document.getElementById('langBtn');
    if(btn) btn.textContent = next === 'ar' ? 'EN' : 'ع';
    try{ localStorage.setItem('lang', next); }catch(e){}
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('#langBtn');
    if(!btn) return;
    var next = root.getAttribute('data-lang') === 'ar' ? 'en' : 'ar';
    applyLang(next);
  });

  // current year
  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  // scroll reveal
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{threshold:.12});
  els.forEach(function(el){ io.observe(el); });
})();
