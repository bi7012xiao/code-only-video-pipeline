import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

const FLAVORS = [
  {img: 'photos/hotpot-original.jpg', de: 'Original', cn: '原味', desc: 'Schweineknochenbrühe', at: 0},
  {img: 'photos/hotpot-mala.jpg', de: 'Mala', cn: '麻辣', desc: 'scharf · 经典川味', at: 60},
  {img: 'photos/hotpot-pfeffer.jpg', de: 'Grüner Pfeffer', cn: '藤椒', desc: 'Hühnerbrühe · leicht scharf', at: 120},
];

export const Flavors: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fadeOut = interpolate(frame, [168, 180], [1, 0], {extrapolateLeft: 'clamp'});

  // which flavor is on stage (60 frames each)
  const idx = Math.min(2, Math.floor(frame / 60));
  const f = FLAVORS[idx];
  const local = frame - f.at;
  const enter = spring({frame: local, fps, config: {damping: 14, stiffness: 90}});
  const kenburns = 1.04 + (local / 60) * 0.06;

  return (
    <AbsoluteFill style={{backgroundColor: C.cream, opacity: fadeOut, fontFamily: FONT}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 75% 50%, ${C.yellow}40 0%, transparent 55%)`}} />

      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 120px', gap: 100}}>
        {/* photo plate with Ken Burns */}
        <div
          style={{
            width: 880, height: 700, borderRadius: 44, overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(43,26,18,.28)', border: `12px solid ${C.white}`,
            transform: `translateX(${(1 - enter) * -300}px)`, opacity: enter, flexShrink: 0,
          }}
        >
          <Img src={staticFile(f.img)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kenburns})`}} />
        </div>

        {/* flavor copy */}
        <div style={{transform: `translateX(${(1 - enter) * 300}px)`, opacity: enter}}>
          <div style={{fontSize: 40, fontWeight: 700, color: C.orange, letterSpacing: 6, marginBottom: 12}}>
            MINI HOT POT · {idx + 1}/3
          </div>
          <div style={{fontSize: 120, fontWeight: 800, color: C.ink, lineHeight: 1.05}}>
            {f.de}
            <span style={{color: C.red, marginLeft: 28}}>{f.cn}</span>
          </div>
          <div style={{fontSize: 48, color: C.ink, opacity: 0.65, marginTop: 24}}>{f.desc}</div>
          {/* flavor progress dots */}
          <div style={{display: 'flex', gap: 16, marginTop: 52}}>
            {FLAVORS.map((_, i) => (
              <div key={i} style={{width: i === idx ? 64 : 20, height: 20, borderRadius: 10, background: i === idx ? C.red : `${C.ink}33`, transition: 'width .3s'}} />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
