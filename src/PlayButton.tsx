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
  const pressedAwarenessStyle = React.useCallback(
    ({pressed}: PressableStateCallbackType) => [
      styles.container,
      {opacity: pressed ? 0.8 : undefined},
    ],
    [],
  );

  return (
    <Pressable
      disabled={disabled || !active}
      onPress={onPress}
      style={pressedAwarenessStyle}
      testID="playButton__container--pressable">
      <Container borderRadius={8} overflow="hidden" width="88%">
        <Container
          alignItems="center"
          opacity={!active || disabled ? 0.4 : undefined}
          paddingVertical="smallest"
          testID="playButton__backgroundImage--container"
          width="100%">
          {player === TileState.Player1 ? (
            <Container
              resizeMode="stretch"
              source={require('../assets/images/button_background_blue.png')}
              testID="playButton__backgroundImage">
              <Title player={player} />
            </Container>
          ) : (
            <Container
              resizeMode="stretch"
              source={require('../assets/images/button_background_red.png')}
              testID="playButton__backgroundImage">
              <Title player={player} />
            </Container>
          )}
        </Container>
      </Container>
    </Pressable>
  );
};

const styles = StyleSheet.create<{container: ViewStyle}>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayButton;
