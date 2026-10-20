"""Converts the guide's source files (build/fp/*.txt, footprints filled) into one pandoc Markdown file for the EPUB.
Usage: python3 -I to_md.py <out.md>
"""
import re, sys, json, os

W = '/home/user/pscdlu/work'
ORDER = ['00_front.txt', '00b_exam.txt', '01a_G1a.txt', '01b_G1b.txt', '02a_G2a.txt', '02b_G2b.txt', '03_G35.txt',
         '04_G4.txt', '05_G35.txt', '06a_G6a.txt', '06b_G6b.txt', '90_quickref.txt', '91_confused.txt',
         '92_revision.txt', '94_glossary.txt', '95_index_ebook.txt', '96_recheck.txt']
LABEL = {'footprint': 'Exam footprint', 'confused': 'Often confused', 'fact': 'Fact watch', 'check': 'Check yourself',
         'example': 'Classroom example', 'worked': 'Worked example', 'slips': 'Usual slips', 'note': 'Note'}


def esc_cell(c):
    c = c.replace('|', '\\|')
    return ' <br/> '.join(x.strip() for x in c.split(' // '))


def table(rows, header=True):
    n = max(len(r) for r in rows)
    rows = [r + [''] * (n - len(r)) for r in rows]
    if not header:
        rows = [[''] * n] + rows
    out = ['| ' + ' | '.join(esc_cell(c) for c in rows[0]) + ' |', '|' + '|'.join(['---'] * n) + '|']
    out += ['| ' + ' | '.join(esc_cell(c) for c in r) + ' |' for r in rows[1:]]
    return out


def mdline(L):
    # keep "1. text", "I. text", "a) text" as plain paragraphs with their own numbers
    if re.match(r'^(\d+|[IVX]+|[a-e])[.)]\s', L) and not re.match(r'^\d+\.\d', L):
        return re.sub(r'^(\S+?)([.)])', r'\1\\\2', L, count=1)
    if L.startswith('#'):
        return '\\' + L
    return L


def convert(lines, ctx, inner=False):
    out = []
    i = 0
    while i < len(lines):
        L = lines[i]
        if not L.strip() or L.startswith('%'):
            i += 1; continue
        if L.startswith('::chapter '):
            n, t = [x.strip() for x in L[10:].split('|')]
            ctx['chapter'] = n
            out += ['', f'# Chapter {n}: {t} {{#ch{n}}}', '']
        elif L.startswith('::front '):
            t = L[8:].strip()
            out += ['', f'# {t}', '']
        elif L.startswith('::section '):
            n, t = [x.strip() for x in L[10:].split('|')]
            ctx['section'] = n
            out += ['', f'## {n}  {t} {{#s{n.replace(".", "-")}}}', '']
        elif L.startswith('::syllabus '):
            out += ['', f'*Syllabus: {L[11:].strip()}*', '']
        elif L.startswith('::h '):
            out += ['', f'### {L[4:].strip()} {{-}}', '']
        elif L.startswith('::further'):
            out += ['', '### Going Further {-}', '', '*This layer is for Sets 11 to 20 of the booklet. Read it after you have finished Set 10.*', '']
        elif L.startswith('::sub '):
            out += ['', f'#### {L[6:].strip()} {{-}}', '']
        elif L.startswith('::pagebreak'):
            pass
        elif L.startswith('::center '):
            out += ['', L[9:], '']
        elif L.startswith('::box '):
            kind = L[6:].strip(); buf = []; i += 1
            while i < len(lines) and not lines[i].startswith('::endbox'):
                buf.append(lines[i]); i += 1
            out += ['', f'::: {{.box .{kind}}}', f'[{LABEL.get(kind, kind).upper()}]{{.boxlabel}}', '']
            out += convert(buf, ctx, True)
            out += ['', ':::', '']
        elif L.startswith('::answers'):
            buf = []; i += 1
            while i < len(lines) and not lines[i].startswith('::endanswers'):
                buf.append(lines[i]); i += 1
            ctx['answers'].append((ctx['section'], buf))
        elif L.startswith('::chapteranswers'):
            mine = [a for a in ctx['answers'] if a[0] and a[0].split('.')[0] == ctx['chapter']]
            if mine:
                out += ['', f'## Answers to "Check yourself": Chapter {ctx["chapter"]} {{-}}', '']
                for s, buf in mine:
                    out += ['', f'#### Section {s} {{-}}', '']
                    out += convert(buf, ctx, True)
        elif L.startswith('::table'):
            nohead = 'nohead' in L
            i += 1; rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            out += [''] + table(rows, not nohead) + ['']
            continue
        elif L.startswith('::match'):
            i += 1; rows = []
            while i < len(lines) and '||' in lines[i]:
                rows.append([c.strip() for c in lines[i].split('||')]); i += 1
            out += [''] + table(rows) + ['']
            continue
        elif re.match(r'^Q\d+\.\s', L):
            m = re.match(r'^Q(\d+)\.\s+(.*)$', L)
            out += ['', f'**{m.group(1)}.** {m.group(2)}', '']
        elif re.match(r'^\([A-D]\)\s', L):
            out += ['', f'::: option', L.replace('(', '\\(', 1), ':::', '']
        elif L.startswith('- '):
            out += [L]
            if i + 1 < len(lines) and not lines[i + 1].startswith('- '):
                out += ['']
        elif L.startswith('> '):
            out += ['', '::: working', L[2:], ':::', '']
        else:
            out += ['', mdline(L), '']
        i += 1
    return out


def main():
    ctx = {'answers': [], 'chapter': None, 'section': None}
    md = []
    for f in ORDER:
        p = f'{W}/build/fp/{f}'
        if not os.path.exists(p):
            p = f'{W}/src/{f}'
        md += convert(open(p, encoding='utf-8').read().split('\n'), ctx)
    s = '\n'.join(md)
    s = re.sub(r'\n{3,}', '\n\n', s)
    open(sys.argv[1], 'w', encoding='utf-8').write(s)
    print('words', len(s.split()))


main()
