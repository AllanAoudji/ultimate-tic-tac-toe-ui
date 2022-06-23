import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {
  getSections,
  Mode,
  Tile,
  TileState,
  WinningLine,
} from 'ultimate-tic-tac-toe-algorithm';

import {imageSource} from './testUtils';

import Section from '../src/Section';

describe('<Section/>', () => {
  const SECTION_CONTAINER_TEST_ID = 'section__container',
    SECTION_CONTAINER_INNER_TEST_ID = 'section__container--inner',
    SECTION_IMAGE_GRID_TEST_ID = 'section__image--grid',
    SECTION_IMAGE_PLAYER_TEST_ID = 'section__image--player',
    TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable',
    TILE_IMAGE_STATE_TEST_ID = 'tile__image--state',
    TILE_IMAGE_TEMP_TEST_ID = 'tile__image--temp';
  const imgSourceO = require(imageSource('O')),
    imgSourceOBottom = require(imageSource('LinePlayerOBottom')),
    imgSourceOLeft = require(imageSource('LinePlayerOLeft')),
    imgSourceOMiddleHorizontal = require(imageSource(
      'LinePlayerOMiddleHorizontal',
    )),
    imgSourceOMiddleVertical = require(imageSource(
      'LinePlayerOMiddleVertical',
    )),
    imgSourceORight = require(imageSource('linePlayerORight')),
    imgSourceOTop = require(imageSource('LinePlayerOTop')),
    imgSourceOTopLeftBottomRight = require(imageSource(
      'LinePlayerOTopLeftBottomRight',
    )),
    imgSourceOTopRightBottomLeft = require(imageSource(
      'LinePlayerOTopRightBottomLeft',
    )),
    imgSourceX = require(imageSource('X')),
    imgSourceXBottom = require(imageSource('LinePlayerXBottom')),
    imgSourceXLeft = require(imageSource('LinePlayerXLeft')),
    imgSourceXMiddleHorizontal = require(imageSource(
      'LinePlayerXMiddleHorizontal',
    )),
    imgSourceXMiddleVertical = require(imageSource(
      'LinePlayerXMiddleVertical',
    )),
    imgSourceXRight = require(imageSource('linePlayerXRight')),
    imgSourceXTop = require(imageSource('LinePlayerXTop')),
    imgSourceXTopLeftBottomRight = require(imageSource(
      'LinePlayerXTopLeftBottomRight',
    )),
    imgSourceXTopRightBottomLeft = require(imageSource(
      'LinePlayerXTopRightBottomLeft',
    ));
  let tiles: Tile[][], handlePress: jest.Mock;
  const playerWon = (
    options: {
      player?: TileState.Player1 | TileState.Player2;
      winningLine?: WinningLine;
    } = {
      player: TileState.Player1,
      winningLine: WinningLine.TopRow,
    },
  ) => {
    const player = options?.player || TileState.Player1;
    switch (options.winningLine) {
      case WinningLine.BottomRow:
        tiles[2][0].state = player;
        tiles[2][1].state = player;
        tiles[2][2].state = player;
        break;
      case WinningLine.LeftColumn:
        tiles[0][0].state = player;
        tiles[1][0].state = player;
        tiles[2][0].state = player;
        break;
      case WinningLine.MiddleColumn:
        tiles[0][1].state = player;
        tiles[1][1].state = player;
        tiles[2][1].state = player;
        break;
      case WinningLine.MiddleRow:
        tiles[1][0].state = player;
        tiles[1][1].state = player;
        tiles[1][2].state = player;
        break;
      case WinningLine.RightColumn:
        tiles[0][2].state = player;
        tiles[1][2].state = player;
        tiles[2][2].state = player;
        break;
      case WinningLine.TopLeftBottomRightDiagonal:
        tiles[0][0].state = player;
        tiles[1][1].state = player;
        tiles[2][2].state = player;
        break;
      case WinningLine.TopRow:
      default:
        tiles[0][0].state = player;
        tiles[0][1].state = player;
        tiles[0][2].state = player;
        break;
      case WinningLine.TopRightBottomLeftDiagonal:
        tiles[0][2].state = player;
        tiles[1][1].state = player;
        tiles[2][0].state = player;
        break;
    }
  };

  beforeEach(() => {
    handlePress = jest.fn();
    tiles = getSections([])[0].tiles;
  });

  afterEach(() => {
    handlePress.mockRestore();
  });

  it('renders a <View />', () => {
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId(SECTION_CONTAINER_TEST_ID)).toBeTruthy();
  });

  it('renders a "grid" <BackgroundImage />', () => {
    const imageSourceSectionGrid = require(imageSource('SectionGrid'));
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId(SECTION_IMAGE_GRID_TEST_ID).props.source).toBe(
      imageSourceSectionGrid,
    );
  });

  it('contains nine <Tile />', () => {
    const {getAllByTestId} = render(<Section tiles={tiles} />);
    expect(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)).toHaveLength(9);
  });

  it('passes /state/ on each <Tile />', () => {
    tiles[0][0].state = TileState.Player1;
    tiles[0][1].state = TileState.Player2;
    const {getAllByTestId} = render(<Section tiles={tiles} />);
    expect(getAllByTestId(TILE_IMAGE_STATE_TEST_ID)).toHaveLength(2);
    expect(getAllByTestId(TILE_IMAGE_STATE_TEST_ID)[0].props.source).toBe(
      imgSourceX,
    );
    expect(getAllByTestId(TILE_IMAGE_STATE_TEST_ID)[1].props.source).toBe(
      imgSourceO,
    );
  });

  it('calls /onPress/ on each <Tile /> with proper /tile.index1D/', () => {
    render(<Section onPress={handlePress} tiles={tiles} />);
    expect(handlePress).toHaveBeenCalledTimes(9);
    expect(handlePress).toHaveBeenCalledWith(0);
    expect(handlePress).toHaveBeenCalledWith(1);
    expect(handlePress).toHaveBeenCalledWith(2);
  });

  it('disables each <Tile /> if <Section /> if /valid === false/', () => {
    const {getAllByTestId} = render(
      <Section onPress={() => handlePress} tiles={tiles} valid={false} />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it("renders tile's <TempImage /> if /selectedTileIndex === tile.index1D/", () => {
    const {getAllByTestId} = render(
      <Section selectedTileIndex={2} tiles={tiles} />,
    );
    expect(getAllByTestId(TILE_IMAGE_TEMP_TEST_ID)).toHaveLength(1);
  });

  it('passes /activePlayer/ to <Tile />', () => {
    const {getByTestId} = render(
      <Section
        activePlayer={TileState.Player2}
        selectedTileIndex={2}
        tiles={tiles}
      />,
    );
    expect(getByTestId(TILE_IMAGE_TEMP_TEST_ID).props.source).toBe(imgSourceO);
  });

  it('displays a <PlayerImage /> if the <Section /> is won by a player', () => {
    playerWon();
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId(SECTION_IMAGE_PLAYER_TEST_ID).props.source).toBe(
      imgSourceX,
    );
  });

  it('do not displays a <PlayerImage /> if the <Section /> is not won by a player', () => {
    const {queryByTestId} = render(<Section tiles={tiles} />);
    expect(queryByTestId(SECTION_IMAGE_PLAYER_TEST_ID)).toBeNull();
  });

  it('<PlayerImage /> should be based on the player who won the section', () => {
    playerWon({player: TileState.Player2});
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId(SECTION_IMAGE_PLAYER_TEST_ID).props.source).toBe(
      imgSourceO,
    );
  });

  it('disables each <Tile /> if the section is won', () => {
    playerWon();
    const {getAllByTestId} = render(
      <Section onPress={() => handlePress} tiles={tiles} />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[3]);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('set /opacity: 0.2/ on innerContainer <View /> if /valid === false/', () => {
    const {getByTestId} = render(<Section tiles={tiles} valid={false} />);
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(0.2);
  });

  it('set /opacity: 1/ on innerContainer <View /> if /valid === false/', () => {
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(1);
  });

  it('set /opacity: 0.2/ on innerContainer <View /> if <Section /> is won', () => {
    playerWon();
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(0.2);
  });

  it('set /opacity: 1/ on innerContainer <View /> if <Section /> is not won', () => {
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(1);
  });

  it('disables each <Tile /> if /disabled === true/', () => {
    const {getAllByTestId} = render(<Section disabled={true} tiles={tiles} />);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[2].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('do not renders <PlayerImage /> if <Section /> is won and /mode === Continue/', () => {
    playerWon();
    const {queryByTestId} = render(
      <Section mode={Mode.Continue} tiles={tiles} />,
    );
    expect(queryByTestId(SECTION_IMAGE_PLAYER_TEST_ID)).toBeNull();
  });

  it('do not reduce the opacity if <Section /> is won and /mode === Continue/', () => {
    playerWon();
    const {getByTestId} = render(
      <Section mode={Mode.Continue} tiles={tiles} />,
    );
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(1);
  });

  it('<Tiles /> should be valid if <Section /> is won and /mode === Continue/', () => {
    playerWon();
    const {getAllByTestId} = render(
      <Section
        mode={Mode.Continue}
        onPress={() => handlePress}
        tiles={tiles}
      />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[4]);
    expect(handlePress).toHaveBeenCalled();
  });

  describe('renders a <LineImage />', () => {
    it('if section is won and /mode === Continue/', () => {
      playerWon();
      const {queryByTestId} = render(
        <Section mode={Mode.Continue} tiles={tiles} />,
      );
      expect(queryByTestId('section__image--line')).not.toBeNull();
    });
    describe('with Player X and', () => {
      it('Top', () => {
        playerWon();
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXTop,
        );
      });

      it('MiddleHoritontal', () => {
        playerWon({winningLine: WinningLine.MiddleRow});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXMiddleHorizontal,
        );
      });

      it('Bottom', () => {
        playerWon({winningLine: WinningLine.BottomRow});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXBottom,
        );
      });

      it('Left', () => {
        playerWon({winningLine: WinningLine.LeftColumn});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXLeft,
        );
      });

      it('MiddleVertical', () => {
        playerWon({winningLine: WinningLine.MiddleColumn});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXMiddleVertical,
        );
      });

      it('Right', () => {
        playerWon({winningLine: WinningLine.RightColumn});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXRight,
        );
      });

      it('TopLeftBottomRight', () => {
        playerWon({winningLine: WinningLine.TopLeftBottomRightDiagonal});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXTopLeftBottomRight,
        );
      });

      it('TopRightBottomLeft', () => {
        playerWon({winningLine: WinningLine.TopRightBottomLeftDiagonal});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXTopRightBottomLeft,
        );
      });
    });

    describe('with Player O and', () => {
      it('Top', () => {
        playerWon({player: TileState.Player2});
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOTop,
        );
      });

      it('MiddleHoritontal', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.MiddleRow,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOMiddleHorizontal,
        );
      });

      it('Bottom', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.BottomRow,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOBottom,
        );
      });

      it('Left', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.LeftColumn,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOLeft,
        );
      });

      it('MiddleVertical', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.MiddleColumn,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOMiddleVertical,
        );
      });

      it('Right', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.RightColumn,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceORight,
        );
      });

      it('TopLeftBottomRight', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.TopLeftBottomRightDiagonal,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOTopLeftBottomRight,
        );
      });

      it('TopRightBottomLeft', () => {
        playerWon({
          player: TileState.Player2,
          winningLine: WinningLine.TopRightBottomLeftDiagonal,
        });
        const {getByTestId} = render(
          <Section mode={Mode.Continue} tiles={tiles} />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOTopRightBottomLeft,
        );
      });
    });
  });
});
