import {fireEvent, render} from '@testing-library/react-native';
import {mockRandomForEach, mockRandom, resetMockRandom} from 'jest-mock-random';
import React from 'react';

import Game from '../src/Game';
import {imageSource} from './testUtils';

describe('<Game />', () => {
  // BOTTOM <PlayerBoard is always player1
  mockRandomForEach([0.5]);

  it('renders two <PlayerBoard />', () => {
    const {queryAllByTestId} = render(<Game />);
    expect(queryAllByTestId('playerBoard__container').length).toBe(2);
  });

  it('first <PlayerBoard /> is /TOP/', () => {
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId('playerBoard__container')[0].props.style.transform,
    ).toEqual([{rotate: '180deg'}]);
  });

  it('choses player randomly', () => {
    mockRandom(0.5);
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId('playButton__container--pressable')[0].props.style
        .backgroundColor,
    ).toBe('#ed1327');
    resetMockRandom();
  });

  it('renders the other player 50/50', () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId('playButton__container--pressable')[0].props.style
        .backgroundColor,
    ).toBe('#0012ff');
    expect(
      getAllByTestId('playButton__container--pressable')[1].props.style
        .backgroundColor,
    ).toBe('#ed1327');
    resetMockRandom();
  });

  it('disabled play <Button /> on mount', () => {
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId('playButton__container--pressable')[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId('playButton__container--pressable')[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('opens Player TOP <SurrendModal /> when <SurrendButton /> is clicked', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    expect(queryByTestId('surrendModal__container')).not.toBeNull();
    expect(
      getByTestId('surrendModal__container--inner').props.style.borderColor,
    ).toBe('#ed1327');
  });

  it('opens Player BOTTOM <SurrendModal /> when <SurrendButton /> is clicked', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[1]);
    expect(queryByTestId('surrendModal__container')).not.toBeNull();
    expect(
      getByTestId('surrendModal__container--inner').props.style.borderColor,
    ).toBe('#0012ff');
  });

  it('renders <WinnerFlag /> with /winner === Player1/ if Player2 surrend', () => {
    const {getAllByTestId, getByText, queryByTestId, queryByText} = render(
      <Game />,
    );
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    fireEvent.press(getByText('yes'));
    expect(queryByTestId('winnerFlag__container')).not.toBeNull();
    expect(queryByText('player x')).not.toBeNull();
  });

  it('renders <WinnerFlag /> with /winner === Player2/ if Player1 surrend', () => {
    const {getAllByTestId, getByText, queryByTestId, queryByText} = render(
      <Game />,
    );
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[1]);
    fireEvent.press(getByText('yes'));
    expect(queryByTestId('winnerFlag__container')).not.toBeNull();
    expect(queryByText('player o')).not.toBeNull();
  });

  it('set /winner === Empty/ when <WinnerFlag /> "new game" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText, queryByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[1]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('new game'));
    expect(queryByTestId('winnerFlag__container')).toBeNull();
  });

  it('randomize /players/ when <WinnerFlag /> "new game" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText} = render(<Game />);
    mockRandom(0.499);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[1]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('new game'));
    expect(
      getAllByTestId('playButton__container--pressable')[0].props.style
        .backgroundColor,
    ).toBe('#0012ff');
    resetMockRandom();
  });

  it('disabled <SurrendButton /> if /winner !== Empty/', () => {
    const {getAllByTestId, getByText} = render(<Game />);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[1]);
    fireEvent.press(getByText('yes'));
    expect(
      getAllByTestId('surrendButton__container--pressable')[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId('surrendButton__container--pressable')[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('close <SurrendModal /> when a player surrend', async () => {
    let {queryAllByTestId, getAllByTestId, getAllByText} = render(<Game />);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[1]);
    fireEvent.press(getAllByText('yes')[0]);
    expect(queryAllByTestId('surrendModal__container').length).toBe(0);
  });

  it('renders a <Board />', () => {
    const {queryByTestId} = render(<Game />);
    expect(queryByTestId('board__container')).not.toBeNull();
  });

  it('if /history.length === 0/ <Board /> displays a Player1 temp <Image />', () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getByTestId, queryAllByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(queryAllByTestId('tile__container--pressable')[0]);
    expect(queryByTestId('tile__image--temp')).not.toBeNull();
    expect(getByTestId('tile__image--temp').props.source).toBe(IMAGE_PLAYER_X);
  });

  it('enable BOTTOM Player "play" <Pressable /> if it\'s the player turn and /selectedTileIndex !== null/', () => {
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    expect(
      getAllByTestId('playButton__container--pressable')[1].props
        .accessibilityState.disabled,
    ).toBe(false);
  });

  it('push /selectedTileIndex/ on /history/ when press on BOTTOM Player "play" <Pressable />', () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    fireEvent.press(getAllByText('play')[1]);
    expect(queryAllByTestId('tile__image--state')[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
  });

  it('enable TOP Player "play" <Pressable /> if it\'s the player turn and /selectedTileIndex !== null/', () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    expect(
      getAllByTestId('playButton__container--pressable')[0].props
        .accessibilityState.disabled,
    ).toBe(false);
    resetMockRandom();
  });

  it('push /selectedTileIndex/ on /history/ when press on TOP Player "play" <Pressable />', () => {
    mockRandom(0.499);
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
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
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[1]);
    fireEvent.press(getAllByText('play')[0]);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('new game'));
    expect(queryAllByTestId('tile__image--state').length).toBe(0);
  });

  it('reset /selectedTileIndex/ when press "new game"', () => {
    const {getAllByTestId, getByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('new game'));
    expect(queryAllByTestId('tile__image--temp').length).toBe(0);
  });

  it('reset /selectedTileIndex/ when press "play"', () => {
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByText('play')[0]);
    expect(queryAllByTestId('tile__image--state').length).toBe(1);
  });

  it('renders <WinnigFlag /> if game is won', () => {
    const {getAllByTestId, getAllByText, queryByTestId} = render(<Game />);

    fireEvent.press(getAllByTestId('tile__container--pressable')[3]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[27]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[4]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[36]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[5]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[45]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[12]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[28]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[13]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[37]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[14]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[47]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[21]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[29]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[22]);
    fireEvent.press(getAllByText('play')[1]);
    fireEvent.press(getAllByTestId('tile__container--pressable')[38]);
    fireEvent.press(getAllByText('play')[0]);

    fireEvent.press(getAllByTestId('tile__container--pressable')[23]);
    fireEvent.press(getAllByText('play')[1]);

    expect(queryByTestId('winnerFlag__container')).not.toBeNull();
  });
});

// enable play button if it's player turn and selectedTileIndex !== null

// Later => disabled surrendButton if winner !== Empty
//       => find a way to trigger setWinner while winner !== Empty
