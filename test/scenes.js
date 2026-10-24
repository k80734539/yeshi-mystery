const {open,sleep}=require('./lib.js');
(async()=>{const H=await open('file:///workspace/yeshi-mystery/index.html');const {pg,adv,g}=H;await H.setFast(true);
 await pg.click('#startBtn');await adv();
 for(const s of ['market','alley','stage','stall','office']){await g(`(()=>{__G.scene='${s}';})()`);
  await pg.evaluate(s=>{window.__sc=s},s);
  await pg.evaluate(async s=>{__G.scene=s;document.querySelector('#bg').style.backgroundImage='';},s);
  await pg.evaluate(s=>{go(s);renderScene()},s).catch(e=>console.log(e.message));await sleep(300);
  await pg.screenshot({path:'/workspace/epshots/sc-'+s+'.png'});}
 await H.b.close()})();
