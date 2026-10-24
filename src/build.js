const fs=require('fs'),p=require('path');const d=p.join(__dirname,'../art');const A={};
for(const f of fs.readdirSync(d))if(f.endsWith('.webp'))A[f.replace('.webp','')]='data:image/webp;base64,'+fs.readFileSync(p.join(d,f)).toString('base64');
const h=fs.readFileSync(p.join(__dirname,'game.html'),'utf8').replace('/*ART*/{}',JSON.stringify(A));
fs.writeFileSync(p.join(__dirname,'../index.html'),h);console.log(h.length);
