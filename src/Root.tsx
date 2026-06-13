import {Composition} from 'remotion';
import {NorthwindHero} from './NorthwindHero';

export const Root: React.FC = () => {
  return (
    <Composition
      id="NorthwindHero"
      component={NorthwindHero}
      durationInFrames={720}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
