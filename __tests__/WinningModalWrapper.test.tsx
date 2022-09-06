import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinningModalWrapper from '../src/WinningModalWrapper';

const renderer = (
  options: {
    disabled?: boolean;
    onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
    onPressNewGame?:
      | ((event: GestureResponderEvent) => void)
      | null
      | undefined;
    visible?: boolean;
    winner?: TileState;
  } = {},
) => {
  const renderWinningModalWrapper = render(
    <WinningModalWrapper
      disabled={options.disabled}
      onPressQuit={options.onPressQuit}
      onPressNewGame={options.onPressNewGame}
      visible={options.visible}
      winner={options.winner}
    />,
  );

  const QUIT_TEXT = 'quit';
  const NEW_GAME_TEXT = 'new game';
  const WINNING_MODAL_CONTAINER_TEST_ID = 'winningModal__container';

  const {getByTestId, getByText, queryByTestId, queryByText} =
    renderWinningModalWrapper;

  const getContainer = () => getByTestId(WINNING_MODAL_CONTAINER_TEST_ID);
  const getNewGameButton = () => getByText(NEW_GAME_TEXT);
  const getQuitButton = () => getByText(QUIT_TEXT);

  const queryContainer = () => queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID);
  const queryNewGameButton = () => queryByText(NEW_GAME_TEXT);
  const queryQuitButton = () => queryByText(QUIT_TEXT);

  return {
    container: {
      get: {
        container: getContainer,
        newGameButton: getNewGameButton,
        quitButton: getQuitButton,
      },
      press: {
        newGameButton: () => {
          fireEvent.press(getNewGameButton());
        },
        quitButton: () => {
          fireEvent.press(getQuitButton());
        },
      },
      query: {
        container: queryContainer,
        newGameButton: queryNewGameButton,
        quitButton: queryQuitButton,
      },
    },
    renderWinningModalWrapper,
  };
};

describe('<WinningModalWrapper />', () => {
  it('do not renders <WinningModal /> if /winner === Empty/', () => {
    const {container} = renderer();
    expect(container.query.container()).toBeNull();
  });

  it('do not renders <WinningModal /> if /visible === false/', () => {
    const {container} = renderer({winner: TileState.Player1});
    expect(container.query.container()).toBeNull();
  });

  it('renders <WinningModal /> if /winner === Player/ and /visible === true/', () => {
    const {container} = renderer({visible: true, winner: TileState.Player1});
    expect(container.get.container()).not.toBeNull();
  });

  it('passes /onPressNewGame/ to <WinningModal />', () => {
    const onPress = jest.fn();
    const {container} = renderer({
      onPressNewGame: onPress,
      visible: true,
      winner: TileState.Player1,
    });
    container.press.newGameButton();
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressQuit/ to <WinningModal />', () => {
    const onPress = jest.fn();
    const {container} = renderer({
      onPressQuit: onPress,
      visible: true,
      winner: TileState.Player1,
    });
    container.press.quitButton();
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /disabled/ to <WinningModal />', () => {
    const onPress = jest.fn();
    const {container} = renderer({
      disabled: true,
      onPressNewGame: onPress,
      onPressQuit: onPress,
      visible: true,
      winner: TileState.Player1,
    });
    container.press.newGameButton();
    container.press.quitButton();
    expect(onPress).not.toHaveBeenCalled();
  });
});
