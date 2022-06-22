import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinningModalWrapper from '../src/WinningModalWrapper';

describe('<WinningModalWrapper />', () => {
  const PLAYER_X_TEXT = 'player x',
    NEW_GAME_TEXT = 'new game',
    QUIT_TEXT = 'quit',
    WINNING_MODAL_CONTAINER_TEST_ID = 'winningModal__container';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('do not renders <WinningModal /> if /winner === Empty/', () => {
    const {queryByTestId} = render(
      <WinningModalWrapper winner={TileState.Empty} />,
    );
    expect(queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID)).toBeNull();
  });

  it('renders <WinningModal /> if /winner === Player/', () => {
    const {queryByText} = render(
      <WinningModalWrapper winner={TileState.Player1} />,
    );
    expect(queryByText(PLAYER_X_TEXT)).not.toBeNull();
  });

  it('passes /onPressNewGame/ to <WinningModal />', () => {
    const {getByText} = render(
      <WinningModalWrapper
        onPressNewGame={onPress}
        winner={TileState.Player1}
      />,
    );
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressQuit/ to <WinningModal />', () => {
    const {getByText} = render(
      <WinningModalWrapper onPressQuit={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText(QUIT_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /disabled/ to <WinningModal />', () => {
    const {getByText} = render(
      <WinningModalWrapper
        disabled={true}
        onPressNewGame={onPress}
        onPressQuit={onPress}
        winner={TileState.Player1}
      />,
    );
    fireEvent.press(getByText(QUIT_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });
});
