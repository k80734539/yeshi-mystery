function renderScene(){setBGM('inv');const sc=SC[S.scene];$('#place').textContent='📍 '+sc.name+(S.flags.act2?'':'　18:30');const H=$('#hs');H.innerHTML='';
 sc.hots.forEach(h=>{if(h.show&&!h.show())return;const d=document.createElement('div');d.className='hot'+(S.flags['h_'+h.id]?' done':'');d.dataset.id=h.id;Object.assign(d.style,{left:h.x+'%',top:h.y+'%',width:h.w+'%',height:h.h+'%'});d.innerHTML=`<span>${h.l}</span>`;d.onclick=()=>act(async()=>{S.flags['h_'+h.id]=1;await h.f()});H.appendChild(d)});
 const b=$('#bar');b.innerHTML='';b.className='hub';b.style.display='flex';b.style.bottom='';
 const pp=typeof sc.people==='function'?sc.people():sc.people;
 pp.forEach(p=>{const x=document.createElement('button');x.className='btn';x.dataset.talk=p;x.textContent='💬 '+CH[p];x.onclick=()=>act(()=>talk(p));b.appendChild(x)});
 if(!S.flags.act2&&a1ready()){const x=document.createElement('button');x.className='btn red';x.id='a1Btn';x.textContent='⏱ 21:30 燈光秀開始';x.onclick=()=>act(act1End);b.appendChild(x)}
 if(S.flags.act2&&S.scene!=='market'){const x=document.createElement('button');x.className='btn';x.dataset.back='1';x.id='backBtn';x.textContent='↩ 回夜市';x.onclick=()=>act(()=>go('market'));b.appendChild(x)}
 if(canAccuse()){const x=document.createElement('button');x.className='btn red';x.id='accuseBtn';x.textContent='⚖️ 指認兇手';x.onclick=()=>act(accuse);b.appendChild(x)}
 setPor(null);hideBox();
}
