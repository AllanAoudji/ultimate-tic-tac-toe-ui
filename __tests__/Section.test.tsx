import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {
  getSections,
  Mode,
  SectionState,
  Tile,
  TileState,
  WinningLine,
} from 'ultimate-tic-tac-toe-algorithm';

import {getSource, getStyle, imageSource} from './testUtils';

import Section from '../src/Section';

const renderer = (
  options: {
    activePlayer?: TileState.Player1 | TileState.Player2;
    disabled?: boolean;
    mode?: Mode;
    onPress?: (
      index: number,
    ) => ((event?: GestureResponderEvent) => void) | null | undefined;
    sectionState?: SectionState;
    selectedTileIndex?: number;
    tiles?: Tile[][];
    valid?: boolean;
  } = {},
) => {
  const tiles = options.tiles || getSections([])[0].tiles;
  const renderSection = render(
    <Section
      activePlayer={options.activePlayer}
      disabled={options.disabled}
      mode={options.mode}
      onPress={options.onPress}
      selectedTileIndex={options.selectedTileIndex}
      sectionState={options.sectionState}
      tiles={tiles}
      valid={options.valid}
    />,
  );

  const {getAllByTestId, getByTestId, queryAllByTestId, queryByTestId} =
    renderSection;

  const getContainer = () => getByTestId('section__container');
  const getGridImage = () => getByTestId('section__image--grid');
  const getImageLine = () => getByTestId('section__image--line');
  const getImagePlayer = () => getByTestId('section__image--player');
  const getInnerContainer = () => getByTestId('section__container--inner');
  const getTiles = () => getAllByTestId('tile__container--pressable');
  const getTileStateImages = () => getAllByTestId('tile__image--state');
  const getTilesTempImages = () => getAllByTestId('tile__image--temp');

  const queryContainer = () => queryByTestId('section__container');
  const queryGridImage = () => queryByTestId('section__image--grid');
  const queryImageLine = () => queryByTestId('section__image--line');
  const queryImagePlayer = () => queryByTestId('section__image--player');
  const queryInnerContainer = () => queryByTestId('section__container--inner');
  const queryTiles = () => queryAllByTestId('tile__container--pressable');
  const queryTileStateImages = () => queryAllByTestId('tile__image--state');
  const queryTileTempImages = () => queryAllByTestId('tile__image--temp');

  return {
    assets: {
      images: {
        grid: require(imageSource('SectionGrid')),
        imgSource0: require(imageSource('O')),
        imgSourceOBottom: require(imageSource('LinePlayerOBottom')),
        imgSourceOLeft: require(imageSource('LinePlayerOLeft')),
        imgSourceOMiddleHorizontal: require(imageSource(
          'LinePlayerOMiddleHorizontal',
        )),
        imgSourceOMiddleVertical: require(imageSource(
          'LinePlayerOMiddleVertical',
        )),
        imgSourceORight: require(imageSource('LinePlayerORight')),
        imgSourceOTop: require(imageSource('LinePlayerOTop')),
        imgSourceOTopLeftBottomRight: require(imageSource(
          'LinePlayerOTopLeftBottomRight',
        )),
        imgSourceOTopRightBottomLeft: require(imageSource(
          'LinePlayerOTopRightBottomLeft',
        )),
        imgSourceX: require(imageSource('X')),
        imgSourceXBottom: require(imageSource('LinePlayerXBottom')),
        imgSourceXMiddleHorizontal: require(imageSource(
          'LinePlayerXMiddleHorizontal',
        )),
        imgSourceXTop: require(imageSource('LinePlayerXTop')),
        imgSourceXLeft: require(imageSource('LinePlayerXLeft')),
        imgSourceXMiddleVertical: require(imageSource(
          'LinePlayerXMiddleVertical',
        )),
        imgSourceXRight: require(imageSource('LinePlayerXRight')),
        imgSourceXTopLeftBottomRight: require(imageSource(
          'LinePlayerXTopLeftBottomRight',
        )),
        imgSourceXTopRightBottomLeft: require(imageSource(
          'LinePlayerXTopRightBottomLeft',
        )),
      },
    },
    container: {
      get: {
        container: getContainer,
        gridImage: getGridImage,
        imageLine: getImageLine,
        imagePlayer: getImagePlayer,
        innerContainer: getInnerContainer,
        tile: (index: number) => getTiles()[index],
        tiles: getTiles,
        tileStateImage: (index: number) => getTileStateImages()[index],
        tileStateImages: getTileStateImages,
        tileTempImage: (index: number) => getTilesTempImages()[index],
        tileTempImages: getTilesTempImages,
      },
      press: {
        tile: (index = 0) => {
          fireEvent.press(getTiles()[index]);
        },
      },
      query: {
        container: queryContainer,
        gridImage: queryGridImage,
        imageLine: queryImageLine,
        imagePlayer: queryImagePlayer,
        innerContainer: queryInnerContainer,
        tiles: queryTiles,
        tileStateImages: queryTileStateImages,
        tileTempImages: queryTileTempImages,
      },
    },
    render: renderSection,
  };
};

describe('<Section/>', () => {
  let handlePress: jest.Mock;

  beforeEach(() => {
    handlePress = jest.fn();
  });

  afterEach(() => {
    handlePress.mockRestore();
  });

  it('renders a <View />', () => {
    const {container} = renderer();
    expect(container.query.container()).not.toBeNull();
  });

  it('renders a "grid" <BackgroundImage />', () => {
    const {assets, container} = renderer();
    expect(container.query.gridImage()).not.toBeNull();
    expect(getSource(container.get.gridImage())).toBe(assets.images.grid);
  });

  it('contains nine <Tile />', () => {
    const {container} = renderer();
    expect(container.query.tiles()).toHaveLength(9);
  });

  it('passes /state/ on each <Tile />', () => {
    const propsTiles = getSections([])[0].tiles;
    propsTiles[0][0].state = TileState.Player1;
    propsTiles[0][1].state = TileState.Player2;
    const {assets, container} = renderer({tiles: propsTiles});
    expect(container.query.tileStateImages()).toHaveLength(2);
    expect(getSource(container.get.tileStateImage(0))).toBe(
      assets.images.imgSourceX,
    );
    expect(getSource(container.get.tileStateImage(1))).toBe(
      assets.images.imgSource0,
    );
  });

  it('calls /onPress/ on each <Tile /> with proper /tile.index1D/', () => {
    renderer({onPress: handlePress});
    expect(handlePress).toHaveBeenCalledTimes(9);
    expect(handlePress).toHaveBeenCalledWith(0);
    expect(handlePress).toHaveBeenCalledWith(1);
  });

  it("renders tile's <TempImage /> if /selectedTileIndex === tile.index1D/", () => {
    const {container} = renderer({selectedTileIndex: 2});
    expect(container.query.tileTempImages()).toHaveLength(1);
  });

  it('passes /activePlayer/ to <Tile />', () => {
    const {assets, container} = renderer({
      activePlayer: TileState.Player2,
      selectedTileIndex: 2,
    });
    expect(getSource(container.get.tileTempImage(0))).toBe(
      assets.images.imgSource0,
    );
  });

  it('displays a <PlayerImage /> if the <Section /> is won by a player', () => {
    const {assets, container} = renderer({
      sectionState: [TileState.Player1, WinningLine.BottomRow],
    });
    expect(container.query.imagePlayer()).not.toBeNull();
    expect(getSource(container.get.imagePlayer())).toBe(
      assets.images.imgSourceX,
    );
  });

  it('do not displays a <PlayerImage /> if the <Section /> is not won', () => {
    const {container} = renderer();
    expect(container.query.imagePlayer()).toBeNull();
  });

  it('<PlayerImage /> should be based on the player who won the section', () => {
    const {assets, container} = renderer({
      sectionState: [TileState.Player2, WinningLine.BottomRow],
    });
    expect(getSource(container.get.imagePlayer())).toBe(
      assets.images.imgSource0,
    );
  });

  describe('renders a <LineImage />', () => {
    const imagesKey = renderer().assets.images;
    let expectImagePlayerLine =
      (player: TileState.Player1 | TileState.Player2) =>
      (
        line: string,
        winningLine: WinningLine,
        image: keyof typeof imagesKey,
      ) => {
        it(line, () => {
          const {assets, container} = renderer({
            mode: Mode.Continue,
            sectionState: [player, winningLine],
          });
          expect(getSource(container.get.imageLine())).toBe(
            assets.images[image],
          );
        });
      };

    it('if section is won and /mode === Continue/', () => {
      const {container} = renderer({
        mode: Mode.Continue,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      expect(container.query.imageLine()).not.toBeNull();
    });

    describe('with Player O and', () => {
      const expectImageLine = expectImagePlayerLine(TileState.Player2);
      expectImageLine('bottom', WinningLine.BottomRow, 'imgSourceOBottom');
      expectImageLine('left', WinningLine.LeftColumn, 'imgSourceOLeft');
      expectImageLine(
        'middleHoritontal',
        WinningLine.MiddleRow,
        'imgSourceOMiddleHorizontal',
      );
      expectImageLine(
        'middleVertical',
        WinningLine.MiddleColumn,
        'imgSourceOMiddleVertical',
      );
      expectImageLine('right', WinningLine.RightColumn, 'imgSourceORight');
      expectImageLine('top', WinningLine.TopRow, 'imgSourceOTop');
      expectImageLine(
        'topLeftBottomRight',
        WinningLine.TopLeftBottomRightDiagonal,
        'imgSourceOTopLeftBottomRight',
      );
      expectImageLine(
        'topRightBottomLeft',
        WinningLine.TopRightBottomLeftDiagonal,
        'imgSourceOTopRightBottomLeft',
      );
    });

    describe('with Player X and', () => {
      const expectImageLine = expectImagePlayerLine(TileState.Player1);
      expectImageLine('bottom', WinningLine.BottomRow, 'imgSourceXBottom');
      expectImageLine('left', WinningLine.LeftColumn, 'imgSourceXLeft');
      expectImageLine(
        'middleHoritontal',
        WinningLine.MiddleRow,
        'imgSourceXMiddleHorizontal',
      );
      expectImageLine(
        'middleVertical',
        WinningLine.MiddleColumn,
        'imgSourceXMiddleVertical',
      );
      expectImageLine('right', WinningLine.RightColumn, 'imgSourceXRight');
      expectImageLine('top', WinningLine.TopRow, 'imgSourceXTop');
      expectImageLine(
        'topLeftBottomRight',
        WinningLine.TopLeftBottomRightDiagonal,
        'imgSourceXTopLeftBottomRight',
      );
      expectImageLine(
        'topRightBottomLeft',
        WinningLine.TopRightBottomLeftDiagonal,
        'imgSourceXTopRightBottomLeft',
      );
    });
  });
  describe('sets /opacity: 0.2/ on innerContainer <View /> if ', () => {
    it('/valid === false/', () => {
      const {container} = renderer({valid: false});
      expect(getStyle(container.get.innerContainer()).opacity).toBe(0.2);
    });

    it('<Section /> is won', () => {
      const {container} = renderer({
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      expect(getStyle(container.get.innerContainer()).opacity).toBe(0.2);
    });

    it('<Section /> is full', () => {
      const fullSection = getSections([])[0].tiles.map(tile =>
        tile.map(t => ({...t, state: TileState.Player1})),
      );
      const {container} = renderer({
        sectionState: [TileState.Empty, WinningLine.Draw],
        tiles: fullSection,
      });
      expect(getStyle(container.get.innerContainer()).opacity).toBe(0.2);
    });
  });

  describe('if <Section /> is won and /mode === Continue/', () => {
    it('do not reduce the opacity', () => {
      const {container} = renderer({
        mode: Mode.Continue,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      expect(getStyle(container.get.innerContainer()).opacity).toBe(1);
    });

    it('<Tiles /> should be valid', () => {
      const {container} = renderer({
        mode: Mode.Continue,
        onPress: () => handlePress,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      container.press.tile();
      expect(handlePress).toHaveBeenCalled();
    });

    it('do not renders <PlayerImage />', () => {
      const {container} = renderer({
        mode: Mode.Continue,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      expect(container.query.imagePlayer()).toBeNull();
    });
  });

  describe('if /valid === false/', () => {
    it('disables each <Tile /> if <Section />', () => {
      const {container} = renderer({onPress: () => handlePress, valid: false});
      container.press.tile();
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('set /opacity: 1/ on innerContainer <View />', () => {
      const {container} = renderer();
      expect(getStyle(container.get.innerContainer()).opacity).toBe(1);
    });
  });

  describe('disables each <Tile /> if', () => {
    it('the section is won', () => {
      const {container} = renderer({
        onPress: () => handlePress,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      container.press.tile();
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('/disabled === true/', () => {
      const {container} = renderer({
        disabled: true,
        onPress: () => handlePress,
      });
      container.press.tile();
      expect(handlePress).not.toHaveBeenCalled();
    });
  });
});
