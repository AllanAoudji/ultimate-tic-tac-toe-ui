import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {TileState, WiningLine} from 'ultimate-tic-tac-toe-algorithm';

const generateColor: (
  winner: TileState.Player1 | TileState.Player2 | WiningLine.Draw,
) => string = winner => {
  switch (winner) {
    case TileState.Player1:
      return '#0012ff';
    case TileState.Player2:
      return '#ed1327';
    case WiningLine.Draw:
    default:
      return '#333333';
  }
};

interface TitleProps {
  winner: TileState.Player1 | TileState.Player2 | WiningLine.Draw;
}
interface WinningModalProps {
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  winner: TileState.Player1 | TileState.Player2 | WiningLine.Draw;
}

const Title: React.FC<TitleProps> = ({winner}) => {
  const styles = React.useMemo(() => titleStyles({winner}), [winner]);

  if (winner === WiningLine.Draw) {
    return (
      <Text style={[styles.winnerText, styles.winnerTextPlayer]}>
        it's a draw
      </Text>
    );
  }
  return (
    <Text style={styles.winnerText}>
      <Text style={styles.winnerTextPlayer}>
        player {winner === TileState.Player1 ? 'x' : 'o'}
      </Text>{' '}
      won the game
    </Text>
  );
};

const WinningModal: React.FC<WinningModalProps> = ({
  onPressNewGame = () => {},
  onPressQuit = () => {},
  winner,
}) => {
  const {width} = useWindowDimensions();

  const styles = React.useMemo(
    () => winningModalStyles({width, winner}),
    [width, winner],
  );

  return (
    <View style={styles.container} testID="winningModal__container">
      <View
        style={styles.innerContainer}
        testID="winningModal__container--inner">
        <Title winner={winner} />
        <View style={styles.separator} testID="winningModal__separator" />
        <View style={styles.buttonsContainer}>
          <Pressable onPress={onPressNewGame} style={styles.button}>
            <Text style={styles.buttonText}>new game</Text>
          </Pressable>
          <Pressable
            onPress={onPressQuit}
            style={[styles.button, styles.buttonRight]}>
            <Text style={styles.buttonText}>quit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const titleStyles = ({
  winner,
}: {
  winner: TileState.Player1 | TileState.Player2 | WiningLine.Draw;
}) =>
  StyleSheet.create<{
    winnerTextPlayer: TextStyle;
    winnerText: TextStyle;
  }>({
    winnerText: {
      color: '#000',
      fontSize: 27,
      fontWeight: 'bold',
    },
    winnerTextPlayer: {
      color: generateColor(winner),
      textTransform: 'capitalize',
    },
  });

const winningModalStyles = ({
  width,
  winner,
}: {
  width: number;
  winner: TileState.Player1 | TileState.Player2 | WiningLine.Draw;
}) =>
  StyleSheet.create<{
    button: ViewStyle;
    buttonRight: ViewStyle;
    buttonText: TextStyle;
    buttonsContainer: ViewStyle;
    container: ViewStyle;
    innerContainer: ViewStyle;
    separator: ViewStyle;
  }>({
    button: {
      paddingVertical: 10,
      width: 100,
    },
    buttonRight: {
      alignItems: 'flex-end',
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    container: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
    },
    innerContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: generateColor(winner),
      borderRadius: 13,
      borderWidth: 5,
      elevation: 19,
      paddingBottom: 15,
      paddingHorizontal: 30,
      paddingTop: 25,
      shadowColor: generateColor(winner),
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.35,
      width: width - 20,
    },
    separator: {
      backgroundColor: generateColor(winner),
      borderRadius: 2,
      height: 4,
      marginBottom: 28,
      marginTop: 24,
      width: '30%',
    },
  });

export default WinningModal;
