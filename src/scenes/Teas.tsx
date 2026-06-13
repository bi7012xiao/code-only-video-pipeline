import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

// All four are transparent cutouts (peach/oolong de-backgrounded via rembg) → uniform spec
const TEAS = [
  {img: 'photos/tea-lemon.png', name: 'Lemon Soda'},
  {img: 'photos/tea-passionfruit.png', name: 'Passionfruit Jasmine'},
  {img: 'photos/tea-peach-cut.png', name: 'Peach Jasmine'},
  {img: 'photos/tea-oolong-cut.png', name: 'Brûlée Oolong'},
];

export const Teas: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fadeOut = interpolate(frame, [123, 135], [1, 0], {extrapolateLeft: 'clamp'});
  const titleIn = spring({frame, fps, config: {damping: 12, stiffness: 130}});

  return (
    <AbsoluteFill style={{backgroundColor: C.yellow, opacity: fadeOut, fontFamily: FONT}}>
      {/* playful dotted texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.orange}2e 12px, transparent 13px)`,
          backgroundSize: '110px 110px',
        }}
      />
      <div style={{position: 'absolute', top: 64, width: '100%', textAlign: 'center', transform: `translateY(${(1 - titleIn) * -120}px)`}}>
        <span style={{fontSize: 84, fontWeight: 800, color: C.ink}}>
          Bubble Tea <span style={{color: C.red}}>鲜果茶</span>
        </span>
      </div>

      <AbsoluteFill style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 60, paddingBottom: 90, paddingTop: 120}}>
        {TEAS.map((t, i) => {
          const s = spring({frame: frame - 14 - i * 9, fps, config: {damping: 11, stiffness: 120}});
          const sway = Math.sin((frame + i * 25) / 22) * 2.2;
          return (
            <div key={i} style={{textAlign: 'center', transform: `translateY(${(1 - s) * 760}px) rotate(${sway}deg)`}}>
              {/* uniform card: equalizes transparent cutouts vs studio photos */}
              <div
                style={{
                  width: 360, height: 560, borderRadius: 32, overflow: 'hidden',
                  background: `linear-gradient(180deg, ${C.white}, ${C.cream})`,
                  boxShadow: '0 30px 60px rgba(43,26,18,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Img
                  src={staticFile(t.img)}
                  style={{height: 480, filter: 'drop-shadow(0 16px 28px rgba(43,26,18,.25))'}}
                />
              </div>
              <div
                style={{
                  marginTop: 18, display: 'inline-block', background: C.cream, color: C.ink,
                  fontSize: 34, fontWeight: 700, padding: '12px 30px', borderRadius: 999,
                  boxShadow: '0 8px 24px rgba(43,26,18,.18)', opacity: s,
                }}
              >
                {t.name}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
