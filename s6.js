
/* ===== Album foto: masuk dari mode foto, dikelola lewat Meja tulis (catatan) ===== */
(function(){
const $=i=>document.getElementById(i),E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
Object.assign(PXI,{cam:["...kkkk.....","kkkkkkkkkkkk","kccckkkkccok","kcckBBBBkcck","kcckBwBBkcck","kcckBBBBkcck","kccckkkkccck","kcccccccccck","kkkkkkkkkkkk"]});
const KS=' onkeydown="event.stopPropagation()" onkeyup="event.stopPropagation()"',LK='pondok_albums';
const aLd=()=>{try{const a=JSON.parse(localStorage.getItem(LK));return Array.isArray(a)?a.filter(x=>typeof x==='string'):[]}catch(e){return[]}};
const aSv=a=>{try{localStorage.setItem(LK,JSON.stringify(a))}catch(e){}};
const DB=()=>new Promise((ok,no)=>{const r=indexedDB.open('pondok_album',1);r.onupgradeneeded=()=>r.result.createObjectStore('ph',{keyPath:'id'});r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const tx=(m,f)=>DB().then(d=>new Promise((ok,no)=>{const t=d.transaction('ph',m),r=f(t.objectStore('ph'));t.oncomplete=()=>{ok(r&&r.result);d.close()};t.onerror=t.onabort=()=>{no(t.error);d.close()}}));
const put=a=>tx('readwrite',s=>{[].concat(a).forEach(p=>s.put(p))});
let ph=[],sel=-1,cd=0;
const load=()=>tx('readonly',s=>s.getAll()).then(r=>{ph=(r||[]).sort((a,b)=>b.t-a.t)});
function small(b){return new Promise((ok,no)=>{const u=URL.createObjectURL(b),i=new Image();i.onload=()=>{const k=Math.min(1,960/i.width),c=document.createElement('canvas');c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);c.getContext('2d').drawImage(i,0,0,c.width,c.height);URL.revokeObjectURL(u);ok(c.toDataURL('image/jpeg',.82))};i.onerror=no;i.src=u})}
const ic=n=>'<span class=pi>'+pxSvg(n)+'</span>',head=(t,b)=>`<div class=hd><button onclick="${b}">↩ Kembali</button><b>${t}</b></div>`;
const pvb=document.querySelector('#pv .pvb'),pvd=$('pvd');
if(pvb&&pvd){const b=document.createElement('button');b.id='pvA';b.innerHTML=ic('cam')+'Masuk album';pvd.after(b);b.onclick=()=>pick(window.camBlob&&window.camBlob())}
function pick(b){
 if(!b)return;const pv=$('pv');let d=$('pva');if(d)d.remove();d=document.createElement('div');d.id='pva';
 d.style.cssText='position:absolute;inset:0;z-index:3;background:rgba(18,13,24,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:10px;overflow:auto;text-align:center';
 const A=aLd();
 d.innerHTML='<b>Masukkan ke album</b><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:92%">'+A.map((n,i)=>`<button data-i="${i}">${E(n)}</button>`).join('')+'<button data-i="-1">Tanpa album</button></div><div style="display:flex;gap:6px"><input id=pvan maxlength=24 placeholder="Album baru"'+KS+'><button id=pvak>+ Buat & simpan</button></div><button id=pvax>Batal</button>';
 pv.appendChild(d);
 const fin=async al=>{try{const img=await small(b),t=Date.now();await put({id:t,t,cap:'',al:al||'',img});d.remove();$('pvn').textContent='Tersimpan di album'+(al?': '+al:'')+'. Lihat di Meja tulis › Album foto.';toast('Masuk album'+(al?': '+al:''))}catch(e){toast('Gagal menyimpan ke album')}};
 d.querySelectorAll('button[data-i]').forEach(x=>x.onclick=()=>{const i=+x.dataset.i;fin(i<0?'':A[i])});
 $('pvak').onclick=()=>{const v=$('pvan').value.trim().slice(0,24);if(!v)return toast('Tulis nama album dulu');const a=aLd();if(!a.includes(v)){a.push(v);aSv(a)}fin(v)};
 $('pvax').onclick=()=>d.remove()}
window.alb=async function(){try{await load()}catch(e){ph=[];toast('Album tidak bisa dibuka di browser ini')}alG()};
window.alG=function(){
 const A=aLd();if(sel>=A.length)sel=-1;cd=0;const L=sel<0?ph:ph.filter(p=>p.al===A[sel]);
 const bs='margin:0;padding:3px 8px;font-size:12px;line-height:1.3;min-height:0';
 const tab=(i,n,c)=>`<button class="${sel===i?'hot':''}" style="${bs}" onclick="alS(${i})">${E(n)} (${c})</button>`;
 const pg='min-width:0;min-height:0;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:#fdf3e1;border:2px solid var(--ink);';
 P(head(ic('cam')+' Album foto',"ACT.meja()")+`<div class=bd style="text-align:left"><div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:minmax(0,1fr);padding:6px;background:#7a4a2a;border:4px solid var(--ink);border-radius:10px;height:clamp(220px,62vh,500px);box-shadow:0 4px 0 var(--ink)">
<div style="${pg}padding:10px 14px 10px 10px;border-radius:6px 0 0 6px;box-shadow:inset -16px 0 14px -12px rgba(58,37,53,.4)"><div style="flex:1;min-height:0;overflow:auto"><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:6px;align-content:start">${L.map(p=>`<div onclick="alV(${p.id})" style="cursor:pointer;border:3px solid var(--ink);border-radius:6px;overflow:hidden;background:#000"><img src="${p.img}" alt="" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover">${p.cap?`<small style="display:block;padding:2px 4px;background:var(--pn);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${E(p.cap)}</small>`:''}</div>`).join('')||'<small style="grid-column:1/-1;line-height:1.5">Belum ada foto. Ambil foto lewat tombol kamera, lalu pilih Masuk album.</small>'}</div></div></div>
<div style="${pg}padding:10px 10px 10px 14px;border-left:0;border-radius:0 6px 6px 0;box-shadow:inset 16px 0 14px -12px rgba(58,37,53,.4)"><div style="flex:1;min-height:0;overflow:auto;display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start;padding:2px 2px 6px">${tab(-1,'Semua',ph.length)}${A.map((n,i)=>tab(i,n,ph.filter(p=>p.al===n).length)).join('')}</div>
<div style="flex:none;border-top:2px solid var(--ink);padding-top:6px"><input id=aln maxlength=24 placeholder="Nama album" style="width:100%;box-sizing:border-box;margin:0 0 6px;font-size:13px"${KS}><div style="display:flex;flex-wrap:wrap;gap:6px"><button style="${bs}" onclick="alN(0)">+ Album baru</button>${sel>=0?`<button style="${bs}" onclick="alN(1)">Ganti nama</button><button style="${bs}" onclick="alD()">Hapus album</button>`:''}</div></div></div>
</div></div>`);
 $('m').classList.add('wide')};
window.alS=i=>{sel=i;alG()};
window.alN=async function(r){const v=$('aln').value.trim().slice(0,24);if(!v)return toast('Tulis nama album dulu');const A=aLd();if(A.includes(v))return toast('Nama album sudah ada');
 if(r&&sel>=0){const o=A[sel],L=ph.filter(p=>p.al===o);A[sel]=v;L.forEach(p=>p.al=v);aSv(A);try{await put(L)}catch(e){}}else{A.push(v);sel=A.length-1;aSv(A)}alG()};
window.alD=async function(){if(!cd){cd=1;setTimeout(()=>cd=0,3000);return toast('Tekan lagi untuk hapus album (fotonya tetap ada)')}
 const A=aLd(),o=A[sel];if(o==null)return;const L=ph.filter(p=>p.al===o);L.forEach(p=>p.al='');A.splice(sel,1);aSv(A);sel=-1;try{await put(L)}catch(e){}alG()};
window.alV=function(id){const p=ph.find(x=>x.id===id);if(!p)return alG();const A=aLd();cd=0;
 P(head('Foto',"alG()")+`<div class=bd style="text-align:left"><img src="${p.img}" alt="" style="display:block;max-width:100%;max-height:44vh;margin:0 auto 6px;border:3px solid var(--ink);border-radius:6px;background:#000"><small>${new Date(p.t).toLocaleString('id-ID')}</small>
<input id=alc maxlength=60 value="${E(p.cap)}" placeholder="Keterangan foto" style="width:100%;box-sizing:border-box;margin:4px 0"${KS}><b>Album:</b><div style="display:flex;flex-wrap:wrap;gap:4px;margin:4px 0"><button class="${p.al===''?'hot':''}" onclick="alM(${id},-1)">Tanpa album</button>${A.map((n,i)=>`<button class="${p.al===n?'hot':''}" onclick="alM(${id},${i})">${E(n)}</button>`).join('')}</div>
<div><button onclick="alC(${id})">Simpan keterangan</button><button onclick="alU(${id})">Unduh</button><button onclick="alX(${id})">Hapus foto</button></div></div>`);
 $('m').classList.add('wide')};
window.alM=async function(id,i){const p=ph.find(x=>x.id===id),A=aLd();if(!p)return;p.al=i<0?'':A[i];try{await put(p)}catch(e){}alV(id)};
window.alC=async function(id){const p=ph.find(x=>x.id===id);if(!p)return;p.cap=$('alc').value.trim().slice(0,60);try{await put(p);toast('Keterangan disimpan')}catch(e){toast('Gagal menyimpan')}};
window.alU=function(id){const p=ph.find(x=>x.id===id);if(!p)return;const a=document.createElement('a');a.href=p.img;a.download='pondok-kecilku-'+id+'.jpg';document.body.appendChild(a);a.click();a.remove()};
window.alX=async function(id){if(!cd){cd=1;setTimeout(()=>cd=0,3000);return toast('Tekan lagi untuk hapus foto')}
 try{await tx('readwrite',s=>s.delete(id));ph=ph.filter(x=>x.id!==id)}catch(e){toast('Gagal menghapus')}alG()};
})();
