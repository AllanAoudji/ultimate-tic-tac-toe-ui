import React from 'react';
import {
  Pressable,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
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
    <Container
      height={(height - width) / 2}
      padding="double"
      position="absolute"
      testID="surrendModal__container"
      width={width}>
      <Container
        alignItems="center"
        backgroundColor="onSurface"
        borderColor={player === TileState.Player1 ? 'playerX' : 'playerO'}
        borderRadius={8}
        borderWidth={2}
        flex={1}
        justifyContent="space-between"
        paddingBottom="double"
        paddingHorizontal="double"
        paddingTop="base"
        shadow="base"
        shadowColor={player === TileState.Player1 ? 'playerX' : 'playerO'}
        testID="surrendModal__container--inner">
        <Typography color={playerColor}>Surrend?</Typography>
        <Container
          flexDirection="row"
          justifyContent="space-between"
          width="100%">
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
        </Container>
      </Container>
    </Container>
  );
};

const surrendModalStyles = ({
  player,
}: {
  height: number;
  player: TileState.Player1 | TileState.Player2;
  width: number;
}) =>
  StyleSheet.create<{
    button: ViewStyle;
    buttonNo: ViewStyle;
    buttonYes: ViewStyle;
  }>({
    button: {
      alignItems: 'center',
      borderRadius: 4,
      padding: 8,
      width: 120,
    },
    buttonNo: {
      borderColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      borderWidth: 2,
    },
    buttonYes: {
      backgroundColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
    },
  });

export default SurrendModal;
