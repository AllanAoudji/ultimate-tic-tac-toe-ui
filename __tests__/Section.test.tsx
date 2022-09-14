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

import {getSource, getStyle, imageSource, jsonSource} from './testUtils';

import Section from '../src/Section';

const mockLottie = jest.fn();
jest.mock('lottie-react-native', () => {
  const {forwardRef, useEffect} = require('react');
  return forwardRef((props: any, ref: any) => {
    useEffect(() => {
      if (ref.current) {
        ref.current.play = () => {};
      }
    }, [ref]);
    const {View} = require('react-native');
    mockLottie(props);
    return <View {...props} ref={ref} />;
  });
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

  const GAME_ASSETS_IMAGE_VISIBLE_TEST_ID = 'gameAsset__image--visible';
  const SECTION_CONTAINER_TEST_ID = 'section__container';
  const SECTION_IMAGE_GRID_TEST_ID = 'section__image--grid';
  const SECTION__CONTAINER__INNER_TEST_ID = 'section__container--inner';
  const TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable';

  const {getAllByTestId, getByTestId, queryAllByTestId, queryByTestId} =
    renderSection;

  const getContainer = () => getByTestId(SECTION_CONTAINER_TEST_ID);
  const getGameAssetImageVisible = () =>
    getByTestId(GAME_ASSETS_IMAGE_VISIBLE_TEST_ID);
  const getGameAssetImagesVisible = () =>
    getAllByTestId(GAME_ASSETS_IMAGE_VISIBLE_TEST_ID);
  const getGridImage = () => getByTestId(SECTION_IMAGE_GRID_TEST_ID);
  const getInnerContainer = () =>
    getByTestId(SECTION__CONTAINER__INNER_TEST_ID);
  const getTiles = () => getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID);

  const queryContainer = () => queryByTestId(SECTION_CONTAINER_TEST_ID);
  const queryGameAssetImageVisible = () =>
    queryByTestId(GAME_ASSETS_IMAGE_VISIBLE_TEST_ID);
  const queryGameAssetImagesVisible = () =>
    queryAllByTestId(GAME_ASSETS_IMAGE_VISIBLE_TEST_ID);
  const queryGridImage = () => queryByTestId(SECTION_IMAGE_GRID_TEST_ID);
  const queryInnerContainer = () =>
    queryByTestId(SECTION__CONTAINER__INNER_TEST_ID);
  const queryTiles = () => queryAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID);

  return {
    assets: {
      images: {
        grid: require(imageSource('SectionGrid')),
        LBottomBlue: require(imageSource('LBottomBlue')),
        LBottomRed: require(imageSource('LBottomRed')),
        LDiagonalTopLeftBottomRightBlue: require(imageSource(
          'LDiagonalTopLeftBottomRightBlue',
        )),
        LDiagonalTopLeftBottomRightRed: require(imageSource(
          'LDiagonalTopLeftBottomRightRed',
        )),
        LDiagonalTopRightBottomLeftBlue: require(imageSource(
          'LDiagonalTopRightBottomLeftBlue',
        )),
        LDiagonalTopRightBottomLeftRed: require(imageSource(
          'LDiagonalTopRightBottomLeftRed',
        )),
        LLeftBlue: require(imageSource('LLeftBlue')),
        LLeftRed: require(imageSource('LLeftRed')),
        LMiddleHorizontalBlue: require(imageSource('LMiddleHorizontalBlue')),
        LMiddleHorizontalRed: require(imageSource('LMiddleHorizontalRed')),
        LMiddleVerticalBlue: require(imageSource('LMiddleVerticalBlue')),
        LMiddleVerticalRed: require(imageSource('LMiddleVerticalRed')),
        LRightBlue: require(imageSource('LRightBlue')),
        LRightRed: require(imageSource('LRightRed')),
        LTopBlue: require(imageSource('LTopBlue')),
        LTopRed: require(imageSource('LTopRed')),
        O1: require(imageSource('O1')),
        X1: require(imageSource('X1')),
      },
      json: {
        LBottomBlue: require(jsonSource('LBottomBlue')),
        LBottomRed: require(jsonSource('LBottomRed')),
        LDiagonalTopLeftBottomRightBlue: require(jsonSource(
          'LDiagonalTopLeftBottomRightBlue',
        )),
        LDiagonalTopLeftBottomRightRed: require(jsonSource(
          'LDiagonalTopLeftBottomRightRed',
        )),
        LDiagonalTopRightBottomLeftBlue: require(jsonSource(
          'LDiagonalTopRightBottomLeftBlue',
        )),
        LDiagonalTopRightBottomLeftRed: require(jsonSource(
          'LDiagonalTopRightBottomLeftRed',
        )),
        LLeftBlue: require(jsonSource('LLeftBlue')),
        LLeftRed: require(jsonSource('LLeftRed')),
        LMiddleHorizontalBlue: require(jsonSource('LMiddleHorizontalBlue')),
        LMiddleHorizontalRed: require(jsonSource('LMiddleHorizontalRed')),
        LMiddleVerticalBlue: require(jsonSource('LMiddleVerticalBlue')),
        LMiddleVerticalRed: require(jsonSource('LMiddleVerticalRed')),
        LRightBlue: require(jsonSource('LRightBlue')),
        LRightRed: require(jsonSource('LRightRed')),
        LTopBlue: require(jsonSource('LTopBlue')),
        LTopRed: require(jsonSource('LTopRed')),
        O1: require(jsonSource('O1')),
        X1: require(jsonSource('X1')),
      },
    },
    container: {
      get: {
        container: getContainer,
        gridImage: getGridImage,
        gameAssetImageVisible: getGameAssetImageVisible,
        gameAssetImagesVisible: getGameAssetImagesVisible,
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
        gameAssetImageVisible: queryGameAssetImageVisible,
        gameAssetImagesVisible: queryGameAssetImagesVisible,
        gridImage: queryGridImage,
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
    mockLottie.mockClear();
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
    const {assets} = renderer({tiles: propsTiles});
    expect(mockLottie).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        source: assets.json.X1,
      }),
    );
    expect(mockLottie).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        source: assets.json.O1,
      }),
    );
  });

  it('calls /onPress/ on each <Tile /> with proper /tile.index1D/', () => {
    renderer({onPress: handlePress});
    expect(handlePress).toHaveBeenCalledTimes(9);
    expect(handlePress).toHaveBeenCalledWith(0);
    expect(handlePress).toHaveBeenCalledWith(1);
  });

  it("renders <GameAsset />'s <Image /> if /selectedTileIndex === tile.index1D/", () => {
    const {container} = renderer({selectedTileIndex: 2});
    expect(container.get.gameAssetImagesVisible()).toHaveLength(1);
  });

  it('passes /activePlayer/ to <Tile />', () => {
    const {assets, container} = renderer({
      activePlayer: TileState.Player2,
      selectedTileIndex: 2,
    });
    expect(getSource(container.get.gameAssetImageVisible())).toEqual(
      assets.images.O1,
    );
  });

  it("renders a <GameAsset />'s <Image /> if the <Section /> is won by a player", () => {
    renderer({
      sectionState: [TileState.Player1, WinningLine.BottomRow],
    });
    expect(mockLottie).toHaveBeenCalledTimes(1);
  });

  it('do not displays a <PlayerImage /> if the <Section /> is not won', () => {
    renderer();
    expect(mockLottie).toHaveBeenCalledTimes(0);
  });

  it('<PlayerImage /> should be based on the player who won the section', () => {
    const {assets} = renderer({
      sectionState: [TileState.Player2, WinningLine.BottomRow],
    });
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        source: assets.json.O1,
      }),
    );
  });

  describe('renders a <LineImage />', () => {
    const imagesKey = renderer().assets.json;
    let expectImagePlayerLine =
      (player: TileState.Player1 | TileState.Player2) =>
      (
        line: string,
        winningLine: WinningLine,
        json: keyof typeof imagesKey,
      ) => {
        it(line, () => {
          const {assets} = renderer({
            mode: Mode.Continue,
            sectionState: [player, winningLine],
          });
          expect(mockLottie).toHaveBeenCalledWith(
            expect.objectContaining({
              source: assets.json[json],
            }),
          );
        });
      };

    it('if section is won and /mode === Continue/', () => {
      renderer({
        mode: Mode.Continue,
        sectionState: [TileState.Player1, WinningLine.BottomRow],
      });
      expect(mockLottie).toHaveBeenCalledTimes(1);
    });

    describe('with Player O and', () => {
      const expectImageLine = expectImagePlayerLine(TileState.Player2);
      expectImageLine('bottom', WinningLine.BottomRow, 'LBottomRed');
      expectImageLine('left', WinningLine.LeftColumn, 'LLeftRed');
      expectImageLine(
        'middleHoritontal',
        WinningLine.MiddleRow,
        'LMiddleHorizontalRed',
      );
      expectImageLine(
        'middleVertical',
        WinningLine.MiddleColumn,
        'LMiddleVerticalRed',
      );
      expectImageLine('right', WinningLine.RightColumn, 'LRightRed');
      expectImageLine('top', WinningLine.TopRow, 'LTopRed');
      expectImageLine(
        'topLeftBottomRight',
        WinningLine.TopLeftBottomRightDiagonal,
        'LDiagonalTopLeftBottomRightRed',
      );
      expectImageLine(
        'topRightBottomLeft',
        WinningLine.TopRightBottomLeftDiagonal,
        'LDiagonalTopRightBottomLeftRed',
      );
    });

    describe('with Player X and', () => {
      const expectImageLine = expectImagePlayerLine(TileState.Player1);
      expectImageLine('bottom', WinningLine.BottomRow, 'LBottomBlue');
      expectImageLine('left', WinningLine.LeftColumn, 'LLeftBlue');
      expectImageLine(
        'middleHoritontal',
        WinningLine.MiddleRow,
        'LMiddleHorizontalBlue',
      );
      expectImageLine(
        'middleVertical',
        WinningLine.MiddleColumn,
        'LMiddleVerticalBlue',
      );
      expectImageLine('right', WinningLine.RightColumn, 'LRightBlue');
      expectImageLine('top', WinningLine.TopRow, 'LTopBlue');
      expectImageLine(
        'topLeftBottomRight',
        WinningLine.TopLeftBottomRightDiagonal,
        'LDiagonalTopLeftBottomRightBlue',
      );
      expectImageLine(
        'topRightBottomLeft',
        WinningLine.TopRightBottomLeftDiagonal,
        'LDiagonalTopRightBottomLeftBlue',
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
