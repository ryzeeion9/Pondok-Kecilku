
(function(){
const mb=document.getElementById('mb'),mn=document.getElementById('menu');
const set=o=>{mn.classList.toggle('open',o);mb.classList.toggle('on',o);mb.setAttribute('aria-expanded',o)};
mb.addEventListener('click',e=>{e.stopPropagation();set(!mn.classList.contains('open'))});
/* pilih fitur -> menu menutup, panel fitur terbuka */
mn.addEventListener('click',e=>{if(e.target.closest('button'))setTimeout(()=>set(false),0)});
/* ketuk di luar menu -> tutup */
document.addEventListener('pointerdown',e=>{if(mn.classList.contains('open')&&!mn.contains(e.target)&&!mb.contains(e.target))set(false)},true);
})();
