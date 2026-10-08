#!/bin/bash
# make.sh <manifest.json> <outbase>   -> outbase.docx, outbase.pdf (two passes for contents page numbers)
set -e
export FONTCONFIG_FILE=/home/user/pscdlu/work/fonts/fonts.conf
M=$1; OUT=$2; D=$(dirname $OUT); B=$(basename $OUT)
node /home/user/pscdlu/work/tools/build.js $M $OUT.docx
(cd $D && soffice --headless --convert-to pdf $B.docx >/dev/null 2>&1)
python3 -I /home/user/pscdlu/work/tools/pagemap.py $OUT.pdf $OUT.toc.json $OUT.pages.json
node /home/user/pscdlu/work/tools/build.js $M $OUT.docx $OUT.pages.json
(cd $D && soffice --headless --convert-to pdf $B.docx >/dev/null 2>&1)
python3 -I /home/user/pscdlu/work/tools/pagemap.py $OUT.pdf $OUT.toc.json $OUT.pages2.json
cmp -s $OUT.pages.json $OUT.pages2.json && echo "contents page numbers stable" || echo "WARNING: page numbers shifted; rerun"
pdfinfo $OUT.pdf | grep Pages
