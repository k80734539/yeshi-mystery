/* ---------- notebook link screen (許晴 draws lines between statements and evidence) ---------- */
(()=>{const lk=document.createElement('div');lk.id='lk';lk.innerHTML='<h2 id="lkt"></h2><div id="lkd"></div><div id="lkb"><svg id="lks"></svg><div id="lkL"></div><div id="lkR"></div></div><div id="lkc"></div><div id="lkx"></div>';document.getElementById('app').appendChild(lk)})();
function linkScreen(spec){setPor(null);hideBox();$('#bar').style.display='none';window.__lk=spec;
 return new Promise(res=>{
  const lk=$('#lk'),svg=$('#lks'),Lc=$('#lkL'),Rc=$('#lkR'),cap=$('#lkc'),X=$('#lkx');
  $('#lkt').textContent='📒 '+spec.title;$('#lkd').textContent=spec.desc||'點一張左邊的卡片，再點右邊相關的卡片，把線連起來。';
  Lc.innerHTML='';Rc.innerHTML='';cap.innerHTML='';X.innerHTML='';svg.innerHTML='';lk.style.display='flex';
  const done=new Set();let sel=null;const el={};
  const mk=(side,[id,t],box)=>{const b=document.createElement('button');b.type='button';b.className='lkn '+side;b.dataset.id=id;b.dataset.side=side;b.textContent=t;box.appendChild(b);el[id]=b;
   onTap(b,()=>tap(side,id));return b};
  spec.L.forEach(n=>mk('l',n,Lc));spec.R.forEach(n=>mk('r',n,Rc));
  const ok=document.createElement('button');ok.type='button';ok.id='lkok';ok.className='btn red';ok.textContent=spec.okText||'✔ 看清楚了';ok.style.display='none';X.appendChild(ok);
  const pt=(id,side)=>{const b=el[id].getBoundingClientRect(),w=$('#lkb').getBoundingClientRect();return [(side==='l'?b.right:b.left)-w.left,b.top+b.height/2-w.top]};
  function line(a,b,cls){const [x1,y1]=pt(a,'l'),[x2,y2]=pt(b,'r');const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M${x1},${y1} C${x1+40},${y1} ${x2-40},${y2} ${x2},${y2}`);p.setAttribute('class','lkp '+(cls||''));svg.appendChild(p);
   if(!cls&&!RM.matches&&!window.__fast){const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;void p.getBoundingClientRect();p.style.transition='stroke-dashoffset .6s ease-out';p.style.strokeDashoffset=0}return p}
  function draw(){svg.innerHTML='';(spec.old||[]).forEach(([a,b])=>{line(a,b,'old')});spec.E.forEach(([a,b])=>{if(done.has(a+'|'+b))line(a,b)})}
  function tap(side,id){SFX.tap();
   if(sel&&sel.side===side){el[sel.id].classList.remove('sel');sel=null}
   if(!sel){sel={side,id};el[id].classList.add('sel');return}
   const l=side==='l'?id:sel.id,r=side==='r'?id:sel.id;el[sel.id].classList.remove('sel');sel=null;
   const e=spec.E.find(x=>x[0]===l&&x[1]===r);
   if(!e){cap.dataset.n=(+cap.dataset.n||0)+1;const w=document.createElement('div');w.className='lkw';w.textContent='（這兩件事，連不起來。）';cap.appendChild(w);setTimeout(()=>w.remove(),1400);SFX.buzz&&0;return}
   if(done.has(l+'|'+r))return;done.add(l+'|'+r);el[l].classList.add('lnk');el[r].classList.add('lnk');SFX.get();draw();
   const c=document.createElement('div');c.className='lkg';c.textContent='✎ '+e[2];cap.appendChild(c);cap.scrollTop=cap.scrollHeight;
   if(done.size>=spec.E.length){ok.style.display='';ok.classList.add('rdy')}}
  ok.onclick=()=>{SFX.tap();lk.style.display='none';res(true)};
  requestAnimationFrame(()=>requestAnimationFrame(draw));
 })}
