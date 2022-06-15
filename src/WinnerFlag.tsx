import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

interface Props {
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  winner: TileState.Player1 | TileState.Player2;
}

const WinnerFlag: React.FC<Props> = ({
  onPressNewGame = () => {},
  onPressQuit = () => {},
  winner,
}) => {
  const styles = React.useMemo(() => winnerFlagStyles({winner}), [winner]);

  return (
    <View style={styles.container} testID="winnerFlag__container">
      <Text>
        <Text style={styles.winnerText}>
          player {winner === TileState.Player1 ? 'x' : 'o'}
        </Text>
        won the game
      </Text>
      <Pressable onPress={onPressNewGame}>
        <Text>new game</Text>
      </Pressable>
      <Pressable onPress={onPressQuit}>
        <Text>quit</Text>
      </Pressable>
    </View>
  );
};

const winnerFlagStyles = ({
  winner,
}: {
  winner: TileState.Player1 | TileState.Player2;
}) =>
  StyleSheet.create<{container: ViewStyle; winnerText: TextStyle}>({
    container: {
      borderColor: winner === TileState.Player1 ? '#0012ff' : '#ed1327',
    },
    winnerText: {
      color: winner === TileState.Player1 ? '#0012ff' : '#ed1327',
    },
  });

export default WinnerFlag;
