import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import {ThemeContext} from './Theme.context';
import Typography from './Typography';

interface TitleProps {
  winner: TileState.Player1 | TileState.Player2 | TileState.Draw;
}
interface WinningModalProps {
  disabled?: boolean;
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  winner: TileState.Player1 | TileState.Player2 | TileState.Draw;
}

const generateColor: (
  winner: TileState.Player1 | TileState.Player2 | TileState.Draw,
) => keyof Theming.ColorTheme = winner => {
  switch (winner) {
    case TileState.Player1:
      return 'playerX';
    case TileState.Player2:
      return 'playerO';
    case TileState.Draw:
    default:
      return 'onSurface';
  }
};

const Title: React.FC<TitleProps> = ({winner}) => {
  const color = React.useMemo<keyof Theming.ColorTheme>(
    () => (winner === TileState.Player1 ? 'playerX' : 'playerO'),
    [winner],
  );

  if (winner === TileState.Draw) {
    return <Typography fontSize="large">it's a draw</Typography>;
  }

  return (
    <Typography fontSize="large">
      <Typography color={color} fontSize="large" textTransform="capitalize">
        player {winner === TileState.Player1 ? 'x ' : 'o '}
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

  const styles = React.useMemo(() => stylesWinningModal(theme), [theme]);

  const winnerColor = React.useMemo(() => generateColor(winner), [winner]);

  return (
    <Container
      alignItems="center"
      backgroundColor="blackTransparent"
      height="100%"
      justifyContent="center"
      testID="winningModal__container"
      width="100%">
      <Container
        alignItems="center"
        backgroundColor="surface"
        borderColor={winnerColor}
        borderRadius={16}
        borderWidth={4}
        paddingBottom="largest"
        paddingHorizontal="large"
        paddingTop="large"
        shadow="base"
        shadowColor={winnerColor}
        width={width - theme.spacing.large}
        testID="winningModal__container--inner">
        <Title winner={winner} />
        <Container
          backgroundColor={winnerColor}
          borderRadius={2}
          height={4}
          marginBottom="largest"
          marginTop="large"
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

const stylesWinningModal = (theme: Theming.Theme) =>
  StyleSheet.create<{
    button: ViewStyle;
    buttonRight: ViewStyle;
  }>({
    button: {
      paddingVertical: theme.spacing.normal,
      width: 100,
    },
    buttonRight: {
      alignItems: 'flex-end',
    },
  });

export default WinningModal;
