# code-only-video-pipeline

A brand hero video built entirely in code. No video editor, no timeline.

I needed a hero video for a small business and didn't want to open Premiere or After Effects, so I built the whole thing as a pipeline: pull the brand colors from existing assets, grade the B-roll in FFmpeg, compose the animated scenes in Remotion (React), render to MP4 and WebM. This repo is the pipeline with the brand-specific assets stripped out.

## The steps

```
asset library
   -> survey footage (ffprobe + a contact sheet to eyeball it)
   -> pull brand colors into theme.ts
FFmpeg     -> trim B-roll, warm color grade, drop the audio
Remotion   -> animated scenes, spring motion, Ken Burns on stills
render     -> lossless PNG frames -> MP4 + VP9 WebM + a poster frame
optimize   -> compress images, faststart so it autoplays on the web
```

Some details that were actually useful:

- Brand colors came from a PDF brand guide, not Figma, dropped straight into `theme.ts`.
- Vertical phone footage shown as tilted cards inside a 16:9 frame.
- Transparent product cutouts (rembg) all forced into one card size.
- The loop that mattered: render, pull frames into a contact sheet, look at it, fix, render again.

## Stack

Remotion, FFmpeg, Node/TypeScript, rembg. Nothing proprietary.

## Run it

```bash
npm install
npm run studio    # live preview while you tweak
npm run render    # -> out/brand-hero.mp4
```

## Assets

The mascot, product photos, and B-roll aren't included. Drop your own into `public/`. The code shows how they get composed.

---
Built by Xiao Bi. AI Solutions Engineer, EE PhD (TU Munich), Munich.
