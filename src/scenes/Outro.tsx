import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const mascotIn = spring({frame, fps, config: {damping: 12, stiffness: 100}});
  const textIn = spring({frame: frame - 12, fps, config: {damping: 13, stiffness: 110}});
  // gentle settle for seamless loop back to Intro's cream bg
  const breathe = 1 + Math.sin(frame / 18) * 0.012;

  return (
    <AbsoluteFill style={{backgroundColor: C.cream, fontFamily: FONT, justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, ${C.yellow}38 0%, transparent 58%)`}} />

      <div style={{display: 'flex', alignItems: 'center', gap: 80}}>
        <Img
          src={staticFile('mascot/mascot.png')}
          style={{height: 480, mixBlendMode: 'multiply', transform: `scale(${mascotIn * breathe})`}}
        />
        <div style={{transform: `translateX(${(1 - textIn) * 200}px)`, opacity: textIn}}>
          <div style={{fontSize: 130, fontWeight: 800, letterSpacing: 4}}>
            <span style={{color: C.red}}>GU</span>
            <span style={{color: C.orange}}>LU</span>
            <span style={{color: C.red}}>LU</span>
          </div>
          <div style={{fontSize: 50, color: C.ink, fontWeight: 600, marginTop: 14}}>
            Mini Hot Pot &amp; Bubble Tea
          </div>
          <div style={{fontSize: 40, color: C.ink, opacity: 0.62, marginTop: 10}}>
            München · northwind.example
          </div>
          <div
            style={{
              display: 'inline-block', marginTop: 36, background: C.red, color: C.cream,
              fontSize: 38, fontWeight: 700, padding: '18px 52px', borderRadius: 999,
              boxShadow: `0 16px 40px ${C.red}55`,
              opacity: interpolate(frame, [30, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            Jetzt vorbeikommen · 欢迎来吃
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
