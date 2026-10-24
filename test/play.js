const {open,sleep}=require('./lib.js');
const URL=process.argv[2]||'file:///workspace/yeshi-mystery/index.html';
const MODE=process.argv[3]||'good';
const SH='/workspace/epshots/yeshi-';
(async()=>{
 const H=await open(URL);const {pg,adv,hot,talk,exam,ch,pz,g}=H;
 await pg.screenshot({path:SH+'title.png'});
 await H.setFast(true);
 await pg.click('#startBtn');await adv();console.log('bgm',await g(()=>window.__bgm));
 await pg.screenshot({path:SH+'market.png'});
 await hot('notice');
 await hot('officedoor');await hot('trophy');await hot('photo');await hot('drawer');await hot('forms');await hot('pin');await pg.screenshot({path:SH+'office.png'});await H.back();
 await talk('an');
 await pg.screenshot({path:SH+'testimony.png'});
 await H.exam(1,'pin');
 await ch('go');
 for(const k of ['kai','ray','li','cai']){await pg.screenshot({path:SH+'countdown-'+k+'.png'}).catch(()=>{});await pg.click(`#mlist [data-v="${k}"]`);await adv()}
 if(!(await g(()=>__G.flags.cdDone)))throw 'cd not done';
 await talk('shan');await talk('ling');await talk('ling');await ch('c');await talk('ling');await ch('d');
 await hot('alleydoor');await hot('lock');await hot('vent');await hot('crates');await H.back();
 await hot('stalldoor');await hot('counter');await hot('sign');await hot('pot');
 if(MODE==='good'){await hot('mat');}
 await H.back();
 await hot('stagedoor');await hot('console');await hot('screen');await hot('power');await H.back();
 await talk('li').catch(()=>{});
 console.log('ev',await g(()=>__G.ev.join(',')));
 await pg.click('#accuseBtn');await adv();
 if(MODE==='bad'){await ch('go')}
 await pg.screenshot({path:SH+'accuse.png'});
 await pg.click('.sus[data-c="hai"]');await adv();if(await g(()=>__G.hearts)!==4)throw 'wrong suspect heart';
 await pg.click('.sus[data-c="ling"]');await adv();
 // timeline: wrong first
 await pg.click('.pz[data-v="C"]');await adv();if(await g(()=>__G.hearts)!==3)throw 'tl heart';
 await pg.screenshot({path:SH+'timeline.png'}).catch(()=>{});
 for(const v of 'ABCDEF'){await pg.click(`.pz[data-v="${v}"]`);await sleep(80)}
 await adv();
 await pz('a');if(await g(()=>__G.hearts)!==2)throw 'puzzle heart';
 await pz('b');
 console.log('bgm final',await g(()=>window.__bgm));
 await exam(0,'stream');await exam(0,'frost');await exam(0,'forms');
 await H.setFast(false);
 await pg.click('#tbar [data-v="present"]');await sleep(100);await pg.click('#mlist [data-k="shoe"]');await pg.click('#presentBtn');await sleep(500);
 await pg.screenshot({path:SH+'cutin.png'});
 await H.setFast(true);
 for(let n=0;n<40;n++){await sleep(60);if(await pg.evaluate(()=>document.querySelector('#por').dataset.k==='lingbroken'))break;if(await H.vis('#box'))await pg.click('#box',{force:true})}
 await sleep(400);await pg.screenshot({path:SH+'broken.png'});
 await adv();
 await pg.screenshot({path:SH+'ending-'+MODE+'.png'});
 const st=await g(()=>({h:__G.hearts,ended:__G.ended,hints:__G.hints,miss:__G.miss,score:window.__score}));console.log(JSON.stringify(st),'errs',H.errs);
 if(MODE==='good'){
  const bst=await g(()=>[localStorage.getItem('yeshi_clear'),localStorage.getItem('yeshi_best'),localStorage.getItem('yeshi_cloud')]);console.log('best',bst);
  const ok=bst[0]==='1'&&bst[2]==='1'&&st.score&&st.score.rk&&st.ended&&!H.errs.length;console.log(ok?'PASS':'FAIL');process.exit(ok?0:1)}
 else{ // bad: should be at retry/restart choice
  const ok=await H.vis('#bar')&&await g(()=>!!document.querySelector('#bar [data-v="retry"]'))&&!H.errs.length;
  if(ok){await ch('retry');}
  const back=await g(()=>({final:__G.flags.final,hearts:__G.hearts,scene:__G.scene}));console.log('after retry',JSON.stringify(back));
  const ok2=ok&&back.hearts===5&&!back.final&&await H.vis('#accuseBtn');console.log(ok2?'PASS':'FAIL');process.exit(ok2?0:1)}
})().catch(e=>{console.error('FAIL',e);process.exit(1)});
