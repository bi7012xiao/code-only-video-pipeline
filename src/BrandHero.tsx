import {AbsoluteFill, Sequence} from 'remotion';
import {C} from './theme';
import {Intro} from './scenes/Intro';
import {Broll} from './scenes/Broll';
import {Flavors} from './scenes/Flavors';
import {Teas} from './scenes/Teas';
import {Outro} from './scenes/Outro';

// 24s @30fps = 720 frames
// 0–105 Intro · 105–285 B-roll · 285–465 Flavors · 465–600 Teas · 600–720 Outro
export const NorthwindHero: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: C.cream}}>
      <Sequence durationInFrames={105}>
        <Intro />
      </Sequence>
      <Sequence from={105} durationInFrames={180}>
        <Broll />
      </Sequence>
      <Sequence from={285} durationInFrames={180}>
        <Flavors />
      </Sequence>
      <Sequence from={465} durationInFrames={135}>
        <Teas />
      </Sequence>
      <Sequence from={600} durationInFrames={120}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
