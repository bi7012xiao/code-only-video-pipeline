#!/bin/bash
# B-roll preprocessing: trim best segments from your source footage,
# warm color grade (brand-matched), strip audio, normalize to 1100px-tall vertical.
# Output goes to public/broll/ for Remotion to consume via staticFile().
set -e
SRC="./assets/raw-broll.mp4"   # your source footage
OUT="$(dirname "$0")/../public/broll"
mkdir -p "$OUT"

# Warm grade: +sat, +contrast, slight lift, gentle vignette — matches red/orange/yellow brand
GRADE="eq=saturation=1.18:contrast=1.07:brightness=0.015,vignette=PI/5,scale=-2:1100"

ffmpeg -y -v error -ss 0.2  -t 3.6 -i "$SRC" -vf "$GRADE" -an -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p "$OUT/clip-picking.mp4"
ffmpeg -y -v error -ss 7.6  -t 3.6 -i "$SRC" -vf "$GRADE" -an -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p "$OUT/clip-mala.mp4"
ffmpeg -y -v error -ss 11.8 -t 3.6 -i "$SRC" -vf "$GRADE" -an -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p "$OUT/clip-table.mp4"
echo "B-roll ready: $(ls "$OUT")"
