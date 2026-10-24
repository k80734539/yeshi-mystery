const {open,sleep}=require('./lib.js');
(async()=>{const H=await open('file:///workspace/yeshi-mystery/index.html');const {pg,adv,g}=H;await H.setFast(true);
 await pg.click('#startBtn');await adv();
 await g(()=>{});await pg.evaluate(()=>{S.flags.anDone=1;countdown()});await sleep(1200);
 await pg.screenshot({path:'/workspace/epshots/yeshi-countdown.png'});
 await pg.evaluate(()=>{seqModal('② 事發經過的先後順序',TLI,TLO)});await sleep(500);
 await pg.click('.pz[data-v="A"]');await pg.screenshot({path:'/workspace/epshots/yeshi-timeline.png'});
 await H.b.close()})();
