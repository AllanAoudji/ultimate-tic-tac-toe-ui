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
    PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'playButton__container--pressable',
    SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'surrendButton__container--pressable',
    SURREND_MODAL_CONTAINER_INNER_TEST_ID = 'surrendModal__container--inner',
    SURREND_MODAL_CONTAINER_TEST_ID = 'surrendModal__container',
    TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable',
    WINNER_FLAG_CONTAINER_TEST_ID = 'winnerFlag__container',
    YES_TEXT = 'yes';

  // BOTTOM <PlayerBoard is always player1
  mockRandomForEach([0.5]);

  it('renders two <PlayerBoard />', () => {
    const {queryAllByTestId} = render(<Game />);
    expect(queryAllByTestId(PLAYER_BOARD_CONTAINER_TEST_ID).length).toBe(2);
  });

  it('first <PlayerBoard /> is /TOP/', () => {
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

  it('renders the other player 50/50', () => {
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

  it('disabled play <Button /> on mount', () => {
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

  it('opens Player TOP <SurrendModal /> when <SurrendButton /> is clicked', () => {
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

  it('opens Player BOTTOM <SurrendModal /> when <SurrendButton /> is clicked', () => {
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

  it('renders <WinnerFlag /> with /winner === Player1/ if Player2 surrend', () => {
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

  it('renders <WinnerFlag /> with /winner === Player2/ if Player1 surrend', () => {
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

  it('set /winner === Empty/ when <WinnerFlag /> "new game" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).toBeNull();
  });

  it('randomize /players/ when <WinnerFlag /> "new game" <Pressable /> is pressed', () => {
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

  it('disabled <SurrendButton /> if /winner !== Empty/', () => {
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

  it('close <SurrendModal /> when a player surrend', async () => {
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

  it('if /history.length === 0/ <Board /> displays a Player1 temp <Image />', () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getByTestId, queryAllByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(queryAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(queryByTestId('tile__image--temp')).not.toBeNull();
    expect(getByTestId('tile__image--temp').props.source).toBe(IMAGE_PLAYER_X);
  });

  it('enable BOTTOM Player "play" <Pressable /> if it\'s the player turn and /selectedTileIndex !== null/', () => {
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(false);
  });

  it('push /selectedTileIndex/ on /history/ when press on BOTTOM Player "play" <Pressable />', () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText('play')[1]);
    expect(queryAllByTestId('tile__image--state')[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
  });

  it('enable TOP Player "play" <Pressable /> if it\'s the player turn and /selectedTileIndex !== null/', () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(false);
    resetMockRandom();
  });

  it('push /selectedTileIndex/ on /history/ when press on TOP Player "play" <Pressable />', () => {
    mockRandom(0.499);
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText('play')[0]);
    expect(queryAllByTestId('tile__image--state')[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
    resetMockRandom();
  });

  it('reset /history/ when press "new game"', () => {
    const {getAllByTestId, getAllByText, getByText, queryAllByTestId} = render(
      <Game />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1]);
    fireEvent.press(getAllByText('play')[0]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId('tile__image--state').length).toBe(0);
  });

  it('reset /selectedTileIndex/ when press "new game"', () => {
    const {getAllByTestId, getByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId('tile__image--temp').length).toBe(0);
  });

  it('reset /selectedTileIndex/ when press "play"', () => {
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByText('play')[0]);
    expect(queryAllByTestId('tile__image--state').length).toBe(1);
  });

  it('renders <WinnigFlag /> if game is won', () => {
    const {getAllByTestId, getAllByText, queryByTestId} = render(<Game />);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[3]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[27]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[4]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[36]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[5]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[45]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[12]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[28]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[13]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[37]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[14]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[47]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[21]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[29]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[22]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[38]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[23]);
    fireEvent.press(getAllByText('play')[1]);

    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).not.toBeNull();
  });
});

// enable play button if it's player turn and selectedTileIndex !== null

// Later => disabled surrendButton if winner !== Empty
//       => find a way to trigger setWinner while winner !== Empty
