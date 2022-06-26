import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import SurrendIcon from './SurrendIcon';
import {ThemeContext} from './Theme.context';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendButton: React.FC<Props> = ({
  disabled,
  onPress = () => {},
  player = TileState.Player1,
}) => {
  const {theme} = React.useContext(ThemeContext);
  const stylesProps = React.useMemo(
    () => surrendButtonStyles({player}),
    [player],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="surrendButton__container--pressable">
      <SurrendIcon player={player} />
    </Pressable>
  );
};

const surrendButtonStyles =
  ({player}: {player: TileState.Player1 | TileState.Player2}) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{container: ViewStyle}>({
      container: {
        alignItems: 'center',
        borderColor:
          player === TileState.Player2
            ? theme.color.playerO
            : theme.color.playerX,
        borderWidth: 4,
        borderRadius: 50,
        justifyContent: 'center',
        padding: theme.spacing.base,
      },
    });

export default SurrendButton;
