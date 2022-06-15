import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {
  Tile as TileInterface,
  TileState,
  checkIfWon,
} from 'ultimate-tic-tac-toe-algorithm';

import Tile from './Tile';

interface SectionProps {
  activePlayer?: TileState.Player1 | TileState.Player2;
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  selectedTileIndex?: number | null;
  tiles: TileInterface[][];
  valid?: boolean;
}
interface WinningImageProps {
  state: TileState;
}

const WinningImage: React.FC<WinningImageProps> = ({state}) => {
  switch (state) {
    case TileState.Empty:
      return null;
    case TileState.Player1:
      return (
        <Image
          testID="section__image--winner"
          source={require('../assets/images/X.png')}
          style={winningImageStyles.image}
        />
      );
    case TileState.Player2:
      return (
        <Image
          testID="section__image--winner"
          source={require('../assets/images/O.png')}
          style={winningImageStyles.image}
        />
      );
    default:
      return null;
  }
};

const Section: React.FC<SectionProps> = ({
  activePlayer = TileState.Player1,
  onPress = () => () => {},
  selectedTileIndex = null,
  tiles,
  valid = true,
}) => {
  const {width} = useWindowDimensions();
  const styles = React.useMemo(
    () =>
      sectionStyles({
        valid,
        width,
        won: checkIfWon(tiles)[0] !== TileState.Empty,
      }),
    [valid, tiles, width],
  );

  return (
    <View testID="section__container">
      <View
        testID="section__container--innerContainer"
        style={styles.innerContainer}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imageBackground}
          source={require('../assets/images/SectionGrid.png')}
          testID="section__image--grid">
          {tiles.map(tilesRow =>
            tilesRow.map(tile => (
              <Tile
                activePlayer={activePlayer}
                onPress={onPress(tile.index1D)}
                key={tile.index1D}
                state={tile.state}
                selected={selectedTileIndex === tile.index1D}
                valid={valid && checkIfWon(tiles)[0] === TileState.Empty}
              />
            )),
          )}
        </ImageBackground>
      </View>
      {checkIfWon(tiles)[0] !== TileState.Empty && (
        <View pointerEvents="none" style={styles.winningImageContainer}>
          <WinningImage state={checkIfWon(tiles)[0]} />
        </View>
      )}
    </View>
  );
};

const sectionStyles = ({
  valid,
  width,
  won,
}: {
  valid: boolean;
  width: number;
  won: boolean;
}) =>
  StyleSheet.create<{
    imageBackground: ViewStyle;
    innerContainer: ViewStyle;
    winningImageContainer: ViewStyle;
  }>({
    imageBackground: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: (width - 8) / 3,
      padding: 4,
      width: (width - 8) / 3,
    },
    innerContainer: {
      opacity: won || !valid ? 0.2 : 1,
    },
    winningImageContainer: {
      height: '100%',
      padding: 7,
      position: 'absolute',
      width: '100%',
    },
  });
const winningImageStyles = StyleSheet.create<{image: ImageStyle}>({
  image: {flex: 1, width: '100%'},
});

export default Section;
