import React from 'react';
import {GestureResponderEvent, useWindowDimensions} from 'react-native';
import {
  Tile as TileInterface,
  TileState,
  Mode,
  SectionState,
  WinningLine,
  checkIfSectionIsFull,
} from 'ultimate-tic-tac-toe-algorithm';
import GameAsset from './GameAsset';

import Container from './Container';
import {ThemeContext} from './Theme.context';
import Tile from './Tile';

interface SectionProps {
  activePlayer?: TileState.Player1 | TileState.Player2;
  disabled?: boolean;
  mode?: Mode;
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  sectionState?: SectionState;
  selectedTileIndex?: number | null;
  tiles: TileInterface[][];
  valid?: boolean;
}
interface WinningImageProps {
  mode: Mode;
  state: SectionState;
}

const WinningImage: React.FC<WinningImageProps> = React.memo(
  ({mode, state}) => {
    const type = React.useMemo(() => {
      if (mode === Mode.Normal) {
        return state[0] === TileState.Player1 ? 'X1' : 'O1';
      }
      switch (state[1]) {
        case WinningLine.BottomRow:
          if (state[0] === TileState.Player1) {
            return 'LBottomBlue';
          }
          return 'LBottomRed';
        case WinningLine.LeftColumn:
          if (state[0] === TileState.Player1) {
            return 'LLeftBlue';
          }
          return 'LLeftRed';
        case WinningLine.MiddleColumn:
          if (state[0] === TileState.Player1) {
            return 'LMiddleVerticalBlue';
          }
          return 'LMiddleVerticalRed';
        case WinningLine.MiddleRow:
          if (state[0] === TileState.Player1) {
            return 'LMiddleHorizontalBlue';
          }
          return 'LMiddleHorizontalRed';
        case WinningLine.RightColumn:
          if (state[0] === TileState.Player1) {
            return 'LRightBlue';
          }
          return 'LRightRed';
        case WinningLine.TopLeftBottomRightDiagonal:
          if (state[0] === TileState.Player1) {
            return 'LDiagonalTopLeftBottomRightBlue';
          }
          return 'LDiagonalTopLeftBottomRightRed';
        case WinningLine.TopRightBottomLeftDiagonal:
          if (state[0] === TileState.Player1) {
            return 'LDiagonalTopRightBottomLeftBlue';
          }
          return 'LDiagonalTopRightBottomLeftRed';
        case WinningLine.TopRow:
          if (state[0] === TileState.Player1) {
            return 'LTopBlue';
          }
          return 'LTopRed';
        default:
          if (state[0] === TileState.Player1) {
            return 'LBottomBlue';
          }
          return 'LBottomRed';
      }
    }, [mode, state]);

    return (
      <Container
        height="100%"
        position="absolute"
        width="100%"
        pointerEvents="none">
        <GameAsset type={type} state="PLAY" />
      </Container>
    );
  },
);

const Section: React.FC<SectionProps> = ({
  activePlayer = TileState.Player1,
  disabled = false,
  mode = Mode.Normal,
  onPress = () => () => {},
  sectionState = [TileState.Empty, null],
  selectedTileIndex = null,
  tiles,
  valid = true,
}) => {
  const {width} = useWindowDimensions();
  const {theme} = React.useContext(ThemeContext);

  const invalid = React.useMemo(
    () =>
      checkIfSectionIsFull(tiles) ||
      (mode === Mode.Normal ? sectionState[0] !== TileState.Empty : false) ||
      !valid,
    [mode, sectionState, tiles, valid],
  );

  return (
    <Container testID="section__container">
      <Container opacity={invalid ? 0.2 : 1} testID="section__container--inner">
        <Container
          flexDirection="row"
          flexWrap="wrap"
          height={(width - theme.spacing.largest) / 3}
          padding="small"
          width={(width - theme.spacing.largest) / 3}
          resizeMode="cover"
          source={require('../assets/images/SectionGrid.png')}
          testID="section__image--grid">
          {/* Display all 9 tiles of the section */}
          {tiles.map(tilesRow =>
            tilesRow.map(tile => (
              <Tile
                activePlayer={activePlayer}
                disabled={disabled}
                onPress={onPress(tile.index1D)}
                key={tile.index1D}
                state={tile.state}
                selected={selectedTileIndex === tile.index1D}
                valid={
                  valid &&
                  (mode === Mode.Normal
                    ? sectionState[0] === TileState.Empty
                    : true)
                }
              />
            )),
          )}
        </Container>
      </Container>
      {/* Display the winning <GameAsset /> */}
      {sectionState[0] !== TileState.Empty && (
        <WinningImage mode={mode} state={sectionState} />
      )}
    </Container>
  );
};

export default React.memo(Section);
