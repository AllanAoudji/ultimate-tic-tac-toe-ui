import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Typography from './Typography';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const PlayButton: React.FC<Props> = ({
  disabled = false,
  onPress = () => {},
  player = TileState.Player1,
}) => {
  const styles = React.useMemo(() => playerButtonStyles({player}), [player]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="playButton__container--pressable">
      <Typography>play</Typography>
    </Pressable>
  );
};

const playerButtonStyles = ({
  player,
}: {
  player: TileState.Player1 | TileState.Player2;
}) =>
  StyleSheet.create<{container: ViewStyle}>({
    container: {
      alignItems: 'center',
      backgroundColor: player === TileState.Player1 ? '#0012ff' : '#ed1327',
      borderRadius: 6,
      justifyContent: 'center',
      padding: 6,
    },
  });

export default PlayButton;
