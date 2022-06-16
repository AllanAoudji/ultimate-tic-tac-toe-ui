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
  const {width} = useWindowDimensions();

  const styles = React.useMemo(
    () => winnerFlagStyles({width, winner}),
    [width, winner],
  );

  return (
    <View style={styles.container} testID="winnerFlag__container">
      <View style={styles.innerContainer} testID="winnerFlag__container--inner">
        <Text style={styles.winnerText}>
          <Text style={styles.winnerTextPlayer}>
            player {winner === TileState.Player1 ? 'x' : 'o'}
          </Text>{' '}
          won the game
        </Text>
        <View style={styles.separator} testID="winnerFlag__separator" />
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

const winnerFlagStyles = ({
  width,
  winner,
}: {
  width: number;
  winner: TileState.Player1 | TileState.Player2;
}) =>
  StyleSheet.create<{
    button: ViewStyle;
    buttonRight: ViewStyle;
    buttonText: TextStyle;
    buttonsContainer: ViewStyle;
    container: ViewStyle;
    innerContainer: ViewStyle;
    separator: ViewStyle;
    winnerTextPlayer: TextStyle;
    winnerText: TextStyle;
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
      borderColor: winner === TileState.Player1 ? '#0012ff' : '#ed1327',
      borderRadius: 13,
      borderWidth: 5,
      elevation: 19,
      paddingBottom: 15,
      paddingHorizontal: 30,
      paddingTop: 25,
      shadowColor: winner === TileState.Player1 ? '#0012ff' : '#ed1327',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.35,
      width: width - 20,
    },
    separator: {
      backgroundColor: winner === TileState.Player1 ? '#0012ff' : '#ed1327',
      borderRadius: 2,
      height: 4,
      marginBottom: 28,
      marginTop: 24,
      width: '30%',
    },
    winnerText: {
      color: '#000',
      fontSize: 27,
      fontWeight: 'bold',
    },
    winnerTextPlayer: {
      color: winner === TileState.Player1 ? '#0012ff' : '#ed1327',
      textTransform: 'capitalize',
    },
  });

export default WinnerFlag;
