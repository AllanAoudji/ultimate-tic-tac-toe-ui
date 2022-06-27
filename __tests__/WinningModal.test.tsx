import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import WinningModal from '../src/WinningModal';
import {getStyle} from './testUtils';

describe('<WinningModal />', () => {
  const DRAW_TEXT = "it's a draw",
    NEW_GAME_TEXT = 'new game',
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

  it('renders a <Container />', () => {
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

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color.playerO}/ on winner <Text /> if /winner === Player2/`, () => {
    const {getByText} = render(<WinningModal winner={TileState.Player2} />);
    expect(getStyle(getByText(PLAYER_O_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`sets /borderColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <Container /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
  });

  it(`sets /borderColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <Container /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
  });

  it(`sets /shadowColor: playerX/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <Container /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
  });

  it(`sets /shadowColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ on "${WINNING_MODAL_CONTAINER_INNER_TEST_ID}" <Container /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ on "${WINNING_MODAL_SEPARATOR_TEST_ID}" <Container /> if /winner === Player1/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player1} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR_TEST_ID).props.style.backgroundColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ on "${WINNING_MODAL_SEPARATOR_TEST_ID}" <Container /> if /winner === Player2/`, () => {
    const {getByTestId} = render(<WinningModal winner={TileState.Player2} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR_TEST_ID).props.style.backgroundColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
  });

  it('displays a draw', () => {
    const {queryByText} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(queryByText(DRAW_TEXT)).not.toBeNull();
  });

  it(`sets /borderColor: ${DEFAULT_LIGHT_THEME.color.onSurface}/ on innerContainer if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.onSurface);
  });

  it(`sets /shadowColor: ${DEFAULT_LIGHT_THEME.color.onSurface}/ on innerContainer if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.onSurface);
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.onSurface}/ on "${WINNING_MODAL_SEPARATOR_TEST_ID}" if it's a draw`, () => {
    const {getByTestId} = render(<WinningModal winner={WinningLine.Draw} />);
    expect(
      getByTestId(WINNING_MODAL_SEPARATOR_TEST_ID).props.style.backgroundColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.onSurface);
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
