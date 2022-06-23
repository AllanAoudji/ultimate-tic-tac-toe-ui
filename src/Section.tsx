import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  ImageSourcePropType,
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
  Mode,
  SectionState,
  WinningLine,
} from 'ultimate-tic-tac-toe-algorithm';

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
  selectedTileIndex?: number | null;
  tiles: TileInterface[][];
  valid?: boolean;
}
interface WinningImageProps {
  mode: Mode;
  state: SectionState;
}

const sectionIsWon = (tiles: TileInterface[][]) =>
  checkIfWon(tiles)[0] !== TileState.Empty;

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
  <View pointerEvents="none" style={winnerImageStyles.container}>
    {mode === Mode.Normal ? (
      <PlayerImage state={state} />
    ) : (
      <LineImage state={state} />
    )}
  </View>
);

const Section: React.FC<SectionProps> = ({
  activePlayer = TileState.Player1,
  disabled = false,
  mode = Mode.Normal,
  onPress = () => () => {},
  selectedTileIndex = null,
  tiles,
  valid = true,
}) => {
  const {width} = useWindowDimensions();
  const styles = React.useMemo(
    () =>
      sectionStyles({
        width,
        invalid: !valid || (mode === Mode.Normal ? sectionIsWon(tiles) : false),
      }),
    [mode, tiles, valid, width],
  );

  return (
    <View testID="section__container">
      <View testID="section__container--inner" style={styles.innerContainer}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imageBackground}
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
                  valid && (mode === Mode.Normal ? !sectionIsWon(tiles) : true)
                }
              />
            )),
          )}
        </ImageBackground>
      </View>
      {sectionIsWon(tiles) && (
        <WinningImage mode={mode} state={checkIfWon(tiles)} />
      )}
    </View>
  );
};

const sectionStyles = ({invalid, width}: {invalid: boolean; width: number}) =>
  StyleSheet.create<{
    imageBackground: ViewStyle;
    innerContainer: ViewStyle;
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
      opacity: invalid ? 0.2 : 1,
    },
  });
const winnerImageStyles = StyleSheet.create<{
  container: ViewStyle;
  image: ImageStyle;
}>({
  container: {
    height: '100%',
    padding: 7,
    position: 'absolute',
    width: '100%',
  },
  image: {flex: 1, width: '100%'},
});

export default Section;
