import numpy as np,glob,os
from PIL import Image,ImageFilter
G='../gen/'
for f in sorted(glob.glob(G+'*.jpg')):
  k=os.path.basename(f)[:-4]
  if k.startswith('bg_'):
    im=Image.open(f).convert('RGB')
    if k=='bg_stage':  # blur the LED clock digits so no time contradicts the story
      W,H=im.size;box=(int(W*.32),int(H*.395),int(W*.55),int(H*.46));im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(9)),box)
    im.resize((576,1024),Image.LANCZOS).save(k+'.webp',quality=72,method=6);continue
  I=Image.open(f).convert('RGB')
  if k.startswith('ling_'): I=I.crop((130,30,610,670) if k=='ling_broken' else (140,0,620,640))
  im=np.asarray(I).astype(float)
  r,g,b=im[...,0],im[...,1],im[...,2]
  d=g-np.maximum(r,b)
  a=np.clip(1-(d-40)/60,0,1)
  g2=np.minimum(g,np.maximum(r,b)*1.05+5)
  out=np.dstack([r,g2,b,a*255]).astype(np.uint8)
  Image.fromarray(out,'RGBA').resize((512,683),Image.LANCZOS).save(k+'.webp',quality=82,method=6)
