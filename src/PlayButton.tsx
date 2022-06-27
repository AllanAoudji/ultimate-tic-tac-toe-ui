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
  active?: boolean;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const PlayButton: React.FC<Props> = ({
  active = true,
  disabled = false,
  onPress = () => {},
  player = TileState.Player1,
}) => {
  const {theme} = React.useContext(ThemeContext);
  const color = React.useMemo<keyof Theming.ColorTheme>(
    () => (player === TileState.Player1 ? 'onPlayerX' : 'onPlayerO'),
    [player],
  );

  const stylesProps = React.useMemo(
    () => playerButtonStyles({active, player}),
    [active, player],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return (
    <Pressable
      disabled={disabled || !active}
      onPress={onPress}
      style={styles.container}
      testID="playButton__container--pressable">
      <Typography color={color} textTransform="uppercase">
        play
      </Typography>
    </Pressable>
  );
};

const playerButtonStyles =
  ({
    active,
    player,
  }: {
    active: boolean;
    player: TileState.Player1 | TileState.Player2;
  }) =>
  (theme: Theming.Theme) => {
    let backgroundColor;
    if (player === TileState.Player1) {
      backgroundColor = theme.color.playerX;
    }
    if (player === TileState.Player2) {
      backgroundColor = theme.color.playerO;
    }

    return StyleSheet.create<{container: ViewStyle}>({
      container: {
        alignItems: 'center',
        backgroundColor: active ? backgroundColor : theme.color.grey,
        borderRadius: 6,
        justifyContent: 'center',
        padding: theme.spacing.normal,
      },
    });
  };

export default PlayButton;
