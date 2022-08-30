import React from 'react';
import Lottie from 'lottie-react-native';

type props = {
  state?: 'EMPTY' | 'PLAY' | 'VISIBLE';
};

const Asset: React.FC<props> = ({state}) => {
  const animationRef = React.useRef<Lottie>(null);

  React.useEffect(() => {
    if (state === 'EMPTY') {
      animationRef.current?.play(0, 0);
    } else if (state === 'PLAY') {
      animationRef.current?.play(0, 26);
    } else {
      animationRef.current?.play(26, 26);
    }
  }, [state]);

  return (
    <Lottie
      source={require('../assets/jsons/X1.json')}
      ref={animationRef}
      testID="asset__container--lottie"
    />
  );
};

export default Asset;
