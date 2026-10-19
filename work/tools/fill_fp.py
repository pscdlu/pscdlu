# Copies src/*.txt to build/fp/, replacing {{FP x.y}} with lines from research/footprints.json
import json,glob,os,re
W='/home/user/pscdlu/work'
fp=json.load(open(f'{W}/research/footprints.json')) if os.path.exists(f'{W}/research/footprints.json') else {}
os.makedirs(f'{W}/build/fp',exist_ok=True)
missing=[]
for f in glob.glob(f'{W}/src/*.txt'):
    s=open(f,encoding='utf-8').read()
    def rep(m):
        k=m.group(1)
        if k in fp: return fp[k]
        missing.append(k); return '[footprint pending]'
    s=re.sub(r'\{\{FP ([\d.]+)\}\}',rep,s)
    open(f'{W}/build/fp/'+os.path.basename(f),'w',encoding='utf-8').write(s)
print('footprints missing:',missing)
