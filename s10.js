
(function(){
/* ===== MENU KEDAI: pesan makanan & minuman saat duduk di bar ===== */
const SP={"kd_teh":["...c..c.....","....c..c....","..kkkkkkkk..",".knnnnnnnnk.",".kwwwwwwwwkk",".kwwwwwwwwk.k",".kwwwwwwwwk.k",".kwwwwwwwwkk","..kwwwwwwk..","...kkkkkk...","............","............"],"kd_kopi":["...c..c.....","....c..c....","..kkkkkkkk..",".kNNNNNNNNk.",".kwwwwwwwwkk",".kwwwwwwwwk.k",".kwwwwwwwwk.k",".kwwwwwwwwkk","..kwwwwwwk..","...kkkkkk...","............","............"],"kd_coklat":["...c..c.....","....c..c....","..kkkkkkkk..",".kdddwwdddk.",".kppppppppkk",".kppppppppk.k",".kppppppppk.k",".kppppppppkk","..kppppppk..","...kkkkkk...","............","............"],"kd_esteh":["........r...",".......r....","..kkkkkkkk..","..kBwBBwBk..","..knnwnnnk..","..knnnnwnk..","..kwnnnnnk..","..knnnwnnk..","..knnnnnnk..","..kddddddk..","...kkkkkk...","............"],"kd_jus":["....g.......","...gg.kk....","..kkkkkkkk..","..kyYyyYyk..","..koyyyyok..","..koooyook..","..kooyoook..","..koooook...","..kooooook..","..kkkkkkkk..","............","............"],"kd_anggur":["..kkkkkkkk..","..krrrrrrk..","..krrrrrrrk.","..krrrrrrrk.","...krrrrrk..","....kkkk....",".....kk.....",".....kk.....",".....kk.....",".....kk.....","..kkkkkkkk..","............"],"kd_nasi":["...g..y.....","..Y.ooY.g...",".kkkkkkkkkk.","kwYyYsYyYswk","kwyYoYyYgYwk","kwYsyYyYoywk",".kwwwwwwwwk.","..kkkkkkkk..","............","............","............","............"],"kd_sup":["...c..c..c..","....c..c....",".kkkkkkkkkk.","kooyooYooyok","kyoogoyooyyk",".knnnnnnnnk.",".knnnnnnnnk.","..knnnnnnk..","...kkkkkk...","..kkkkkkkk..","............","............"],"kd_mie":["....N....N..",".....N..N...",".kkkkkkkkkk.","kYsYYsYYsYYk","kYYsYoYsYYsk","kswYYsYYwYYk",".kwwwwwwwwk.","..kwbwbwbk..","...kkkkkk...","............","............","............"],"kd_sate":["............","............","..kkk.kkk...",".kdnnkdnnk..","NNdnoNdnoNNN",".kdnnkdnnk..","..kkk.kkk...","............","............","............","............","............"],"kd_roti":["............","..kkkkkkkk..",".kdnnnnnndk.",".knsYYYYsnk.","knsYYyYYYsnk","knsYYYYyYsnk","knsYyYYYYsnk","knsYYYYYYsnk",".knsssssssk.",".kkkkkkkkkk.","............","............"],"kd_kue":["............","...kkkkkk...","..knnsnnnk..",".kndnnsnnnk.",".knnnndnsnk.",".knsnnnnnnk.",".kdnnnsdnnk.","..knnnnnnk..","...kkkkkk...","............","............","............"],"kd_pancake":["....kkkk....","....kYYk....","....kkkk....","..kkkkkkkk..",".knYnnYnYnk.","kdnndnnndnnk",".kYsssssssk.","knYnnYnnYnk.","kdddddddddk.",".kkkkkkkkk..","............","............"],"kd_pisang":["............","....kkkk....","..kkyYyykk..",".kyYyyyYyyk.","kyyoyyoyyYyk","kyYyyyyyyyyk",".kyoyyYoyyk.","..kkyyyykk..","....kkkk....","............","............","............"],"kd_puding":["......r.....",".....kr.....","....kkkk....","..kkddddkk..",".kdddddddsk.","kYsYYYYYYYsk","kYYYYYYYYYYk","kYYsYYYYYsYk",".kYYYYYYYYk.","..kkkkkkkk..","............","............"]};
Object.assign(PXI,SP);
const st=document.createElement('style');st.textContent='#ob .pi{width:1.5em;height:1.5em;vertical-align:middle}.kmd{opacity:.8}';document.head.appendChild(st);
/* id,nama,tab,harga,rarity,ikon,deskripsi,efek,panas */
const M=[
 ['teh','Teh Hangat','Minuman',15,1,'Teh melati hangat dari tungku kedai.','Hangat · Senang',1],
 ['esteh','Es Teh Manis','Minuman',15,1,'Dingin dan manis, pas untuk sore hari.','Segar · Senang',0],
 ['kopi','Kopi Susu','Minuman',25,2,'Kopi pekat dengan susu hangat.','Hangat · Semangat',1],
 ['coklat','Cokelat Panas','Minuman',30,2,'Kental dan manis, ditambah marshmallow.','Hangat · Senang',1],
 ['jus','Jus Jeruk','Minuman',25,2,'Jeruk segar yang diperas pagi tadi.','Segar · Senang',0],
 ['anggur','Sari Anggur','Minuman',80,4,'Sari anggur merah dari tong tua kedai.','Hangat · Senang banget',0],
 ['nasi','Nasi Goreng','Makanan',45,2,'Nasi goreng telur dengan sayuran segar.','Kenyang · Semangat',1],
 ['sup','Sup Ikan','Makanan',50,3,'Sup ikan danau yang hangat dan gurih.','Kenyang · Hangat',1],
 ['mie','Mie Rebus','Makanan',40,2,'Mie rebus berkuah dengan telur dan sawi.','Kenyang · Hangat',1],
 ['sate','Sate Ayam','Makanan',60,3,'Sate ayam bakar dengan bumbu kacang.','Kenyang · Senang',1],
 ['roti','Roti Bakar','Makanan',30,1,'Roti bakar renyah dengan mentega.','Kenyang ringan',1],
 ['kue','Kue Kering','Camilan',20,1,'Kue kering renyah dengan cokelat chip.','Senang',0],
 ['pancake','Pancake Madu','Camilan',35,2,'Tumpukan pancake dengan madu dan mentega.','Senang · Semangat',1],
 ['pisang','Pisang Goreng','Camilan',20,1,'Pisang goreng garing, masih panas.','Senang',1],
 ['puding','Puding Karamel','Camilan',30,2,'Puding lembut dengan saus karamel.','Senang banget',0]
];
const TABS=['Minuman','Makanan','Camilan'],TI={Minuman:'kd_teh',Makanan:'kd_nasi',Camilan:'kd_kue'};
let KT='Minuman',KS_='teh',KO=null;
const it=id=>M.find(a=>a[0]===id);
const ico=n=>`<span class=pi>${pxSvg('kd_'+n)}</span>`;
function render(o){o=o||{};
 const L=M.filter(a=>a[2]===KT);if(!L.some(a=>a[0]===KS_))KS_=L[0][0];const q=it(KS_);
 const tabs=TABS.map(t=>`<button class="${KT===t?'hot':''}" onclick="kmTab('${t}')"><span class=pi>${pxSvg(TI[t])}</span> ${t}</button>`).join('');
 const grid=L.map(a=>slot(a[4],`<span class=ic>${ico(a[0])}</span>`,KS_===a[0],`kmSel('${a[0]}')`,null,'🪙'+a[3])).join('');
 const can=(S.coin||0)>=q[3];
 const det=`<div class=dt><div class=big>${ico(q[0])}</div><b>${q[1]}</b><span class=str>${stars(q[4])}</span><small>${q[5]}</small><small class=kmd>${q[6]}</small><hr><div class=ba><button class=hot onclick="kmOrder('${q[0]}')"><span>Pesan</span><span class=pr>🪙${q[3]}</span></button></div>${can?'':'<small>Koin belum cukup</small>'}</div>`;
 P(`<div class=hd id=kdmk><b>Menu Kedai Lentera</b> <span class=cn>🪙 ${S.coin||0}</span> <button onclick="kmLagu()">Lagu</button><div class=tabs>${tabs}</div></div><div class=fx><div class=gd><div class=gi>${grid}</div></div><div class=pvw>${det}</div></div>`);
 kdPost(o)}
window.kdMenu=function(){if(!S.kd)return;if(KO){toast('Pesananmu sedang disiapkan…');return}const m=$('m');render(m.style.display==='block'&&m.querySelector('#kdmk')&&!m.classList.contains('kdout')?{}:{open:1})};
window.kmTab=t=>{KT=t;render({})};window.kmSel=id=>{KS_=id;render({})};
window.kmOrder=function(id){const q=it(id);if(!q||KO)return;
 if((S.coin||0)<q[3])return toast('Koin kurang 🪙 Butuh '+q[3]);
 S.coin-=q[3];S.kdn=(S.kdn||0)+1;save();coinUp();kmClose();
 const Z=ch.sit&&SEAT[ch.sit];KO={id,ph:0,t:0,x:Z?Z.x+(Z.x>1000?-170:170):Math.min(1200,Math.max(520,ch.x+70))};
 if(window.kdBT){kdBT.pose='menulis';kdBT.wait=2600;kdBT.tx=kdBT.x}
 toast('Pesanan: '+q[1]+' · mohon tunggu…')};
/* gambar pesanan di meja bar + animasi makan */
window.kdDraw=function(t,dt){if(!KO)return;const q=it(KO.id);if(!q){KO=null;return}KO.t+=dt;
 if(KO.ph===0&&KO.t>2200){KO.ph=1;sfx('hub');toast(q[1]+' sudah datang!')}
 if(KO.ph===1&&KO.t>3200){KO.ph=2;ch.pose='teh';T.cook=3400;sfx('bite')}
 if(KO.ph===2&&KO.t>6600){T.happy=6000;if(q[7])T.warm=60000;if(q[2]==='Makanan')T.buff=90000;
  toast(q[1]+': nikmat! '+q[6]);save();KO=null;return}
 if(KO.ph<1)return;
 const c=pxCan('kd_'+q[0]),s=10,w=12*s,x=KO.x-w/2,yb=668,dp=Math.min(1,(KO.t-2200)/300),dy=(1-dp)*-60;
 g.save();g.imageSmoothingEnabled=false;
 g.fillStyle='rgba(30,18,24,.35)';g.fillRect(x+10,yb-5,w-20,8);
 const p=KO.ph===2?Math.min(1,(KO.t-3200)/3000):0,sy=Math.floor(p*9);
 g.drawImage(c,0,sy,12,12-sy,x,yb-w+sy*s+dy,w,(12-sy)*s);
 if(q[7]&&p<.9){for(let i=0;i<3;i++){const u=((t/900+i/3)%1);g.fillStyle=`rgba(255,248,236,${.55*(1-u)})`;g.fillRect(x+34+i*22+Math.sin(t/300+i)*4,yb-w-6-u*50+dy+sy*s,10,10)}}
 g.restore()};
/* ===== transisi halus menu kedai ===== */
let CT=0,IT=0,AT=0;
function kdPost(o){$('m').classList.add('wide')}
window.kmClose=()=>X();
window.kmLagu=()=>{X();ACT.gramofon()};
/* tunggu animasi duduk selesai + jeda sebentar, baru menu naik pelan */
window.kdAuto=k=>{clearInterval(AT);const t0=performance.now();let ok=0;
 AT=setInterval(()=>{const n=performance.now(),m=$('m');
  if(ch.sit!==k||!S.kd||n-t0>4000){clearInterval(AT);return}
  if(ch.sb<.98)return;if(!ok)ok=n;if(n-ok<380)return;clearInterval(AT);
  if(m.style.display==='block'&&!m.querySelector('#kdmk'))return;kdMenu()},60)};
const sk=document.createElement('style');sk.textContent=`
#m.kdin{animation:kdIn .5s cubic-bezier(.2,.8,.2,1) backwards;transform-origin:50% 100%;will-change:transform,opacity}
#m.kdout{animation:kdOut .28s cubic-bezier(.5,0,.9,.5) both;transform-origin:50% 100%}
@keyframes kdIn{from{opacity:0;transform:translateY(26px) scale(.96)}60%{opacity:1}}
@keyframes kdOut{to{opacity:0;transform:translateY(16px) scale(.97)}}
@keyframes kdUp{from{opacity:0;transform:translateY(12px)}}
@keyframes kdPop{from{opacity:0;transform:translateY(10px) scale(.86)}}
#m.kdst .hd{animation:kdUp .5s cubic-bezier(.2,.8,.2,1) .08s backwards}
#m.kdst .pvw{animation:kdUp .5s cubic-bezier(.2,.8,.2,1) .18s backwards}
#m.kdst .sl{animation:kdPop .42s cubic-bezier(.2,.9,.3,1.15) calc(.16s + var(--i,0)*30ms) backwards}
#joy,#ab,#ac{transition:opacity .3s ease,visibility 0s linear 0s}
#w:has(#m[style*="display: block"]:not(.kdout)) :is(#joy,#ab,#ac){opacity:0;transition:opacity .3s ease,visibility 0s linear .3s}
#w:has(#m.kdout) :is(#joy,#ab,#ac){visibility:visible}
@media (prefers-reduced-motion:reduce){#m.kdin,#m.kdout,#m.kdst .hd,#m.kdst .pvw,#m.kdst .sl{animation-duration:.01s!important;animation-delay:0s!important}}`;
document.head.appendChild(sk);
/* tombol Pesan (muncul saat duduk di bar) */
const ob=$('ob');ob.innerHTML=`<span class=pi>${pxSvg('kd_teh')}</span> Pesan`;ob.onclick=()=>kdMenu();
setInterval(()=>{if(!S.kd){KO=null}const on=S.kd&&/^kdbangku/.test(ch.sit||'')&&ch.sb>.9&&!KO;ob.style.display=on?'inline-block':'none'},250);
const ex=Kedai.exit;Kedai.exit=function(){KO=null;ob.style.display='none';return ex.apply(this,arguments)};
})();
