const { chromium, devices } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core/index.js');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
exports.sleep=sleep;
exports.open=async(url,opts={})=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 const ctx=await b.newContext({...devices['iPhone 13'],...opts});
 const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>{errs.push(e.message);console.log('PAGEERR',e.message)});
 await pg.goto(url);await sleep(800);
 const vis=s=>pg.evaluate(s=>{const e=document.querySelector(s);return !!e&&getComputedStyle(e).display!=='none'},s);
 const seen=[];
 async function adv(){for(let n=0;n<300;n++){await sleep(window_fast()?30:300);if(await vis('#docv')){await pg.click('#docv',{force:true});continue}if(await vis('#lk')||await vis('#tbar')||await vis('#modal')||await vis('#bar'))return;if(await vis('#box')){if(H.onLine){const k=await pg.evaluate(()=>document.querySelector('#por').dataset.k||'');await H.onLine(k)}seen.push(await pg.evaluate(()=>document.querySelector('#txt').textContent));await pg.click('#box',{force:true})}}throw 'stuck '+seen.slice(-2)}
 let fast=true;const window_fast=()=>fast;
 const H={b,ctx,pg,errs,vis,seen,adv,setFast:async f=>{fast=f;await pg.evaluate(f=>window.__fast=f,f)}};
 H.pref='calm';H.stlog=[];
 H.settle=async()=>{for(let n=0;n<40;n++){await adv();if(await vis('#lk')){await H.link();continue}if(await pg.evaluate(()=>{const b=document.querySelector('#bar');return !!b&&b.classList.contains('stc')&&getComputedStyle(b).display!=='none'})){H.stlog.push(H.pref);if(H.onStance)await H.onStance(H.stlog.length);await pg.click(`#bar.stc [data-v="${H.pref}"]`);continue}return}throw 'settle loop'};
 H.link=async()=>{const spec=await pg.evaluate(()=>window.__lk.E.map(e=>[e[0],e[1]]));const tt=await pg.evaluate(()=>window.__lk.title);if(H.onLink)await H.onLink(tt);
  for(const [a,b] of spec){await pg.click(`#lk .lkn.l[data-id="${a}"]`);await pg.click(`#lk .lkn.r[data-id="${b}"]`);await sleep(60)}
  await pg.click('#lkok');await sleep(100)};
 H.hot=async id=>{await pg.click(`.hot[data-id="${id}"]`);await H.settle()};
 H.talk=async c=>{await pg.click(`[data-talk="${c}"]`);await H.settle()};
 H.tb=async v=>{await pg.click(`#tbar [data-v="${v}"]`);await adv()};
 H.present=async ev=>{await pg.click('#tbar [data-v="present"]');await sleep(100);await pg.click(`#mlist [data-k="${ev}"]`);await pg.click('#presentBtn');await adv()};
 H.exam=async(idx,ev)=>{for(let i=0;i<idx;i++)await H.tb('next');await H.present(ev)};
 H.ch=async v=>{await pg.click(`#bar [data-v="${v}"]`);await H.settle()};
 H.pz=async v=>{await pg.click(`.pz[data-v="${v}"]`);await adv()};
 H.g=(f)=>pg.evaluate(f);H.back=async()=>{await pg.click('#backBtn');await H.settle()};
 return H};
