const {open,sleep}=require('./lib.js');
const URL=process.argv[2]||'file:///workspace/yeshi-mystery/index.html';
const MODE=process.argv[3]||'good';
const SH=process.env.SH||'/workspace/epshots/yeshi-';
let LN=0;const SHOTS=!!process.env.SHOTS;
(async()=>{
 const H=await open(URL);const {pg,adv,hot,talk,exam,ch,pz,g}=H;
 const ck=(c,m)=>{if(!c)throw 'CHECK '+m};
 await pg.screenshot({path:SH+'title.png'});
 await H.setFast(true);H.pref='sym';
 if(SHOTS){const got=new Set();H.onLine=async k=>{if(['mesad','meangry','mesurprised','medetermined','mepoint','linsad','linbroken','lin'+'nervous'].includes(k)&&!got.has(k)&&!(k.startsWith('lin')&&!(await g(()=>__G.flags.linWrong)))){got.add(k);await sleep(250);await pg.screenshot({path:SH+'por-'+k+'.png'})}};H.onStance=async n=>{await pg.screenshot({path:SH+'stance-'+n+'.png'})};H.onLink=async t=>{await pg.screenshot({path:SH+'link-'+(++LN)+'.png'})}}
 await pg.click('#startBtn');await H.settle();
 await pg.screenshot({path:SH+'act1-market.png'});
 // ---- Act 1
 for(const p of ['shan','lin','hai','ling','an','cai','li','wu'])await talk(p);
 await hot('notice');await talk('an');await talk('wu');
 ck(await g(()=>__G.flags.wuDone),'wu side quest done');
 ck(await g(()=>__G.flags.shanArt===2&&__G.flags.linHusb===2),'act1 secrets via sym');
 await talk('shan');await ch('x').catch(()=>{});
 await talk('lin');await ch('x').catch(()=>{});
 ck(await H.vis('#a1Btn'),'act1 button');
 await pg.screenshot({path:SH+'act1-ready.png'});
 await pg.click('#a1Btn');await H.settle();
 ck(await g(()=>__G.flags.act2&&__G.ev.includes('note')),'act2 reached');
 // ---- Act 2
 await talk('shan');
 await hot('alleydoor');await hot('crates');await hot('lock');await hot('vent');await hot('bowl');
 await talk('li');await talk('li');await ch('s');ck(await g(()=>__G.flags.liDog===2),'li secret');
 await H.back();
 await talk('cai');
 ck(await g(()=>__G.ev.includes('lintest')&&__G.ev.includes('bottle')),'bottle+lintest');
 await hot('officedoor');await hot('trophy');await hot('photo');await hot('drawer');await hot('photo');await hot('forms');await hot('pin');
 // desk triggers the wrong deduction
 H.onLink=SHOTS?async t=>{await pg.screenshot({path:SH+'link-'+(++LN)+'.png'})}:null;
 await pg.click('.hot[data-id="desk"]');await H.settle();
 ck(await H.vis('#tbar'),'linExam started');
 await H.present('body');ck(await H.vis('#tbar'),'wrong present stays');
 H.pref='firm';
 await H.present('lintest');await H.settle();
 ck(await g(()=>__G.flags.linHit&&__G.flags.lowDone),'low point reached');
 ck(await H.vis('#bar'),'back at hub');
 if(SHOTS){await pg.screenshot({path:SH+'lowpoint-hub.png'})}
 H.pref='sym';
 await talk('shan');ck(await g(()=>__G.flags.shanCold),'shan cold remains');
 await talk('lin');
 ck(await g(()=>__G.flags.linFixed&&__G.ev.includes('linFix')),'lin apology');
 await talk('shan');ck(await g(()=>!__G.flags.shanCold),'shan reconciled');
 await talk('wu');ck(await g(()=>__G.ev.includes('granny')),'granny');
 await talk('an');
 await H.exam(1,'pin');
 await ch('go');
 for(const k of ['kai','ray','li','cai']){await pg.click(`#mlist [data-v="${k}"]`);await H.settle()}
 ck(await g(()=>__G.flags.cdDone),'cd done');
 await talk('an');await ch('s');ck(await g(()=>__G.flags.anMom),'an secret');
 await talk('ling');await talk('ling');await ch('c');await ch('c');await talk('ling');await ch('c');await ch('d');
 await talk('ling');await ch('s');ck(await g(()=>__G.flags.lingFather),'ling secret');
 await hot('stalldoor');
 await hot('counter');await hot('sign');await hot('pot');
 if(MODE==='good'){await hot('mat')}
 await H.back();
 await hot('stagedoor');await hot('console');await hot('screen');await hot('power');await H.back();
 console.log('ev',await g(()=>__G.ev.join(',')),'secrets',await g(()=>SECN()));
 ck(await H.vis('#accuseBtn'),'accuse visible');
 await pg.click('#accuseBtn');await H.settle();
 if(MODE==='bad'){await ch('go');await H.settle()}
 await pg.screenshot({path:SH+'accuse.png'});
 await pg.click('.sus[data-c="hai"]');await H.settle();ck(await g(()=>__G.hearts)===4,'wrong suspect heart');
 await pg.click('.sus[data-c="ling"]');await H.settle();
 await pg.click('.pz[data-v="C"]');await H.settle();ck(await g(()=>__G.hearts)===3,'tl heart');
 for(const v of 'ABCDEF'){await pg.click(`.pz[data-v="${v}"]`);await sleep(80)}
 await H.settle();
 await pz('a');ck(await g(()=>__G.hearts)===2,'puzzle heart');
 await pz('b');
 await exam(0,'stream');await exam(0,'frost');await exam(0,'forms');
 await pg.click('#tbar [data-v="next"]');await pg.click('#tbar [data-v="next"]').catch(()=>{});
 await pg.screenshot({path:SH+'finale-f4.png'}).catch(()=>{});
 await pg.click('#tbar [data-v="prev"]').catch(()=>{});await pg.click('#tbar [data-v="prev"]').catch(()=>{});
 await exam(1,'linFix').catch(e=>{console.log('F4 note',e)});
 await H.setFast(false);
 await pg.click('#tbar [data-v="present"]');await sleep(100);await pg.click('#mlist [data-k="shoe"]');await pg.click('#presentBtn');await sleep(500);
 await pg.screenshot({path:SH+'cutin.png'});
 await H.setFast(true);
 for(let n=0;n<40;n++){await sleep(60);if(await pg.evaluate(()=>document.querySelector('#por').dataset.k==='lingbroken'))break;if(await H.vis('#box'))await pg.click('#box',{force:true})}
 await sleep(400);await pg.screenshot({path:SH+'broken.png'});
 await H.settle();
 await pg.screenshot({path:SH+'ending-'+MODE+'.png'});
 {const tot=H.seen.reduce((a,t)=>a+t.length,0);console.log('LINES',H.seen.length,'CHARS',tot)}
 const st=await g(()=>({h:__G.hearts,ended:__G.ended,hints:__G.hints,miss:__G.miss,score:window.__score}));console.log(JSON.stringify(st),'errs',H.errs);
 if(MODE==='good'){
  const bst=await g(()=>[localStorage.getItem('yeshi_clear'),localStorage.getItem('yeshi_best'),localStorage.getItem('yeshi_cloud')]);console.log('best',bst);
  const ok=bst[0]==='1'&&bst[2]==='1'&&st.score&&st.score.rk&&st.score.secrets===5&&st.ended&&!H.errs.length;console.log(ok?'PASS':'FAIL');process.exit(ok?0:1)}
 else{
  const ok=await H.vis('#bar')&&await g(()=>!!document.querySelector('#bar [data-v="retry"]'))&&!H.errs.length;
  if(ok){await ch('retry');}
  const back=await g(()=>({final:__G.flags.final,hearts:__G.hearts,scene:__G.scene}));console.log('after retry',JSON.stringify(back));
  const ok2=ok&&back.hearts===5&&!back.final&&await H.vis('#accuseBtn');console.log(ok2?'PASS':'FAIL');process.exit(ok2?0:1)}
})().catch(e=>{console.error('FAIL',e);process.exit(1)});
