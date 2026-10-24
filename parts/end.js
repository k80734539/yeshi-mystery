function seqModal(title,items,order){setPor(null);hideBox();return new Promise(res=>{const m=$('#modal');m.style.display='flex';$('#mtitle').textContent=title;const L=$('#mlist');L.innerHTML='';L.style.gridTemplateColumns='1fr';$('#mdesc').textContent='依「事情發生的先後順序」，一個一個點下去。點錯會扣一顆心。';$('#mbtns').innerHTML='';let n=0;
 items.forEach(([v,t])=>{const d=document.createElement('div');d.className='ev pz tl';d.dataset.v=v;d.textContent=t;onTap(d,()=>{if(d.classList.contains('used'))return;if(v===order[n]){SFX.tap();n++;d.classList.add('used');d.textContent=n+'. '+t;if(n>=order.length)setTimeout(()=>{m.style.display='none';L.style.gridTemplateColumns='';res(true)},window.__fast?0:350)}else{m.style.display='none';L.style.gridTemplateColumns='';res(false)}});L.appendChild(d)})})}
const TLO=['A','B','C','D','E','F'];
const TLI=[['C','遺體被鎖進後巷的冷凍貨櫃，掛鎖扣上'],['E','停電三分鐘——鑰匙被放進陳大海的攤位'],['A','19:50　陳大海在辦公室和會長大吵後離開'],['F','22:05　保全剪開貨櫃的鎖，發現遺體'],['B','會長在辦公室被獎盃重擊'],['D','21:32　莊美玲離開舞台，往後巷方向走去']];
async function accuse(){
 if(S.finalPend){S.finalPend=0;await N(`繼續跟莊美玲對質。（信用剩下 ${S.hearts} 顆心）`);S.flags.final=1;hearts();setBGM('final');return finale()}
 if(!S.ev.includes('hatch')){const c=await choose([['先指認，之後再說','go','red'],['再找找看','no']]);setPor(null);
  if(c==='no'){await N('（還有一個疑問……陳大海人在哪？攤位底下的地下儲藏室，進去看過了嗎？）');return}}
 if(!S.flags.hesit)await hesitate();
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
 const R=[T.F1,T.F2,T.F3,T.F4,T.F5];
 const AF=[
  async()=>{if(S.ev.includes('tech'))await say('me','燈光師說，21:32 妳拿著手電筒往後巷走了，停電時舞台前根本沒有妳！');if(S.ev.includes('stream'))await say('me','直播回放更清楚——停電那一瞬間，補光燈掃過整排前排觀眾，一件黃背心都沒有！而且 21:38，有個拿著手電筒和板夾的黃背心，走向了後巷。');await say('ling','唔……！','nervous',{shake:true});await say('ling','我、我是去了一下洗手間！很快就回來了！','nervous')},
  async()=>{await say('me','鎖是停電才扣上的？貨櫃的掛鎖上，結著一層厚厚的霜——冷氣要吹一個多小時才會這樣！');if(S.ev.includes('patrol'))await say('me','而且老李說，21:00 他巡邏時，鎖就已經扣著了！');await say('me','會長早在停電以前，就被鎖進貨櫃了。停電那三分鐘，不是殺人的時間，是「放鑰匙」的時間！');await say('ling','就、就算鎖得早，那也是陳大海做的！','nervous',{shake:true})},
  async()=>{await say('me','妳說昨天才聽說都更？這 31 份讓渡書的影本，「經辦人」欄簽的，是妳的名字——日期，是三個月前！');await say('ling','那、那是會長叫我簽的……我不知道那是……','broken',{shake:true});await say('me','每一份都簽了名，還影印留底。這叫不知道？')},
  async()=>{await Me('妳說，今晚沒有給任何人喝過烏梅湯？林嬸說，妳借了十二個瓶子，還要她「別跟人說」。傍晚，妳親手遞給我的那一瓶，瓶蓋印著「林嬸豆花」。','angry');await say('ling','……！那、那只是……','nervous',{shake:true});await Me('一件好事，為什麼要人別說？','determined');await say('ling','……因為，會長不喜歡我亂花錢……','nervous')},
  async()=>{await say('me','妳說，妳不知道他的攤位底下有地下室？那妳鞋底這圈暗紅色的黏漬，是什麼？');await say('me','攤位上賣的滷汁是黑褐色的。只有地下室陶甕裡的紅麴老滷，才是這種暗紅色！');await say('ling','…………！','broken',{shake:true})}];
 {const A0=AF[0];AF[0]=async()=>{if(S.ev.includes('granny'))await Me('吳阿嬤也看見了——停電沒多久，有個穿黃背心、拿著手電筒的女孩子，從後巷快步走出來，差點踩到她的腳！','determined');await A0()}}
 for(let j=S.finalR||0;j<R.length;j++){const r=R[j];const k=await crossExam('ling',`最終對質 ${j+1}/5：${r.title}`,r);if(k==='dead')return badEnd('hearts');if(k==='leave'){S.finalR=S.finalR||0;S.flags.final=0;S.finalPend=1;hearts();return}await AF[j]();S.finalR=j+1}
 S.finalR=0;
 await flash('真相大白！');
 await say('ling','……是啊。是我殺的。','broken',{shake:true});
 setBGM('inv');
 await Me('我想聽，為什麼。','sad');
 await say('ling','「莊記菜行」……那是我爸的攤位。07 號。他在這裡，賣了三十年的菜。','broken');
 await say('ling','十年前，會長說，這是「為了夜市好」，叫我爸簽了讓渡書。我爸以為，只是借出去，過一陣子就會還他。','broken');
 await say('ling','簽完那天晚上，他把攤位的鑰匙放在桌上，看了很久。之後，他再也沒有走進夜市一步。','broken');
 await scarf('我的手，不由自主地，按住了圍巾。');
 await say('ling','我跟了會長十二年。我以為，只要我做得夠好，總有一天，我可以把那個位置，替我爸買回來。','broken');
 await say('ling','去年，他叫我幫忙「整理」攤位登記，事成以後，讓我當下一任自治會長。我簽了三十一份。我騙了所有人，包括林嬸。','broken');
 await say('wang','（回憶）美玲，結束了。雲嶺那邊我已經談好，沒有妳的份——這件事，跟妳沒有關係了。','normal');
 await say('ling','十二年。「跟妳沒有關係」。……桌上，剛好有一座獎盃。','broken');
 await say('ling','陳大海發現，是我改了他的登記，衝進來吵的時候，我已經……我只好，也把他處理掉。','broken');
 await say('ling','我對林嬸好，是真的。我幫她貼的每一帖貼布，也是真的。可是我同時，也做了那些事。……兩個，都是我。','broken');
 setPor(null);
 await N('辦公室裡，很安靜。她沒有抬頭。');
 const sv=await stance('她說完了。我該對她說什麼？',{sym:'妳父親那一天的背影，我懂。可是妳最後，變成了簽字的那個人。',firm:'妳的痛是真的。可是被妳簽掉的三十一個人，他們的痛，也是真的。',calm:'我會把妳說的，一字不漏地，交給檢察官。'});
 S.flags.endSt=sv;
 if(sv==='sym')await say('ling','……是啊。我最恨的，變成了我自己。','broken');
 else if(sv==='firm')await say('ling','……我知道。所以，我才不敢看她們的眼睛。','broken');
 else await say('ling','……謝謝妳，願意聽完。','broken');
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
function rank(){const sc=Math.max(0,S.hearts*20-S.hints*5-S.miss*2+SECN()*3+(S.flags.wuDone?3:0));return [sc,sc>=100?'S':sc>=80?'A':sc>=55?'B':'C']}
async function goodEnd(){
 S.ended=true;$('#hs').innerHTML='';setBGM('good');SFX.win();
 await chapter('地下儲藏室');
 setBg('basement');$('#place').textContent='📍 福安夜市．地下儲藏室';
 await N('老李用鑰匙打開活板門的瞬間，一股八角和紅麴的味道湧了上來。');
 await say('shan','爸！！爸！！！','broken');
 await say('hai','……小珊……？妳怎麼……在這裡……','broken');
 await N('陳大海靠在陶甕旁，臉色蒼白，但還有呼吸。救護車很快就來了。');
 await say('hai','我只記得……喝了美玲給的烏梅湯，醒來就在這裡了。我一直敲，一直敲……沒有人聽見。','broken');
 await N('牆壁的水泥縫裡，用圖釘固定著一排小小的紙片。我湊近一看——全是收據的背面：燈籠、推車、戴帽子的老爺爺。每一張，都被人用膠帶，仔細貼平。');
 await say('hai','……她以為我不知道。她畫的每一張，我都收著。','normal');
 await say('hai','保留入學的事，我也知道。是我自己，翻到那封通知的。','normal');
 await say('shan','爸……！','broken');
 await say('hai','我說「小孩子別管」，是怕妳被大人的事拖住。結果……是我，把妳拖進來了。','broken');
 if((S.flags.shanArt||0)>=2){await say('shan','姐姐……妳那時候，真的沒有跟他說。','normal');await Me('我說過，我不會說。畫，繼續畫。','sad')}
 await say('li','（紅著眼眶）大海……對不起，我巡了那麼多次，都沒想到要掀開那塊地墊。','normal');
 await chapter('第三幕<br>代價');
 setBg('market','brightness(1.12)');$('#place').textContent='📍 福安夜市';S.flags.act3=1;
 await N('三天後。莊美玲被依殺人、妨害自由等罪名起訴。那 31 份讓渡書，被證實是冒簽偽造，全數撤銷。');
 await N('自治會重新改選。雲嶺開發的收購案，暫時凍結——福安夜市，保住了。');
 await N('可是，夜市裡，沒有一個人，笑得出來。');
 await N('黃燈籠重新亮起。林嬸坐在攤位後面，面前擺著兩碗豆花。一碗，擺在那張空椅子前面。');
 await say('lin','美玲那孩子……他們說，她要關很多年。','broken');
 await say('lin','我還是不敢相信。我膝蓋上，貼的，還是她的貼布。','broken');
 const dst=domStance();
 if(dst==='sym'){
  await say('lin','許小姐，妳坐。坐這張。今天，他不來了。','normal');
  await N('她把那張空椅子，輕輕拉到我旁邊。我坐下來，把那碗不加配料的豆花，慢慢吃完。');
  await say('lin','妳那天，跟我說，要陪著我。我後來才知道，那句話，是真的。','normal')}
 else if(dst==='firm'){
  await say('lin','許小姐，妳講話，還是那麼大聲。','nervous');
  await say('lin','可是那天，那些人想拿紙來逼我的時候，是妳，擋在我前面的。……謝謝妳。','normal');
  await N('她把那份「攤位預約讓渡意向書」，慢慢撕成兩半，再撕成四半。')}
 else{
  await say('lin','我請小珊，幫我找了一位律師。紙，簽不簽，我自己決定。','normal');
  await say('lin','妳那天，沒有叫我趕快決定。……這個，我記著。','normal');
  await N('她把那份意向書，放進圍裙口袋，拍了兩下。不簽，也不丟。')}
 await Me('林嬸，豆花，還是不加配料嗎？','normal');
 await say('lin','（笑）不加。配料，是在欺負豆花。','normal');
 await chapter('會面室');
 setBg('office','grayscale(.45) brightness(.7)');$('#place').textContent='📍 看守所．會面室';
 await N('隔著一片玻璃，莊美玲穿著素色的衣服，頭髮剪短了。');
 await say('ling','……妳來了。林嬸，還好嗎？','broken');
 await Me('她說，貼布很好用。');
 await say('ling','……那就好。','broken');
 await N('她低著頭，肩膀，輕輕地發抖。');
 await say('ling','我爸現在，在老人院。我跟他說，我「出遠門」。','broken');
 await say('ling','我請律師，把一個信封交給妳了。裡面，是 07 號攤位的鑰匙。如果有一天，夜市把攤位還給大家……可不可以，替我把它，放回去？','broken');
 if(dst==='sym')await Me('我會的。我會告訴他，他的女兒，做過很多好事。也做過，一件不能被原諒的事。','sad');
 else if(dst==='firm')await Me('我會替妳送到。可是這句話，妳得自己，親口告訴他。','determined');
 else await Me('我會替妳轉交。其他的，等判決吧。','normal');
 await N('我把那把小小的鑰匙，收進圍巾的口袋裡。它不重，卻很燙。');
 setBg('market');$('#place').textContent='';
 if(S.flags.wuDone)await N('遠處，吳阿嬤戴著那副修好的眼鏡，笑咪咪地，對一個年輕人揮手。');
 await say('an','……喏。','normal');
 await Me('這是什麼？');
 await say('an','妳之前，不是想看我的筆記嗎？只有今天這一頁。','normal');
 await showDoc('〈周予安的筆記　福安夜市〉\n\n18:40　第一次見到許晴。她緊張的時候，會摸圍巾。\n19:20　她說：線會告訴人，該去看哪裡。我說：線不是證據。\n20:55　她把三樣東西，連成一個人。我說不出她錯在哪，只知道，太快了。\n21:50　她蹲在階梯上，沒有哭。我給了她一罐紅茶。\n23:10　她說：「我錯了。」然後去道歉。\n　　　——我的紀錄裡，從來沒有這一行。\n'+(S.flags.anMom?'\n（另：我媽的店。那晚，我第一次想：也許，可以再開一次。）\n':'')+'\n結論：\n線不是證據。但她的線，會帶人，走到證據。\n（需要再觀察。）');
 await Me('「需要再觀察」？','normal');
 await say('an','紀錄，不改。','normal');
 await say('an','這次，算我欠妳一次。下次見，不要再擋我的路。','normal');
 await Me('……是你在擋我吧。','normal');
 setPor(null);
 if(S.ev.includes('yunling')){await N('我拿出那張採購名單，看著被撕掉的「收款人」欄。\n雲朵標誌底下，到底是誰，拿走了那一欄？')}
 await N('口袋裡，那張匿名的紙條還在。');
 setPor('me','point');await say('me','……這個字跡。');
 setPor(null);await N('我把紙條摺好，放回口袋。那個人，到底想讓我看見什麼？');
 const [sc,rk]=rank();const STY={sym:'💗 同情型偵探',firm:'🔥 強硬型偵探',calm:'❄️ 冷靜型偵探'}[domStance()];window.__score={sc,rk,hearts:S.hearts,hints:S.hints,miss:S.miss,secrets:SECN(),style:domStance()};try{localStorage.setItem('yeshi_clear','1');const ob=JSON.parse(localStorage.getItem('yeshi_best')||'null');if(!ob||sc>ob.sc)localStorage.setItem('yeshi_best',JSON.stringify({sc,rk,t:Date.now()}));if(S.ev.includes('yunling'))localStorage.setItem('yeshi_cloud','1')}catch(e){}
 await chapter(`GOOD END<br>〈夜市無聲〉<br><span style="font-size:16px">真相：莊美玲提前殺人、用冷凍貨櫃拖延死亡時間，再趁停電嫁禍陳大海</span><br><span style="font-size:18px">❤️ 剩餘心數 ${S.hearts}/5<br>💡 使用提示 ${S.hints} 次　❌ 失誤 ${S.miss} 次<br>🔑 聽見的祕密 ${SECN()}/5　${STY}<br>分數 ${sc}</span><br><span id="rank" style="font-size:54px;color:#ff5a4a">${rk}</span>`);
 $('#chap').style.display='flex';await sleep(window.__fast?100:2500);$('#chap').style.display='none';
 await N(`🏆 評價：${rk} 級（分數 ${sc}）\n心數 ×20 − 提示 ×5 − 失誤 ×2 ＋ 祕密 ×3 ＋ 支線 3\n你的風格：${STY}`);
 await choose([['再玩一次','r','red']]);location.reload();
}
/* ---------- prologue ---------- */
async function prologue(){
 setBg('market','brightness(.45)');setBGM('inv');
 await N('—— 序章 ——\n週六傍晚，台北。老街的案子才剛結束，事務所安靜得，連時鐘都有回音。');
 setPor('me','point');await say('me','我叫許晴，偵探。專長是找人、找東西，還有找出謊話。');
 setPor(null);await N('桌上，放著一條舊圍巾。左邊比右邊長一點。是我阿嬤織的。');
 await Me('……阿嬤。今天，我不接案了。','sad');
 await N('我把圍巾繞上脖子，在筆記本上，寫下一行字：\n「今晚，福安夜市，四十週年。」');
 await Me('小時候，阿嬤帶我去過一次。去吃一碗豆花吧。','normal');
 setPor(null)}
/* ---------- intro ---------- */
async function intro(){
 $('#title').style.display='none';await prologue();await chapter('第一幕<br>福安的傍晚');
 setBg('market');SFX.gong();S.scene='market';
 await N('18:30。福安夜市。四十年的老夜市，今晚掛滿了紅燈籠，空氣裡有油煙、糖水，和一點點，快要散場的味道。');
 await N('這一次，我只是個客人。');
 await N('🔍 點畫面上發光的地方調查；用下方按鈕，跟人說說話。\n📒 證物隨時可以在右上角查看；證詞卡關可以按「💡 提示」。\n（把該認識的人，都認識一遍，再往前走。）');
}
