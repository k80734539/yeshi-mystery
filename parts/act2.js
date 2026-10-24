/* ---------- Act 2 : 錯誤的推理、低谷、翻轉 ---------- */
const L1={title:'許晴的筆記：林嬸',desc:'把證物和推論連起來。點左邊一張，再點右邊相關的一張。',okText:'✔ 三條線，都指向她',
 L:[['bottle','🧃 空瓶：瓶蓋印著「林嬸豆花」，瓶口有白色粉末'],['draft','📝 會長草稿：林嬸，是最後一個沒簽的人'],['lintest','👀 蔡老闆：20:50，林嬸提著一袋空瓶進後巷']],
 R:[['means','💊 手段：藥是下在她的瓶子裡'],['motive','😠 動機：會長要強制處理她的攤位'],['chance','🕗 機會：她進過後巷——貨櫃就在那裡']],
 E:[['bottle','means','瓶子是林嬸的。藥，就是從她的瓶子下的。'],['draft','motive','會長要奪走她先生留下的攤子。她有理由恨他。'],['lintest','chance','她進過後巷。而貨櫃，就在後巷。']]};
const L1b={title:'重新連線：林嬸',desc:'拆掉舊的線，重畫。這一次，先聽人說完。',okText:'✔ 線，換了一個方向',
 L:[['b','🧃 瓶蓋印著「林嬸豆花」'],['t','👀 蔡：20:50 林嬸提著空瓶進後巷'],['m','🍵 傍晚，美玲遞給我的烏梅湯'],['s','🤐 林嬸：「我答應過她，不能說」']],
 R:[['r1','林嬸把十二個瓶子，借給了美玲'],['r2','空瓶，是美玲託林嬸送去後巷口的'],['r3','烏梅湯的瓶蓋，一模一樣印著「林嬸豆花」'],['r4','美玲請她：「別跟人說」']],
 E:[['b','r1','瓶子是林嬸的，可是借出去的人是美玲。'],['t','r2','林嬸進後巷，是替別人送瓶子。巷口，不是貨櫃。'],['m','r3','傍晚，美玲遞給我的那一瓶，瓶蓋就是同一種。'],['s','r4','林嬸沒有心虛。她只是守著一個承諾。']]};
const L2={title:'許晴的筆記：莊美玲',desc:'在按下「指認」之前，再連一次線。',okText:'✔ 我知道她是誰了',
 L:[['p07','🖼️ 十週年合照：「莊記菜行」攤位 07'],['yl','📜 雲嶺明細：第一筆，攤位 07'],['fm','📄 三十一份讓渡書：經辦人莊美玲'],['lin','🧓 林嬸：「她一筆一筆，幫我填表」']],
 R:[['q1','07，是她爸爸的攤位'],['q2','她比誰都清楚，被賣掉是什麼滋味'],['q3','然後她自己，成了那支筆'],['q4','她對別人的好，也是真的']],
 E:[['p07','q1','合照裡的男人是莊記菜行的老闆。莊記，莊美玲。'],['yl','q2','她父親的攤位，是被賣掉的第一筆。'],['fm','q3','三十一份。每一份，都簽著她自己的名字。'],['lin','q4','貼布、表格、停車證。那些，不是裝的。']]};
async function chk(){if(S.flags.linWrong)return;if(['bottle','draft','lintest'].every(k=>S.ev.includes(k)))await linWrongIntro()}
async function linWrongIntro(){
 S.flags.linWrong=1;setBGM('test');
 await N('……三樣東西，放在筆記本的同一頁。');
 await Me('空瓶，瓶蓋印著「林嬸豆花」。會長桌上的草稿，說林嬸是最後一個沒簽的人。蔡老闆說，20:50，她提著一袋空瓶進了後巷。','normal');
 await Me('有手段，有動機，有機會。……三條線，連在同一個人身上。','determined');
 await linkScreen(L1);
 await Me('（我把筆尖，重重地點在「林嬸」兩個字上。）','determined');
 await N('一個人影，從轉角的暗處走了出來。');
 await say('an','妳那三條線，連得很漂亮。','normal');
 await Me('你偷聽？','angry');
 await say('an','我只是剛好站在這裡。——瓶蓋印著誰的名字，只能說明「瓶子經過誰的手」，不能說明「誰下的藥」。','normal');
 await Me('那她為什麼要提著一袋瓶子去後巷？','angry');
 await say('an','所以才要問。不是「指控」，是「問」。這兩個，在老人家的耳朵裡，是不一樣的東西。','normal');
 await Me('我只是去問。','angry');
 await say('an','妳問的方式，就叫指控。……至少，等我確認過時間再去。','normal');
 await Me('等你？這種時候，每一分鐘，大海都可能……','angry');
 await say('an','——妳是在急，還是在怕？','normal');
 await Me('……！','surprised');
 await N('我沒有回答。我把筆記本合起來，轉身，往豆花攤的方向走去。');
 await linExam()}
async function linExam(){
 go('market');
 await N('豆花攤的黃燈籠，還亮著。林嬸坐在矮凳上，把一碗沒賣出去的豆花，慢慢推到一旁。');
 await say('lin','……許小姐，又來吃豆花嗎？','normal');
 await Me('林嬸，我想請教，今晚的事。','normal');
 const k=await crossExam('lin','林嬸的證詞：今晚',T.L);
 if(k==='leave')return;
 await Me('二十點五十分，蔡老闆親眼看見，妳提著一大袋空瓶，走進後巷。妳剛才說，連後巷長什麼樣子都沒看過？','angry');
 await say('lin','……！','nervous',{shake:true});
 await Me('瓶子是妳的。人是妳去的。會長桌上，還有一份要強制處理妳攤位的草稿。','determined');
 await say('lin','我……我不是……','broken');
 await N('四周的攤商，一個一個，圍了過來。');
 const v=await stance('林嬸的嘴唇在發抖。圍過來的人越來越多。我要怎麼問下去？',{sym:'林嬸，我知道妳很為難。把實話告訴我，我會陪著妳。',firm:'瓶子是妳的，人是妳看到的，藥呢？現在說，還是等警察來問！',calm:'我只想知道，那袋瓶子，是要送去給誰的。'});
 if(v==='sym'){
  await say('lin','我……我不能說……我答應過人家……','broken');
  await Me('（答應過誰？……為什麼不能說？）','sad');
  await N('她只是搖頭，眼淚一滴一滴，落在沒有賣出去的豆花裡。')}
 else if(v==='firm'){
  await say('lin','不是……我沒有……','broken',{shake:true});
  await N('她的手按住胸口，整個人慢慢縮了下去，蹲在地上，打翻了那碗豆花。白色的湯汁，順著石板縫，流了一地。');
  await say('wu','啊呀……','nervous');
  await N('有人大喊：「叫救護車啊！」');S.flags.linCollapse=1}
 else{
  await say('lin','……我答應過人家，不能說。','nervous');
  await N('她說完，就把頭低了下去，再也沒有看我。人群裡，有人小聲地說：「果然有鬼。」');
  await say('cai','我就說嘛，那種老人家，最會裝可憐。','normal')}
 await say('shan','（衝過來，擋在林嬸面前）夠了！！','broken',{shake:true});
 await say('shan','林嬸是看著我長大的！我請妳來找我爸，不是來逼一個老人家的！','broken');
 await Me('我只是……','sad');
 await say('shan','妳憑什麼認定是她？！就憑一個瓶子？！','broken');
 await N('我說不出話來。因為，我確實，只有一個瓶子。');
 await say('lin','……小珊，別怪她。是我自己，不好。','broken');
 await N('林嬸扶著桌角，慢慢站起來。她把圍裙解下來，一摺、兩摺，疊得整整齊齊，放在攤位上。');
 await say('lin','今天不做了。……那張紙，我簽。留著這個攤子，有什麼用呢。','broken');
 await Me('林嬸，不要——','sad');
 await say('lin','妳們每個人，都想替我決定。我自己決定一次，不行嗎？','broken');
 await N('黃燈籠，被她伸手，一盞一盞，熄掉了。');
 S.flags.linHit=1;S.flags.linClosed=1;S.flags.shanCold=1;S.miss+=2;
 await lowPoint()}
async function lowPoint(){
 setBGM(null);setBg('stage','brightness(.5)');S.scene='market';
 await chapter('低谷');
 await N('舞台側邊的階梯，沒有人。遠處警車的紅藍光，一閃，一閃，沒有聲音。');
 await Me('……我又這樣了。','sad');
 await scarf('我下意識去摸圍巾，手指卻停在流蘇上。');
 await N('阿嬤的雜貨店被「收購」那年，她坐在店門口，看著新的招牌被掛上去。簽字的那個人，一直在說：「為了您好。」');
 await N('她最後一個冬天，一針一針，織了這條圍巾。左邊比右邊長。');
 await N('那時候，我是個大學生。只會哭，只會罵，卻不知道，該去問誰。');
 await Me('我發過誓。不會再讓任何人，被一張紙，奪走他最重要的東西。','sad');
 await Me('結果今晚，拿著那張紙去逼人的，是我。','sad');
 await Me('我連她為什麼不說，都沒有問。','sad');
 await N('我把臉埋進圍巾裡。它還有一點點，豆花的味道。');
 await sleep(window.__fast?20:700);
 await N('一罐溫熱的紅茶，輕輕放在我旁邊的階梯上。');
 await say('an','喝。','normal');
 await Me('……你是來看我笑話的嗎？','sad');
 await say('an','不是。我說過，線不是證據。','normal');
 await say('an','但我後來去量了。從豆花攤走到貨櫃，來回九分鐘。蔡老闆說，林嬸 21:00 就回來收碗了，沒離開過五分鐘。','normal');
 await say('an','她進後巷，是真的。可是，她去的地方，不是貨櫃。','normal');
 await Me('……所以，我剛剛，是在欺負一個沒做錯事的人。','sad');
 await say('an','妳是在犯一個「所有聰明人都會犯」的錯——太快相信，自己連出來的線。','normal');
 await Me('你好像，說得很有經驗。','sad');
 await say('an','……我也犯過。以後再說。','nervous');
 await say('an','走吧。去跟她道歉。道完歉，再問一次——這次，換個問法。','normal');
 await Me('……為什麼幫我？','sad');
 await say('an','我不是幫妳。我的紀錄裡，還缺她那一段。','normal');
 await N('我低頭，笑了一下。這個人，比我以為的，笨一點。');
 await Me('……謝謝。','sad');
 await say('an','不用。……還有，妳剛剛，一直在摸圍巾。難過的時候，不要一個人坐在這種地方。','nervous');
 await Me('……你的筆記本，有寫這個嗎？','normal');
 await say('an','（把本子塞進口袋）沒有。','normal');
 S.flags.lowDone=1;setBGM('inv');setBg('market');
 await Me('（深呼吸。去道歉。這一次，換個問法。）','determined')}
async function linApology(){
 go('market');
 await N('豆花攤的燈籠暗著。林嬸坐在攤位後面的矮凳上，圍裙擱在膝蓋上。她抬頭看見我，沒有說話。');
 const v=await stance('我該先說什麼？',{sym:'對不起。我只想著把線連起來，沒有想過，被連起來的，是一個人。',calm:'我誤會妳了，非常抱歉。如果妳願意，我想聽聽，那袋瓶子的事。',firm:'我錯了。但這件事，壓不得。說出來，我跟妳一起扛。'});
 if(v==='sym'){
  await say('lin','……傻孩子。','normal');
  await say('lin','妳坐。這碗，我本來要擺給他的——今天先給妳。','normal');
  if((S.flags.linHusb||0)<2){S.flags.linHusb=2;await say('lin','他叫我家那口子，走了十年了。我每天收攤前，都多盛一碗，擺在那張椅子上，擺到收攤。','normal')}
  await N('我接過那碗豆花。很燙，也很甜。')}
 else if(v==='calm'){
  await say('lin','……妳這孩子，連道歉，都這麼有條理。','normal');
  await say('lin','我不是氣妳。我是氣我自己，嘴巴縫得那麼緊。','nervous')}
 else{
  await say('lin','……連道歉，都這麼大聲。','nervous');
  await say('lin','不過，我聽得出來，妳是真的。……好，我說。','normal')}
 await say('lin','美玲那孩子……八點半，來跟我借瓶子。她說，自治會要招待志工喝烏梅湯，借十二個。','normal');
 await say('lin','八點五十，她又拜託我，把洗乾淨的空瓶，送到後巷口的冰箱。她說——「林嬸，這是我自己掏錢請大家的，會長不喜歡我亂花錢，別跟人說。」','normal');
 await say('lin','我哪裡知道，會出這種事。她幫過我好多次。我的補助、我的表格，每一張，都是她一筆一筆，蹲在這裡幫我填的。','broken');
 await say('lin','後來警察問我，我的嘴，就像被縫起來。我答應過她。','broken');
 await Me('（她叫林嬸「別跟人說」。……可是，只是請大家喝飲料的人，為什麼要封口？）','surprised');
 await Me('傍晚，她也遞給我一瓶。瓶蓋，就是妳的。','normal');
 await linkScreen(L1b);
 await getEv('linFix');
 S.flags.linFixed=1;S.flags.linClosed=0;
 await Me('林嬸，那張紙，先別簽。給我一點時間。','determined');
 await say('lin','……紙，我放在口袋裡了。不簽，也不丟。','normal');
 await N('她重新繫上圍裙，把黃燈籠，一盞一盞，重新點亮。');
 await N('（也許，該去跟小珊，好好道個歉。）')}
async function shanReconcile(){
 S.flags.shanCold=0;
 await Me('小珊。對不起。我錯了。','sad');
 await say('shan','……林嬸跟我說了。她說，妳去道歉了。','nervous');
 await say('shan','我也不好。我吼妳，吼得那麼大聲。可是我真的好怕……我爸，不能再有人，被冤枉了。','nervous');
 await Me('妳說得對。冤枉，是會傷人的。我差一點，變成我最討厭的那種人。','sad');
 await say('shan','……所以，我們還是朋友嗎？','normal');
 await Me('妳不怕，我是個很容易犯錯的偵探？','normal');
 await say('shan','怕。可是妳會道歉。這樣的偵探，我信。','normal');
 await scarf('我摸了摸圍巾。有一點癢，也有一點暖。')}
async function grannyScene(){
 await say('wu','小姐，我戴著眼鏡，看得好清楚，所以我想起來一件事。','normal');
 await say('wu','停電以後沒多久，有個女孩子，穿著黃色的背心，手上拿著手電筒，從後面那條巷子走出來。走得很急，差點踩到我的腳。','normal');
 await say('wu','我跟她說：「小姐，慢慢走」，她也沒理我。我還以為，是趕著去上廁所的呢。','normal');
 await Me('吳阿嬤，謝謝您。您幫了很大的忙。','normal');
 await getEv('granny')}
async function anFix(){
 await Me('可以借你的螺絲起子嗎？這副眼鏡的鏡腳，彎了。');
 await say('an','（看了眼鏡一眼，從工具包裡拿出一把迷你起子）……這種事，不用借。','normal');
 await N('他低下頭，三兩下把鏡腳扳直，再把螺絲拴緊。動作俐落得，像在拆解一個小機器。');
 await say('an','告訴那位奶奶，最好多買個備用的。','normal');
 await Me('你還挺會修東西的。');
 await say('an','……以前常常修。','nervous');
 S.flags.wuFixed=1;S.flags.wuWait=0}
async function hesitate(){
 S.flags.hesit=1;setBg('office','brightness(.8)');
 await N('所有的線索，都到手了。我站在會長辦公室的檯燈下，握著筆記本。');
 await N('只要按下「指認」，我就能找到陳大海。時間，還在走。');
 await N('可是，我的手，停在半空中。');
 await Me('……再讓我連一次線。','sad');
 await linkScreen(L2);
 await Me('她的爸爸，也是這樣被賣掉的。','sad');
 await Me('她比任何人，都知道一張紙，可以奪走什麼。然後，她自己，拿起了那支筆。','sad');
 await scarf('我又摸了摸圍巾。阿嬤那一年，來簽字的人，也不是壞人。他們都說：「為了您好」。');
 await Me('如果我指認她，她的人生，就結束了。……可是，大海還在下面。','sad');
 await stance('我深吸一口氣。見到她的時候，我要用什麼態度？',{sym:'我會讓她把話說完。她值得被聽見。',firm:'不管理由是什麼，她做的事，都必須被指出來。',calm:'我只談證據。其他的，留給法律。'});
 await Me('走吧。','determined');
 setBg('market')}
async function talkLin2(){
 if(S.flags.linWrong&&!S.flags.linHit)return linExam();
 if(S.flags.linHit&&!S.flags.lowDone)return lowPoint();
 if(S.flags.lowDone&&!S.flags.linFixed)return linApology();
 if(S.flags.linFixed){
  const n=(S.flags.cc_lin2||0);S.flags.cc_lin2=n+1;
  const L=[[['lin','小珊那孩子，下午還送了一碗滷蛋過來。說是賠罪。我告訴她，不用，我又沒有生氣。','normal']],[['lin','美玲那孩子……唉。我還是不敢相信。她的貼布，我還貼在膝蓋上呢。','broken']]];
  for(const [w,t,e] of L[n%L.length])await say(w,t,e);return}
 await say('lin','警察問完了。他們說，大海那孩子不會是壞人……可是，鑰匙在他那裡。唉。','nervous');
 await N('（林嬸在攤位上，慢慢擦著桌子。）')}
async function talkCai2(){
 if(!S.ev.includes('lintest')){
  await say('cai','小姐，妳是偵探吧？警察問過我一輪了。','normal');
  await say('cai','我是真的怕惹事，不過——20:50 左右，我確實看到林嬸，提著一大袋空保特瓶，走進後巷。','normal');
  await say('cai','我也覺得奇怪，她膝蓋不好，平常連巷口都不愛走。','nervous');
  await getEv('lintest');await chk();return}
 if(S.flags.linHit&&!S.flags.linFixed){await say('cai','林嬸那樣子……唉。我是不是，不該亂說話。','nervous');return}
 await say('cai','要查案，也要吃東西啊。雞排，小周炸的，一律八折。','normal')}
async function talkWu2(){
 if(!S.flags.wuDone){await A1.wu();if(!S.flags.wuDone)return}
 if(!S.ev.includes('granny'))return grannyScene();
 await say('wu','小姐，我孫子今天，還一直誇我的眼鏡很帥呢。','normal')}
function migrate(){const f=S.flags;if(f.act2||!S.ev||!S.ev.includes('note'))return;
 Object.assign(f,{act2:1,a1done:1,a_shan:1,a_lin:1,a_hai:1,a_ling:1,a_an:1,haiGone:1,linWrong:1,linHit:1,lowDone:1,linFixed:1,hesit:1,shanMet:f.shanMet||0});
 ['draft','lintest','oldphoto','linFix'].forEach(k=>{if(!S.ev.includes(k))S.ev.push(k)});
 if(S.finalPend)S.finalR=0}
/* ---- secrets in Act 2 ---- */
const SECL={
 shan:['追問：收據背面的畫',()=>S.flags.shanMet&&!S.flags.shanCold&&(S.flags.shanArt||0)<2],
 li:['追問：巷口的那個碗',()=>S.flags.liMet&&S.flags.h_bowl&&(S.flags.liDog||0)<2],
 an:['追問：你修東西的手藝',()=>S.flags.anDone&&(S.flags.anMom||0)<1&&(S.flags.wuFixed||S.flags.cdDone)],
 ling:['追問：妳隨身帶的貼布',()=>S.flags.lingMet&&S.flags.linFixed&&(S.flags.lingFather||0)<1]};
async function secretTalk(p){
 if(p==='shan')return a1secret('shan');
 if(p==='li'){
  await Me('老李，巷口那個碗……是給誰的？');
  await say('li','……妳看到啦。老黃。我養了十五年的黃狗，去年冬天走的。','nervous');
  await say('li','牠以前每天晚上陪我繞巷子。現在我一個人巡，總覺得背後少了個喘氣的聲音。','normal');
  await say('li','碗我還是擺。有時候，會有流浪貓來吃。這樣也好。','normal');
  await Me('牠一定很喜歡這條巷子。','sad');S.flags.liDog=2;return}
 if(p==='an'){
  await Me('你修東西的樣子，像在拆一個很熟的機器。');
  await say('an','……我媽有一間小修理店。收音機、鬧鐘、電鍋，什麼都修。二十年。','nervous');
  await say('an','雲嶺來「收購」的那年，她簽了字。之後，她再也沒有拿起過螺絲起子。','nervous');
  await scarf('我沒有說話。只是想起了，另一個簽字的人。');
  await say('an','所以我記筆記。人說的話，會被一張紙改掉。紀錄不會。','normal');
  await say('an','……別跟人說。','nervous');
  await Me('我不會。你的紀錄裡，也會有這一頁嗎？');
  await say('an','不會。','normal');S.flags.anMom=1;return}
 if(p==='ling'){
  await Me('妳口袋裡，總是帶著痠痛貼布。');
  await say('ling','……我爸以前腰不好。每天收攤，我都幫他貼。貼到後來，我連閉著眼睛，都貼得到穴位。','nervous');
  await say('ling','後來他不在了，我還是習慣帶著。看到誰在揉腰、揉膝蓋，就忍不住。','normal');
  await Me('林嬸的膝蓋，也是妳貼的。');
  await say('ling','是啊。我是不是很雞婆？（笑著，眼眶卻有點紅）','normal');
  await Me('（為什麼，聽起來這麼不像一個壞人？）','sad');S.flags.lingFather=1}}
async function talk(p){
 if(!S.flags.act2)return a1talk(p);
 if(p==='lin')return talkLin2();
 if(p==='cai')return talkCai2();
 if(p==='wu')return talkWu2();
 if(p==='an'&&S.flags.wuFound&&!S.flags.wuFixed&&S.flags.wuQ)return anFix();
 if(p==='shan'&&S.flags.shanCold){
  if(S.flags.linFixed)return shanReconcile();
  await say('shan','……妳還有什麼事嗎？','nervous');await N('她別過臉。（先去跟林嬸，把話說清楚吧。）');return}
 const sl=SECL[p];
 if(sl&&sl[1]()){
  const v=await choose([['聊案情','c'],[sl[0],'s'],['沒事了','x']]);
  if(v==='s')return secretTalk(p);if(v==='x')return}
 return talk2(p)}
