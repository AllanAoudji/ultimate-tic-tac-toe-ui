import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {getSections, Tile, TileState} from 'ultimate-tic-tac-toe-algorithm';

import {imageSource} from './testUtils';

import Section from '../src/Section';

const SECTION_CONTAINER_TEST_ID = 'section__container';
const SECTION_IMAGE_GRID_TEST_ID = 'section__image--grid';
const SECTION_IMAGE_WINNER_TEST_ID = 'section__image--winner';
const TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable';
const TILE_IMAGE_STATE_TEST_ID = 'tile__image--state';
const TILE_IMAGE_TEMP_TEST_ID = 'tile__image--temp';

describe('<Section/>', () => {
  const imgSourceO = require(imageSource('O'));
  const imgSourceX = require(imageSource('X'));
  let tiles: Tile[][], handlePress: jest.Mock;
  const playerWon = (
    player: TileState.Player1 | TileState.Player2 = TileState.Player1,
  ) => {
    tiles[0][0].state = player;
    tiles[0][1].state = player;
    tiles[0][2].state = player;
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

  it('displays a "winner" <Image /> if the <Section /> is won by a player', () => {
    playerWon();
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId(SECTION_IMAGE_WINNER_TEST_ID).props.source).toBe(
      imgSourceX,
    );
  });

  it('do not displays a "winner" <Image /> if the <Section /> is not won by a player', () => {
    const {queryByTestId} = render(<Section tiles={tiles} />);
    expect(queryByTestId(SECTION_IMAGE_WINNER_TEST_ID)).toBeNull();
  });

  it('"winner" <Image /> should be based on the player who won the section', () => {
    playerWon(TileState.Player2);
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId(SECTION_IMAGE_WINNER_TEST_ID).props.source).toBe(
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
      getByTestId('section__container--innerContainer').props.style.opacity,
    ).toBe(0.2);
  });

  it('set /opacity: 1/ on innerContainer <View /> if /valid === false/', () => {
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(
      getByTestId('section__container--innerContainer').props.style.opacity,
    ).toBe(1);
  });

  it('set /opacity: 0.2/ on innerContainer <View /> if <Section /> is won', () => {
    playerWon();
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(
      getByTestId('section__container--innerContainer').props.style.opacity,
    ).toBe(0.2);
  });

  it('set /opacity: 1/ on innerContainer <View /> if <Section /> is not won', () => {
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(
      getByTestId('section__container--innerContainer').props.style.opacity,
    ).toBe(1);
  });
});
