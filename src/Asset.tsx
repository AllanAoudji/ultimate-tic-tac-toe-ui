import React from 'react';
import Lottie from 'lottie-react-native';
import {StyleSheet, ViewStyle} from 'react-native';
import {ThemeContext} from './Theme.context';

type props = {
  disabled?: boolean;
  padding?: keyof Theming.SpacingTheme;
  state?: 'EMPTY' | 'PLAY' | 'VISIBLE';
  type?:
    | 'LBottomBlue'
    | 'LBottomRed'
    | 'LMiddleHorBlue'
    | 'LMiddleHorRed'
    | 'LTopBlue'
    | 'LTopRed'
    | 'O1'
    | 'X1';
};

// Each animation have different nums of frames
// this object is used in animationRef.current?play()
// to know how many frames should be used to trigger the animation
const ANIMATION_LAST_FRAME = {
  LBottomBlue: 28,
  LBottomRed: 28,
  LMiddleHorBlue: 28,
  LMiddleHorRed: 28,
  LTopBlue: 28,
  LTopRed: 28,
  O1: 28,
  X1: 26,
};

const Asset: React.FC<props> = ({
  disabled = false,
  padding,
  state,
  type = 'X1',
}) => {
  const animationRef = React.useRef<Lottie>(null);

  const {theme} = React.useContext(ThemeContext);
  const stylesProps = React.useMemo(
    () => stylesAsset({disabled, padding}),
    [disabled, padding],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  React.useEffect(() => {
    if (state === 'EMPTY') {
      animationRef.current?.play(0, 0);
    } else if (state === 'PLAY') {
      animationRef.current?.play(0, ANIMATION_LAST_FRAME[type]);
    } else {
      animationRef.current?.play(
        ANIMATION_LAST_FRAME[type],
        ANIMATION_LAST_FRAME[type],
      );
    }
  }, [state, type]);

  if (type === 'LBottomBlue') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/LBottomBlue.json')}
        style={styles.container}
        testID="asset__container--lottie"
      />
    );
  }

  if (type === 'LBottomRed') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/LBottomRed.json')}
        style={styles.container}
        testID="asset__container--lottie"
      />
    );
  }

  if (type === 'LMiddleHorBlue') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/LMiddleHorBlue.json')}
        style={styles.container}
        testID="asset__container--lottie"
      />
    );
  }

  if (type === 'LMiddleHorRed') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/LMiddleHorRed.json')}
        testID="asset__container--lottie"
        style={styles.container}
      />
    );
  }

  if (type === 'LTopBlue') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/LTopBlue.json')}
        style={styles.container}
        testID="asset__container--lottie"
      />
    );
  }

  if (type === 'LTopRed') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/LTopRed.json')}
        style={styles.container}
        testID="asset__container--lottie"
      />
    );
  }

  if (type === 'O1') {
    return (
      <Lottie
        loop={false}
        ref={animationRef}
        source={require('../assets/jsons/O1.json')}
        style={styles.container}
        testID="asset__container--lottie"
      />
    );
  }

  return (
    <Lottie
      loop={false}
      ref={animationRef}
      source={require('../assets/jsons/X1.json')}
      testID="asset__container--lottie"
      style={styles.container}
    />
  );
};

const stylesAsset =
  ({
    disabled,
    padding,
  }: {
    disabled: boolean;
    padding?: keyof Theming.SpacingTheme;
  }) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{container: ViewStyle}>({
      container: {
        opacity: disabled ? 0.4 : 1,
        padding: padding ? theme.spacing[padding] : undefined,
      },
    });

export default Asset;
