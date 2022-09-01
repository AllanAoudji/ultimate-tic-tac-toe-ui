import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Asset from './Asset';

import {ThemeContext} from './Theme.context';

interface Props {
  // The player (X|O) who is active,
  // this is used only if state === Empty.
  activePlayer?: TileState.Player1 | TileState.Player2;
  disabled?: boolean;
  onPress?: ((event?: GestureResponderEvent) => void) | null | undefined;
  selected?: boolean;
  // Used to save the state of this Tile
  // is one of the player has play on this Tile.
  state?: TileState;
  valid?: boolean;
}

const Tile: React.FC<Props> = ({
  activePlayer = TileState.Player1,
  disabled = false,
  onPress,
  selected = false,
  state = TileState.Empty,
  valid = true,
}) => {
  const {width} = useWindowDimensions();

  const {theme} = React.useContext(ThemeContext);
  const stylesProps = React.useMemo(() => tileStyles({width}), [width]);
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  const assetsType = React.useMemo(() => {
    if (state === TileState.Player1) {
      return 'X1';
    } else if (state === TileState.Player2) {
      return 'O1';
    } else if (activePlayer === TileState.Player1) {
      return 'X1';
    } else {
      return 'O1';
    }
  }, [activePlayer, state]);
  const assetsDisabled = React.useMemo(
    () => selected && state === TileState.Empty,
    [selected, state],
  );
  const assetsState = React.useMemo(() => {
    if (selected && state === TileState.Empty) {
      return 'VISIBLE';
    }
    if (state !== TileState.Empty) {
      return 'PLAY';
    }
    return 'EMPTY';
  }, [selected, state]);

  return (
    <Pressable
      disabled={!valid || state !== TileState.Empty || selected || disabled}
      onPress={onPress}
      style={styles.container}
      testID="tile__container--pressable">
      <Asset
        disabled={assetsDisabled}
        margin="smaller"
        state={assetsState}
        type={assetsType}
      />
    </Pressable>
  );
};

const tileStyles =
  ({width}: {width: number}) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{container: ViewStyle}>({
      container: {
        alignItems: 'center',
        display: 'flex',
        height: (width - theme.spacing.smallest * 6 - theme.spacing.normal) / 9,
        justifyContent: 'center',
        padding: theme.spacing.smallest,
        width: (width - theme.spacing.smallest * 6 - theme.spacing.normal) / 9,
      },
    });

export default React.memo(Tile);
