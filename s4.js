
(function(){
const $=i=>document.getElementById(i),w=$('w'),cv=$('c'),ph=$('ph'),pv=$('pv'),pvi=$('pvi'),pvn=$('pvn');
let on=false,hid=false,blob=null,url=null,name='',hk=0,keep=0,lt=0,lx=0,ly=0;
const typing=e=>e.target&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
const hint=t=>{ph.textContent=t;ph.style.opacity=1;clearTimeout(hk);hk=setTimeout(()=>ph.style.opacity=0,2200)};
function enter(){
 if(on)return;on=true;hid=false;
 $('m').style.display='none';
 $('menu').classList.remove('open');$('mb').classList.remove('on');$('mb').setAttribute('aria-expanded','false');
 w.classList.add('ph');w.classList.remove('ph2');
 /* cegah karakter "AFK" pindah sendiri saat lagi pose foto */
 keep=setInterval(()=>window.dispatchEvent(new Event('wheel')),20000);
}
function closePv(){pv.classList.remove('on')}
function leave(){if(!on)return;on=false;zoomTo(1);hid=false;closePv();w.classList.remove('ph','ph2');clearInterval(keep);ph.style.opacity=0}
function hide(){if(!on)return;hid=true;w.classList.add('ph2');hint('Ketuk 2× layar untuk memunculkan panel')}
function show(){hid=false;w.classList.remove('ph2');ph.style.opacity=0}
function shot(){
 const fl=$('pfl');fl.style.transition='none';fl.style.opacity=.9;
 requestAnimationFrame(()=>{fl.style.transition='opacity .35s';fl.style.opacity=0});
 try{
  cv.toBlob(b=>{
   if(!b){hint('Gagal mengambil foto');return}
   if(url)URL.revokeObjectURL(url);
   blob=b;url=URL.createObjectURL(b);
   const d=new Date(),p=n=>String(n).padStart(2,'0');
   name='pondok-kecilku-'+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds())+'.png';
   pvi.src=url;pvn.textContent='Tahan gambar untuk menyimpan, atau tekan Simpan.';
   let can=false;try{can=!!(navigator.canShare&&navigator.canShare({files:[new File([b],name,{type:'image/png'})]}))}catch(e){}
   $('pvs').style.display=can?'':'none';
   pv.classList.add('on');
  },'image/png');
 }catch(e){hint('Gagal mengambil foto')}
}
function dl(){
 if(!blob)return;
 const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
 pvn.textContent='Foto diunduh. Kalau tidak muncul, tahan gambar lalu simpan.';
}
async function share(){
 if(!blob)return;
 try{await navigator.share({files:[new File([blob],name,{type:'image/png'})],title:'Pondok Kecilku'})}
 catch(e){if(!e||e.name!=='AbortError')dl()}
}
$('cam').addEventListener('click',enter);
window.camHint=()=>{if(on)hint('Zoom '+UZ.t.toFixed(1).replace('.',',')+'×')};
window.camSync=()=>{const b=$('pgy');b.dataset.l=CS.m==='goyang'?'Goyang':'Stabil';b.classList.toggle('hot',CS.m==='goyang')};camSync();
window.camMsg=t=>{if(on)hint(t)};
$('pct').onclick=()=>{panReset();hint('Kamera kembali ke karakter')};
$('pzi').onclick=()=>zoomBy(1.3);$('pzo').onclick=()=>zoomBy(1/1.3);
$('pgy').onclick=()=>{camMode(CS.m==='goyang'?'datar':'goyang');hint(CS.m==='goyang'?'Kamera goyang POV':'Kamera stabil')};
$('pshot').onclick=shot;$('phide').onclick=hide;$('pexit').onclick=leave;
$('pvc').onclick=closePv;$('pvd').onclick=dl;$('pvs').onclick=share;window.camBlob=()=>blob;
/* GUI tersembunyi: ketuk biasa diabaikan, ketuk 2x memunculkan panel */
w.addEventListener('pointerdown',e=>{
 if(!on||!hid)return;
 if(e.timeStamp-lt<380&&Math.hypot(e.clientX-lx,e.clientY-ly)<50){show();lt=0}else{lt=e.timeStamp;lx=e.clientX;ly=e.clientY}
},true);
addEventListener('keydown',e=>{
 if(typing(e)||e.ctrlKey||e.metaKey||e.altKey)return;
 const k=e.key.toLowerCase(),pvOn=pv.classList.contains('on');
 if(k==='escape'){if(pvOn)closePv();else if(on){hid?show():leave()}}
 else if(k==='p'){if(!pvOn)on?leave():enter()}
 else if(k==='h'&&on&&!pvOn){hid?show():hide()}
});
})();
