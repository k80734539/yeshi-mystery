const {open,sleep}=require('./lib.js');
const URL=process.argv[2]||'file:///workspace/yeshi-mystery/index.html';
(async()=>{
 const H=await open(URL);const {pg,adv,g,vis}=H;const fails=[];const ck=(c,m)=>{console.log((c?'✔ ':'✘ ')+m);if(!c)fails.push(m)};
 await H.setFast(true);
 ck(await g(()=>document.title)==='夜市無聲','title');
 ck((await pg.content()).includes('build:v2-depth'),'marker');
 ck(await g(()=>!document.querySelector('#rain')),'no rain element');
 ck(await vis('#hubLink'),'hub link');
 await pg.click('#startBtn');await H.settle();
 ck(await g(()=>chapName())==='第一幕','chapter 第一幕');
 // audio: themes produce signal
 const rms=await pg.evaluate(async()=>{const out={};for(const k of ['inv','test','cd','final','good']){setBGM(k);const an=AC.createAnalyser();an.fftSize=2048;MB.connect(an);const buf=new Float32Array(2048);let mx=0;for(let i=0;i<14;i++){await new Promise(r=>setTimeout(r,250));an.getFloatTimeDomainData(buf);let s=0;for(const v of buf)s+=v*v;mx=Math.max(mx,Math.sqrt(s/buf.length))}out[k]=+mx.toFixed(4);MB.disconnect(an)}return {out,state:AC.state}}).catch(e=>'ERR '+e.message);
 console.log('audio',JSON.stringify(rms));
 await pg.evaluate(()=>{for(const k of Object.keys(SFX))try{SFX[k]()}catch(e){throw new Error(k+':'+e.message)}}).then(()=>ck(true,'all SFX run'),e=>ck(false,'sfx '+e.message));
 await pg.evaluate(()=>setBGM('inv'));
 // back / prev / leave
 // jump to Act 2 by state (full flow is covered by play.js)
 await pg.evaluate(()=>{Object.assign(S.flags,{act2:1,a1done:1,haiGone:1});S.ev.push('note','body');go('market');renderScene()});await sleep(200);
 ck(await g(()=>chapName())==='第二幕','chapter 第二幕');
 await H.hot('officedoor');await H.hot('pin');await H.back();
 const seen=H.seen;
 await H.talk('an');
 const stmt=()=>g(()=>document.querySelector('#txt').textContent);
 const s0=await stmt();await H.tb('next');const s1=await stmt();ck(s0!==s1,'next changes line');
 await H.tb('prev');ck(await stmt()===s0,'prev returns');
 await H.tb('prev');ck(await stmt()!==s0,'prev wraps');
 seen.length=0;await H.tb('hint');await H.tb('hint');
 ck(seen.some(t=>t.includes('💡 提示 1'))&&seen.some(t=>t.includes('💡 提示 2')),'hints shown');
 await pg.screenshot({path:'/workspace/epshots/yeshi-hint.png'});
 await H.tb('leave');
 const st=await g(()=>({tbar:getComputedStyle(document.querySelector('#tbar')).display,talk:!!document.querySelector('[data-talk="an"]'),met:!!__G.flags.anDone,sc:__G.scene}));
 ck(st.tbar==='none'&&st.talk&&!st.met,'leave returns to scene: '+JSON.stringify(st));
 await H.talk('an');ck(await vis('#tbar'),'re-enter');
 // wrong evidence
 await H.present('body');ck(await vis('#tbar'),'wrong present stays in exam');
 await H.tb('leave');
 // can't accuse early
 ck(!(await vis('#accuseBtn')),'no accuse early');
 // save / load
 const before=await g(()=>JSON.stringify({ev:__G.ev,flags:__G.flags,scene:__G.scene,hearts:__G.hearts,hints:__G.hints}));
 await pg.click('#menuBtn');await pg.click('#saveBtn');await pg.click('#sv [data-slot="s1"]');await sleep(150);
 ck((await pg.textContent('#sv [data-slot="s1"]')).includes('第二幕'),'slot saved: '+(await pg.textContent('#sv [data-slot="s1"]')).replace(/\s+/g,' '));
 await pg.click('#svClose');
 ck(await g(()=>!!localStorage.getItem('yeshi_auto')),'autosave exists');
 await pg.reload();await sleep(800);await H.setFast(true);
 ck(await vis('#contBtn')&&await vis('#titleLoadBtn'),'title shows continue/load');
 await pg.click('#contBtn');await sleep(300);
 ck(await g(()=>JSON.stringify({ev:__G.ev,flags:__G.flags,scene:__G.scene,hearts:__G.hearts,hints:__G.hints}))===before,'state restored');
 ck(await vis('#bar'),'resumed at scene');
 // old-save migration
 await pg.evaluate(()=>{const d=JSON.parse(localStorage.getItem('yeshi_auto'));d.S.flags={anDone:1,lingMet:1,cdDone:1};d.S.ev=['note','body','blackout','sauce','bottle','frost','cold','forms','pin'];d.S.scene='market';localStorage.setItem('yeshi_auto',JSON.stringify(d))});
 await pg.reload();await sleep(800);await H.setFast(true);await pg.click('#contBtn');await sleep(400);
 const mg=await g(()=>({a2:__G.flags.act2,fx:__G.flags.linFixed,ev:__G.ev.includes('linFix')&&__G.ev.includes('oldphoto'),vis:!!document.querySelector('#accuseBtn')}));
 ck(mg.a2&&mg.fx&&mg.ev,'old save migrated '+JSON.stringify(mg));
 // hearts=0 -> bad end
 await pg.evaluate(()=>{S.hearts=1;S.flags.final=1;lose()});await H.settle();
 ck(await g(()=>!!document.querySelector('#bar [data-v="retry"]')),'hearts=0 bad end offers retry');
 // keys prefix
 const keys=await g(()=>Object.keys(localStorage));console.log('keys',keys);
 ck(keys.every(k=>k.startsWith('yeshi_')),'only yeshi_ keys');
 // mobile layout: no horizontal overflow
 ck(await g(()=>document.documentElement.scrollWidth<=innerWidth+1),'no h-overflow');
 // reduced motion
 console.log('errs',H.errs);ck(!H.errs.length,'no page errors');
 console.log(fails.length?'FAIL '+fails:'PASS');await H.b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error('FAIL',e);process.exit(1)});
