import { MutableRefObject, useEffect } from 'react';
import FadeInAnimation from '../utils/animation.utls';

type useFadeInAnimationProps = {
  ref: MutableRefObject<any>;
  duration: number;
};

const useFadeInAnimation = ({ ref, duration }: useFadeInAnimationProps) => {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);

    return () => {
      animation.stop();
    };
  }, []);
};

export default useFadeInAnimation;
