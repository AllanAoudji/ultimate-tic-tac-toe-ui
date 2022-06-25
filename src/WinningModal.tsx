import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';
import Container from './Container';
import {ThemeContext} from './Theme.context';
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
) => keyof Theming.ColorTheme = winner => {
  switch (winner) {
    case TileState.Player1:
      return 'playerX';
    case TileState.Player2:
      return 'playerO';
    case WinningLine.Draw:
    default:
      return 'onSurface';
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
  const {theme} = React.useContext(ThemeContext);

  const winnerColor = React.useMemo(() => generateColor(winner), [winner]);

  return (
    <Container
      alignItems="center"
      // should be 'rgba(0,0,0,0.7)'
      backgroundColor="onSurface"
      height="100%"
      justifyContent="center"
      position="absolute"
      testID="winningModal__container"
      width="100%">
      <Container
        alignItems="center"
        backgroundColor="surface"
        borderColor={winnerColor}
        borderRadius={16}
        borderWidth={4}
        paddingBottom="double"
        paddingHorizontal="double"
        paddingTop="double"
        shadow="double"
        shadowColor={winnerColor}
        width={width - theme.spacing.double}
        testID="winningModal__container--inner">
        <Title winner={winner} />
        <Container
          backgroundColor={winnerColor}
          borderRadius={2}
          height={4}
          marginBottom="double"
          marginTop="double"
          width="33%"
          testID="winningModal__separator"
        />
        <Container
          flexDirection="row"
          justifyContent="space-between"
          width="100%">
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
        </Container>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create<{
  button: ViewStyle;
  buttonRight: ViewStyle;
}>({
  button: {
    paddingVertical: 10,
    width: 100,
  },
  buttonRight: {
    alignItems: 'flex-end',
  },
});

export default WinningModal;
