import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinnerFlag from '../src/WinnerFlag';

describe('<WinnerFlag />', () => {
  const NEW_GAME_TEXT = 'new game',
    PLAYER_1_COLOR = '#0012ff',
    PLAYER_2_COLOR = '#ed1327',
    PLAYER_O_TEXT = 'player o',
    PLAYER_X_TEXT = 'player x',
    QUIT_TEXT = 'quit',
    WINNER_FLAG_CONTAINER_TEST_ID = 'winnerFlag__container',
    WINNER_FLAG_CONTAINER_INNER_TEST_ID = 'winnerFlag__container--inner',
    WINNER_FLAG_SEPARATOR = 'winnerFlag__separator';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a <View />', () => {
    const {queryByTestId} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(queryByTestId(WINNER_FLAG_CONTAINER_TEST_ID)).not.toBeNull();
  });

  it('renders a "new game" <Pressable />', () => {
    const {queryByText} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(queryByText(NEW_GAME_TEXT)).not.toBeNull();
  });

  it('calls /onPressNewGame/ when "new game" is pressed', () => {
    const {getByText} = render(
      <WinnerFlag onPressNewGame={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders a "quit" <Pressable />', () => {
    const {queryByText} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(queryByText(QUIT_TEXT)).not.toBeNull();
  });

  it('calls /onPressQuit/ when "quit" is pressed', () => {
    const {getByText} = render(
      <WinnerFlag onPressQuit={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText(QUIT_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('displays the winner player', () => {
    const {queryByText} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(queryByText(PLAYER_X_TEXT)).not.toBeNull();
  });

  it('displays the other player', () => {
    const {queryByText} = render(<WinnerFlag winner={TileState.Player2} />);
    expect(queryByText(PLAYER_O_TEXT)).not.toBeNull();
  });

  it('display a winner phrase', () => {
    const {queryByText} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(queryByText('won the game')).not.toBeNull();
  });

  it(`set /color: ${PLAYER_1_COLOR}/ on winner <Text /> if /winner === Player1/`, () => {
    const {getByText} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(getByText(PLAYER_X_TEXT).props.style.color).toBe(PLAYER_1_COLOR);
  });

  it(`set /color: ${PLAYER_2_COLOR}/ on winner <Text /> if /winner === Player1/`, () => {
    const {getByText} = render(<WinnerFlag winner={TileState.Player2} />);
    expect(getByText(PLAYER_O_TEXT).props.style.color).toBe(PLAYER_2_COLOR);
  });

  it(`set /borderColor: ${PLAYER_1_COLOR}/ on "container--inner" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(
      getByTestId(WINNER_FLAG_CONTAINER_INNER_TEST_ID).props.style.borderColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`set /borderColor: ${PLAYER_2_COLOR}/ on "container--inner" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinnerFlag winner={TileState.Player2} />);
    expect(
      getByTestId(WINNER_FLAG_CONTAINER_INNER_TEST_ID).props.style.borderColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it(`set /shadowColor: ${PLAYER_1_COLOR}/ on "container--inner" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(
      getByTestId(WINNER_FLAG_CONTAINER_INNER_TEST_ID).props.style.shadowColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`set /shadowColor: ${PLAYER_2_COLOR}/ on "container--inner" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinnerFlag winner={TileState.Player2} />);
    expect(
      getByTestId(WINNER_FLAG_CONTAINER_INNER_TEST_ID).props.style.shadowColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it(`set /backgroundColor: ${PLAYER_1_COLOR}/ on "separator" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinnerFlag winner={TileState.Player1} />);
    expect(getByTestId(WINNER_FLAG_SEPARATOR).props.style.backgroundColor).toBe(
      PLAYER_1_COLOR,
    );
  });

  it(`set /backgroundColor: ${PLAYER_2_COLOR}/ on "separator" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinnerFlag winner={TileState.Player2} />);
    expect(getByTestId(WINNER_FLAG_SEPARATOR).props.style.backgroundColor).toBe(
      PLAYER_2_COLOR,
    );
  });
});
