import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
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
  currentPlayer?: TileState.Player1 | TileState.Player2;
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
          testID="winner-image"
          source={require('../assets/images/X.png')}
        />
      );
    case TileState.Player2:
      return (
        <Image
          testID="winner-image"
          source={require('../assets/images/O.png')}
        />
      );
    default:
      return null;
  }
};

const Section: React.FC<SectionProps> = ({
  currentPlayer = TileState.Player1,
  onPress = () => () => {},
  selectedTileIndex = null,
  tiles,
  valid = true,
}) => {
  const {width} = useWindowDimensions();
  return (
    <View testID="section">
      <ImageBackground
        resizeMode="cover"
        source={require('../assets/images/SectionGrid.png')}
        style={styles({width}).background}
        testID="section-grid">
        {tiles.map(tilesRow =>
          tilesRow.map(tile => (
            <Tile
              currentPlayer={currentPlayer}
              onPress={onPress(tile.index1D)}
              key={tile.index1D}
              state={tile.state}
              selected={selectedTileIndex === tile.index1D}
              valid={valid}
            />
          )),
        )}
      </ImageBackground>
      <WinningImage state={checkIfWon(tiles)[0]} />
    </View>
  );
};

const styles = ({width}: {width: number}) =>
  StyleSheet.create<{background: ViewStyle}>({
    background: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: width / 3,
      width: width / 3,
      padding: 4,
    },
  });

export default Section;
