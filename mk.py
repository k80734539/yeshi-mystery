import re
L=open('src/game.laojie.orig.html',encoding='utf8').read().split('\n')
def seg(a,b):return L[a-1:b]
P=lambda n:open('parts/'+n,encoding='utf8').read().rstrip('\n').split('\n')
out=[]
head=seg(1,176)
h='\n'.join(head)
h=h.replace('<title>老街迷香</title><!-- build:v13-hub -->','<title>夜市無聲</title><!-- build:v2-depth -->')
h=h.replace('#rain{display:none}','#fx{display:none}').replace('<canvas id="rain">','<canvas id="fx">')
h=h.replace('--glow:#c46a12','--glow:#d1361e').replace('老街迷香','夜市無聲').replace('颱風夜．百年糕餅店的謎','福安夜市．鎖在冷凍貨櫃裡的謊').replace('v1.8','v1.0')
assert '<canvas id="fx">' in h and '#fx{display:none}' in h
h=h.replace('</head>','\n'.join(P('ysc.css'))+'\n</head>',1)
out+=h.split('\n')
out+=seg(177,181)
out+=P('audio.js')
out+=P('state_ev.js')
mid=seg(255,298)
m='\n'.join(mid)
m=m.replace("const src=ART[c+'_'+e];","const src=ART[c+'_'+e]||ART[c+'_normal'];")
m=m.replace("if(who&&ART[who+'_normal'])setPor(who,e||'normal',opt.shake);","if(who&&ART[who+'_normal'])setPor(who,e||'normal',opt.shake);else if(who&&who!=='me')setPor(null);")
m=m.replace('ART.bg_street','ART.bg_market')
m=m.replace("const src=ART[c+'_'+e]||ART[c+'_normal'];","const src=ART[c+'_'+e]||ART[c+'_'+({broken:'sad',nervous:'sad',surprised:'sad',angry:'sad',point:'normal'}[e])]||ART[c+'_normal'];")
out+=m.split('\n')
out+=seg(299,299)
out.append("const WHERE={forms:'會長辦公室的廢紙簍',frost:'後巷的貨櫃掛鎖',shoe:'莊美玲（跟她聊聊）',stream:'停電三分鐘（問周予安）',tech:'停電三分鐘（問周予安）',patrol:'停電三分鐘（問周予安）',pin:'會長辦公室的地板'};")
out+=seg(301,309)
out.append("""const KWS=['一步都沒離開過','停電那三分鐘，才有人把會長鎖進貨櫃','昨天看到公告才第一次聽說','有地下室都不知道','門都沒碰過'];const RM=matchMedia('(prefers-reduced-motion: reduce)');""")
e='\n'.join(seg(311,365))
assert '/4\\/4/' in e
e=e.replace('/4\\/4/','/5\\/5/')
out+=e.split('\n')
out+=P('T.js')
out+=['/* ---------- scenes ---------- */']+P('SC.js')
rs='\n'.join(seg(422,432))
a=" if(canAccuse()){const x=document.createElement('button');x.className='btn red';x.id='accuseBtn'"
assert a in rs
rs=rs.replace(a," if(S.scene!=='market'){const x=document.createElement('button');x.className='btn';x.dataset.back='1';x.id='backBtn';x.textContent='↩ 回夜市';x.onclick=()=>act(()=>go('market'));b.appendChild(x)}\n"+a)
out+=seg(422,422)
out+=P('link.js')
out+=P('scene.js')
_g=seg(430,432);_o="async function go(k){S.scene=k;setBg(SC[k].bg);SFX.tap()}"
assert any(_o in x for x in _g)
_g=[x.replace(_o,"async function go(k){S.scene=k;setBg(SC[k].bg);SFX.tap();$('#place').textContent='📍 '+SC[k].name+(S.flags.act2?'':'　18:30')}") for x in _g]
out+=_g
out+=P('act1.js')
out+=P('talk.js')
out+=P('act2.js')
out+=seg(493,496)
out+=P('end.js')
out.append("const SKEY='yeshi';")
tail='\n'.join(seg(581,636))
tail=tail.replace("function chapName(){return S.flags.final?'最終對質':S.flags.ch2?'第二章':'第一章'}","function chapName(){return S.flags.final?'最終對質':S.flags.act2?'第二幕':'第一幕'}")
tail=tail.replace("setBg('street')","setBg('market')").replace('laojie','yeshi')
tail=tail.replace('S.ended=false;\n if(typeof T','S.ended=false;try{migrate()}catch(e){console.error(e)}\n if(typeof T',1)
assert 'migrate()' in tail
out+=tail.split('\n')
open('src/game.html','w',encoding='utf8').write('\n'.join(out))
