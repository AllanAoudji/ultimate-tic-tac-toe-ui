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
import {ThemeContext} from './Theme.context';
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
  const {theme} = React.useContext(ThemeContext);

  const onPlayerColor = React.useMemo(
    () => (player === TileState.Player1 ? 'onPlayerX' : 'onPlayerO'),
    [player],
  );
  const playerColor = React.useMemo(
    () => (player === TileState.Player1 ? 'playerX' : 'playerO'),
    [player],
  );

  const stylesProps = React.useMemo(
    () => surrendModalStyles({height, player, width}),
    [height, player, width],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return (
    <Container
      height={(height - width) / 2}
      padding="largest"
      position="absolute"
      testID="surrendModal__container"
      width={width}>
      <Container
        alignItems="center"
        backgroundColor="surface"
        borderColor={player === TileState.Player1 ? 'playerX' : 'playerO'}
        borderRadius={8}
        borderWidth={2}
        flex={1}
        justifyContent="space-between"
        paddingBottom="largest"
        paddingHorizontal="large"
        paddingTop="normal"
        shadow="base"
        shadowColor={player === TileState.Player1 ? 'playerX' : 'playerO'}
        testID="surrendModal__container--inner">
        <Typography color={playerColor} fontSize="large">
          Surrend?
        </Typography>
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

const surrendModalStyles =
  ({
    player,
  }: {
    height: number;
    player: TileState.Player1 | TileState.Player2;
    width: number;
  }) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{
      button: ViewStyle;
      buttonNo: ViewStyle;
      buttonYes: ViewStyle;
    }>({
      button: {
        alignItems: 'center',
        borderRadius: 4,
        padding: theme.spacing.normal,
        width: 120,
      },
      buttonNo: {
        borderColor:
          player === TileState.Player1
            ? theme.color.playerX
            : theme.color.playerO,
        borderWidth: 2,
      },
      buttonYes: {
        backgroundColor:
          player === TileState.Player1
            ? theme.color.playerX
            : theme.color.playerO,
      },
    });

export default SurrendModal;
