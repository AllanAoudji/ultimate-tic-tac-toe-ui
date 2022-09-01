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

const mockAsset = jest.fn();
jest.mock('../src/Asset', () => (props: any) => {
  const {View} = require('react-native');
  mockAsset(props);
  return <View {...props} />;
});

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

  const getGridImage = () => getByTestId('section__image--grid');
  const getImageLine = () => getByTestId('section__image--line');
  const getInnerContainer = () => getByTestId('section__container--inner');
  const getTiles = () => getAllByTestId('tile__container--pressable');

  const queryContainer = () => queryByTestId('section__container');
  const queryGridImage = () => queryByTestId('section__image--grid');
  const queryImageLine = () => queryByTestId('section__image--line');
  const queryInnerContainer = () => queryByTestId('section__container--inner');
  const queryTiles = () => queryAllByTestId('tile__container--pressable');

  return {
    assets: {
      images: {
        grid: require(imageSource('SectionGrid')),
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
        gridImage: getGridImage,
        imageLine: getImageLine,
        innerContainer: getInnerContainer,
        tile: (index: number) => getTiles()[index],
        tiles: getTiles,
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
        innerContainer: queryInnerContainer,
        tiles: queryTiles,
      },
    },
    render: renderSection,
  };
};

describe('<Section/>', () => {
  let handlePress: jest.Mock;

  beforeEach(() => {
    handlePress = jest.fn();
    mockAsset.mockClear();
  });

  afterEach(() => {
    handlePress.mockRestore();
  });

  it('renders a <Container />', () => {
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
    renderer({tiles: propsTiles});
    expect(mockAsset).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: 'X1',
      }),
    );
    expect(mockAsset).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'O1',
      }),
    );
  });

  it('calls /onPress/ on each <Tile /> with proper /tile.index1D/', () => {
    renderer({onPress: handlePress});
    expect(handlePress).toHaveBeenCalledTimes(9);
    expect(handlePress).toHaveBeenCalledWith(0);
    expect(handlePress).toHaveBeenCalledWith(1);
  });

  it("renders tile's <TempImage /> if /selectedTileIndex === tile.index1D/", () => {
    renderer({selectedTileIndex: 2});
    expect(mockAsset).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        disabled: true,
      }),
    );
  });

  it('passes /activePlayer/ to <Tile />', () => {
    renderer({
      activePlayer: TileState.Player2,
      selectedTileIndex: 2,
    });
    expect(mockAsset).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        disabled: true,
        type: 'O1',
      }),
    );
  });

  it('displays a <PlayerImage /> if the <Section /> is won by a player', () => {
    renderer({
      sectionState: [TileState.Player1, WinningLine.BottomRow],
    });
    expect(mockAsset).toHaveBeenCalledTimes(10);
    expect(mockAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'X1',
      }),
    );
  });

  it('do not displays a <PlayerImage /> if the <Section /> is not won', () => {
    renderer();
    expect(mockAsset).toHaveBeenCalledTimes(9);
  });

  it('<PlayerImage /> should be based on the player who won the section', () => {
    renderer({
      sectionState: [TileState.Player2, WinningLine.BottomRow],
    });
    expect(mockAsset).toHaveBeenCalledTimes(10);
    expect(mockAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'O1',
      }),
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
  describe('sets /opacity: 0.2/ on innerContainer <Container /> if ', () => {
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
        sectionState: [TileState.Draw, null],
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
      renderer({
        mode: Mode.Continue,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      expect(mockAsset).toHaveBeenCalledTimes(9);
    });
  });

  describe('if /valid === false/', () => {
    it('disables each <Tile /> if <Section />', () => {
      const {container} = renderer({onPress: () => handlePress, valid: false});
      container.press.tile();
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('set /opacity: 1/ on innerContainer <Container />', () => {
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
