import React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {Tile as TileInterface, TileState} from 'ultimate-tic-tac-toe-algorithm';

import Tile from './Tile';

interface Props {
  currentPlayer?: TileState.Player1 | TileState.Player2;
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  selectedTileIndex?: number | null;
  tiles?: TileInterface[][];
  valid?: boolean;
}

const Section: React.FC<Props> = ({
  currentPlayer = TileState.Player1,
  onPress = () => () => {},
  selectedTileIndex = null,
  tiles = [],
  valid = true,
}) => (
  <View testID="section">
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
  </View>
);

export default Section;
