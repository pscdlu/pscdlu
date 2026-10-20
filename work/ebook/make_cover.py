from PIL import Image, ImageDraw, ImageFont
W,H=1600,2560
im=Image.new('RGB',(W,H),'#1f3b4d'); d=ImageDraw.Draw(im)
F=lambda p,s: ImageFont.truetype(p,s)
SB='/usr/share/fonts/truetype/noto/NotoSerif-Bold.ttf'; SR='/usr/share/fonts/truetype/noto/NotoSerif-Regular.ttf'
DV='/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf'
def c(t,y,f,fill):
    w=d.textlength(t,font=f); d.text(((W-w)/2,y),t,font=f,fill=fill)
d.rectangle([0,0,W,300],fill='#c9a227')
c('UGC NET  ·  PAPER 1',110,F(SB,64),'#1f3b4d')
d.rectangle([140,520,W-140,526],fill='#c9a227')
c('Unit I',640,F(SR,110),'#f4efe1')
c('Teaching',800,F(SB,190),'#ffffff'); c('Aptitude',1010,F(SB,190),'#ffffff')
parts=[('इकाई ',F(DV,84)),('I',F(SR,80)),(' : शिक्षण अभिवृत्ति',F(DV,84))]
tw=sum(d.textlength(t,font=f) for t,f in parts); x=(W-tw)/2
for t,f in parts:
    d.text((x,1290 if f.path==DV else 1283),t,font=f,fill='#c9a227'); x+=d.textlength(t,font=f)
d.rectangle([140,1460,W-140,1466],fill='#c9a227')
c('A study guide for students',1540,F(SR,62),'#f4efe1'); c('who prepare on their own',1625,F(SR,62),'#f4efe1')
c('with an index to the 1,000-question MCQ booklet',1760,F(SR,46),'#d7dee3')
d.rectangle([0,2180,W,H],fill='#16303f')
c('Prof. Pankaj Sharma',2250,F(SB,70),'#ffffff')
c('Department of English, Chaudhary Devi Lal University, Sirsa',2360,F(SR,40),'#d7dee3')
c('Free study material  ·  October 2026',2430,F(SR,40),'#c9a227')
im.save('cover.png'); print('cover ok')
