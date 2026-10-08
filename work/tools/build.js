// Builds the study guide DOCX from plain-text source files.
// Usage: node build.js <manifest.json> <out.docx> [pages.json]
// manifest: {"title":..., "header":..., "files":[...source files in order...]}
const fs = require('fs');
const path = require('path');
const d = require('docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, AlignmentType, HeadingLevel, Header, Footer, PageNumber, TabStopType,
  TabStopPosition, LevelFormat, PageBreak, TableLayoutType, VerticalAlign,
} = d;

const FONT = 'Calibri';
const HFONT = 'Nirmala UI';
const PAGE_W = 11906, MARGIN = 1440, TEXT_W = PAGE_W - 2 * MARGIN; // 9026
const GREY_BOX = 'F2F2F2', GREY_HEAD = 'D9D9D9', RULE = '808080', DARK = '404040';

// ---------- typography ----------
function smart(s) {
  s = s.replace(/ -- /g, ' – ').replace(/--/g, '–');
  s = s.replace(/(^|[\s(\[{—–\/])"/g, '$1“').replace(/"/g, '”');
  s = s.replace(/(^|[\s(\[{—–\/])'/g, '$1‘').replace(/'/g, '’');
  s = s.replace(/\.\.\./g, '…');
  return s;
}
const DEV = /[ऀ-ॿ᳐-᳿꣠-ꣿ]+(?:[\s‌‍]*[ऀ-ॿ]+)*/g;

// inline: **bold**, *italic*; returns TextRun[]
function runs(text, base = {}) {
  text = smart(text);
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  const push = (t, fmt) => {
    if (!t) return;
    // split Devanagari
    let i = 0, mm;
    DEV.lastIndex = 0;
    while ((mm = DEV.exec(t))) {
      if (mm.index > i) out.push(new TextRun({ text: t.slice(i, mm.index), ...base, ...fmt }));
      out.push(new TextRun({ text: mm[0], ...base, ...fmt, font: { ascii: HFONT, hAnsi: HFONT, cs: HFONT, eastAsia: HFONT }, sizeComplexScript: (base.size || 22) }));
      i = mm.index + mm[0].length;
    }
    if (i < t.length) out.push(new TextRun({ text: t.slice(i), ...base, ...fmt }));
  };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index), {});
    const tok = m[0];
    if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true });
    else push(tok.slice(1, -1), { italics: true });
    last = m.index + tok.length;
  }
  push(text.slice(last), {});
  return out;
}

function para(text, opts = {}) {
  return new Paragraph({ children: runs(text, opts.run || {}), spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: opts.line ?? 264 }, indent: opts.indent, alignment: opts.align, keepNext: opts.keepNext, style: opts.style, border: opts.border, heading: opts.heading, pageBreakBefore: opts.pageBreakBefore, tabStops: opts.tabStops, keepLines: opts.keepLines });
}

// ---------- tables ----------
const thin = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const allThin = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
function cellParas(text, bold, size) {
  return text.split(' // ').map((t, i, a) => new Paragraph({ children: runs(t.trim(), { bold, size }), spacing: { after: i === a.length - 1 ? 0 : 60, line: 252 } }));
}
function makeTable(rows, widthsPct, width = TEXT_W, opts = {}) {
  const n = rows[0].length;
  let w = widthsPct && widthsPct.length === n ? widthsPct : Array(n).fill(100 / n);
  const tot = w.reduce((a, b) => a + b, 0);
  let cols = w.map(x => Math.floor(width * x / tot));
  cols[cols.length - 1] += width - cols.reduce((a, b) => a + b, 0);
  const size = opts.size || 20;
  return new Table({
    width: { size: width, type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED,
    borders: allThin,
    rows: rows.map((r, ri) => new TableRow({
      tableHeader: ri === 0 && !opts.noHeader, cantSplit: true,
      children: r.map((c, ci) => new TableCell({
        width: { size: cols[ci], type: WidthType.DXA },
        shading: (ri === 0 && !opts.noHeader) ? { type: ShadingType.CLEAR, color: 'auto', fill: GREY_HEAD } : (opts.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: opts.fill } : undefined),
        margins: { top: 50, bottom: 50, left: 90, right: 90 },
        children: cellParas(c, ri === 0 && !opts.noHeader, size),
      })),
    })),
  });
}

// ---------- boxes ----------
const BOX_LABEL = { footprint: 'EXAM FOOTPRINT', confused: 'OFTEN CONFUSED', fact: 'FACT WATCH', check: 'CHECK YOURSELF', example: 'CLASSROOM EXAMPLE', worked: 'WORKED EXAMPLE', note: 'NOTE', slips: 'USUAL SLIPS' };
function box(kind, children) {
  const label = new Paragraph({ children: [new TextRun({ text: BOX_LABEL[kind] || kind.toUpperCase(), bold: true, size: 19, characterSpacing: 20, color: '000000' })], spacing: { after: 80 }, keepNext: true });
  const thick = { style: BorderStyle.SINGLE, size: 24, color: DARK };
  const light = { style: BorderStyle.SINGLE, size: 4, color: 'A6A6A6' };
  return [new Table({
    width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W], layout: TableLayoutType.FIXED,
    borders: { top: light, bottom: light, right: light, left: thick, insideHorizontal: light, insideVertical: light },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: TEXT_W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: kind === 'example' || kind === 'worked' ? 'FFFFFF' : GREY_BOX },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      children: [label, ...children],
    })] })],
  }), new Paragraph({ spacing: { after: 60 }, children: [] })];
}

// ---------- parser ----------
function parseBlocks(lines, ctx, inner = false) {
  const out = [];
  let i = 0;
  const W = inner ? TEXT_W - 400 : TEXT_W;
  while (i < lines.length) {
    let L = lines[i];
    if (L.trim() === '') { i++; continue; }
    if (L.startsWith('%')) { i++; continue; } // comment
    if (L.startsWith('::chapter ')) {
      const [num, title] = L.slice(10).split('|').map(s => s.trim());
      ctx.chapter = num; ctx.toc.push({ level: 1, text: `Chapter ${num}  ${title}` });
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: runs(`Chapter ${num}`), spacing: { after: 60 } }));
      out.push(new Paragraph({ children: runs(title, { bold: true, size: 36 }), spacing: { after: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: DARK, space: 6 } } }));
      i++; continue;
    }
    if (L.startsWith('::front ')) { // unnumbered front/back-matter heading
      const title = L.slice(8).trim();
      ctx.toc.push({ level: 1, text: title });
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: runs(title), spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: DARK, space: 6 } } }));
      i++; continue;
    }
    if (L.startsWith('::section ')) {
      const [num, title] = L.slice(10).split('|').map(s => s.trim());
      ctx.section = num; ctx.toc.push({ level: 2, text: `${num}  ${title}` });
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs(`${num}  ${title}`), spacing: { before: 360, after: 120 }, keepNext: true }));
      i++; continue;
    }
    if (L.startsWith('::syllabus ')) { out.push(para(`*Syllabus:* ${L.slice(11).trim()}`, { run: { size: 19, color: '404040' }, after: 120 })); i++; continue; }
    if (L.startsWith('::h ')) { out.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs(L.slice(4).trim()), spacing: { before: 200, after: 100 }, keepNext: true })); i++; continue; }
    if (L.startsWith('::further')) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs('Going Further'), spacing: { before: 280, after: 100 }, keepNext: true, border: { top: { style: BorderStyle.SINGLE, size: 6, color: DARK, space: 6 } } }));
      out.push(para('*This layer is for Sets 11 to 20 of the booklet. Read it after you have finished Set 10.*', { run: { size: 19 }, after: 120 }));
      i++; continue;
    }
    if (L.startsWith('::sub ')) { out.push(new Paragraph({ heading: HeadingLevel.HEADING_4, children: runs(L.slice(6).trim()), spacing: { before: 160, after: 80 }, keepNext: true })); i++; continue; }
    if (L.startsWith('::pagebreak')) { out.push(new Paragraph({ children: [new PageBreak()] })); i++; continue; }
    if (L.startsWith('::box ')) {
      const kind = L.slice(6).trim(); const buf = []; i++;
      while (i < lines.length && !lines[i].startsWith('::endbox')) buf.push(lines[i++]);
      i++;
      out.push(...box(kind, parseBlocks(buf, ctx, true)));
      continue;
    }
    if (L.startsWith('::answers')) {
      const buf = []; i++;
      while (i < lines.length && !lines[i].startsWith('::endanswers')) buf.push(lines[i++]);
      i++;
      ctx.answers.push({ section: ctx.section, lines: buf });
      continue;
    }
    if (L.startsWith('::chapteranswers')) {
      const mine = ctx.answers.filter(a => a.section && a.section.split('.')[0] === ctx.chapter);
      if (mine.length) {
        ctx.toc.push({ level: 2, text: `Answers to “Check yourself”: Chapter ${ctx.chapter}` });
        out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs(`Answers to "Check yourself": Chapter ${ctx.chapter}`), spacing: { before: 360, after: 120 }, keepNext: true, pageBreakBefore: true }));
        for (const a of mine) {
          out.push(new Paragraph({ heading: HeadingLevel.HEADING_4, children: runs(`Section ${a.section}`), spacing: { before: 160, after: 60 }, keepNext: true }));
          out.push(...parseBlocks(a.lines, ctx, false));
        }
      }
      i++; continue;
    }
    if (L.startsWith('::table')) {
      const m = L.match(/widths=([\d,.]+)/); const widths = m ? m[1].split(',').map(Number) : null;
      const small = /small/.test(L) ? 18 : 20; const noHeader = /nohead/.test(L);
      i++; const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(s => s.trim())); i++;
      }
      out.push(makeTable(rows, widths, W, { size: small, noHeader }));
      out.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
      continue;
    }
    if (L.startsWith('::match')) { // List I || List II
      i++; const rows = [];
      while (i < lines.length && lines[i].includes('||')) { rows.push(lines[i].split('||').map(s => s.trim())); i++; }
      out.push(makeTable(rows, [50, 50], W - 400, { size: 20 }));
      out.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
      continue;
    }
    // question: "Q1. text"
    let m;
    if ((m = L.match(/^Q(\d+)\.\s+(.*)$/))) {
      out.push(new Paragraph({ children: [new TextRun({ text: `${m[1]}.`, bold: true }), new TextRun({ text: '\t' }), ...runs(m[2])], tabStops: [{ type: TabStopType.LEFT, position: 400 }], indent: { left: 400, hanging: 400 }, spacing: { before: 140, after: 60, line: 264 }, keepNext: true }));
      i++; continue;
    }
    if ((m = L.match(/^\(([A-D])\)\s+(.*)$/))) {
      out.push(new Paragraph({ children: [new TextRun({ text: `(${m[1]})` }), new TextRun({ text: '\t' }), ...runs(m[2])], tabStops: [{ type: TabStopType.LEFT, position: 840 }], indent: { left: 840, hanging: 440 }, spacing: { after: 30, line: 252 }, keepNext: m[1] !== 'D' }));
      i++; continue;
    }
    if ((m = L.match(/^(\d+|[IVX]+|[a-e])[.)]\s+(.*)$/)) && !L.match(/^\d+\.\d/)) {
      out.push(new Paragraph({ children: [new TextRun({ text: `${m[1]}.` }), new TextRun({ text: '\t' }), ...runs(m[2])], tabStops: [{ type: TabStopType.LEFT, position: 760 }], indent: { left: 760, hanging: 360 }, spacing: { after: 60, line: 264 } }));
      i++; continue;
    }
    if (L.startsWith('- ')) {
      out.push(new Paragraph({ numbering: { reference: 'bul', level: 0 }, children: runs(L.slice(2)), spacing: { after: 60, line: 264 } }));
      i++; continue;
    }
    if (L.startsWith('> ')) { // indented plain (working lines)
      out.push(para(L.slice(2), { indent: { left: 400 }, after: 40 }));
      i++; continue;
    }
    if (L.startsWith('::center ')) { out.push(para(L.slice(9), { align: AlignmentType.CENTER })); i++; continue; }
    out.push(para(L));
    i++;
  }
  return out;
}

function tocBlock(toc, pages) {
  const out = [];
  for (const t of toc) {
    const p = pages && pages[t.text] ? String(pages[t.text]) : '';
    out.push(new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' }],
      indent: { left: t.level === 1 ? 0 : 400 },
      spacing: { before: t.level === 1 ? 140 : 0, after: 30, line: 252 },
      children: [...runs(t.text, { bold: t.level === 1, size: t.level === 1 ? 22 : 20 }), new TextRun({ text: '\t' + p, bold: t.level === 1, size: t.level === 1 ? 22 : 20 })],
    }));
  }
  return out;
}

function titlePage(meta) {
  const c = AlignmentType.CENTER;
  const P = (t, o) => para(t, { align: c, ...o });
  return [
    P('', { before: 1800 }),
    P('UGC NET Paper 1', { run: { size: 30, color: '404040' }, after: 120 }),
    P('General Paper on Teaching and Research Aptitude', { run: { size: 22, italics: true, color: '404040' }, after: 600 }),
    P(meta.unitLine, { run: { size: 44, bold: true }, after: 120 }),
    P(meta.subtitle, { run: { size: 32 }, after: 120 }),
    P(meta.hindiTitle || '', { run: { size: 26 }, after: 1600 }),
    P(meta.tagline || '', { run: { size: 22, italics: true }, after: 1800 }),
    P('Prepared by Prof. Pankaj Sharma', { run: { size: 24, bold: true }, after: 80 }),
    P('Department of English, Chaudhary Devi Lal University, Sirsa', { run: { size: 22 }, after: 80 }),
    P(meta.creditDate, { run: { size: 22 }, after: 0 }),
  ];
}

async function main() {
  const [manifestPath, outPath, pagesPath] = process.argv.slice(2);
  const man = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const pages = pagesPath && fs.existsSync(pagesPath) ? JSON.parse(fs.readFileSync(pagesPath, 'utf8')) : null;
  const ctx = { toc: [], answers: [], chapter: null, section: null };
  const base = path.dirname(manifestPath);
  const body = [];
  for (const f of man.files) {
    const lines = fs.readFileSync(path.resolve(base, f), 'utf8').split(/\r?\n/);
    body.push(...parseBlocks(lines, ctx));
  }
  // contents placeholder: inserted after the front matter marker index
  const toc = tocBlock(ctx.toc, pages);
  const contentsHead = new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: runs('Contents'), spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: DARK, space: 6 } } });
  const front = man.title ? titlePage(man.title) : [];
  const children = [...front];
  if (man.contents !== false) children.push(contentsHead, ...toc);
  children.push(...body);
  fs.writeFileSync(outPath.replace(/\.docx$/, '.toc.json'), JSON.stringify(ctx.toc.map(t => t.text), null, 1));

  const doc = new Document({
    creator: 'Prof. Pankaj Sharma', title: man.docTitle || 'Study Guide', description: man.docTitle || '',
    styles: {
      default: { document: { run: { font: { ascii: FONT, hAnsi: FONT, cs: HFONT, eastAsia: FONT }, size: 22, sizeComplexScript: 22 }, paragraph: { spacing: { line: 264 } } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, color: '000000', font: FONT }, paragraph: { spacing: { after: 120 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, color: '000000', font: FONT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 23, bold: true, color: '000000', font: FONT }, paragraph: { outlineLevel: 2 } },
        { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, italics: true, color: '000000', font: FONT }, paragraph: { outlineLevel: 3 } },
      ],
    },
    numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 708, footer: 708 } }, titlePage: true },
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } }, children: [new TextRun({ text: man.header, size: 18, color: '404040' })] })] }),
        first: new Header({ children: [new Paragraph({ children: [] })] }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], size: 20, sizeComplexScript: 20, color: '404040' })] })] }),
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
      },
      children,
    }],
  });
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  console.log('wrote', outPath, 'toc entries', ctx.toc.length);
}
main().catch(e => { console.error(e); process.exit(1); });
