import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinningModalWrapper from '../src/WinningModalWrapper';
import {getStyle} from './testUtils';

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
  const CONTAINER_ANIMATED_TEST_ID = 'winningModalWrapper__container--animated';

  const {getByTestId, getByText, queryByTestId, queryByText} =
    renderWinningModalWrapper;

  const getContainer = () => getByTestId(WINNING_MODAL_CONTAINER_TEST_ID);
  const getContainerAnimated = () => getByTestId(CONTAINER_ANIMATED_TEST_ID);
  const getNewGameButton = () => getByText(NEW_GAME_TEXT);
  const getQuitButton = () => getByText(QUIT_TEXT);

  const queryContainer = () => queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID);
  const queryContainerAnimated = () =>
    queryByTestId(CONTAINER_ANIMATED_TEST_ID);
  const queryNewGameButton = () => queryByText(NEW_GAME_TEXT);
  const queryQuitButton = () => queryByText(QUIT_TEXT);

  return {
    container: {
      get: {
        container: getContainer,
        containerAnimated: getContainerAnimated,
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
        containerAnimated: queryContainerAnimated,
        newGameButton: queryNewGameButton,
        quitButton: queryQuitButton,
      },
    },
    renderWinningModalWrapper,
  };
};

describe('<WinningModalWrapper />', () => {
  it('does not renders <WinningModal /> if /winner === Empty/', () => {
    const {container} = renderer();
    expect(container.query.container()).toBeNull();
  });

  it('does not render <WinningModal /> if /visible === false/', () => {
    const {container} = renderer({winner: TileState.Player1});
    expect(container.query.container()).toBeNull();
  });

  it('renders <WinningModal /> if /winner === Player/ and /visible === true/', () => {
    const {container} = renderer({visible: true, winner: TileState.Player1});
    expect(container.get.container()).not.toBeNull();
  });

  it('renders <Animated.View /> if /winner === Player/ and /visible === true/', () => {
    const {container} = renderer({visible: true, winner: TileState.Player1});
    expect(container.get.containerAnimated()).not.toBeNull();
  });

  it('does not render <Animated.View /> if /visible === false/', () => {
    const {container} = renderer({winner: TileState.Player1});
    expect(container.query.containerAnimated()).toBeNull();
  });

  it('does not render <Animated.View /> if /winner === Empty/', () => {
    const {container} = renderer({visible: true});
    expect(container.query.containerAnimated()).toBeNull();
  });

  it('<Animated.View /> should have /position: absolute/', () => {
    const {container} = renderer({visible: true, winner: TileState.Player1});
    expect(getStyle(container.get.containerAnimated())).toEqual(
      expect.objectContaining({
        position: 'absolute',
      }),
    );
  });

  it('<Animated.View /> should have /opacity: 0, scale: 1.04/ on mount', () => {
    const {container} = renderer({visible: true, winner: TileState.Player1});
    expect(getStyle(container.get.containerAnimated())).toEqual(
      expect.objectContaining({
        opacity: 0,
        transform: expect.arrayContaining([
          expect.objectContaining({
            scale: 1.04,
          }),
        ]),
      }),
    );
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
