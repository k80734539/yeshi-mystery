/* ---------- stance (同情 / 強硬 / 冷靜) ---------- */
const STL={sym:'💗 同情',firm:'🔥 強硬',calm:'❄️ 冷靜'},STX={sym:'sad',firm:'angry',calm:'normal'};
async function stance(prompt,o){
 await say('',prompt,null,{noWait:true});
 const b=$('#bar');b.innerHTML='';b.className='stc';b.style.display='flex';b.style.bottom=(box.offsetHeight+14)+'px';
 const v=await new Promise(res=>{['sym','firm','calm'].forEach(k=>{if(!o[k])return;const x=document.createElement('button');x.type='button';x.className='btn '+k;x.dataset.v=k;x.innerHTML='<small>'+STL[k]+'</small>';x.appendChild(document.createTextNode('「'+o[k]+'」'));onTap(x,()=>{ac();SFX.tap();b.style.display='none';res(k)});b.appendChild(x)})});
 b.className='';b.style.bottom='';
 S.flags['st_'+v]=(S.flags['st_'+v]||0)+1;
 await say('me','「'+o[v]+'」',STX[v]);return v}
const scarf=t=>N(t||'（我下意識摸了摸圍巾的流蘇。）');
function domStance(){const a=S.flags.st_sym||0,b=S.flags.st_firm||0,c=S.flags.st_calm||0;return b>a&&b>=c?'firm':a>=c&&a>b?'sym':c>=a&&c>=b&&(c>a||c>b)?'calm':(a>=b?'sym':'firm')}
const SECN=()=>['shanArt','linHusb','liDog','anMom','lingFather'].filter(k=>(S.flags[k]||0)>=(k==='shanArt'||k==='linHusb'||k==='liDog'?2:1)).length;
const A1REQ=['a_shan','a_lin','a_hai','a_ling','a_an'];
const a1ready=()=>A1REQ.every(k=>S.flags[k]);
/* ---------- Act 1 : 福安的傍晚 ---------- */
const A1={
 async shan(){
  S.flags.a_shan=1;
  await say('shan','啊——歡迎光臨！要什麼？……咦，姐姐是第一次來嗎？','normal');
  await Me('來過很多次。只是今天，我想換一家。');
  await say('shan','那一定要吃我爸的滷味！陳大海滷味，開了二十年，附贈一個很會講話的女兒。','normal');
  await N('攤位後面，一個繫著圍裙的中年男人頭也不抬，鍋鏟敲在鍋緣上：「少講話，多裝袋。」');
  await say('shan','（吐舌頭）那是我爸，陳大海。嘴巴很壞，心很軟。','normal');
  await Me('今天四十週年，生意應該很好吧？');
  await say('shan','客人是多啦……可是大家都怪怪的。姐姐妳看那張公告——','nervous');
  await say('shan','都市更新說明會。昨天才貼出來，說今晚要大家去聽。我爸看了一下午沒講話，我問他，他只說：「小孩子別管。」','nervous');
  await say('shan','我已經二十歲了耶……','nervous');
  await N('櫃檯上疊著一疊收據，背面用原子筆畫著夜市的小插畫——燈籠、推車、一個戴帽子的老爺爺。線條又快又準。她注意到我在看，手忙腳亂地把收據翻回正面。');
  const v=await stance('這些畫……是她畫的。要怎麼說？',{sym:'畫得真好。這不像隨手畫的，是花了很多時間的。',firm:'這種畫，不該塞在收據背面。拿給妳爸看啊。',calm:'線條很穩。學過畫畫？'});
  if(v==='sym'){S.flags.shanArt=2;
   await say('shan','……嗯。我上個月拿到美術系的錄取通知。','nervous');
   await say('shan','可是我爸一個人顧不了攤位，我就跟學校申請了保留入學。他不知道。他以為，我是自己想留下來幫忙的。','nervous');
   await say('shan','拜託，別跟我爸說。他知道了，一定會逼我去讀。可是，這裡……這裡也是我的家啊。','broken');
   await Me('我不會說。','sad');
   await scarf('我下意識摸了摸圍巾。有些人，把最想要的東西藏在背面。')}
  else if(v==='calm'){S.flags.shanArt=1;
   await say('shan','……以前補習班學過一點。沒什麼啦，打發時間而已。','nervous');
   await N('她說得很輕，可是她把那疊收據，壓在最底下。')}
  else{S.flags.shanArt=0;
   await say('shan','不要！！','broken',{shake:true});
   await say('shan','……對不起，我不是故意大聲。這個，不用妳管。','nervous');
   await N('她把那疊收據抱在胸前，後來整整一分鐘，都沒有再看我一眼。');
   await Me('（我又太急了……）','sad')}
  await say('shan','總之，姐姐今天好好逛！那邊的林嬸豆花超好吃，吃完記得回來付錢——哦不對，先付錢！','normal');
  await N('（可以去找林嬸、陳大海、莊美玲、雞排攤的年輕人聊聊。她們都在這條街上。）');
 },
 async lin(){
  S.flags.a_lin=1;
  await N('豆花攤前掛著一盞小小的黃燈籠。三張矮桌，一個老婦人正把豆花舀進碗裡，動作又慢又穩。');
  await say('lin','來啦來啦，坐。糖水自己加，不夠說。','normal');
  await Me('一碗豆花，只要糖水。');
  await say('lin','不加配料？……跟我家那口子一樣。他說，配料是在欺負豆花。','normal');
  await N('第一口，甜得剛剛好，像有人輕輕握住舌尖。我低下頭，把圍巾往上拉了一點。');
  await Me('……很好吃。跟小時候的味道，一樣。','sad');
  await say('lin','這個攤子，我先生賣了三十年。他走了以後，換我。','normal');
  await N('她從圍裙口袋，抽出一張摺了又摺的紙，遞過來。');
  await say('lin','妳是讀書人，幫我看看這個……我老花，字太小。','nervous');
  await N('紙上印著一朵雲，標題是「攤位預約讓渡意向書」。預約金，二十萬元。簽名即生效。');
  await say('lin','昨天來了個穿西裝的年輕人，說夜市要整修，我這種老攤位，不如趁現在拿筆錢，回家享清福。','normal');
  await say('lin','可是……這個攤子，是我先生留下來的。我又想，我的膝蓋，晚上站一整夜，也痛得要命……','nervous');
  await Me('（這張紙，我認得。這朵雲，也認得。）','sad');
  await N('阿嬤的雜貨店被「收購」的那一年，有個穿西裝的人，也是這樣笑咪咪地說：「為了您好」。');
  await N('她簽了字。簽字的隔天，把鑰匙放在桌上，看了很久。之後她很少說話，也很少再走出家門。');
  const v=await stance('林嬸看著我，等一個答案：「妳覺得，我該簽嗎？」',{sym:'不要簽。這個攤子，是妳跟先生一起撐起來的，不是一張紙就換得掉的。',firm:'不能簽！那些人只會騙妳，一簽下去就回不來了！',calm:'先別簽。找個懂合約的人，一條一條看過，再決定。'});
  if(v==='sym'){S.flags.linHusb=2;
   await say('lin','……妳這孩子，眼睛都紅了。','nervous');
   await say('lin','告訴妳一個祕密。妳看那邊——燈下面那張空椅子。','normal');
   await say('lin','每天收攤以前，我都會多盛一碗，不加配料，擺在那裡，一直擺到收攤。他走了十年，我還是改不掉。','normal');
   await say('lin','這個攤子要是沒了，那張椅子，也就沒有地方放了。','broken');
   await N('我沒有說話。只是把那碗豆花，一口一口吃完。')}
  else if(v==='calm'){S.flags.linHusb=1;
   await say('lin','……好，好。我再想想。謝謝妳啊，沒有叫我趕快決定。','normal');
   await N('她把紙摺回去，放進圍裙口袋，拍了兩下，像在安撫什麼。燈下面有一張空椅子，她沒有提。')}
  else{S.flags.linHusb=0;
   await say('lin','……妳這孩子，跟他們一樣，都想替我決定。','nervous');
   await say('lin','我吃的鹽，比妳吃的飯還多。我知道不能簽。可是，不用妳來吼我。','nervous');
   await Me('（……我又犯了。明明是自己最討厭的事。）','sad')}
  await N('（林嬸的豆花攤。今晚一直在這裡。）');
 },
 async hai(){
  S.flags.a_hai=1;
  await N('滷味攤後面，陳大海正低頭翻動滷鍋。四十多歲，手臂上好幾道燙傷的疤，像舊地圖。');
  await say('hai','小珊說，妳是偵探。我們這種地方，有什麼好查的？','normal');
  await Me('我是來吃東西的。只是……職業病，看到公告就會想知道，是誰貼的。');
  await say('hai','（哼了一聲）昨天貼，今天開會。叫我們去「聽」，沒有人問過我們要不要。','normal');
  await N('他從圍裙口袋掏出一疊影本，啪地擱在玻璃櫃檯上。最上面一張的角落，有他的名字。');
  await say('hai','這是我攤位的登記影本。我簽過的字，我自己認得——這個，不是我寫的。','nervous');
  await Me('有人冒簽你的名字？');
  await say('hai','我不知道！所以我要去問清楚。','nervous');
  await N('牆上被油煙燻黃的角落，貼著一張小小的插畫：一個小女孩，牽著爸爸，站在夜市口。他發現我在看，哼了一聲，把圍裙解下來。');
  await say('hai','小珊她知道這個攤位的事，一知半解。她不用知道。我去找王會長，今晚就談清楚。','normal');
  await say('hai','（對女兒喊）小珊！我離開一下！','normal');
  await say('shan','爸？你去哪——','nervous');
  await N('他把鐵捲門拉下一半，掛上一塊「休息十分鐘」的牌子，大步走向自治會辦公室。那是 19:50。');
  S.flags.haiGone=1;
 },
 async ling(){
  S.flags.a_ling=1;
  await N('一個穿黃色螢光背心的女人，抱著板夾在人群裡穿梭，腰上掛著手電筒。她看到我，笑著走過來。');
  await say('ling','妳是新面孔吧？我是自治會幹事莊美玲，今晚的流程都歸我管。喝點東西嗎？烏梅湯，自治會招待。','normal');
  await N('她遞來一個保特瓶，瓶蓋上印著四個字：「林嬸豆花」。');
  await say('ling','林嬸借我們的回收瓶，環保！','normal');
  await Me('謝謝。——妳在這裡工作很久了？');
  await say('ling','十二年。會長把這個夜市交給我，我一天也不敢鬆懈。','normal');
  await N('她說話的時候，一個攤商過來問停車證怎麼補辦，她笑著接過去；隔壁攤的老婦人腳不舒服，她蹲下去，從口袋掏出一小包痠痛貼布，貼在人家膝蓋上。');
  await say('ling','夜市就像一個家，誰有困難，大家都會幫。','normal');
  await Me('都更的事，自治會怎麼看？');
  await say('ling','都更？我也是昨天看公告才第一次聽說。會長什麼都沒跟我提過，我心裡也很亂。','nervous');
  await Me('（她說得很自然。這個人，是真的在乎這裡吧。）');
  await say('ling','對了，要是看到迷路的老人家，麻煩幫忙留意一下喔。今天人多。','normal');
  await N('她走遠以後，我才發現，手上那瓶烏梅湯，我一口也還沒喝。我把它放進了包包。');
 },
 async an(){
  S.flags.a_an=1;
  await N('雞排攤的油鍋滋滋作響。一個年輕人一邊翻鍋，一邊盯著手裡的筆記本。他的圍裙上，別著一枚紅色放大鏡的小徽章。');
  await say('an','一塊七十。要辣嗎？','normal');
  await Me('不要辣。——你的筆記本，是在記帳嗎？');
  await say('an','（闔上本子）打工的人，都會記點東西。','normal');
  await Me('我也有一本。我習慣一邊聽人說話，一邊把人跟人、話跟話連起來。誰說了什麼，跟誰對得上。');
  await say('an','連起來的線，不是證據。','normal');
  await Me('但線會告訴我，該去看哪裡。');
  await say('an','線只會讓妳看見「想看見」的地方。證據才會告訴妳「發生過什麼」。……靠感覺走路的人，我見多了。','normal');
  await Me('那你靠什麼？','angry');
  await say('an','時間、數字、紀錄。人會說謊，時間不會。','normal');
  await Me('人會說謊，所以才要聽聽他為什麼說謊。','determined');
  await say('an','……雞排好了。','normal');
  await N('我們互看了一眼，各自覺得對方很麻煩。');
 },
 async cai(){
  if(!S.flags.a_cai){S.flags.a_cai=1;
   await say('cai','雞排！脆！嫩！……小周！你這樣排雞排，客人還要不要吃！','normal');
   await say('cai','哎呀，抱歉，嚇到妳了。我是隔壁這攤的蔡老闆。小周這孩子，兩個月前來打工，做事很認真，就是話太少，一天講不到十句。','normal');
   await say('cai','這個夜市，我看過它從三十攤變成七十攤。現在說要拆？我女兒學費還沒繳完咧。','normal');
   await Me('蔡老闆很擔心？');
   await say('cai','擔心有什麼用，我們只是賣雞排的。……會長人是不壞啦，只是他最近，講話都很小聲。','normal');return}
  if(S.flags.haiGone&&!S.flags.cai2){S.flags.cai2=1;
   await say('cai','大海剛剛走得那麼快，鐵捲門只拉一半，還特地掛牌子。……他就是這種人，再氣也要掛牌子。','normal');return}
  await say('cai','要不要再來一份？算妳八折！','normal')},
 async li(){
  if(!S.flags.a_li){S.flags.a_li=1;
   await say('li','小姐，逛得開心？我是保全老李，夜市的巡邏，歸我管。','normal');
   await say('li','後面那個冷凍貨櫃，是會長下午叫人運進來的，放慶典的冰品。鎖是他自己扣的，鑰匙就那一把，他放在身上。','normal');
   await N('他說話的時候，西裝口袋裡的塑膠袋沙沙作響。像是什麼骨頭。');
   await say('li','（發現我在看，輕咳一聲）咳。沒、沒什麼。','nervous');return}
  await say('li','有事再叫我。我去巡邏。','normal')},
 async wu(){
  if(!S.flags.wuQ){S.flags.wuQ=1;
   await N('牆邊的塑膠椅上坐著一位白髮老奶奶，兩手在膝蓋上摸索著，像在找什麼。');
   await say('wu','小姐……小姐，妳有沒有看到我的眼鏡？黑色的，圓圓的，用橡皮筋綁在鏡腳上。','nervous');
   await say('wu','我孫子今天要來夜市找我，我沒有眼鏡，認不得他……','nervous');
   await Me('我幫您找。您剛才去過哪些地方？');
   await say('wu','先去吃了豆花，然後去看那個大公告板。大家都圍著看，我也去看，可是字太小，我就把眼鏡拿下來擦……然後就……','normal');
   await N('（支線：幫吳阿嬤找眼鏡。找找看有發光的地方。）');return}
  if(S.flags.wuDone){await say('wu','小姐，我孫子來過囉，一直誇我的眼鏡很帥！','normal');return}
  if(S.flags.wuFixed){
   await N('我把修好的眼鏡，輕輕戴回她臉上。');
   await say('wu','啊……看得見了。一個一個，都看得見了。燈籠是紅的，豆花是白的——還有，妳。','normal');
   await say('wu','小姐，妳的圍巾，真好看。誰織的？','normal');
   await Me('我阿嬤。……她最後那個冬天，一針一針織的。','sad');
   await say('wu','織得有一點歪，對不對？','normal');
   await Me('……對。左邊比右邊長。','sad');
   await say('wu','歪歪的，才暖。妳阿嬤，一定很疼妳。','normal');
   await scarf('我握住圍巾的流蘇，鼻子忽然有點酸。');
   await N('吳阿嬤從塑膠袋裡掏出一顆花生麻糬，硬塞進我手裡：「吃，不要客氣。我孫子買太多了。」');
   await N('那顆麻糬，是溫的。');
   S.flags.wuDone=1;return}
  if(S.flags.wuFound){
   await N('我把找到的眼鏡遞給她——右邊的鏡腳，被人踩彎了，戴不上去。');
   await say('wu','啊，眼鏡……可是，彎了。彎了就戴不牢了……','nervous');
   await Me('我找人幫您修。請在這裡等我。');
   S.flags.wuWait=1;return}
  if(S.flags.wuWait){await say('wu','我在這裡等，不會亂走。','normal');return}
  await say('wu','小姐，我的眼鏡……還沒找到嗎？','nervous')}
};
const A1CHAT={
 shan:[[['shan','妳今晚想吃什麼，我偷偷幫妳多加一顆滷蛋。','normal']],[['shan','我爸罵人很大聲，可是他每次吵完都會偷偷煮宵夜。','normal']]],
 lin:[[['lin','今天人真多。多吃點，豆花不要錢的時候最好吃。','normal']],[['lin','妳要常常來啊。這條街上，有人認得妳的臉，就有地方可以回來。','normal']]],
 ling:[[['ling','活動順序都排好了，只等燈光秀。','normal']],[['ling','要幫忙的話，隨時跟我說。','normal']]],
 an:[[['an','別擋在油鍋前面。','normal']],[['an','……妳的線，連完了嗎？','normal']]]};
async function a1chat(p){const L=A1CHAT[p];if(!L)return;const n=(S.flags['cc_'+p]||0);S.flags['cc_'+p]=n+1;for(const [w,t,e] of L[n%L.length])await say(w,t,e)}
async function a1secret(p){
 if(p==='shan'){
  await say('me','收據背面的那些畫……我真的覺得很好看。','normal');
  await say('shan','……真的嗎？','nervous');
  await say('shan','我上個月，拿到美術系的錄取通知。我申請保留入學，沒有告訴我爸。','nervous');
  await say('shan','他以為，我是自己想留下來顧攤位的。','broken');
  await Me('我不會說。畫，繼續畫。','sad');S.flags.shanArt=2;return}
 if(p==='lin'){
  await say('me','林嬸，燈下面那張空椅子……是給誰的？','normal');
  await say('lin','……妳看出來啦。','nervous');
  await say('lin','每天收攤前，我都多盛一碗，不加配料，擺給他。他走了十年了，我還是改不掉。','normal');
  await Me('那碗豆花，會一直在那裡。','sad');S.flags.linHusb=2;return}
}
async function a1talk(p){
 const first={shan:'a_shan',lin:'a_lin',hai:'a_hai',ling:'a_ling',an:'a_an'}[p];
 if(p==='an'&&S.flags.wuFound&&!S.flags.wuFixed&&S.flags.a_an){
  await Me('可以借你的螺絲起子嗎？這副眼鏡的鏡腳，彎了。');
  await say('an','（看了眼鏡一眼，從工具包裡拿出一把迷你起子）……這種事，不用借。','normal');
  await N('他低下頭，三兩下把鏡腳扳直，再把螺絲拴緊。動作俐落得像在拆解一個小機器。');
  await say('an','告訴那位奶奶，最好多買個備用的。','normal');
  await Me('你還挺會修東西的。');
  await say('an','……以前常常修。','nervous');
  S.flags.wuFixed=1;S.flags.wuWait=0;return}
 if(first&&!S.flags[first])return A1[p]();
 if(p==='hai'){await N('攤位的鐵捲門拉了一半，上面掛著「休息十分鐘」的牌子。');return}
 if(['cai','li','wu'].includes(p))return A1[p]();
 const opts=[['聊聊','chat']];
 if(p==='shan'&&(S.flags.shanArt||0)<2)opts.push(['追問：收據背面的畫','sec']);
 if(p==='lin'&&(S.flags.linHusb||0)<2)opts.push(['追問：燈下面的空椅子','sec']);
 opts.push(['沒事了','x']);
 const v=await choose(opts);
 if(v==='chat')await a1chat(p);else if(v==='sec')await a1secret(p);
 if(a1ready()&&!S.flags.a1hint){S.flags.a1hint=1;await N('（該認識的人，差不多都聊過了。舞台那邊，燈光秀快開始了。）')}}
/* ---- Act 1 hotspots ---- */
async function a1notice(){
 await N('夜市入口的看板上，貼著一張大紅公告：《福安夜市　都市更新說明會》。');
 await N('底下的日期，是【昨天】。');
 await N('攤商們三三兩兩圍在看板前，臉色都很難看。有人小聲說：「這種事，怎麼昨天才說……」');
 if(S.flags.wuQ&&!S.flags.wuFound){await N('看板底下的石板縫裡，有個黑色的東西在反光——是一副圓框老花眼鏡，右邊的鏡腳被人踩彎了。');S.flags.wuFound=1;await N('（找到吳阿嬤的眼鏡了。）')}
 await getEv('notice')}
async function a1bench(){
 await N('路邊的木長椅。我坐下來，把剩下的豆花湯底，慢慢喝完。');
 if(S.flags.wuQ&&!S.flags.wuFound)await N('椅子上、椅子底下，都沒有眼鏡。（吳阿嬤說，她後來是去看公告板的。）');
 else await N('遠處傳來攤商的叫賣聲，油煙混著糖水的味道。這條街，有人認得我的臉嗎？我想。');}
/* ---- Act 1 → Act 2 ---- */
async function act1End(){
 S.flags.a1done=1;setBGM('inv');
 await chapter('21:30<br>燈光秀');
 setBg('stage');S.scene='market';
 await N('夜市舞台的燈光亮起來。大螢幕上播放著「福安夜市四十週年」的影片，會長王仲義的笑臉，掛在最中間。');
 await N('可是，真人沒有上台。');
 await say('shan','奇怪……我爸去找會長談，到現在都沒回來。手機也打不通。','nervous');
 await Me('別急。也許只是談得久。');
 await scarf('嘴上這麼說，我卻不由自主地摸了摸圍巾。');
 await say('an','（不知什麼時候，站到我身後）會長的致詞，排在 21:45。','normal');
 await Me('你怎麼知道流程？');
 await say('an','舞台旁邊貼著流程表。——妳連別人說的話都要連起來，卻不看牆上貼的？','normal');
 await Me('……你這個人，真的很欠揍。','angry');
 await say('ling','（匆匆走過來）各位別擔心！會長臨時有事，致詞改播影片！','normal');
 await N('她對我們點頭微笑，拿著手電筒，往後巷的方向走去。時間是 21:32。');
 await N('21:40。');
 SFX.blackout();setBg('stage','brightness(.12)');
 await N('「啪」——整座夜市的燈，同時熄滅。');
 await N('黑暗裡，有人驚呼，有人笑，有人喊「不要擠」。有一個人，從我身邊用力擦過去。');
 await N('肩膀被撞到的瞬間，我外套口袋裡，多了一樣東西。');
 await sleep(window.__fast?20:900);
 await N('三分鐘後，燈亮了。');
 setBg('market');
 await N('我把手伸進口袋——是一張摺成四折的紙條。沒有署名，原子筆字跡很工整：\n「福安夜市的案子，別被鑰匙騙了。去看貨櫃鎖上有沒有霜。」');
 await Me('……這個字跡。','surprised');
 await N('我盯著紙條很久，然後把它摺好，放回口袋。');
 await getEv('note');
 await chapter('第二幕<br>鎖在貨櫃裡的謊');
 S.flags.act2=1;setBGM('inv');
 await N('22:05。後巷傳來保全老李的叫聲。');
 await N('冷凍貨櫃的掛鎖被剪開了——會長王仲義倒在裡面，已經沒有呼吸。');
 await N('警察封鎖了夜市。所有人，都被圈在原地等筆錄。');
 await N('貨櫃的鑰匙，在陳大海攤位的玻璃櫃檯上被找到。而陳大海，從 19:50 離開以後，就再也沒有人見過他。');
 await say('shan','許姐姐！！','broken');
 await say('shan','警察說，我爸是兇手……他們說鑰匙在他攤位上……可是我爸他連殺雞都不敢看啊！','broken');
 await Me('小珊，冷靜一點。先告訴我，警察怎麼說。');
 await say('shan','我認識分局的叔叔，他偷偷告訴我——','normal');
 await getEv('body');await getEv('blackout');
 await say('shan','所以他們認定，是我爸趁停電那三分鐘動手的……','nervous');
 await say('shan','拜託妳。我知道這很不專業……可是，今天傍晚，妳是第一個沒有叫我「小孩子別管」的人。','broken');
 await Me('（我低頭，看見自己的手，在發抖。）','sad');
 await Me('好。我接。','determined');
 await say('an','（雙手插在口袋，走了過來）妳要接？','normal');
 await Me('你有意見？');
 await say('an','雲嶺開發最近很愛派「顧問」去各個老市場。這麼剛好，這種時候冒出一個要「幫陳大海」的人。','normal');
 await Me('傍晚才認識的人，這麼快就想懷疑我？');
 await say('an','我只相信紀錄。傍晚的事，沒有紀錄。','normal');
 await say('shan','你們兩個，不要吵啦！','nervous');
 await say('an','總之，我也不相信陳大叔是兇手。他請我吃過滷蛋。','normal');
 await Me('在查清楚你是誰之前，我不會把背對著你。');
 await say('an','彼此彼此。','normal');
 setPor(null);
 await N('🔍 點畫面上發光的地方調查；用下方按鈕跟人說話。\n📒 證物隨時可以在右上角查看；證詞卡關可以按「💡 提示」。');
 S.scene='market'}
