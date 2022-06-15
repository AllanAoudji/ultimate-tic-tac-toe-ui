import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

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
      <Text style={styles.text}>play</Text>
    </Pressable>
  );
};

const playerButtonStyles = ({
  player,
}: {
  player: TileState.Player1 | TileState.Player2;
}) =>
  StyleSheet.create<{container: ViewStyle; text: TextStyle}>({
    container: {
      alignItems: 'center',
      backgroundColor: player === TileState.Player1 ? '#0012ff' : '#ed1327',
      borderRadius: 6,
      justifyContent: 'center',
      padding: 6,
    },
    text: {
      color: '#fff',
      fontSize: 22,
      textTransform: 'uppercase',
    },
  });

export default PlayButton;
