import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import Typography from './Typography';

import BLUE_SOURCE from '../assets/images/button_background_blue.png';
import RED_SOURCE from '../assets/images/button_background_red.png';

interface PlayButtonProps {
  active?: boolean;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}
interface TitleProps {
  player: TileState.Player1 | TileState.Player2;
}

const Title: React.FC<TitleProps> = ({player}) => {
  const color = React.useMemo<keyof Theming.ColorTheme>(
    () => (player === TileState.Player1 ? 'onPlayerX' : 'onPlayerO'),
    [player],
  );
  return (
    <Typography color={color} fontSize="largest" textTransform="uppercase">
      play
    </Typography>
  );
};

const PlayButton: React.FC<PlayButtonProps> = ({
  active = true,
  disabled = false,
  onPress = () => {},
  player = TileState.Player1,
}) => {
  //////////////////////
  //// styling      ////
  //////////////////////
  const pressedAwarenessStyle = React.useCallback(
    ({pressed}: PressableStateCallbackType) => [
      playButtonStyles.container,
      {opacity: pressed ? 0.8 : undefined},
    ],
    [],
  );

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
      disabled={disabled || !active}
      onPress={onPress}
      style={pressedAwarenessStyle}
      testID="playButton__container--pressable">
      <Container aspectRatio={3.5} borderRadius={16} overflow="hidden">
        <Container
          opacity={!active || disabled ? 0.4 : undefined}
          testID="playButton__backgroundImage--container">
          <Container
            alignItems="center"
            justifyContent="center"
            height="100%"
            source={source}
            testID="playButton__backgroundImage">
            <Title player={player} />
          </Container>
        </Container>
      </Container>
    </Pressable>
  );
};

const playButtonStyles = StyleSheet.create<{container: ViewStyle}>({
  container: {
    alignItems: 'stretch',
    width: 175,
  },
});

export default React.memo(PlayButton);
