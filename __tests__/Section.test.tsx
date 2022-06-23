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
    imgSourceORight = require(imageSource('LinePlayerORight')),
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
    imgSourceXRight = require(imageSource('LinePlayerXRight')),
    imgSourceXTop = require(imageSource('LinePlayerXTop')),
    imgSourceXTopLeftBottomRight = require(imageSource(
      'LinePlayerXTopLeftBottomRight',
    )),
    imgSourceXTopRightBottomLeft = require(imageSource(
      'LinePlayerXTopRightBottomLeft',
    ));
  let tiles: Tile[][], handlePress: jest.Mock;

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
    const {getByTestId} = render(
      <Section
        sectionState={[TileState.Player1, WinningLine.BottomRow]}
        tiles={tiles}
      />,
    );
    expect(getByTestId(SECTION_IMAGE_PLAYER_TEST_ID).props.source).toBe(
      imgSourceX,
    );
  });

  it('do not displays a <PlayerImage /> if the <Section /> is not won by a player', () => {
    const {queryByTestId} = render(<Section tiles={tiles} />);
    expect(queryByTestId(SECTION_IMAGE_PLAYER_TEST_ID)).toBeNull();
  });

  it('<PlayerImage /> should be based on the player who won the section', () => {
    const {getByTestId} = render(
      <Section
        sectionState={[TileState.Player2, WinningLine.BottomRow]}
        tiles={tiles}
      />,
    );
    expect(getByTestId(SECTION_IMAGE_PLAYER_TEST_ID).props.source).toBe(
      imgSourceO,
    );
  });

  it('disables each <Tile /> if the section is won', () => {
    const {getAllByTestId} = render(
      <Section
        onPress={() => handlePress}
        sectionState={[TileState.Player1, WinningLine.BottomRow]}
        tiles={tiles}
      />,
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
    const {getByTestId} = render(
      <Section
        sectionState={[TileState.Player1, WinningLine.BottomRow]}
        tiles={tiles}
      />,
    );
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

  it('sets /opacity: 0.2/ on innerContainer <View /> if <Section /> is full', () => {
    const fullSection = tiles.map(tile =>
      tile.map(t => ({...t, state: TileState.Player1})),
    );
    const {getByTestId} = render(
      <Section
        sectionState={[TileState.Empty, WinningLine.Draw]}
        tiles={fullSection}
      />,
    );
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(0.2);
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
    const {queryByTestId} = render(
      <Section
        mode={Mode.Continue}
        sectionState={[TileState.Player1, WinningLine.BottomRow]}
        tiles={tiles}
      />,
    );
    expect(queryByTestId(SECTION_IMAGE_PLAYER_TEST_ID)).toBeNull();
  });

  it('do not reduce the opacity if <Section /> is won and /mode === Continue/', () => {
    const {getByTestId} = render(
      <Section
        mode={Mode.Continue}
        sectionState={[TileState.Player1, WinningLine.BottomRow]}
        tiles={tiles}
      />,
    );
    expect(
      getByTestId(SECTION_CONTAINER_INNER_TEST_ID).props.style.opacity,
    ).toBe(1);
  });

  it('<Tiles /> should be valid if <Section /> is won and /mode === Continue/', () => {
    const {getAllByTestId} = render(
      <Section
        mode={Mode.Continue}
        onPress={() => handlePress}
        sectionState={[TileState.Player1, WinningLine.BottomRow]}
        tiles={tiles}
      />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[4]);
    expect(handlePress).toHaveBeenCalled();
  });

  describe('renders a <LineImage />', () => {
    it('if section is won and /mode === Continue/', () => {
      const {queryByTestId} = render(
        <Section
          mode={Mode.Continue}
          sectionState={[TileState.Player1, WinningLine.BottomRow]}
          tiles={tiles}
        />,
      );
      expect(queryByTestId('section__image--line')).not.toBeNull();
    });
    describe('with Player X and', () => {
      it('Top', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player1, WinningLine.TopRow]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXTop,
        );
      });

      it('MiddleHoritontal', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player1, WinningLine.MiddleRow]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXMiddleHorizontal,
        );
      });

      it('Bottom', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player1, WinningLine.BottomRow]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXBottom,
        );
      });

      it('Left', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player1, WinningLine.LeftColumn]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXLeft,
        );
      });

      it('MiddleVertical', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player1, WinningLine.MiddleColumn]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXMiddleVertical,
        );
      });

      it('Right', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player1, WinningLine.RightColumn]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXRight,
        );
      });

      it('TopLeftBottomRight', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[
              TileState.Player1,
              WinningLine.TopLeftBottomRightDiagonal,
            ]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXTopLeftBottomRight,
        );
      });

      it('TopRightBottomLeft', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[
              TileState.Player1,
              WinningLine.TopRightBottomLeftDiagonal,
            ]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceXTopRightBottomLeft,
        );
      });
    });

    describe('with Player O and', () => {
      it('Top', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player2, WinningLine.TopRow]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOTop,
        );
      });

      it('MiddleHoritontal', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player2, WinningLine.MiddleRow]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOMiddleHorizontal,
        );
      });

      it('Bottom', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player2, WinningLine.BottomRow]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOBottom,
        );
      });

      it('Left', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player2, WinningLine.LeftColumn]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOLeft,
        );
      });

      it('MiddleVertical', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player2, WinningLine.MiddleColumn]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOMiddleVertical,
        );
      });

      it('Right', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[TileState.Player2, WinningLine.RightColumn]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceORight,
        );
      });

      it('TopLeftBottomRight', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[
              TileState.Player2,
              WinningLine.TopLeftBottomRightDiagonal,
            ]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOTopLeftBottomRight,
        );
      });

      it('TopRightBottomLeft', () => {
        const {getByTestId} = render(
          <Section
            mode={Mode.Continue}
            sectionState={[
              TileState.Player2,
              WinningLine.TopRightBottomLeftDiagonal,
            ]}
            tiles={tiles}
          />,
        );
        expect(getByTestId('section__image--line').props.source).toBe(
          imgSourceOTopRightBottomLeft,
        );
      });
    });
  });
});
