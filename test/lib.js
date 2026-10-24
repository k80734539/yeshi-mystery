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
 async function adv(){for(let n=0;n<300;n++){await sleep(window_fast()?30:300);if(await vis('#docv')){await pg.click('#docv',{force:true});continue}if(await vis('#tbar')||await vis('#modal')||await vis('#bar'))return;if(await vis('#box')){seen.push(await pg.evaluate(()=>document.querySelector('#txt').textContent));await pg.click('#box',{force:true})}}throw 'stuck '+seen.slice(-2)}
 let fast=true;const window_fast=()=>fast;
 const H={b,ctx,pg,errs,vis,seen,adv,setFast:async f=>{fast=f;await pg.evaluate(f=>window.__fast=f,f)}};
 H.hot=async id=>{await pg.click(`.hot[data-id="${id}"]`);await adv()};
 H.talk=async c=>{await pg.click(`[data-talk="${c}"]`);await adv()};
 H.tb=async v=>{await pg.click(`#tbar [data-v="${v}"]`);await adv()};
 H.present=async ev=>{await pg.click('#tbar [data-v="present"]');await sleep(100);await pg.click(`#mlist [data-k="${ev}"]`);await pg.click('#presentBtn');await adv()};
 H.exam=async(idx,ev)=>{for(let i=0;i<idx;i++)await H.tb('next');await H.present(ev)};
 H.ch=async v=>{await pg.click(`#bar [data-v="${v}"]`);await adv()};
 H.pz=async v=>{await pg.click(`.pz[data-v="${v}"]`);await adv()};
 H.g=(f)=>pg.evaluate(f);H.back=async()=>{await pg.click('#backBtn');await adv()};
 return H};
