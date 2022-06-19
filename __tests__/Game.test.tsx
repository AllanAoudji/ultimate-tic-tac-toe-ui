import {fireEvent, render} from '@testing-library/react-native';
import {mockRandomForEach, mockRandom, resetMockRandom} from 'jest-mock-random';
import React from 'react';

import {imageSource} from './testUtils';

import Game from '../src/Game';

describe('<Game />', () => {
  const BOARD_CONTAINER_TEST_ID = 'board__container',
    NEW_GAME_TEXT = 'new game',
    PLAYER_O_COLOR = '#ed1327',
    PLAYER_O_TEXT = 'player o',
    PLAYER_X_COLOR = '#0012ff',
    PLAYER_X_TEST = 'player x',
    PLAYER_BOARD_CONTAINER_TEST_ID = 'playerBoard__container',
    PLAY_TEXT = 'play',
    PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'playButton__container--pressable',
    SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'surrendButton__container--pressable',
    SURREND_MODAL_CONTAINER_INNER_TEST_ID = 'surrendModal__container--inner',
    SURREND_MODAL_CONTAINER_TEST_ID = 'surrendModal__container',
    TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable',
    TILE_IMAGE_STATE_TEST_ID = 'tile__image--state',
    TILE_IMAGE_TEMP_TEST_ID = 'tile__image--temp',
    WINNER_FLAG_CONTAINER_TEST_ID = 'winningModal__container',
    YES_TEXT = 'yes';

  // BOTTOM <PlayerBoard is always player1
  mockRandomForEach([0.5]);

  it('renders two <PlayerBoard />', () => {
    const {queryAllByTestId} = render(<Game />);
    expect(queryAllByTestId(PLAYER_BOARD_CONTAINER_TEST_ID).length).toBe(2);
  });

  it('renders first <PlayerBoard /> with /position === TOP/', () => {
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAYER_BOARD_CONTAINER_TEST_ID)[0].props.style.transform,
    ).toEqual([{rotate: '180deg'}]);
  });

  it('choses player randomly', () => {
    mockRandom(0.5);
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props.style
        .backgroundColor,
    ).toBe(PLAYER_O_COLOR);
    resetMockRandom();
  });

  it('renders the other player with a 50/50 ramdom chance', () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props.style
        .backgroundColor,
    ).toBe(PLAYER_X_COLOR);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props.style
        .backgroundColor,
    ).toBe(PLAYER_O_COLOR);
    resetMockRandom();
  });

  it(`disables "${PLAY_TEXT}" <Pressable /> on mount`, () => {
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('opens player TOP <SurrendModal /> when <SurrendButton /> is pressed', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_O_COLOR);
  });

  it('opens player BOTTOM <SurrendModal /> when <SurrendButton /> is pressed', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_X_COLOR);
  });

  it('renders <WinnerFlag /> with /winner === Player1/ if player2 surrend', () => {
    const {getAllByTestId, getByText, queryByTestId, queryByText} = render(
      <Game />,
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).not.toBeNull();
    expect(queryByText(PLAYER_X_TEST)).not.toBeNull();
  });

  it('renders <WinnerFlag /> with /winner === Player2/ if player1 surrend', () => {
    const {getAllByTestId, getByText, queryByTestId, queryByText} = render(
      <Game />,
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).not.toBeNull();
    expect(queryByText(PLAYER_O_TEXT)).not.toBeNull();
  });

  it(`resets /winner/ when "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getByText, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).toBeNull();
  });

  it('randomized /players/ when  "new game" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText} = render(<Game />);
    mockRandom(0.499);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props.style
        .backgroundColor,
    ).toBe(PLAYER_X_COLOR);
    resetMockRandom();
  });

  it('disables <SurrendButton /> if /winner !== Empty/', () => {
    const {getAllByTestId, getByText} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('closes both <SurrendModal /> when a player surrend', async () => {
    let {queryAllByTestId, getAllByTestId, getAllByText} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getAllByText(YES_TEXT)[0]);
    expect(queryAllByTestId(SURREND_MODAL_CONTAINER_TEST_ID).length).toBe(0);
  });

  it('renders a <Board />', () => {
    const {queryByTestId} = render(<Game />);
    expect(queryByTestId(BOARD_CONTAINER_TEST_ID)).not.toBeNull();
  });

  it('renders a player1 temp <Image /> when press on a <Tile /> if /history.length === 0/', () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getByTestId, queryAllByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(queryAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(queryByTestId(TILE_IMAGE_TEMP_TEST_ID)).not.toBeNull();
    expect(getByTestId(TILE_IMAGE_TEMP_TEST_ID).props.source).toBe(
      IMAGE_PLAYER_X,
    );
  });

  it(`enables BOTTOM player "${PLAY_TEXT}" <Pressable /> if it's the player turn and /selectedTileIndex !== null/`, () => {
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(false);
  });

  it(`pushes /selectedTileIndex/ on /history/ when press on BOTTOM player "${PLAY_TEXT}" <Pressable />`, () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID)[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
  });

  it(`enables TOP player "${PLAY_TEXT}" <Pressable /> if its's the player turn and /selectedTileIndex !== null/`, () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(false);
    resetMockRandom();
  });

  it(`pushes /selectedTileIndex/ on /history/ when press on TOP player "${PLAY_TEXT}" <Pressable />`, () => {
    mockRandom(0.499);
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText('play')[0]);
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID)[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
    resetMockRandom();
  });

  it(`resets /history/ when "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getAllByText, getByText, queryAllByTestId} = render(
      <Game />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1]);
    fireEvent.press(getAllByText(PLAY_TEXT)[0]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID).length).toBe(0);
  });

  it(`resets /selectedTileIndex/ when "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId(TILE_IMAGE_TEMP_TEST_ID).length).toBe(0);
  });

  it(`resets /selectedTileIndex/ when "${PLAY_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(getAllByText(PLAY_TEXT)[0]);
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID).length).toBe(1);
  });

  it('renders <WinnigFlag /> if game is won', () => {
    const {getAllByTestId, getAllByText, queryByTestId} = render(<Game />);
    const playerPlay = (player: 0 | 1) => (tile: number) => {
      fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[tile]);
      fireEvent.press(getAllByText(PLAY_TEXT)[player]);
    };
    const playerBottomPlay = playerPlay(1);
    const playerTopPlay = playerPlay(0);

    [3, 27, 4, 36, 5, 45, 12, 28, 13, 37, 14, 47, 21, 29, 22, 38, 23].forEach(
      (tileIndex, index) => {
        if (index % 2) {
          playerTopPlay(tileIndex);
        } else {
          playerBottomPlay(tileIndex);
        }
      },
    );

    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).not.toBeNull();
  });
});
