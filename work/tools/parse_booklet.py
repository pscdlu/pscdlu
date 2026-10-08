import re,json,sys
t=open(sys.argv[1],encoding='utf-8').read()
parts=re.split(r'^# \*\*Set (\d+)\*\*\s*$',t,flags=re.M)
out=[]
for i in range(1,len(parts),2):
    s=int(parts[i]); body=parts[i+1]
    qpart,_,rest=body.partition('## **Answer Key: Set %d**'%s)
    keypart,_,expl=rest.partition('## **Answers and Explanations: Set %d**'%s)
    keys=dict((int(a),b) for a,b in re.findall(r'(\d+)\s+\*\*([ABCD])\*\*',keypart))
    qs=re.split(r'^\*\*(\d+)\.\*\*\s*',qpart,flags=re.M)
    qtext={int(qs[j]):qs[j+1].strip() for j in range(1,len(qs),2)}
    ex=re.split(r'^\*\*Q(\d+) — ',expl,flags=re.M)
    etext={int(ex[j]):ex[j+1].strip() for j in range(1,len(ex),2)}
    for n in range(1,51):
        out.append(dict(set=s,q=n,text=qtext.get(n,'MISSING'),key=keys.get(n,'?'),expl=etext.get(n,'MISSING')))
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=0)
miss=[(o['set'],o['q']) for o in out if 'MISSING' in (o['text'],o['expl']) or o['key']=='?']
print(len(out),'questions; sets',sorted(set(o['set'] for o in out)),'problems',miss[:20],len(miss))
# check explanation letter matches key
bad=[(o['set'],o['q'],o['key'],o['expl'][:5]) for o in out if not o['expl'].startswith('(%s)'%o['key'])]
print('key/expl mismatches',len(bad),bad[:10])
