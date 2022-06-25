import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';
import Typography from './Typography';

interface TitleProps {
  winner: TileState.Player1 | TileState.Player2 | WinningLine.Draw;
}
interface WinningModalProps {
  disabled?: boolean;
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  winner: TileState.Player1 | TileState.Player2 | WinningLine.Draw;
}

const generateColor: (
  winner: TileState.Player1 | TileState.Player2 | WinningLine.Draw,
) => string = winner => {
  switch (winner) {
    case TileState.Player1:
      return '#0012ff';
    case TileState.Player2:
      return '#ed1327';
    case WinningLine.Draw:
    default:
      return '#333333';
  }
};

const Title: React.FC<TitleProps> = ({winner}) => {
  const color = React.useMemo<keyof Theming.ColorTheme>(
    () => (winner === TileState.Player1 ? 'playerX' : 'playerO'),
    [winner],
  );

  if (winner === WinningLine.Draw) {
    return <Typography>it's a draw</Typography>;
  }

  return (
    <Typography>
      <Typography color={color} textTransform="capitalize">
        player {winner === TileState.Player1 ? 'x' : 'o'}
      </Typography>
      won the game
    </Typography>
  );
};

const WinningModal: React.FC<WinningModalProps> = ({
  disabled = false,
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
          <Pressable
            disabled={disabled}
            onPress={onPressNewGame}
            style={styles.button}>
            <Typography>new game</Typography>
          </Pressable>
          <Pressable
            disabled={disabled}
            onPress={onPressQuit}
            style={[styles.button, styles.buttonRight]}>
            <Typography>quit</Typography>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const winningModalStyles = ({
  width,
  winner,
}: {
  width: number;
  winner: TileState.Player1 | TileState.Player2 | WinningLine.Draw;
}) =>
  StyleSheet.create<{
    button: ViewStyle;
    buttonRight: ViewStyle;
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
