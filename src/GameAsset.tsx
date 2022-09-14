import React from 'react';
import Lottie from 'lottie-react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {StyleSheet, ViewStyle} from 'react-native';

import Container from './Container';

import JSON_L_BOTTOM_RED from '../assets/jsons/LBottomRed.json';
import JSON_L_BOTTOM_BLUE from '../assets/jsons/LBottomBlue.json';
import JSON_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_BLUE from '../assets/jsons/LDiagonalTopLeftBottomRightBlue.json';
import JSON_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_RED from '../assets/jsons/LDiagonalTopLeftBottomRightRed.json';
import JSON_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_BLUE from '../assets/jsons/LDiagonalTopRightBottomLeftBlue.json';
import JSON_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_RED from '../assets/jsons/LDiagonalTopRightBottomLeftRed.json';
import JSON_L_LEFT_BLUE from '../assets/jsons/LLeftBlue.json';
import JSON_L_LEFT_RED from '../assets/jsons/LLeftRed.json';
import JSON_L_MIDDLE_HORIZONAL_BLUE from '../assets/jsons/LMiddleHorizontalBlue.json';
import JSON_L_MIDDLE_HORIZONAL_RED from '../assets/jsons/LMiddleHorizontalRed.json';
import JSON_L_MIDDLE_VERTICAL_BLUE from '../assets/jsons/LMiddleVerticalBlue.json';
import JSON_L_MIDDLE_VERTICAL_RED from '../assets/jsons/LMiddleVerticalRed.json';
import JSON_L_RIGHT_BLUE from '../assets/jsons/LRightBlue.json';
import JSON_L_RIGHT_RED from '../assets/jsons/LRightRed.json';
import JSON_L_TOP_BLUE from '../assets/jsons/LTopBlue.json';
import JSON_L_TOP_RED from '../assets/jsons/LTopRed.json';
import JSON_O_1 from '../assets/jsons/O1.json';
import JSON_X_1 from '../assets/jsons/X1.json';

import IMAGE_L_BOTTOM_BLUE from '../assets/images/LBottomBlue.png';
import IMAGE_L_BOTTOM_RED from '../assets/images/LBottomRed.png';
import IMAGE_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_BLUE from '../assets/images/LDiagonalTopLeftBottomRightBlue.png';
import IMAGE_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_RED from '../assets/images/LDiagonalTopLeftBottomRightRed.png';
import IMAGE_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_BLUE from '../assets/images/LDiagonalTopRightBottomLeftBlue.png';
import IMAGE_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_RED from '../assets/images/LDiagonalTopRightBottomLeftRed.png';
import IMAGE_L_LEFT_BLUE from '../assets/images/LLeftBlue.png';
import IMAGE_L_LEFT_RED from '../assets/images/LLeftRed.png';
import IMAGE_L_MIDDLE_HORIZONAL_BLUE from '../assets/images/LMiddleHorizontalBlue.png';
import IMAGE_L_MIDDLE_HORIZONAL_RED from '../assets/images/LMiddleHorizontalRed.png';
import IMAGE_L_MIDDLE_VERTICAL_BLUE from '../assets/images/LMiddleVerticalBlue.png';
import IMAGE_L_MIDDLE_VERTICAL_RED from '../assets/images/LMiddleVerticalRed.png';
import IMAGE_L_RIGHT_BLUE from '../assets/images/LRightBlue.png';
import IMAGE_L_RIGHT_RED from '../assets/images/LRightRed.png';
import IMAGE_L_TOP_BLUE from '../assets/images/LTopBlue.png';
import IMAGE_L_TOP_RED from '../assets/images/LTopRed.png';
import IMAGE_O_1 from '../assets/images/O1.png';
import IMAGE_X_1 from '../assets/images/X1.png';

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
  setAnimationFinish?: React.Dispatch<React.SetStateAction<boolean>>;
  testID?: string;
  type: Type;
};
type GameAssetProps = {
  onAnimationFinish?: () => void;
  opacity?: 0.1 | 0.2 | 0.4 | 0.8 | 1;
  padding?: keyof Theming.SpacingTheme;
  state?: State;
  type?: Type;
};

const ANIMATION_LAST_FRAME = 26;

const AssetAnimation: React.FC<AssetProps> = React.memo(
  ({onAnimationFinish, setAnimationFinish, type}) => {
    const animationRef = React.useRef<Lottie>(null);

    const source = React.useMemo(() => {
      switch (type) {
        case 'LBottomBlue':
        default:
          return JSON_L_BOTTOM_BLUE;
        case 'LBottomRed':
          return JSON_L_BOTTOM_RED;
        case 'LDiagonalTopLeftBottomRightBlue':
          return JSON_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_BLUE;
        case 'LDiagonalTopLeftBottomRightRed':
          return JSON_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_RED;
        case 'LDiagonalTopRightBottomLeftBlue':
          return JSON_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_BLUE;
        case 'LDiagonalTopRightBottomLeftRed':
          return JSON_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_RED;
        case 'LLeftBlue':
          return JSON_L_LEFT_BLUE;
        case 'LLeftRed':
          return JSON_L_LEFT_RED;
        case 'LMiddleHorizontalBlue':
          return JSON_L_MIDDLE_HORIZONAL_BLUE;
        case 'LMiddleHorizontalRed':
          return JSON_L_MIDDLE_HORIZONAL_RED;
        case 'LMiddleVerticalBlue':
          return JSON_L_MIDDLE_VERTICAL_BLUE;
        case 'LMiddleVerticalRed':
          return JSON_L_MIDDLE_VERTICAL_RED;
        case 'LRightBlue':
          return JSON_L_RIGHT_BLUE;
        case 'LRightRed':
          return JSON_L_RIGHT_RED;
        case 'LTopBlue':
          return JSON_L_TOP_BLUE;
        case 'LTopRed':
          return JSON_L_TOP_RED;
        case 'O1':
          return JSON_O_1;
        case 'X1':
          return JSON_X_1;
      }
    }, [type]);

    const handleOnAnimationFinish = React.useCallback(
      (isCanceled: boolean) => {
        if (onAnimationFinish) {
          onAnimationFinish();
        }
        if (!isCanceled && setAnimationFinish) {
          setAnimationFinish(true);
        }
      },
      [onAnimationFinish, setAnimationFinish],
    );

    React.useEffect(() => {
      animationRef.current?.play(0, ANIMATION_LAST_FRAME);
    }, [type]);

    return (
      <Lottie
        loop={false}
        onAnimationFinish={handleOnAnimationFinish}
        ref={animationRef}
        source={source}
        style={stylesAsset.animation}
        testID="gameAsset__animation"
      />
    );
  },
);

const AssetImage: React.FC<AssetProps> = React.memo(
  ({testID = 'gameAsset__image', type}) => {
    const source = React.useMemo(() => {
      switch (type) {
        case 'LBottomBlue':
        default:
          return IMAGE_L_BOTTOM_BLUE;
        case 'LBottomRed':
          return IMAGE_L_BOTTOM_RED;
        case 'LDiagonalTopLeftBottomRightBlue':
          return IMAGE_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_BLUE;
        case 'LDiagonalTopLeftBottomRightRed':
          return IMAGE_L_DIAGNOAL_TOP_LEFT_BOTTOM_RIGHT_RED;
        case 'LDiagonalTopRightBottomLeftBlue':
          return IMAGE_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_BLUE;
        case 'LDiagonalTopRightBottomLeftRed':
          return IMAGE_L_DIAGONAL_TOP_RIGHT_BOTTOM_LEFT_RED;
        case 'LLeftBlue':
          return IMAGE_L_LEFT_BLUE;
        case 'LLeftRed':
          return IMAGE_L_LEFT_RED;
        case 'LMiddleHorizontalBlue':
          return IMAGE_L_MIDDLE_HORIZONAL_BLUE;
        case 'LMiddleHorizontalRed':
          return IMAGE_L_MIDDLE_HORIZONAL_RED;
        case 'LMiddleVerticalBlue':
          return IMAGE_L_MIDDLE_VERTICAL_BLUE;
        case 'LMiddleVerticalRed':
          return IMAGE_L_MIDDLE_VERTICAL_RED;
        case 'LRightBlue':
          return IMAGE_L_RIGHT_BLUE;
        case 'LRightRed':
          return IMAGE_L_RIGHT_RED;
        case 'LTopBlue':
          return IMAGE_L_TOP_BLUE;
        case 'LTopRed':
          return IMAGE_L_TOP_RED;
        case 'O1':
          return IMAGE_O_1;
        case 'X1':
          return IMAGE_X_1;
      }
    }, [type]);

    return (
      <FastImage
        resizeMode="cover"
        source={source}
        style={stylesAsset.image}
        testID={testID}
      />
    );
  },
);

const GameAsset: React.FC<GameAssetProps> = ({
  onAnimationFinish,
  opacity,
  padding,
  state = 'PLAY',
  type = 'X1',
}) => {
  const [animationFinish, setAnimationFinish] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (state === 'EMPTY') {
      setAnimationFinish(false);
    }
  }, [state]);

  if (state === 'EMPTY') {
    return null;
  }

  if (state === 'VISIBLE') {
    return (
      <Container
        height="100%"
        opacity={opacity}
        padding={padding}
        position="relative"
        testID="gameAsset__container"
        width="100%">
        <AssetImage testID="gameAsset__image--visible" type={type} />
      </Container>
    );
  }

  return (
    <Container
      height="100%"
      opacity={opacity}
      padding={padding}
      position="relative"
      testID="gameAsset__container"
      width="100%">
      {state === 'PLAY' && !animationFinish ? (
        <AssetAnimation
          onAnimationFinish={onAnimationFinish}
          setAnimationFinish={setAnimationFinish}
          type={type}
        />
      ) : (
        <AssetImage testID="gameAsset__image--play" type={type} />
      )}
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

export default React.memo(GameAsset);
