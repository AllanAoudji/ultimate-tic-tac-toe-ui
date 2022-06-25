import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import WinningModal from '../src/WinningModal';
import {getStyle} from './testUtils';

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
    WINNING_MODAL_SEPARATOR_TEST_ID = 'winningModal__separator';
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

  it(`renders a "${NEW_GAME_TEXT}" <Pressable />`, () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByText(NEW_GAME_TEXT)).not.toBeNull();
  });

  it(`calls /onPressNewGame/ when "${NEW_GAME_TEXT}" is pressed`, () => {
    const {getByText} = render(
      <WinningModal onPressNewGame={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it(`renders a "${QUIT_TEXT}" <Pressable />`, () => {
    const {queryByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(queryByText(QUIT_TEXT)).not.toBeNull();
  });

  it(`calls /onPressQuit/ when "${QUIT_TEXT}" is pressed`, () => {
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

  it(`disabled "${QUIT_TEXT}" <Pressable /> if /disabled === true/`, () => {
    const {getByText} = render(
      <WinningModal
        disabled={true}
        onPressQuit={onPress}
        winner={TileState.Player1}
      />,
    );
    fireEvent.press(getByText(QUIT_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it(`disabled "${NEW_GAME_TEXT}" <Pressable /> if /disabled === true/`, () => {
    const {getByText} = render(
      <WinningModal
        disabled={true}
        onPressNewGame={onPress}
        winner={TileState.Player1}
      />,
    );
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.playerX}/ on winner <Text /> if /winner === Player1/`, () => {
    const {getByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(getStyle(getByText(PLAYER_X_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color}/ on winner <Text /> if /winner === Player2/`, () => {
    const {getByText} = render(<WinningModal winner={TileState.Player1} />);
    expect(getStyle(getByText(PLAYER_X_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`sets /borderColor: ${PLAYER_1_COLOR}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`sets /borderColor: ${PLAYER_2_COLOR}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it(`sets /shadowColor: ${PLAYER_1_COLOR}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`sets /shadowColor: ${PLAYER_2_COLOR}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it(`sets /backgroundColor: ${PLAYER_1_COLOR}/ on "${WINNING_MODAL_SEPARATOR_TEST_ID}" <View /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR_TEST_ID).props.style.backgroundColor,
    ).toBe(PLAYER_1_COLOR);
  });

  it(`sets /backgroundColor: ${PLAYER_2_COLOR}/ on "${WINNING_MODAL_SEPARATOR_TEST_ID}" <View /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR_TEST_ID).props.style.backgroundColor,
    ).toBe(PLAYER_2_COLOR);
  });

  it('displays a draw', () => {
    const {queryByText} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(queryByText(DRAW_TEXT)).not.toBeNull();
  });

  it(`sets /borderColor: ${DRAW_COLOR}/ on innerContainer if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DRAW_COLOR);
  });

  it(`sets /shadowColor: ${DRAW_COLOR}/ on innerContainer if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DRAW_COLOR);
  });

  it(`sets /backgroundColor: ${DRAW_COLOR}/ on "${WINNING_MODAL_SEPARATOR_TEST_ID}" if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR_TEST_ID).props.style.backgroundColor,
    ).toBe(DRAW_COLOR);
  });

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color.onSurface}/ on winner <Text /> if it's a draw`, () => {
    const {getByText} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(getStyle(getByText(DRAW_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  });
});
