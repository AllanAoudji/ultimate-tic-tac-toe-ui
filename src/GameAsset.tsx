import React from 'react';
import Lottie from 'lottie-react-native';
import {Image, ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import Container from './Container';

type Type =
  | 'LBottomBlue'
  | 'LBottomRed'
  | 'LDiagonalTopLeftBottomRightBlue'
  | 'LDiagonalTopLeftBottomRightRed'
  | 'LDiagonalTopRightBottomLeftBlue'
  | 'LDiagonalTopRightBottomLeftRed'
  | 'LLeftBlue'
  | 'LLeftRed'
  | 'LMiddleHorizontalBlue'
  | 'LMiddleHorizontalRed'
  | 'LMiddleVerticalBlue'
  | 'LMiddleVerticalRed'
  | 'LRightBlue'
  | 'LRightRed'
  | 'LTopBlue'
  | 'LTopRed'
  | 'O1'
  | 'X1';
type State = 'EMPTY' | 'PLAY' | 'VISIBLE';

type AssetProps = {
  onAnimationFinish?: () => void;
  type: Type;
};
type GameAssetProps = {
  onAnimationFinish?: () => void;
  opacity?: 0.1 | 0.2 | 0.4 | 0.8 | 1;
  padding?: keyof Theming.SpacingTheme;
  state?: State;
  type?: Type;
};

// Each animation have different nums of frames
// this object is used in animationRef.current?play()
// to know how many frames should be used to trigger the animation
const ANIMATION_LAST_FRAME = {
  LBottomBlue: 28,
  LBottomRed: 28,
  LDiagonalTopLeftBottomRightBlue: 32,
  LDiagonalTopLeftBottomRightRed: 32,
  LDiagonalTopRightBottomLeftBlue: 32,
  LDiagonalTopRightBottomLeftRed: 32,
  LLeftBlue: 28,
  LLeftRed: 28,
  LMiddleHorizontalBlue: 26,
  LMiddleHorizontalRed: 26,
  LMiddleVerticalBlue: 26,
  LMiddleVerticalRed: 26,
  LRightBlue: 32,
  LRightRed: 32,
  LTopBlue: 32,
  LTopRed: 32,
  O1: 28,
  X1: 26,
};

const AssetAnimation: React.FC<AssetProps> = ({onAnimationFinish, type}) => {
  const animationRef = React.useRef<Lottie>(null);

  const handleOnAnimationFinish = React.useCallback(
    (isCancelled: boolean) => {
      if (!isCancelled && onAnimationFinish) {
        onAnimationFinish();
      }
    },
    [onAnimationFinish],
  );

  React.useEffect(() => {
    animationRef.current?.play(2, ANIMATION_LAST_FRAME[type]);
  }, [type]);

  if (type === 'LBottomBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LBottomBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LBottomRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LBottomRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LDiagonalTopLeftBottomRightBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LDiagonalTopLeftBottomRightBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LDiagonalTopLeftBottomRightRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LDiagonalTopLeftBottomRightRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LDiagonalTopRightBottomLeftBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LDiagonalTopRightBottomLeftBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LDiagonalTopRightBottomLeftRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LDiagonalTopRightBottomLeftRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LLeftBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LLeftBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LLeftRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LLeftRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LMiddleHorizontalBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LMiddleHorizontalBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LMiddleHorizontalRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LMiddleHorizontalRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LMiddleVerticalBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LMiddleVerticalBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LMiddleVerticalRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LMiddleVerticalRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LRightBlue') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LRightBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LRightRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LRightRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LTopBlue') {
    return (
      <Lottie
        resizeMode="cover"
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LTopBlue.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'LTopRed') {
    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/LTopRed.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  if (type === 'O1') {
    return (
      <Lottie
        resizeMode="cover"
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={require('../assets/jsons/O1.json')}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  }

  return (
    <Lottie
      loop={false}
      onAnimationFinish={handleOnAnimationFinish}
      ref={animationRef}
      source={require('../assets/jsons/X1.json')}
      style={stylesAsset.animation}
      testID="gameAsset__animation"
    />
  );
};

const AssetImage: React.FC<AssetProps> = ({type}) => {
  if (type === 'LBottomBlue') {
    return (
      <Image
        source={require('../assets/images/LBottomBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LBottomRed') {
    return (
      <Image
        source={require('../assets/images/LBottomRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LDiagonalTopLeftBottomRightBlue') {
    return (
      <Image
        source={require('../assets/images/LDiagonalTopLeftBottomRightBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LDiagonalTopLeftBottomRightRed') {
    return (
      <Image
        source={require('../assets/images/LDiagonalTopLeftBottomRightRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LDiagonalTopRightBottomLeftBlue') {
    return (
      <Image
        source={require('../assets/images/LDiagonalTopRightBottomLeftBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LDiagonalTopRightBottomLeftRed') {
    return (
      <Image
        source={require('../assets/images/LDiagonalTopRightBottomLeftRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LLeftBlue') {
    return (
      <Image
        source={require('../assets/images/LLeftBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LLeftRed') {
    return (
      <Image
        source={require('../assets/images/LLeftRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LMiddleHorizontalBlue') {
    return (
      <Image
        source={require('../assets/images/LMiddleHorizontalBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LMiddleHorizontalRed') {
    return (
      <Image
        source={require('../assets/images/LMiddleHorizontalRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LMiddleVerticalBlue') {
    return (
      <Image
        source={require('../assets/images/LMiddleVerticalBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LMiddleVerticalRed') {
    return (
      <Image
        source={require('../assets/images/LMiddleVerticalRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LRightBlue') {
    return (
      <Image
        source={require('../assets/images/LRightBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LRightRed') {
    return (
      <Image
        source={require('../assets/images/LRightRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LTopBlue') {
    return (
      <Image
        source={require('../assets/images/LTopBlue.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'LTopRed') {
    return (
      <Image
        source={require('../assets/images/LTopRed.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  if (type === 'O1') {
    return (
      <Image
        source={require('../assets/images/O1.png')}
        style={stylesAsset.image}
        testID="gameAsset__image"
      />
    );
  }

  return (
    <Image
      source={require('../assets/images/X1.png')}
      style={stylesAsset.image}
      testID="gameAsset__image"
    />
  );
};

const GameAsset: React.FC<GameAssetProps> = ({
  onAnimationFinish,
  opacity,
  padding,
  state = 'PLAY',
  type = 'X1',
}) => {
  if (state === 'EMPTY') {
    return null;
  }

  return (
    <Container
      height="100%"
      opacity={opacity}
      padding={padding}
      position="relative"
      testID="gameAsset__container"
      width="100%">
      {state === 'PLAY' && (
        <AssetAnimation onAnimationFinish={onAnimationFinish} type={type} />
      )}
      {state === 'VISIBLE' && <AssetImage type={type} />}
    </Container>
  );
};

const stylesAsset = StyleSheet.create<{
  animation: ViewStyle;
  image: ImageStyle;
}>({
  animation: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  image: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

export default GameAsset;
