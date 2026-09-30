#!/bin/sh
# Renders page 1 of public/resume.pdf to public/resume-preview.png for the Resume window.
# Run after replacing the PDF: npm run resume:preview   (macOS: uses Quick Look + sips)
set -eu
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
qlmanage -t -s 1700 -o "$tmp" public/resume.pdf >/dev/null 2>&1
mv "$tmp/resume.pdf.png" public/resume-preview.png
rm -rf "$tmp"
sips -g pixelWidth -g pixelHeight public/resume-preview.png | tail -2
