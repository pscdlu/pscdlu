#!/bin/bash
# Fills footprints, regenerates back matter, builds final DOCX+PDF, saves checkpoint zip.
set -e
W=/home/user/pscdlu/work; cd $W
python3 -I tools/backmatter.py
python3 -I tools/fill_fp.py
mkdir -p build/final
NAME=UGC_NET_P1_Unit1_Teaching_Aptitude_Study_Guide
python3 -I - <<'PY'
import json,glob,os
W='/home/user/pscdlu/work'
order=['00_front.txt','00b_exam.txt','01a_G1a.txt','01b_G1b.txt','02a_G2a.txt','02b_G2b.txt','03_G35.txt','04_G4.txt','05_G35.txt','06a_G6a.txt','06b_G6b.txt','90_quickref.txt','91_confused.txt','92_revision.txt','94_glossary.txt','95_index.txt','96_recheck.txt']
files=[f'../../build/fp/{f}' for f in order if os.path.exists(f'{W}/build/fp/{f}')]
m={"header":"UGC NET Paper 1 · Unit I: Teaching Aptitude · Study Guide","docTitle":"UGC NET Paper 1 Unit I Teaching Aptitude Study Guide","files":files,
 "title":{"unitLine":"Unit I: Teaching Aptitude","subtitle":"Study Guide","hindiTitle":"इकाई I : शिक्षण अभिवृत्ति","tagline":"A guide to study alone, with an index to the 1,000-question MCQ booklet","creditDate":"Free study material for students  -  October 2026"}}
json.dump(m,open(f'{W}/build/final/manifest.json','w'),ensure_ascii=False,indent=1)
print(len(files),'files')
PY
tools/make.sh build/final/manifest.json build/final/$NAME
cp build/final/$NAME.docx build/final/$NAME.pdf /home/user/pscdlu/outputs/
(cd /home/user/pscdlu && rm -f outputs/working_files.zip && zip -qr outputs/working_files.zip work -x 'work/build/*' -x 'work/booklet/slice_*')
echo assembled
