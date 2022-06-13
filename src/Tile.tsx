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
  player: TileState;
}
interface TempImage {
  currentPlayer: TileState.Player1 | TileState.Player2;
}
interface TileProps {
  currentPlayer?: TileState.Player1 | TileState.Player2;
  onPress?: ((event?: GestureResponderEvent) => void) | null | undefined;
  selected?: boolean;
  state?: TileState;
  valid?: boolean;
}

const StateImage: React.FC<StateImageProps> = ({player: state}) => {
  switch (state) {
    case TileState.Empty:
      return null;
    case TileState.Player1:
      return (
        <Image
          testID="image"
          source={require('../assets/images/X.png')}
          style={imageStyles.container}
        />
      );
    case TileState.Player2:
      return (
        <Image
          testID="image"
          source={require('../assets/images/O.png')}
          style={imageStyles.container}
        />
      );
    default:
      return null;
  }
};

const TempImage: React.FC<TempImage> = ({currentPlayer}) => {
  if (currentPlayer === TileState.Player1) {
    return (
      <Image
        style={[imageStyles.container, imageStyles.transparent]}
        testID="temp-image"
        source={require('../assets/images/X.png')}
      />
    );
  }
  return (
    <Image
      style={[imageStyles.container, imageStyles.transparent]}
      testID="temp-image"
      source={require('../assets/images/O.png')}
    />
  );
};

const Tile: React.FC<TileProps> = ({
  currentPlayer = TileState.Player1,
  onPress = () => {},
  selected = false,
  state = TileState.Empty,
  valid = true,
}) => {
  const {width} = useWindowDimensions();

  return (
    <Pressable
      disabled={!valid || state !== TileState.Empty || selected}
      onPress={onPress}
      style={tileStyles({width}).container}
      testID="tile">
      <StateImage player={state} />
      {selected && state === TileState.Empty && (
        <TempImage currentPlayer={currentPlayer} />
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
