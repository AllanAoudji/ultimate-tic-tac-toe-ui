import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {ThemeContext} from './Theme.context';
import Typography from './Typography';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const PlayButton: React.FC<Props> = ({
  disabled = false,
  onPress = () => {},
  player = TileState.Player1,
}) => {
  const {theme} = React.useContext(ThemeContext);
  const stylesProps = React.useMemo(
    () => playerButtonStyles({player}),
    [player],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="playButton__container--pressable">
      <Typography>play</Typography>
    </Pressable>
  );
};

const playerButtonStyles =
  ({player}: {player: TileState.Player1 | TileState.Player2}) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{container: ViewStyle}>({
      container: {
        alignItems: 'center',
        backgroundColor:
          player === TileState.Player1
            ? theme.color.playerX
            : theme.color.playerO,
        borderRadius: 6,
        justifyContent: 'center',
        padding: theme.spacing.base,
      },
    });

export default PlayButton;
