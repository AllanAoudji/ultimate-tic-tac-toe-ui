import React from 'react';
import {
  View,
  Text,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
  TextStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

interface Props {
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendModal: React.FC<Props> = ({
  onPressNo = () => {},
  onPressYes = () => {},
  player = TileState.Player1,
}) => {
  const {width, height} = useWindowDimensions();

  const styles = React.useMemo(
    () => surrendModalStyles({height, player, width}),
    [height, player, width],
  );
  return (
    <View style={styles.container} testID="surrendModal__container">
      <View
        style={styles.innerContainer}
        testID="surrendModal__container--inner">
        <Text style={styles.modalText}>Surrend?</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={onPressYes}
            style={[styles.button, styles.buttonYes]}
            testID="surrendModal__button--yes">
            <Text style={[styles.buttonText, styles.buttonTextYes]}>yes</Text>
          </Pressable>
          <Pressable
            onPress={onPressNo}
            style={[styles.button, styles.buttonNo]}
            testID="surrendModal__button--no">
            <Text style={[styles.buttonText]}>no</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const surrendModalStyles = ({
  height,
  player,
  width,
}: {
  height: number;
  player: TileState.Player1 | TileState.Player2;
  width: number;
}) =>
  StyleSheet.create<{
    button: ViewStyle;
    buttonContainer: ViewStyle;
    buttonNo: ViewStyle;
    buttonText: TextStyle;
    buttonTextYes: TextStyle;
    buttonYes: ViewStyle;
    container: ViewStyle;
    innerContainer: ViewStyle;
    modalText: TextStyle;
  }>({
    button: {
      alignItems: 'center',
      borderRadius: 4,
      padding: 8,
      width: 120,
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    buttonNo: {
      borderColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      borderWidth: 2,
    },
    buttonText: {
      color: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      fontSize: 17,
      fontWeight: 'bold',
    },
    buttonTextYes: {
      color: '#fff',
    },
    buttonYes: {
      backgroundColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
    },
    container: {
      height: (height - width) / 2,
      padding: 10,
      position: 'absolute',
      width,
    },
    innerContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      borderRadius: 10,
      borderWidth: 3,
      elevation: 19,
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 15,
      paddingHorizontal: 23,
      paddingTop: 10,
      shadowColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.35,
    },
    modalText: {
      color: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      fontSize: 30,
      fontWeight: '900',
    },
  });

export default SurrendModal;
