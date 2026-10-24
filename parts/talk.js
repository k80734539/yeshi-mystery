const canAccuse=()=>!!(S.flags.linFixed&&S.ev.includes('oldphoto')&&S.ev.includes('linFix')&&S.flags.anDone&&S.flags.cdDone&&S.flags.shanMet&&S.flags.lingC&&S.flags.lingD&&S.ev.includes('frost')&&S.ev.includes('forms')&&S.ev.includes('shoe')&&(S.ev.includes('stream')||S.ev.includes('tech')));
function todoText(){const m=[];
 if(!S.flags.shanMet)m.push('跟小珊聊聊');
 if(!S.flags.anDone)m.push('周予安的證詞（先去會長辦公室看看）');
 if(S.flags.anDone&&!S.flags.cdDone)m.push('跟周予安還原停電三分鐘');
 if(!S.ev.includes('frost'))m.push('後巷的貨櫃掛鎖');
 if(!S.ev.includes('forms'))m.push('會長辦公室的廢紙簍');
 if(!S.flags.lingMet)m.push('跟莊美玲聊聊');
 else{if(!S.flags.lingC)m.push('問莊美玲都更的事');if(!S.flags.lingD)m.push(S.ev.includes('sauce')?'問莊美玲攤位地下室的事':'先問小珊關於陳大海攤位的事')}
 if(!S.ev.includes('yunling'))m.push('會長辦公室的抽屜');else if(!S.ev.includes('oldphoto'))m.push('會長辦公室牆上的合照（看過雲嶺明細再看）');
 if(S.flags.linWrong&&!S.flags.linFixed)m.push('林嬸那邊，還有話沒說完');else if(!S.flags.linWrong)m.push('還有幾條線索沒收齊：後巷的箱子、蔡老闆、會長的書桌');
 if(S.flags.cdDone&&!S.ev.includes('stream')&&!S.ev.includes('tech'))m.push('停電時她在哪（直播或燈光師）');
 return m}
const fmtMS=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
function cdModal(secs,left,O,used){setPor(null);hideBox();return new Promise(res=>{const m=$('#modal');m.style.display='flex';$('#mtitle').textContent=`⏱ 停電倒數 ${fmtMS(secs)}｜還能問 ${left} 人`;const L=$('#mlist');L.innerHTML='';L.style.gridTemplateColumns='1fr';$('#mdesc').textContent='時間不多。選一個人去問停電那三分鐘的事。選錯人，就白白浪費一格。';$('#mbtns').innerHTML='';
 O.forEach(([k,t])=>{const d=document.createElement('div');d.className='ev pz'+(used.has(k)?' used':'');d.dataset.v=k;d.textContent=(used.has(k)?'✔ ':'')+t;if(!used.has(k))onTap(d,()=>{SFX.tick();m.style.display='none';L.style.gridTemplateColumns='';res(k)});L.appendChild(d)})})}
async function countdown(){
 setBGM('cd');SFX.blackout();
 await chapter('停電三分鐘');
 setBg('stage','brightness(.4)');
 await N('回到 21:40。夜市的燈，一盞接一盞熄滅。');
 await N('三分鐘後燈亮了。可是這三分鐘裡發生的事，只有「當時在附近的人」才記得清楚——而且人的記憶，過一會兒就會變糊。');
 await say('an','警察現在只顧著找陳大海，沒人問過這些人。我只能帶妳去問 4 個人，選對人，別浪費時間。','normal');
 const O=[['kai','🎚️ 舞台｜燈光師阿凱'],['ray','📱 舞台前｜直播主小宇'],['li','🔦 後巷｜保全老李'],['cai','🍗 炸雞排攤｜蔡老闆'],['tea','🧋 夜市口｜手搖飲店員'],['dj','🎧 舞台側｜DJ 阿龍']];
 const CD={
  kai:async()=>{await say('kai','美玲姐？她是自治會的幹事，今晚負責幫我對流程。','normal');await say('kai','21:32 我正在調燈，她拿著手電筒跟我說：「我去後巷拿東西，馬上回來。」然後就往後巷那邊走了。','normal');await say('kai','停電的時候我一直守在控台，舞台前面根本沒看到她。她是燈亮以後才回來的。','normal');await getEv('tech');return 1},
  ray:async()=>{await say('ray','哇，偵探！我當時剛好在直播，整場都有錄喔！','normal');await N('小宇把手機遞給我，我把進度條拉到 21:38。');await N('畫面裡，一個穿黃色螢光背心的背影，手裡拿著手電筒和板夾，從舞台右側走向後巷。');await N('21:40，燈全滅。他的手機補光燈亮起，慢慢掃過整排舞台前的觀眾——');await N('黃色背心，一件都沒有。自治會的人，今晚全都穿著那種螢光黃背心。');await getEv('stream');return 1},
  li:async()=>{await say('li','21:00 我巡到後巷，順手拉了一下貨櫃的鎖——扣得緊緊的，沒有被動過。','normal');await say('li','後來停電，我一直守在巷口。要是有人進來，我不會沒看到。','normal');await getEv('patrol');return 1},
  cai:async()=>{await say('cai','陳大海那個鐵捲門，從七點五十就拉到一半，掛著「休息十分鐘」，之後就沒再拉起來過。');await say('cai','停電的時候，我聽到他攤位裡「叩」的一聲，像有東西掉在玻璃櫃上。我還以為他回來了，結果燈一亮，裡面一個人也沒有。');await getEv('shutter');return 1},
  tea:async()=>{await say('tea','你們是要問陳大海喔？我就說他一定是兇手啊！他昨天還跟人吵架，眼神超兇的！');await N('……沒有一句有用的。倒數白白少了一格。');S.miss++;return 0},
  dj:async()=>{await say('dj','停電？我當時在放歌，耳機開超大聲，什麼都沒聽到啦！');await N('……白問了。倒數白白少了一格。');S.miss++;return 0}};
 const used=new Set();let left=4;
 while(left>0){const secs=180-(4-left)*45;const k=await cdModal(secs,left,O,used);used.add(k);left--;await CD[k]()}
 await N('⏱ 00:00。燈亮了。');
 if(!S.ev.includes('stream')&&!S.ev.includes('tech')){
  await say('an','……問到的東西不夠用。我有跟小宇要過直播的備份，雖然只是糊糊的一小段——','normal');
  S.miss+=2;S.flags.assisted=1;await getEv('stream')}
 S.flags.cdDone=1;setBGM('inv');
 setBg('market');S.scene='market';
 await say('an','停電那三分鐘，有人不在她「應該在」的地方。……剩下的，就看妳能不能讓她自己說出來了。','normal');
}
/* ---------- talks ---------- */
async function talk2(p){
 if(p==='shan'){
  if(!S.flags.shanMet){S.flags.shanMet=1;
   await say('shan','許姐姐……謝謝妳願意接。','normal');
   await say('shan','我爸脾氣很直，也真的跟會長吵過架……可是他連殺雞都不敢看。','nervous');
   await say('shan','七點五十，我爸去自治會辦公室，隔壁攤的人聽到他在吼：「你把大家賣了！」出來以後，他就再也沒回攤位了。','nervous');
   await say('me','「你把大家賣了」——他在說什麼？');
   await say('shan','我不知道。可是我爸最近一直在翻攤位的登記文件，臉色很難看……','nervous');
   await say('shan','還有一件事。我爸在攤位底下有個祕密的地下儲藏室，放他的紅麴老滷。那是他的獨門秘方，只有地下室的陶甕裡才有。','normal');
   await say('shan','我跟警察說了，可是他們把攤位翻了兩遍，說只有水泥地。他們覺得我太緊張了……','nervous');
   await getEv('sauce');return}
  if(canAccuse()){await say('shan','偵探姐姐……找到我爸了嗎？','nervous');await N('（證據應該夠了。準備好就按「⚖️ 指認兇手」。）');return}
  await say('shan','我爸一定還活著……拜託妳。','nervous');const t=todoText();if(t.length)await N('（還需要：'+t.join('、')+'。）');return}
 if(p==='an'){
  if(!S.flags.anDone){
   if(!S.flags.anTalk){S.flags.anTalk=1;await say('an','還在懷疑我？……行，妳問。','normal')}
   const k=await crossExam('an','周予安的證詞：今晚',T.A);
   if(k==='leave')return;
   await say('me','連門都沒碰過？那這枚紅色放大鏡徽章，為什麼掉在會長辦公室的檔案櫃旁邊！你外套胸口那個位置——是空的。');
   await say('an','……！','broken',{shake:true});
   await say('an','……好。我進去過。八點五十左右，辦公室沒人、門也沒鎖。我是進去找東西的。','nervous');
   await say('me','找什麼？');
   await say('an','雲嶺開發買夜市的證據。兩個月前我就是為了這件事，才來這裡打工的。王會長，是他們在夜市的窗口。','normal');
   await say('me','那你剛才為什麼說謊？');
   await say('an','因為我怎麼知道，妳是不是雲嶺派來「收拾殘局」的人？','nervous');
   await say('me','我最近，看那朵雲看得夠多了。老街的案子裡，我也見過那個標誌。');
   await say('an','……老街？原來如此。','normal');
   await say('an','好，我們先說好：我不信妳，妳也別信我。但目標一致——別讓雲嶺借這件事，把整座夜市吞掉。','normal');
   await say('me','成交。各查各的，今晚先合作。');
   await say('an','還有，辦公室抽屜裡的東西，妳自己去看。','normal');
   S.flags.anDone=1}
  if(!S.flags.cdDone){const c=await choose([['⏱ 還原停電三分鐘','go','red'],['先不要','no']]);if(c==='go')await countdown();return}
  await say('an','我繼續去盯別的線索。有進展再來找我。','normal');
  if(canAccuse())await N('（證據應該夠了。準備好就按「⚖️ 指認兇手」。）');
  return}
 if(p==='ling'){
  if(!S.flags.lingMet){S.flags.lingMet=1;
   await say('ling','許小姐……傍晚才跟妳聊過，晚上就出這種事。會長的事，我到現在還不敢相信。','nervous');
   await say('me','請節哀。聽說，會長最信任的人就是妳。');
   await say('ling','我跟了他十二年，每一件事他都交給我辦……','nervous');
   await say('me','莊幹事，停電那三分鐘，妳人在哪裡？');
   await say('ling','停電的時候，我就站在舞台前面，一步都沒離開過。燈一黑，我還喊大家不要慌。','normal');
   await say('me','那貨櫃的鎖，是什麼時候鎖上的？');
   await say('ling','一定是停電那三分鐘，才有人把會長鎖進貨櫃的——誰有鑰匙，誰就是兇手。陳大海的攤位上就有鑰匙，不是嗎？','normal');
   await N('她說話的時候，視線一直避開小珊。');
   await N('我低頭整理筆記，目光落在她黑皮鞋的鞋底邊緣——那裡沾著一圈暗紅色、黏黏的污漬。聞起來，有八角和紅麴的味道。');
   await say('me','莊幹事，您的鞋子……');
   await say('ling','啊？剛剛在攤位那邊幫忙收拾，大概踩到誰家的滷汁了吧。夜市嘛，到處都是。','nervous');
   await N('（夜市到處都是滷汁……可是攤位上的滷汁，是黑褐色的。她鞋底這個，是暗紅色。）');
   await getEv('shoe');return}
  const opts=[['問：夜市都更的事','c']];if(S.ev.includes('sauce'))opts.push(['問：陳大海攤位的地下室','d']);opts.push(['問：停電時妳在哪','a'],['沒事了','x']);
  const v=await choose(opts);
  if(v==='c'){await say('me','夜市要都更的事，妳知道多少？');await say('ling','都更？我也是昨天看到公告才第一次聽說的。會長什麼都沒跟我提過。','normal');await say('ling','……所以大家才會這麼慌。','nervous');if(!S.flags.lingC){S.flags.lingC=1;await N('（昨天才第一次聽說……我先記下來。）')}}
  else if(v==='d'){await say('me','陳大海的攤位底下，有一個地下儲藏室。妳知道嗎？');await say('ling','地下室？他攤位底下有地下室？……我完全不知道。','normal');await say('ling','我連他的攤位都沒進去過，怎麼可能知道？','normal');if(!S.flags.lingD){S.flags.lingD=1;await N('（她回答得又快又肯定。）')}}
  else if(v==='a'){await say('ling','停電的時候，我就站在舞台前面，一步都沒離開過。','normal');await say('ling','貨櫃的鎖，一定是停電那三分鐘才被人鎖上的。','normal')}
  if(canAccuse())await N('（證據應該夠了。準備好就按「⚖️ 指認兇手」。）');
  return}
 if(p==='li'){
  if(!S.flags.liMet){S.flags.liMet=1;
   await say('li','許偵探。唉……陳大海那個人，我認識二十年，他不是那種人。','normal');
   await say('li','貨櫃，我只能讓妳看，不能碰。我剪開鎖的時候，會長已經冰得硬邦邦的了……','nervous');return}
  if(S.flags.cdDone){await say('li','該說的我都說了。找到大海，拜託了。','normal');return}
  await say('li','現在巷子裡人太多，等有空的時候再問我吧。我巡邏的事，我都記得。','normal')}
}
