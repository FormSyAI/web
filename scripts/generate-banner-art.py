# /// script
# requires-python = ">=3.10"
# dependencies = ["fonttools>=4.50,<5"]
# ///
"""Generate original, self-contained FormSy diagram assets with outlined labels."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import math

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'outputs/banner-design'
OUT.mkdir(parents=True,exist_ok=True)
FONTS={key:TTFont('/System/Library/Fonts/Supplemental/'+name) for key,name in [('regular','Arial.ttf'),('bold','Arial Bold.ttf')]}
CJK_FONTS={key:TTFont('/System/Library/Fonts/'+name,fontNumber=0) for key,name in [('regular','STHeiti Light.ttc'),('bold','STHeiti Medium.ttc')]}
LOCALE='en'
ZH={
 'FormSy: task success and cost per verified task':'FormSy：任务完成率与成功任务成本',
 'Task success and cost per verified task':'任务完成率与成功任务成本',
 'FormSy: enterprise learning loop':'FormSy：企业智能学习闭环',
 'CONTEXT + COMPUTE':'上下文 + 算力',
 'TASK SUCCESS':'任务完成率', 'COST / VERIFIED TASK':'成功任务成本',
 'ILLUSTRATIVE TRENDS / INDEPENDENT METRICS':'概念趋势示意 / 两项指标独立展示',
 'ILLUSTRATIVE TRENDS':'概念趋势示意',
 'CONTEXT PACKET':'任务上下文', 'Task-specific evidence':'任务所需的上下文与证据',
 'AGENT RUN':'智能体执行', 'Model + tools':'模型 + 工具',
 'FINISH GATE':'完成验证', 'Verified result':'经过验证的任务结果',
 '02 / COMPOUNDING INTELLIGENCE':'02 / 持续积累企业智能',
 'CONTEXT':'上下文', 'Dynamic knowledge':'动态知识',
 'EVAL':'评估', 'Completion criteria':'任务完成标准',
 'TRACE':'执行轨迹', 'Execution evidence':'执行过程与证据',
 'POLICY':'策略', 'Reusable rules':'可复用的规则',
 'WEIGHTS':'模型权重', 'Selective adaptation':'选择性适配',
 'YOUR ENTERPRISE':'专属企业', 'ENTERPRISE':'专属企业',
 'INTELLIGENCE':'智能资产', 'Context. Evidence. Experience.':'上下文 · 证据 · 经验',
 'OWNED BY YOU':'由你拥有',
}
BLUE='#2c6cb5' ; NAVY='#0b2645'; GOLD='#f3b322'; LINE='#dce7f2'; MUTED='#607389'
class SVG:
 def __init__(self,title,width=800,height=520):
  title=ZH.get(title,title) if LOCALE=='zh' else title
  self.parts=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}"><title>{title}</title>']
  self.n=0
 def path(self,d,fill='none',stroke=None,width=1,extra='',id=None):
  self.n+=1
  self.parts.append(f'<path id="{id or "shape-"+str(self.n)}" d="{d}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="{width}"' if stroke else '')+f' {extra}/>')
 def rect(self,x,y,w,h,fill,stroke=None,id=None): self.path(f'M{x} {y}h{w}v{h}h{-w}Z',fill,stroke,id=id)
 def line(self,x1,y1,x2,y2,color,width=1,extra=''): self.path(f'M{x1} {y1}L{x2} {y2}',stroke=color,width=width,extra=extra)
 def text(self,text,x,y,size=14,color=NAVY,bold=False,spacing=0,center=False,id=None,right=False):
  text=ZH.get(text,text) if LOCALE=='zh' else text
  fonts=CJK_FONTS if any(ord(c)>127 for c in text) else FONTS
  font=fonts['bold' if bold else 'regular']; gs=font.getGlyphSet(); cmap=font.getBestCmap();scale=size/font['head'].unitsPerEm
  width=sum(gs[cmap[ord(c)]].width*scale+spacing for c in text)-spacing
  if center:x-=width/2
  elif right:x-=width
  left=x
  paths=[]
  for c in text:
   glyph=gs[cmap[ord(c)]];pen=SVGPathPen(gs);glyph.draw(TransformPen(pen,(scale,0,0,-scale,x,y)));paths.append(pen.getCommands());x+=glyph.width*scale+spacing
  self.path(' '.join(paths),color,id=id)
  return left
 def arrow(self,x,y,direction,color):
  if direction=='up':d=f'M{x-6} {y+5}l6 -6 6 6M{x} {y}v18'
  elif direction=='down':d=f'M{x-6} {y-5}l6 6 6 -6M{x} {y}v-18'
  else:d=f'M{x-5} {y-5}l5 5 -5 5M{x} {y}h-14'
  self.path(d,stroke=color,width=2)
 def finish(self,name):
  (OUT/f'{name}{"-zh" if LOCALE=="zh" else ""}.source.svg').write_text('\n'.join(self.parts+['</svg>']))

def generate():
 s=SVG('FormSy: task success and cost per verified task')
 s.rect(0,0,800,520,'#ffffff')
 s.rect(.5,.5,799,519,'none',LINE,id='outer-frame')
 for x in range(32,800,32):
  for y in range(24,500,32):s.rect(x,y,1.2,1.2,'#e4edf6')
 s.text('FORMSY',40,39,14,BLUE,True,1.8)
 s.text('CONTEXT + COMPUTE',760,39,12,MUTED,spacing=.9,right=True)
 # Both measures share one composition; paired bars keep their identities distinct.
 s.rect(40,82,720,306,'#f7fafd')
 s.rect(62,104,7,7,BLUE)
 s.text('TASK SUCCESS',81,113,13,BLUE,True,.8)
 legend_left=s.text('COST / VERIFIED TASK',738,113,13,'#986100',True,.8,right=True)
 s.rect(legend_left-19,104,7,7,GOLD)
 values=[4,5,5,6,7,7,8,9,9,11,12,11,13,14,15,16,15,18,19,21]
 costs=[21,20,19,18,17,16,15,14,13,12,12,11,10,9,9,8,7,6,5,4]
 for i,(success,cost) in enumerate(zip(values,costs)):
  x=64+i*34
  for b in range(success):s.rect(x+12,356-(b+1)*10,10,7,BLUE)
  for b in range(cost):s.rect(x,356-(b+1)*10,10,7,GOLD)
 s.text('ILLUSTRATIVE TRENDS / INDEPENDENT METRICS',62,376,10,MUTED,spacing=.7)
 # discrete context and verification gates emphasize task-level control
 for i,(label,detail) in enumerate([('CONTEXT PACKET','Task-specific evidence'),('AGENT RUN','Model + tools'),('FINISH GATE','Verified result')]):
  x=40+i*254
  s.text(f'0{i+1}',x,443,12,BLUE,True)
  s.text(label,x+30,443,13,NAVY,True,.5)
  s.text(detail,x+30,465,12,MUTED)
  if i<2:s.arrow(x+230,448,'right',BLUE)
 s.finish('verified-work')

 def draw_learning(name,mobile=False):
  width,height=(400,440) if mobile else (800,520)
  s=SVG('FormSy: enterprise learning loop',width,height)
  s.rect(0,0,width,height,NAVY,id='navy-field')
  for x in range(0,width+1,40):s.line(x,0,x,height,'#12314d')
  for y in range(0,height+1,40):s.line(0,y,width,y,'#12314d')
  if not mobile:
   s.text('FORMSY',32,36,14,'#b9d8f3',True,1.8)
   s.text('02 / COMPOUNDING INTELLIGENCE',768,36,11,'#a7c6e0',spacing=.8,right=True)
  cx,cy,rx,ry=(200,222,140,151) if mobile else (400,276,270,178)
  cardw,cardh=(104,58) if mobile else (150,72)
  angles=[-90,-18,54,126,198]
  labels=[('CONTEXT','Dynamic knowledge'),('EVAL','Completion criteria'),('TRACE','Execution evidence'),('POLICY','Reusable rules'),('WEIGHTS','Selective adaptation')]
  def point(angle):
   return cx+rx*math.cos(math.radians(angle)),cy+ry*math.sin(math.radians(angle))
  def outside(angle,center,margin):
   x,y=point(angle)
   return abs(x-center[0])>cardw/2+margin or abs(y-center[1])>cardh/2+margin
  # Clip each directed arc to a consistent gap around the actual node bounds.
  for i,angle in enumerate(angles):
   nextangle=angles[(i+1)%5]+(360 if i==4 else 0)
   start,end=angle,nextangle
   while not outside(start,point(angle),8):start+=.2
   while not outside(end,point(nextangle),12):end-=.2
   a,b=point(start),point(end)
   color=GOLD if i==3 else '#709fcb' if i<3 else '#527a9e'
   s.path(f'M{a[0]:.3f} {a[1]:.3f}A{rx} {ry} 0 0 1 {b[0]:.3f} {b[1]:.3f}',stroke=color,width=1.7 if mobile else 1.8,extra='stroke-dasharray="3 5"' if i==4 else '',id=f'connection-{i+1}')
   tangent=math.atan2(ry*math.cos(math.radians(end)),-rx*math.sin(math.radians(end)))
   size=6 if mobile else 8
   points=[]
   for back,side in [(0,0),(-size,size*.45),(-size,-size*.45)]:
    points.append((b[0]+back*math.cos(tangent)-side*math.sin(tangent),b[1]+back*math.sin(tangent)+side*math.cos(tangent)))
   s.path('M'+'L'.join(f'{x:.3f} {y:.3f}' for x,y in points)+'Z',color,id=f'arrow-{i+1}')
  # A precisely centered front card with restrained, equal-depth asset layers.
  w,h=(154,94) if mobile else (232,152)
  x,y=cx-w/2,cy-h/2
  for offset,color in [(12,'#173a58'),(6,'#214868')]:
   s.rect(x+offset,y+offset,w,h,color,'#365b7b')
  s.rect(x,y,w,h,BLUE,id='enterprise-asset')
  if mobile:
   s.text('ENTERPRISE',cx,y+26,12,'#ffffff',True,1,True)
   s.text('INTELLIGENCE',cx,y+50,16,'#ffffff',True,0,True)
   s.line(x+18,y+63,x+w-18,y+63,'#709fcb')
   s.text('OWNED BY YOU',cx,y+81,10,'#ffffff',True,1,True)
  else:
   s.text('YOUR ENTERPRISE',cx,y+33,11,'#ffffff',True,1.5,True)
   s.text('INTELLIGENCE',cx,y+64,22,'#ffffff',True,.5,True)
   s.line(x+24,y+82,x+w-24,y+82,'#709fcb')
   s.text('Context. Evidence. Experience.',cx,y+107,12,'#e4edf6',center=True)
   s.text('OWNED BY YOU',cx,y+134,10,'#ffffff',True,1.6,True)
  for i,(angle,(label,sub)) in enumerate(zip(angles,labels)):
   nx,ny=point(angle);x,y=nx-cardw/2,ny-cardh/2
   s.rect(x,y,cardw,cardh,'#102f4b','#416786',id='stage-'+label.lower())
   s.text(f'0{i+1}',x+14,y+19,11 if mobile else 10,GOLD if i==4 else '#82b4e2',True)
   s.text(label,x+14,y+41,13 if mobile else 14,'#ffffff',True,.5 if mobile else 1)
   if not mobile:s.text(sub,x+14,y+60,10,'#b9cee0')
  s.finish(name)

 draw_learning('enterprise-learning')

 # Narrow-screen diagrams preserve readable labels instead of shrinking desktop copy.
 s=SVG('Task success and cost per verified task',400,500)
 s.rect(0,0,400,500,'#ffffff')
 s.rect(.5,.5,399,499,'none',LINE,id='outer-frame')
 s.rect(20,24,360,446,'#f7fafd')
 for y,label,col in [(52,'TASK SUCCESS',BLUE),(81,'COST / VERIFIED TASK','#986100')]:
  s.rect(38,y-10,7,7,BLUE if y==52 else GOLD)
  s.text(label,57,y,13,col,True,.3)
 for i,(success,cost) in enumerate(zip(values,costs)):
  x=38+i*16.2
  for b in range(success):s.rect(x+6,422-(b+1)*13,5,9,BLUE)
  for b in range(cost):s.rect(x,422-(b+1)*13,5,9,GOLD)
 s.text('ILLUSTRATIVE TRENDS',38,451,11,MUTED,spacing=.5)
 s.finish('verified-work-mobile')
 draw_learning('enterprise-learning-mobile',mobile=True)

for LOCALE in ('en','zh'):
 generate()
