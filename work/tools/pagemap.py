import sys,json,subprocess,re
pdf,tocf,outf=sys.argv[1:4]
toc=json.load(open(tocf))
n=int(re.search(r'Pages:\s+(\d+)',subprocess.run(['pdfinfo',pdf],capture_output=True,text=True).stdout).group(1))
pages=[]
for p in range(1,n+1):
    t=subprocess.run(['pdftotext','-f',str(p),'-l',str(p),'-layout',pdf,'-'],capture_output=True,text=True).stdout
    pages.append(re.sub(r'\s+',' ',t))
norm=lambda s: re.sub(r'\s+',' ',s.replace('“','"').replace('”','"')).strip()
# skip contents pages: start searching after the last page containing 'Contents' heading run of toc
start=0
for i,t in enumerate(pages):
    if t.count('....')>5 or t.count('. . .')>5 or t.count('…')>5: start=i+1
res={}; cur=start
for e in toc:
    key=norm(e)[:60]
    found=None
    for i in range(cur,n):
        if key in norm(pages[i].replace('"','"')):
            found=i; break
    if found is None:
        # loosen: first 35 chars
        for i in range(cur,n):
            if norm(e)[:35] in pages[i]: found=i;break
    if found is not None:
        res[e]=found+1; cur=found
    else:
        print('NOT FOUND:',e)
json.dump(res,open(outf,'w'),ensure_ascii=False,indent=1)
