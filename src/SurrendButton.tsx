import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Container from './Container';

import {ThemeContext} from './Theme.context';

import BLUE_SOURCE from '../assets/images/surrend_button_blue.png';
import RED_SOURCE from '../assets/images/surrend_button_red.png';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SIZE = 40;

const SurrendButton: React.FC<Props> = ({
  disabled,
  onPress,
  player = TileState.Player1,
}) => {
  const {theme} = React.useContext(ThemeContext);
  const styles = React.useMemo(() => surrendButtonStyles(theme), [theme]);
  const pressedAwarenessStyle = React.useCallback(
    ({pressed}: PressableStateCallbackType) => [
      styles.container,
      {opacity: pressed ? 0.8 : undefined},
    ],
    [styles],
  );

  const opacity = React.useMemo(() => {
    if (!onPress || disabled) {
      return 0.4;
    }
    return undefined;
  }, [onPress, disabled]);
  const source = React.useMemo(() => {
    switch (player) {
      case TileState.Player1:
      default:
        return BLUE_SOURCE;
      case TileState.Player2:
        return RED_SOURCE;
    }
  }, [player]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={pressedAwarenessStyle}
      testID="surrendButton__container--pressable">
      <Container opacity={opacity} testID="surrendButton__container--inner">
        <FastImage
          source={source}
          style={styles.image}
          testID="surrendButton__image"
        />
      </Container>
    </Pressable>
  );
};

const surrendButtonStyles = (theme: Theming.Theme) =>
  StyleSheet.create<{container: ViewStyle; image: ImageStyle}>({
    container: {
      alignItems: 'center',
      height: SIZE,
      justifyContent: 'center',
      padding: theme.spacing.normal,
      width: SIZE,
    },
    image: {
      height: SIZE,
      width: SIZE,
    },
  });

export default React.memo(SurrendButton);
