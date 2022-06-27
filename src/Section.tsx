import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  Tile as TileInterface,
  TileState,
  Mode,
  SectionState,
  WinningLine,
  checkIfSectionIsFull,
} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import {ThemeContext} from './Theme.context';
import Tile from './Tile';

interface LineImageProps {
  state: SectionState;
}
interface PlayerImageProps {
  state: SectionState;
}
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

const LineImage: React.FC<LineImageProps> = ({state}) => {
  let source: ImageSourcePropType | undefined;
  switch (state[1]) {
    case WinningLine.TopRow:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXTop.png')
          : require('../assets/images/LinePlayerOTop.png');
      break;
    case WinningLine.MiddleRow:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXMiddleHorizontal.png')
          : require('../assets/images/LinePlayerOMiddleHorizontal.png');
      break;
    case WinningLine.BottomRow:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXBottom.png')
          : require('../assets/images/LinePlayerOBottom.png');
      break;
    case WinningLine.LeftColumn:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXLeft.png')
          : require('../assets/images/LinePlayerOLeft.png');
      break;
    case WinningLine.MiddleColumn:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXMiddleVertical.png')
          : require('../assets/images/LinePlayerOMiddleVertical.png');
      break;
    case WinningLine.RightColumn:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXRight.png')
          : require('../assets/images/LinePlayerORight.png');
      break;
    case WinningLine.TopLeftBottomRightDiagonal:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXTopLeftBottomRight.png')
          : require('../assets/images/LinePlayerOTopLeftBottomRight.png');
      break;
    case WinningLine.TopRightBottomLeftDiagonal:
      source =
        state[0] === TileState.Player1
          ? require('../assets/images/LinePlayerXTopRightBottomLeft.png')
          : require('../assets/images/LinePlayerOTopRightBottomLeft.png');
      break;
    default:
      break;
  }
  if (source) {
    return (
      <Image
        source={source}
        style={winnerImageStyles.image}
        testID="section__image--line"
      />
    );
  }
  return null;
};

const PlayerImage: React.FC<PlayerImageProps> = ({state}) => {
  const source =
    state[0] === TileState.Player1
      ? require('../assets/images/X.png')
      : require('../assets/images/O.png');
  return (
    <Image
      source={source}
      style={winnerImageStyles.image}
      testID="section__image--player"
    />
  );
};

const WinningImage: React.FC<WinningImageProps> = ({mode, state}) => (
  <Container
    height="100%"
    padding="base"
    position="absolute"
    width="100%"
    pointerEvents="none">
    {mode === Mode.Normal ? (
      <PlayerImage state={state} />
    ) : (
      <LineImage state={state} />
    )}
  </Container>
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
          height={(width - theme.spacing.base) / 3}
          padding="base"
          width={(width - theme.spacing.base) / 3}
          resizeMode="cover"
          source={require('../assets/images/SectionGrid.png')}
          testID="section__image--grid">
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
      {sectionState[0] !== TileState.Empty && (
        <WinningImage mode={mode} state={sectionState} />
      )}
    </Container>
  );
};

const winnerImageStyles = StyleSheet.create<{
  image: ImageStyle;
}>({
  image: {flex: 1, width: '100%'},
});

export default Section;
