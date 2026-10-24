const SC={
 market:{name:'福安夜市',bg:'market',hots:[
  {id:'notice',x:17,y:20,w:14,h:12,l:'公告看板',f:async()=>{await N('夜市入口的看板上，貼著一張大紅公告：《福安夜市　都市更新說明會》。');await N('底下的日期，是【昨天】。');await N('攤商們三三兩兩圍在看板前，臉色都很難看。有人小聲說：「這種事，怎麼昨天才說……」');await getEv('notice')}},
  {id:'stagedoor',x:34,y:44,w:32,h:8,l:'往舞台',f:()=>go('stage')},
  {id:'stalldoor',x:1,y:55,w:30,h:20,l:'陳大海的滷味攤',f:()=>go('stall')},
  {id:'alleydoor',x:68,y:55,w:31,h:20,l:'往後巷',f:()=>go('alley')},
  {id:'officedoor',x:79,y:10,w:19,h:23,l:'自治會辦公室',f:()=>go('office')}],
  people:['shan','an','ling']},
 alley:{name:'後巷',bg:'alley',hots:[
  {id:'lock',x:38,y:48,w:20,h:11,l:'貨櫃的掛鎖',f:async()=>{await N('貨櫃的掛鎖被保全剪斷了，斷開的鎖掛在門環上。');if(S.ev.includes('note'))await say('me','（紙條說，去看鎖上有沒有霜……）');await N('我伸手摸了摸——鎖身、門環上，結著一層【厚厚的白霜】，邊緣還凝成了小冰珠。');await N('冷氣從門縫洩出來，要一直吹在冰冷的金屬上，吹上一個多小時才會結成這樣。');await N('如果鎖是停電那三分鐘才扣上的，上面最多只有一層薄薄的水氣。');await getEv('frost')}},
  {id:'vent',x:46,y:26,w:32,h:9,l:'冷凍機組',f:async()=>{await N('貨櫃頂上的冷凍機組轟轟地運轉著，面板顯示：-18℃。');await N('遺體關在這種溫度裡，屍僵會比平常慢很多才出現……');await getEv('cold')}},
  {id:'crates',x:1,y:58,w:30,h:22,l:'紙箱堆',f:async()=>{await N('牆邊的紙箱堆後面，滾著一個空的保特瓶，瓶蓋是開著的。');await N('瓶身貼著「大海滷味」的貼紙，瓶口殘留一點白色粉末。');await N('有人，被灌了藥……？');await getEv('bottle')}},],
  people:['li']},
 stage:{name:'舞台',bg:'stage',hots:[
  {id:'console',x:1,y:51,w:40,h:14,l:'燈光控台',f:async()=>{await N('控台旁貼著今晚的流程表：19:30 開幕、20:30 摸彩、21:30 燈光秀、21:45 會長致詞。');await N('「會長致詞」那一欄，被人用紅筆打了個大叉，旁邊寫著：「會長未到——改播影片」。')}},
  {id:'screen',x:25,y:36,w:36,h:13,l:'舞台螢幕',f:async()=>{await N('螢幕上循環播放著「福安夜市四十週年」的宣傳影片。');await N('影片裡，王仲義會長站在夜市入口，笑得很燦爛。')}},
  {id:'power',x:74,y:50,w:24,h:12,l:'配電箱',f:async()=>{await N('配電箱的跳電開關被拉下，標籤上寫著：21:40。');await N('電工說，是有人同時開了太多電鍋跟直播補光燈，過載跳電。——跟人為破壞無關。')}},],
  people:[]},
 stall:{name:'陳大海的滷味攤',bg:'stall',hots:[
  {id:'counter',x:34,y:55,w:30,h:11,l:'玻璃櫃檯',f:async()=>{await N('玻璃櫃檯正中間，原本擺著貨櫃掛鎖的鑰匙。警察已經拍照、收走了。');await N('鐵捲門只拉到一半，櫃檯上卻沒有一點灰，也沒有急忙丟下東西的痕跡。');await N('那支鑰匙，是被擺得整整齊齊的。');await getEv('key')}},
  {id:'sign',x:42,y:26,w:34,h:8,l:'休息十分鐘的牌子',f:async()=>{await N('半拉的鐵捲門上，掛著一塊牌子：「休息十分鐘」。字跡是陳大海的，墨跡很新。');await N('一個打算逃走的人，會特地寫「休息十分鐘」嗎？');await say('shan','我爸的習慣……不管多急，離開攤位都會掛牌子。','nervous')}},
  {id:'pot',x:68,y:53,w:24,h:11,l:'滷鍋',f:async()=>{await N('鍋裡的滷汁是黑褐色的，醬油味很重，滷蛋已經涼了。');if(S.ev.includes('shoe'))await N('（跟莊美玲鞋底那圈暗紅色，是兩種完全不同的滷汁。）');else await N('……這是攤位上賣的醬油滷。小珊說的那種紅麴老滷，不在這裡。')}},
  {id:'mat',x:8,y:73,w:56,h:13,l:'歪掉的地墊',f:async()=>{await N('地墊有一角歪了，下面壓著一道很淺的長形拖痕。');await N('旁邊的大冰櫃，剛好擋住地墊的一半。——難怪警察搜了兩遍，沒人想到要把這塊墊子翻開。');await N('我掀開地墊。水泥地上，有一塊方形的活板門，扣著一把嶄新的掛鎖。');await N('鎖上一點灰都沒有。我敲了敲板門——沒有回應，下面很安靜。');if(S.flags.shanMet)await say('shan','那、那就是……地下室的入口！爸！爸你在裡面嗎？！','broken');await say('me','現在硬剪開，警察只會當成破壞現場，也沒有人會相信「陳大海被關在裡面」。');await say('me','先找出真正把他鎖進去的人——鑰匙，一定在那個人身上。');await getEv('hatch')}},],
  people:['shan']},
 office:{name:'自治會辦公室',bg:'office',hots:[
  {id:'trophy',x:3,y:8,w:52,h:22,l:'獎盃架',f:async()=>{await N('獎盃整整齊齊排在架上，只有最左邊少了一座——那一格留下一個乾淨的方形灰塵印。');await N('垃圾桶裡有一條用過的濕紙巾，聞起來有酒精味。');await N('缺的那座，是「模範夜市」純銅獎盃。法醫說，致命傷來自方形底座的鈍器。');await getEv('trophy')}},
  {id:'photo',x:21,y:31,w:27,h:13,l:'牆上的合照',f:async()=>{await N('牆上掛著夜市十週年的大合照，中間笑得最開心的，就是王仲義會長。');await say('wang','（錄音）福安夜市，是大家的。我王仲義只要還坐在這個位子上一天，就絕對不會讓它被拆。','normal');await N(S.ev.includes('yunling')?'……講得真好聽。抽屜裡那張名單，可不是這麼寫的。':'……講得真好聽。')}},
  {id:'drawer',x:73,y:51,w:25,h:13,l:'被撬開的抽屜',f:async()=>{await N('檔案櫃的抽屜被撬開過，裡面的東西幾乎被拿光了，只剩一張紙被壓在最底下。');await showDoc('雲嶺開發股份有限公司\n福安夜市　攤位讓渡　採購明細\n\n攤位 07　　NT$ 1,800,000\n攤位 12　　NT$ 2,300,000\n攤位 15　　NT$ 1,500,000\n（共 31 筆）\n\n收款人：【此欄已被撕掉】');await say('me','這朵雲……老街那件案子裡，我也看過。','normal');await N('最右邊的「收款人」欄，被人整整齊齊地撕掉了。');await getEv('yunling');try{localStorage.setItem('yeshi_cloud','1')}catch(e){}}},
  {id:'forms',x:1,y:72,w:28,h:17,l:'影印機旁的廢紙簍',f:async()=>{await N('影印機旁的廢紙簍裡，塞著一疊印壞了邊的紙——是「攤位登記讓渡書」的影本。');await N('出讓人欄是不同攤商的名字，字跡卻一模一樣。');await N('每一張的「經辦人」欄，都簽著同一個名字：【莊美玲】。日期，是【三個月前】。');await getEv('forms')}},
  {id:'pin',x:52,y:79,w:22,h:9,l:'地上的小東西',f:async()=>{await N('檔案櫃旁的地板上，躺著一枚小小的徽章。紅色的放大鏡圖案——');await N('這個圖案，我剛才在誰的外套胸口看過？');await getEv('pin')}},],
  people:[]}
};
