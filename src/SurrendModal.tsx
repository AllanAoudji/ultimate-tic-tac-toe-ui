import React from 'react';
import {
  View,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Typography from './Typography';

interface Props {
  disabled?: boolean;
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendModal: React.FC<Props> = ({
  disabled = false,
  onPressNo = () => {},
  onPressYes = () => {},
  player = TileState.Player1,
}) => {
  const {width, height} = useWindowDimensions();

  const playerColor = React.useMemo(
    () => (player === TileState.Player1 ? 'playerX' : 'playerO'),
    [player],
  );
  const styles = React.useMemo(
    () => surrendModalStyles({height, player, width}),
    [height, player, width],
  );
  const onPlayerColor = React.useMemo(
    () => (player === TileState.Player1 ? 'onPlayerX' : 'onPlayerO'),
    [player],
  );

  return (
    <View style={styles.container} testID="surrendModal__container">
      <View
        style={styles.innerContainer}
        testID="surrendModal__container--inner">
        <Typography color={playerColor}>Surrend?</Typography>
        <View style={styles.buttonContainer}>
          <Pressable
            disabled={disabled}
            onPress={onPressYes}
            style={[styles.button, styles.buttonYes]}
            testID="surrendModal__button--yes">
            <Typography color={onPlayerColor}>yes</Typography>
          </Pressable>
          <Pressable
            disabled={disabled}
            onPress={onPressNo}
            style={[styles.button, styles.buttonNo]}
            testID="surrendModal__button--no">
            <Typography color={playerColor}>no</Typography>
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
    buttonYes: ViewStyle;
    container: ViewStyle;
    innerContainer: ViewStyle;
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
  });

export default SurrendModal;
