import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

const LETTERS = ['G', 'U', 'L', 'U', 'L', 'U'];

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const mascotIn = spring({frame, fps, config: {damping: 10, stiffness: 120}});
  const underline = interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [92, 105], [1, 0], {extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: C.cream, opacity: fadeOut, fontFamily: FONT}}>
      {/* warm radial glow */}
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, ${C.yellow}33 0%, transparent 60%)`}} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 70}}>
        {/* mascot pops in (white page bg removed via multiply blend on cream) */}
        <Img
          src={staticFile('mascot/mascot.png')}
          style={{
            height: 560,
            mixBlendMode: 'multiply',
            transform: `scale(${mascotIn}) rotate(${(1 - mascotIn) * -14}deg)`,
          }}
        />
        <div>
          <div style={{display: 'flex'}}>
            {LETTERS.map((l, i) => {
              const s = spring({frame: frame - 8 - i * 4, fps, config: {damping: 11, stiffness: 150}});
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 170,
                    fontWeight: 800,
                    letterSpacing: 6,
                    color: i % 2 === 0 ? C.red : C.orange,
                    transform: `translateY(${(1 - s) * 220}px) scale(${0.6 + s * 0.4})`,
                    display: 'inline-block',
                    opacity: Math.min(1, s * 1.4),
                  }}
                >
                  {l}
                </span>
              );
            })}
          </div>
          {/* swiping underline */}
          <div style={{height: 14, width: `${underline * 100}%`, background: C.yellow, borderRadius: 8, marginTop: 6}} />
          <div
            style={{
              fontSize: 44, color: C.ink, marginTop: 28, fontWeight: 500, letterSpacing: 2,
              opacity: interpolate(frame, [55, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            Mini Hot Pot &amp; Bubble Tea · München
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
