"""Generates back-matter source files from the mapping and the writers' research files.
Usage: python3 -I backmatter.py  (run from /home/user/pscdlu/work)
Writes src/91_confused.txt, src/94_glossary.txt, src/95_index.txt
"""
import json, glob, re, os, unicodedata

W = '/home/user/pscdlu/work'
M = json.load(open(f'{W}/booklet/map_all.json'))
sec = {m['id']: m['section'] for m in M}
titles = json.load(open(f'{W}/src/titles.json'))


def secnum(s):
    return [int(x) for x in s.split('.')]


# ---------- booklet index ----------
out = ['::front Booklet Index',
       'This index links every question in the Unit I MCQ booklet to the section of this guide that teaches its answer. Find the set, then the question number; the figure beside it is the section to reread. For example, "23 · 6.7" means that Question 23 of that set is taught in Section 6.7.',
       'Read the whole section, not only the line you think you need. Examiners build distractors from the neighbouring ideas.']
for s in range(1, 21):
    lvl = ['Very Easy'] * 3 + ['Easy'] * 3 + ['Moderate'] * 4 + ['Tough'] * 4 + ['Critical'] * 3 + ['Advanced'] * 3
    if s > 1 and (s - 1) % 4 == 0:
        out.append('::pagebreak')
    out.append(f'::sub Set {s} ({lvl[s-1]})')
    out.append('::table small nohead widths=' + ','.join(['10'] * 10))
    for r in range(5):
        cells = []
        for c in range(10):
            q = r * 10 + c + 1
            cells.append(f'**{q}** · {sec[f"S{s}-Q{q}"]}')
        out.append('|' + '|'.join(cells) + '|')
# section -> list of questions (reverse index)
out.append('::pagebreak')
out.append('::sub The same index by section')
out.append('Use this list the other way round: when you finish a section, these are the booklet questions it prepares you for.')
out.append('::table small widths=12,88')
out.append('|Section|Booklet questions (set–question)|')
by = {}
for m in M:
    by.setdefault(m['section'], []).append(m['id'])
for s in sorted(by, key=secnum):
    ids = sorted(by[s], key=lambda x: (int(x[1:].split('-')[0]), int(x.split('Q')[1])))
    out.append(f'|{s}|' + ', '.join(i.replace('S', '').replace('-Q', '–') for i in ids) + '|')
open(f'{W}/src/95_index.txt', 'w').write('\n'.join(out) + '\n')

# ---------- confusable pairs ----------
rows = []
for f in sorted(glob.glob(f'{W}/research/confused_*.md')):
    for line in open(f, encoding='utf-8'):
        line = line.strip()
        if line.startswith('|') and not re.match(r'^\|\s*-', line):
            cells = [c.strip() for c in line.strip('|').split('|')]
            if len(cells) >= 3 and cells[0].lower() not in ('pair', 'pair/triplet', 'pairs'):
                rows.append(cells[:3])
seen = set(); uniq = []
for r in rows:
    k = r[0].lower()
    if k not in seen:
        seen.add(k); uniq.append(r)
uniq.sort(key=lambda r: secnum(re.findall(r'\d+\.\d+', r[2])[0]) if re.findall(r'\d+\.\d+', r[2]) else [99])
out = ['::front Confusable Pairs at a Glance',
       'Every "Often confused" box in the guide is collected here, in the order of the sections. Cover the middle column and test yourself: can you state the deciding difference for each pair?',
       '::table small widths=30,58,12', '|Pair|The deciding difference|Section|']
out += [f'|{a}|{b}|{c}|' for a, b, c in uniq]
open(f'{W}/src/91_confused.txt', 'w').write('\n'.join(out) + '\n')

# ---------- glossary ----------
g = {}
for f in sorted(glob.glob(f'{W}/research/glossary_*.tsv')):
    for line in open(f, encoding='utf-8'):
        p = [x.strip() for x in line.rstrip('\n').split('\t')]
        if len(p) < 3 or p[0].lower() in ('english term', 'english'):
            continue
        k = p[0].lower()
        if k not in g:
            g[k] = p
out = ['::front Bilingual Glossary',
       'English term, the Hindi term used in this guide, and a one-line meaning. Hindi terms follow NTA\'s Hindi syllabus where it uses a settled term, and otherwise the term standard in Hindi-medium textbooks.',
       '::table small widths=27,25,48', '|English|हिंदी|Meaning|']
for k in sorted(g):
    p = g[k]
    out.append(f'|{p[0]}|{p[1]}|{p[2]}|')
open(f'{W}/src/94_glossary.txt', 'w').write('\n'.join(out) + '\n')
print('index, confused rows', len(uniq), 'glossary', len(g))
