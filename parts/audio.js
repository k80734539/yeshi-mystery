/* ---------- audio ---------- */
let AC=null;
function ac(){if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();}if(AC.state==='suspended')AC.resume();if(!bgmCur)setBGM('inv');return AC}
function tone(f,d,type='square',v=.05,slide=0){if(!AC)return;if(v>.03)duck();const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;if(slide)o.frequency.exponentialRampToValueAtTime(slide,AC.currentTime+d);g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+d)}
function noise(d,v=.3,f=1000){if(!AC)return;duck();const b=AC.createBuffer(1,AC.sampleRate*d,AC.sampleRate),c=b.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=(Math.random()*2-1)*(1-i/c.length);const s=AC.createBufferSource();s.buffer=b;const fl=AC.createBiquadFilter();fl.frequency.value=f;const g=AC.createGain();g.gain.value=v;s.connect(fl).connect(g).connect(AC.destination);s.start()}
const SFX={shock:()=>{noise(.3,.5,900);tone(90,.45,'sawtooth',.14,40);setTimeout(()=>tone(1400,.25,'square',.05,300),60)},buzz:()=>{tone(140,.5,'square',.12,110);tone(147,.5,'sawtooth',.09,115);setTimeout(()=>tone(96,.35,'square',.1),260)},blip:()=>tone(620+Math.random()*80,.04,'square',.02),
 get:()=>{tone(660,.12,'triangle',.12);setTimeout(()=>tone(880,.12,'triangle',.12),110);setTimeout(()=>tone(1320,.25,'triangle',.12),220)},
 obj:()=>{noise(.5,.5,2500);tone(180,.5,'sawtooth',.15,90);setTimeout(()=>{tone(523,.15,'square',.1);tone(659,.15,'square',.08)},150);setTimeout(()=>{tone(784,.4,'square',.1);tone(1046,.4,'square',.07)},300)},
 wrong:()=>{tone(200,.3,'sawtooth',.12,90);setTimeout(()=>tone(120,.4,'sawtooth',.12,60),200)},
 tap:()=>tone(900,.05,'sine',.06),
 gong:()=>{tone(98,1.6,'sine',.12,60);tone(196,1.2,'triangle',.05,120);noise(.6,.12,700)},
 tick:()=>tone(1500,.03,'square',.03),
 blackout:()=>{tone(260,.9,'sawtooth',.08,40);noise(.5,.2,400)},
 press:()=>{if(!AC)return;noise(.35,.35,3500);tone(330,.18,'square',.05,990);setTimeout(()=>tone(1320,.12,'triangle',.07),120)},
 sad:()=>{[523,466,392,349].forEach((f,i)=>setTimeout(()=>tone(f,.5,'triangle',.08),i*350))},
 win:()=>{[523,659,784,1046,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.3,'triangle',.1),i*160))}};
/* ---------- BGM (procedural, night-market themes) ---------- */
let MB=null,DK=null,bgmOn=localStorage.getItem('yeshi_bgm')!=='off',bgmCur=null,bgmT=null,step=0,nextT=0;const TH={};
const mtof=m=>440*Math.pow(2,(m-69)/12);
function duck(){if(!DK)return;const t=AC.currentTime;DK.gain.cancelScheduledValues(t);DK.gain.setTargetAtTime(.35,t,.02);DK.gain.setTargetAtTime(1,t+.35,.25)}
function mInit(){if(MB)return;DK=AC.createGain();MB=AC.createGain();MB.gain.value=bgmOn?1:0;DK.connect(MB).connect(AC.destination);
 for(const k of ['inv','test','cd','final','good']){const g=AC.createGain();g.gain.value=0;g.connect(DK);TH[k]={g}}
 nextT=AC.currentTime+.1;bgmT=setInterval(sched,40)}
function note(th,m,t,d,type,v,o={}){const c=AC,os=c.createOscillator(),g=c.createGain();os.type=type;os.frequency.setValueAtTime(mtof(m),t);
 if(o.slide)os.frequency.setValueAtTime(mtof(m-1),t),os.frequency.linearRampToValueAtTime(mtof(m),t+.08);
 let n=os;if(o.lp){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=o.lp;os.connect(f);n=f}
 if(o.vib){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5.5;lg.gain.value=mtof(m)*.012;l.connect(lg).connect(os.frequency);l.start(t);l.stop(t+d+.3)}
 const a=o.a||.005;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);
 if(o.sus){g.gain.setValueAtTime(v,t+d*.7);g.gain.linearRampToValueAtTime(0,t+d)}else g.gain.exponentialRampToValueAtTime(.0001,t+d);
 n.connect(g).connect(TH[th].g);os.start(t);os.stop(t+d+.05)}
function drum(th,t,kind,v){const c=AC;if(kind==='k'){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(40,t+.15);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g).connect(TH[th].g);o.start(t);o.stop(t+.25);return}
 const len=kind==='s'?.15:.04,b=c.createBuffer(1,c.sampleRate*len,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type=kind==='s'?'bandpass':'highpass';f.frequency.value=kind==='s'?1800:7000;const g=c.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+len);s.connect(f).connect(g).connect(TH[th].g);s.start(t)}
// themes: one entry per 8th note; midi or 0 = rest
const MUS={
 inv:{bpm:104,lead:[74,0,76,78,81,0,78,76, 74,0,0,76,78,0,0,0, 81,0,83,81,78,0,76,0, 74,0,76,78,76,0,74,0],bass:[38,47,43,45],pad:[[62,66,69],[59,62,66],[59,62,67],[57,61,64]]},
 test:{bpm:100,bass:[40,40,0,40,41,0,40,0],stab:[64,0,0,65,0,0,64,0, 0,0,68,0,67,0,65,0, 64,0,0,65,0,0,68,0, 0,0,71,0,68,0,0,0]},
 cd:{bpm:132,bass:[45,43,41,40],arp:[57,60,64,69,64,60,57,60, 55,59,62,67,62,59,55,59, 53,57,60,65,60,57,53,57, 52,56,59,64,68,64,59,56]},
 final:{bpm:140,bass:[40,40,52,40,43,43,55,43,38,38,50,38,45,45,57,45],lead:[76,0,79,0,81,79,0,76, 83,0,81,79,0,76,74,0, 76,0,79,0,81,83,0,86, 83,0,81,0,79,0,76,0]},
 good:{bpm:84,chords:[[50,54,57],[52,57,61],[47,50,54],[43,47,50]],lead:[78,0,81,0,86,0,83,81, 78,0,76,0,74,0,0,0, 76,0,78,81,0,83,0,81, 78,0,76,74,0,0,0,0]}};
function sched(){if(!AC||!bgmCur)return;const M=MUS[bgmCur];while(nextT<AC.currentTime+.15){play8(bgmCur,step,nextT);nextT+=30/M.bpm;step++}}
function play8(th,s,t){const M=MUS[th],e=30/M.bpm;
 if(th==='inv'){const bar=Math.floor(s/8)%4,b=s%8;// pipa-style pluck over a bouncy market groove
  if(b===0||b===4)note(th,M.bass[bar],t,e*1.6,'triangle',.11,{lp:600});
  if(b===3||b===7)note(th,M.bass[bar]+7,t,e*.8,'triangle',.06,{lp:600});
  if(b===0)M.pad[bar].forEach(m=>note(th,m,t,e*8,'sine',.02,{a:.4,sus:1}));
  if(b%2===1)drum(th,t,'h',.03);if(b===2||b===6)note(th,92,t,.05,'square',.012);if(b===4)drum(th,t,'s',.06);
  const m=M.lead[s%32];if(m){note(th,m,t,e*1.9,'triangle',.07,{lp:2600,vib:1,a:.01});note(th,m+12,t,e*.5,'square',.012,{lp:3000})}
  if(s%32===0)note(th,50,t,2.5,'sine',.03,{a:.02})}
 else if(th==='test'){const b=s%8,bs=M.bass[b];
  if(bs)note(th,bs,t,e*.9,'sawtooth',.06,{lp:500});
  if(s%2===0)note(th,s%8===0?96:90,t,.04,'square',.02);if(s%2===1)drum(th,t,'h',.035);if(s%8===4)drum(th,t,'k',.25);
  const m=M.stab[s%32];if(m)note(th,m,t,e*1.2,'sawtooth',.04,{lp:2000,vib:1,slide:1,a:.02});
  if(s%32===0)note(th,40,t,e*32,'sine',.035,{a:1,sus:1})}
 else if(th==='cd'){note(th,s%2?84:96,t,.035,'square',.04);
  if(s%4===0)note(th,M.bass[Math.floor(s/8)%4],t,e*1.5,'square',.05,{lp:420});
  note(th,M.arp[s%32],t,e*.9,'triangle',.05,{lp:2400});if(s%2===1)drum(th,t,'h',.03)}
 else if(th==='final'){note(th,M.bass[s%16],t,e*.8,'sawtooth',.08,{lp:900});if(s%4===0)drum(th,t,'k',.5);if(s%8===4)drum(th,t,'s',.25);drum(th,t,'h',.04);
  const m=M.lead[s%32];if(m)note(th,m,t,e*1.8,'sawtooth',.045,{lp:3200,vib:1,slide:1,a:.02});
  if(s%2===0&&s%8!==0)note(th,100,t,.04,'square',.012)}
 else{const bar=Math.floor(s/8)%4,ch=M.chords[bar];
  note(th,ch[[0,1,2,1,0,1,2,1][s%8]]+12,t,e*2,'triangle',.05,{lp:2200});
  if(s%8===0)ch.forEach(m=>note(th,m-12,t,e*8,'sine',.025,{a:.5,sus:1}));
  const m=M.lead[s%32];if(m)note(th,m,t,e*2.4,'triangle',.07,{lp:2500,vib:1,a:.02,sus:1})}}
function setBGM(k){if(!AC)return;mInit();if(k===bgmCur)return;const t=AC.currentTime;
 for(const n in TH){TH[n].g.gain.cancelScheduledValues(t);TH[n].g.gain.setValueAtTime(TH[n].g.gain.value,t);TH[n].g.gain.linearRampToValueAtTime(n===k?(n==='final'?.8:1):0,t+1.5)}
 if(k&&bgmCur!==k&&!(bgmCur&&k))step=0;bgmCur=k;window.__bgm=k}
function toggleBGM(){bgmOn=!bgmOn;localStorage.setItem('yeshi_bgm',bgmOn?'on':'off');if(MB)MB.gain.setTargetAtTime(bgmOn?1:0,AC.currentTime,.1);$('#bgmBtn').textContent=bgmOn?'♪ 開':'♪ 關'}
const fxc=$('#fx');function rsize(){if(fxc){fxc.width=fxc.clientWidth;fxc.height=fxc.clientHeight}}addEventListener('resize',rsize);
