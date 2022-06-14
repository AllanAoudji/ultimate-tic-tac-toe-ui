import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

interface StateImageProps {
  state: TileState;
}
interface TempImage {
  activePlayer: TileState.Player1 | TileState.Player2;
}
interface TileProps {
  activePlayer?: TileState.Player1 | TileState.Player2;
  onPress?: ((event?: GestureResponderEvent) => void) | null | undefined;
  selected?: boolean;
  state?: TileState;
  valid?: boolean;
}

const StateImage: React.FC<StateImageProps> = ({state}) => {
  switch (state) {
    case TileState.Empty:
      return null;
    case TileState.Player1:
      return (
        <Image
          testID="tile__image--state"
          source={require('../assets/images/X.png')}
          style={imageStyles.container}
        />
      );
    case TileState.Player2:
      return (
        <Image
          testID="tile__image--state"
          source={require('../assets/images/O.png')}
          style={imageStyles.container}
        />
      );
    default:
      return null;
  }
};

const TempImage: React.FC<TempImage> = ({activePlayer}) => {
  if (activePlayer === TileState.Player1) {
    return (
      <Image
        style={[imageStyles.container, imageStyles.transparent]}
        testID="tile__image--temp"
        source={require('../assets/images/X.png')}
      />
    );
  }
  return (
    <Image
      style={[imageStyles.container, imageStyles.transparent]}
      testID="tile__image--temp"
      source={require('../assets/images/O.png')}
    />
  );
};

const Tile: React.FC<TileProps> = ({
  activePlayer = TileState.Player1,
  onPress = () => {},
  selected = false,
  state = TileState.Empty,
  valid = true,
}) => {
  const {width} = useWindowDimensions();
  const styles = React.useMemo(() => tileStyles({width}), [width]);

  return (
    <Pressable
      disabled={!valid || state !== TileState.Empty || selected}
      onPress={onPress}
      style={styles.container}
      testID="tile__container--pressable">
      <StateImage state={state} />
      {selected && state === TileState.Empty && (
        <TempImage activePlayer={activePlayer} />
      )}
    </Pressable>
  );
};

const imageStyles = StyleSheet.create<{
  container: ImageStyle;
  transparent: ImageStyle;
}>({
  container: {
    flex: 1,
    width: '100%',
  },
  transparent: {
    opacity: 0.7,
  },
});
const tileStyles = ({width}: {width: number}) =>
  StyleSheet.create<{container: ViewStyle}>({
    container: {
      alignItems: 'center',
      display: 'flex',
      height: (width - 8 * 3) / 9,
      justifyContent: 'center',
      padding: 4,
      width: (width - 8 * 3) / 9,
      // borderWidth: 2,
      // borderColor: 'pink',
    },
  });

export default Tile;
