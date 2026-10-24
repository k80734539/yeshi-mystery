function seqModal(title,items,order){setPor(null);hideBox();return new Promise(res=>{const m=$('#modal');m.style.display='flex';$('#mtitle').textContent=title;const L=$('#mlist');L.innerHTML='';L.style.gridTemplateColumns='1fr';$('#mdesc').textContent='依「事情發生的先後順序」，一個一個點下去。點錯會扣一顆心。';$('#mbtns').innerHTML='';let n=0;
 items.forEach(([v,t])=>{const d=document.createElement('div');d.className='ev pz tl';d.dataset.v=v;d.textContent=t;onTap(d,()=>{if(d.classList.contains('used'))return;if(v===order[n]){SFX.tap();n++;d.classList.add('used');d.textContent=n+'. '+t;if(n>=order.length)setTimeout(()=>{m.style.display='none';L.style.gridTemplateColumns='';res(true)},window.__fast?0:350)}else{m.style.display='none';L.style.gridTemplateColumns='';res(false)}});L.appendChild(d)})})}
const TLO=['A','B','C','D','E','F'];
const TLI=[['C','遺體被鎖進後巷的冷凍貨櫃，掛鎖扣上'],['E','停電三分鐘——鑰匙被放進陳大海的攤位'],['A','19:50　陳大海在辦公室和會長大吵後離開'],['F','22:05　保全剪開貨櫃的鎖，發現遺體'],['B','會長在辦公室被獎盃重擊'],['D','21:32　莊美玲離開舞台，往後巷方向走去']];
async function accuse(){
 if(S.finalPend){S.finalPend=0;await N(`繼續跟莊美玲對質。（信用剩下 ${S.hearts} 顆心）`);S.flags.final=1;hearts();setBGM('final');return finale()}
 if(!S.ev.includes('hatch')){const c=await choose([['先指認，之後再說','go','red'],['再找找看','no']]);setPor(null);
  if(c==='no'){await N('（還有一個疑問……陳大海人在哪？攤位底下的地下儲藏室，進去看過了嗎？）');return}}
 S.flags.final=1;S.hearts=5;S.finalR=0;hearts();setBGM('final');
 await N('所有線索都到手了。🧩 推理拼圖——把真相拼起來吧。（答錯會扣一顆心，可以重來）');
 const WR={hai:()=>N('（大家都這麼想。可是，如果他真的是兇手，為什麼要把鑰匙擺得那麼整齊，還特地寫「休息十分鐘」？）'),an:()=>say('an','喂！我整個晚上，不是一直在被妳懷疑嗎！','broken',{shake:true}),li:()=>say('li','我、我只是巡邏的啊！','broken',{shake:true})};
 while(true){const v=await new Promise(res=>{const m=$('#modal');m.style.display='flex';$('#mtitle').textContent='① 是誰殺了王會長，還嫁禍給陳大海？';const L=$('#mlist');L.innerHTML='';L.className='accuse';
  ['hai','ling','an','li'].forEach(c=>{const d=document.createElement('div');d.className='sus';d.dataset.c=c;d.innerHTML=`<img src="${ART[c+'_normal']}"><div>${CH[c]}</div>`;onTap(d,()=>{SFX.tap();m.style.display='none';L.className='';res(c)});L.appendChild(d)});
  $('#mdesc').textContent='想清楚再選。';$('#mbtns').innerHTML=''});
  if(v==='ling')break;await WR[v]();if(await lose())return}
 while(true){const ok=await seqModal('② 事發經過的先後順序',TLI,TLO);if(ok)break;await N('（順序不對……貨櫃上的霜、老李 21:00 的巡邏，說明貨櫃是什麼時候就鎖上的？）');if(await lose())return}
 while(true){const y=await pickModal('③ 為什麼法醫會以為，會長是 21:00 以後才死的？',[['她提前殺人，把遺體關進 -18℃ 的冷凍貨櫃——低溫讓屍僵延後出現，法醫就誤判成較晚的死亡時間，剛好蓋住停電的三分鐘','b'],['兇手在停電的三分鐘裡殺了人，再用鑰匙把貨櫃鎖上','a'],['冷凍貨櫃讓遺體完全腐壞，法醫根本驗不出任何死亡時間','c']]);if(y==='b')break;await N('（不對……想想貨櫃裡的溫度，和法醫判斷時間看的是什麼。）');if(await lose())return}
 await flash('真相拼起來了！');
 await say('me','莊美玲——殺了王會長，還把罪名推給陳大海的人，就是妳！');
 await say('ling','……偵探小姐，妳在說什麼？我可是最難過的人啊。','normal');
 return finale()}
async function finale(){
 const R=[T.F1,T.F2,T.F3,T.F4];
 const AF=[
  async()=>{if(S.ev.includes('tech'))await say('me','燈光師說，21:32 妳拿著手電筒往後巷走了，停電時舞台前根本沒有妳！');if(S.ev.includes('stream'))await say('me','直播回放更清楚——停電那一瞬間，補光燈掃過整排前排觀眾，一件黃背心都沒有！而且 21:38，有個拿著手電筒和板夾的黃背心，走向了後巷。');await say('ling','唔……！','nervous',{shake:true});await say('ling','我、我是去了一下洗手間！很快就回來了！','nervous')},
  async()=>{await say('me','鎖是停電才扣上的？貨櫃的掛鎖上，結著一層厚厚的霜——冷氣要吹一個多小時才會這樣！');if(S.ev.includes('patrol'))await say('me','而且老李說，21:00 他巡邏時，鎖就已經扣著了！');await say('me','會長早在停電以前，就被鎖進貨櫃了。停電那三分鐘，不是殺人的時間，是「放鑰匙」的時間！');await say('ling','就、就算鎖得早，那也是陳大海做的！','nervous',{shake:true})},
  async()=>{await say('me','妳說昨天才聽說都更？這 31 份讓渡書的影本，「經辦人」欄簽的，是妳的名字——日期，是三個月前！');await say('ling','那、那是會長叫我簽的……我不知道那是……','broken',{shake:true});await say('me','每一份都簽了名，還影印留底。這叫不知道？')},
  async()=>{await say('me','妳說，妳不知道他的攤位底下有地下室？那妳鞋底這圈暗紅色的黏漬，是什麼？');await say('me','攤位上賣的滷汁是黑褐色的。只有地下室陶甕裡的紅麴老滷，才是這種暗紅色！');await say('ling','…………！','broken',{shake:true})}];
 for(let j=S.finalR||0;j<R.length;j++){const r=R[j];const k=await crossExam('ling',`最終對質 ${j+1}/4：${r.title}`,r);if(k==='dead')return badEnd('hearts');if(k==='leave'){S.finalR=S.finalR||0;S.flags.final=0;S.finalPend=1;hearts();return}await AF[j]();S.finalR=j+1}
 S.finalR=0;
 await flash('真相大白！');
 await say('ling','……是啊。是我殺的。','broken',{shake:true});
 await say('ling','我跟了他十二年。去年他說，夜市要重劃，叫我幫忙「整理」攤位的登記，事成以後，讓我當下一任自治會長。','broken');
 await say('ling','我簽了三十一份。我幫他騙了所有人。','broken');
 await say('wang','（回憶）美玲，這件事結束了。雲嶺那邊我已經談好了，沒有妳的份——這件事，跟妳沒有關係了。','normal');
 await say('ling','十二年……「跟妳沒有關係」。我拿起了桌上的獎盃。','broken');
 await say('ling','陳大海發現是我改了他的登記，衝進來吵的時候，我正好把會長……我只好，也把他處理掉。','broken');
 if(S.ev.includes('hatch')){
  await say('me','陳大海還活著，對吧？他就在自己的攤位底下——那個地下儲藏室。');
  await say('ling','……！妳、妳怎麼知道……','nervous',{shake:true});
  await say('me','把活板門的鑰匙交出來。');
  setPor(null);await N('她的手不停地發抖，從黃色背心的內袋裡，掏出一把嶄新的小鑰匙。');
  return goodEnd()}
 await say('ling','……你們找不到他的。','broken');
 return badEnd('nobase')}
async function badEnd(v){
 S.ended=true;$('#hs').innerHTML='';$('#bar').style.display='none';setBGM(null);SFX.sad();
 setBg('market','grayscale(.8) brightness(.6)');
 if(v==='hearts'){await say('ling','偵探小姐，沒有證據，就別亂指控人。我的律師會跟妳聯絡。','normal');await N('案子最後成了懸案。陳大海被通緝，再也沒有人看見他。');}
 else {await say('ling','……我承認，我慌了。會長跟我起了爭執，他自己跌倒，撞到了頭。我嚇壞了，才把他放進貨櫃……我沒有想害人。','normal');
  await N('陳大海——沒有人找得到他。沒人能證明，莊美玲對他做過什麼。');
  await N('最後，檢察官只能以「過失致死」起訴她。');
  setBg('stall','grayscale(.8) brightness(.6)');
  await N('三天後，清潔隊在滷味攤的地墊下，發現了那扇活板門。');
  await say('shan','爸……','broken');
  await N('……太遲了。');}
 setPor(null);
 await chapter('BAD END<br>〈無聲的夜市〉');
 const c=await choose([['回到指認前','retry','red'],['從頭開始','restart']]);
 S.ended=false;
 if(c==='restart')return location.reload();
 S.flags.final=0;S.hearts=5;S.finalR=0;S.finalPend=0;hearts();S.scene='market';setBg('market');
}
function rank(){const sc=Math.max(0,S.hearts*20-S.hints*5-S.miss*2);return [sc,sc>=95?'S':sc>=75?'A':sc>=50?'B':'C']}
async function goodEnd(){
 S.ended=true;$('#hs').innerHTML='';setBGM('good');SFX.win();
 await chapter('地下儲藏室');
 setBg('basement');$('#place').textContent='📍 福安夜市．地下儲藏室';
 await N('老李用鑰匙打開活板門的瞬間，一股八角和紅麴的味道湧了上來。');
 await say('shan','爸！！爸！！！','broken');
 await say('hai','……小珊……？妳怎麼……在這裡……','broken');
 await N('陳大海靠在陶甕旁，臉色蒼白，但還有呼吸。救護車很快就來了。');
 await say('hai','我只記得……喝了美玲給的烏梅湯，醒來就在這裡了。我一直敲，一直敲……沒有人聽見。','broken');
 await say('li','（紅著眼眶）大海……對不起，我巡了那麼多次，都沒想到要掀開那塊地墊。','normal');
 await chapter('三天後');
 setBg('market','brightness(1.12)');$('#place').textContent='📍 福安夜市';
 await N('莊美玲被依殺人、妨害自由等罪名起訴。那 31 份讓渡書，被證實是冒簽偽造，全數撤銷。');
 await N('自治會重新改選。雲嶺開發的收購案，暫時凍結——福安夜市，保住了。');
 await say('hai','許偵探，來，吃一碗。這次是真的滷肉，不是老滷。','normal');
 await say('shan','謝謝妳。我爸……還有整條夜市，都謝謝妳。','normal');
 await say('an','這次，算我欠妳一次。','normal');
 await say('me','然後呢？你要繼續追雲嶺？');
 await say('an','當然。……但我們各查各的，這是說好的。','normal');
 await say('an','下次見，不要再擋我的路。','normal');
 await say('me','……是你在擋我吧。');
 setPor(null);
 if(S.ev.includes('yunling')){await N('我拿出那張採購名單，看著被撕掉的「收款人」欄。\n雲朵標誌底下，到底是誰，拿走了那一欄？')}
 await N('口袋裡，那張匿名的紙條還在。');
 setPor('me','point');await say('me','……這個字跡。');
 setPor(null);await N('我把紙條摺好，放回口袋。那個人，到底想讓我看見什麼？');
 const [sc,rk]=rank();window.__score={sc,rk,hearts:S.hearts,hints:S.hints,miss:S.miss};try{localStorage.setItem('yeshi_clear','1');const ob=JSON.parse(localStorage.getItem('yeshi_best')||'null');if(!ob||sc>ob.sc)localStorage.setItem('yeshi_best',JSON.stringify({sc,rk,t:Date.now()}));if(S.ev.includes('yunling'))localStorage.setItem('yeshi_cloud','1')}catch(e){}
 await chapter(`GOOD END<br>〈夜市無聲〉<br><span style="font-size:16px">真相：莊美玲提前殺人、用冷凍貨櫃拖延死亡時間，再趁停電嫁禍陳大海</span><br><span style="font-size:18px">❤️ 剩餘心數 ${S.hearts}/5<br>💡 使用提示 ${S.hints} 次　❌ 失誤 ${S.miss} 次<br>分數 ${sc}</span><br><span id="rank" style="font-size:54px;color:#ff5a4a">${rk}</span>`);
 $('#chap').style.display='flex';await sleep(window.__fast?100:2500);$('#chap').style.display='none';
 await N(`🏆 評價：${rk} 級（分數 ${sc}）\n心數 ×20 − 提示 ×5 − 失誤 ×2`);
 await choose([['再玩一次','r','red']]);location.reload();
}
/* ---------- prologue ---------- */
async function prologue(){
 setBg('market','brightness(.45)');setBGM('inv');
 await N('—— 序章 ——\n週六夜裡十點，台北。事務所只剩一盞檯燈。');
 setPor('me','point');await say('me','我叫許晴，偵探。專長是找人、找東西，還有找出謊話。老街那件案子之後，上門的委託就沒停過。');
 await N('電話響了。另一頭，是一個快哭出來的女孩子。');
 await say('shan','請問是許偵探嗎？我叫小珊……我爸爸陳大海，在福安夜市賣滷味。他們說，他殺了自治會的王會長。','nervous');
 await say('shan','可是我爸不會殺人！他從晚上七點多就失蹤了，手機也關機……拜託妳，幫我找到他！','broken');
 await say('me','地址給我。我二十分鐘後到。');
 setPor(null);await N('掛上電話，我才發現門縫底下，多了一張摺成四折的紙條。');
 await N('沒有信封，沒有署名，原子筆的字很工整：\n「福安夜市的案子，別被鑰匙騙了。去看貨櫃鎖上有沒有霜。」');
 setPor('me','point');await say('me','……這個字跡。');
 setPor(null);await N('我盯著紙條看了很久。然後把它摺好，放進外套口袋，什麼也沒說。');
 await getEv('note');
}
/* ---------- intro ---------- */
async function intro(){
 $('#title').style.display='none';await prologue();await chapter('第一章<br>夜市無聲');
 setBg('market');SFX.gong();
 await N('週六晚上，福安夜市。這座開了四十年的夜市，今晚燈還亮著，卻一點叫賣聲也沒有。');
 await N('21:40，整座夜市停電三分鐘。燈亮之後，自治會長王仲義，一直沒有出現。');
 await N('22:05，保全剪開了後巷冷凍貨櫃的掛鎖——會長倒在裡面，已經沒有呼吸。');
 await N('貨櫃的鑰匙，在滷味攤老闆陳大海的櫃檯上被找到。而陳大海，從晚上七點多就沒人見過他。');
 await say('shan','許偵探！謝謝妳來……警察只留下保全看守貨櫃，其他人都被圈在夜市裡等筆錄。大家看我的眼神，好像我爸已經是兇手了。','nervous');
 await say('me','先告訴我，警方怎麼說。');
 await say('shan','我認識分局的叔叔，他偷偷告訴我——','normal');
 await getEv('body');await getEv('blackout');
 await say('shan','所以他們認定，是我爸趁停電那三分鐘動手的……','nervous');
 await N('這時，一個背著帆布包的年輕人擠過封鎖線，手裡握著一本筆記本，眼睛直直盯著我。');
 await say('an','妳就是剛到的偵探？……從哪裡來的？','normal');
 await say('me','台北。你呢？');
 await say('an','我在這裡打工，炸雞排攤，兩個月了。倒是妳——這種時候，這麼剛好有人來「幫陳大海」？','normal');
 await say('me','被害人家屬委託。要看我的證件嗎？');
 await say('an','雲嶺開發最近很愛派「顧問」去各個老市場，名片上寫的，都是很好聽的職稱。妳是不是其中一個？','nervous');
 await say('me','我最近對那朵雲過敏。倒是你，一個打工的，怎麼知道這麼多？');
 await say('an','……我剛好聽說的。','nervous');
 await say('me','……我也是。');
 await say('shan','呃，你們兩個……不要吵啦！','nervous');
 await say('an','總之，我也不相信陳大叔是兇手。他請我吃過滷蛋。','normal');
 await say('me','在查清楚你是誰之前，我不會把背對著你。');
 await say('an','彼此彼此。','normal');
 setPor(null);
 await N('🔍 點畫面上發光的地方調查；用下方按鈕跟人說話。\n📒 證物隨時可以在右上角查看；證詞卡關可以按「💡 提示」。');
 S.scene='market';
}
