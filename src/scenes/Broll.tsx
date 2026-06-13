import {AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

const CLIPS = [
  {src: 'broll/clip-picking.mp4', label: 'Frisch gewählt', cn: '现选', at: 0, rot: -4},
  {src: 'broll/clip-mala.mp4', label: 'Frisch gekocht', cn: '现煮', at: 55, rot: 3},
  {src: 'broll/clip-table.mp4', label: 'Zum Genießen', cn: '开吃', at: 110, rot: -2.5},
];

export const Broll: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fadeOut = interpolate(frame, [168, 180], [1, 0], {extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: C.ink, opacity: fadeOut, fontFamily: FONT}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 100%, ${C.red}26 0%, transparent 65%)`}} />

      {/* headline */}
      <div style={{position: 'absolute', top: 70, width: '100%', textAlign: 'center'}}>
        <span style={{fontSize: 72, fontWeight: 800, color: C.cream, letterSpacing: 3}}>
          Malatang, <span style={{color: C.yellow}}>dein Topf.</span> 你的麻辣烫
        </span>
      </div>

      {/* three vertical store clips as tilted cards, entering one by one */}
      <AbsoluteFill style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 90, paddingTop: 60}}>
        {CLIPS.map((c, i) => {
          const s = spring({frame: frame - c.at, fps, config: {damping: 13, stiffness: 110}});
          return (
            <div
              key={i}
              style={{
                transform: `translateY(${(1 - s) * 900}px) rotate(${c.rot}deg)`,
                borderRadius: 28,
                overflow: 'hidden',
                border: `10px solid ${C.cream}`,
                boxShadow: '0 30px 80px rgba(0,0,0,.5)',
                position: 'relative',
                width: 430, height: 740,
              }}
            >
              <OffthreadVideo muted src={staticFile(c.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,.72))',
                  padding: '60px 24px 22px', textAlign: 'center',
                }}
              >
                <span style={{fontSize: 38, fontWeight: 700, color: C.cream}}>
                  {c.label} <span style={{color: C.yellow}}>{c.cn}</span>
                </span>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
