import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState, WiningLine} from 'ultimate-tic-tac-toe-algorithm';

import WinningModal from '../src/WinningModal';

describe('<WinningModal />', () => {
  const DRAW_COLOR = '#333333',
    DRAW_TEXT = "it's a draw",
    NEW_GAME_TEXT = 'new game',
    PLAYER_1_COLOR = '#0012ff',
    PLAYER_2_COLOR = '#ed1327',
    PLAYER_O_TEXT = 'player o',
    PLAYER_X_TEXT = 'player x',
    QUIT_TEXT = 'quit',
    WINNING_MODAL_CONTAINER_TEST_ID = 'winningModal__container',
    WINNING_MODAL_CONTAINER_INNER_TEST_ID = 'winningModal__container--inner',
    WINNING_MODAL_SEPARATOR = 'winningModal__separator';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a <View />', () => {
    const {queryByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
  });

  it('renders a "new game" <Pressable />', () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByText(NEW_GAME_TEXT)).not.toBeNull();
  });

  it('calls /onPressNewGame/ when "new game" is pressed', () => {
    const {getByText} = render(
      <WinningModal onPressNewGame={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders a "quit" <Pressable />', () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByText(QUIT_TEXT)).not.toBeNull();
  });

  it('calls /onPressQuit/ when "quit" is pressed', () => {
    const {getByText} = render(
      <WinningModal onPressQuit={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText(QUIT_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('displays the winner player', () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByText(PLAYER_X_TEXT)).not.toBeNull();
  });

  it('displays the other player', () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player2} />);
    expect(queryByText(PLAYER_O_TEXT)).not.toBeNull();
  });

  it('display a winner phrase', () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByText('won the game')).not.toBeNull();
  });

  it(`set /color: ${PLAYER_1_COLOR}/ on winner <Text /> if /winner === Player1/`, () => {
    const {getByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(getByText(PLAYER_X_TEXT).props.style.color).toBe(PLAYER_1_COLOR);
  });

  it(`sets /color: ${PLAYER_2_COLOR}/ on winner <Text /> if /winner === Player1/`, () => {
    const {getByText} = render(<WinningModal winner={TileState.Player2} />);
    expect(getByText(PLAYER_O_TEXT).props.style.color).toBe(PLAYER_2_COLOR);
  });

  it(`sets /borderColor: ${PLAYER_1_COLOR}/ on "container--inner" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`sets /borderColor: ${PLAYER_2_COLOR}/ on "container--inner" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it(`sets /shadowColor: ${PLAYER_1_COLOR}/ on "container--inner" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`sets /shadowColor: ${PLAYER_2_COLOR}/ on "container--inner" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it(`sets /backgroundColor: ${PLAYER_1_COLOR}/ on "separator" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR).props.style.backgroundColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`sets /backgroundColor: ${PLAYER_2_COLOR}/ on "separator" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR).props.style.backgroundColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it('displays a draw', () => {
    const {queryByText} = render(<WinningModal winner={WiningLine.Draw} />);
    expect(queryByText(DRAW_TEXT)).not.toBeNull();
  });

  it(`sets /borderColor: ${DRAW_COLOR}/ on innerContainer if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WiningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DRAW_COLOR);
  });

  it(`sets /shadowColor: ${DRAW_COLOR}/ on innerContainer if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WiningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DRAW_COLOR);
  });

  it(`sets /backgroundColor: ${DRAW_COLOR}/ on separator if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WiningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR).props.style.backgroundColor,
    ).toBe(DRAW_COLOR);
  });

  it(`sets /color: ${DRAW_COLOR}/ on winner <Text /> if it's a draw`, () => {
    const {getByText} = render(<WinningModal winner={WiningLine.Draw} />);
    expect(getByText(DRAW_TEXT).props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: DRAW_COLOR,
        }),
      ]),
    );
  });
});
