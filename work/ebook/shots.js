const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(()=>chromium.launch());
  const p = await b.newPage({ viewport: { width: 480, height: 800 } });
  const base = 'file:///home/user/pscdlu/work/ebook/x/EPUB/';
  const shots = [['nav.xhtml',0,'nav'],['text/ch009.xhtml','#s6-7','s67'],['text/ch009.xhtml','Check yourself','chk'],['text/ch005.xhtml','#s2-2','hindi'],['text/ch014.xhtml',0,'index']];
  for (const [f,anchor,name] of shots) {
    await p.goto(base+f);
    if (typeof anchor==='string' && anchor.startsWith('#')) await p.evaluate(a=>document.querySelector(a).scrollIntoView(), anchor);
    else if (anchor) await p.evaluate(t=>{const e=[...document.querySelectorAll('span.boxlabel')].find(x=>x.textContent.includes('CHECK'));e.scrollIntoView();}, anchor);
    await p.screenshot({ path: `shot_${name}.png` });
  }
  await b.close();
})();
