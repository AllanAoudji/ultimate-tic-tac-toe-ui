import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinningModalWrapper from '../src/WinningModalWrapper';

describe('<WinningModalWrapper />', () => {
  it('do not renders <WinningModal /> if /winner === Empty/', () => {
    const {queryByTestId} = render(
      <WinningModalWrapper winner={TileState.Empty} />,
    );
    expect(queryByTestId('winningModal__container')).toBeNull();
  });

  it('renders <WinningModal /> if /winner === Player/', () => {
    const {queryByText} = render(
      <WinningModalWrapper winner={TileState.Player1} />,
    );
    expect(queryByText('player x')).not.toBeNull();
  });

  it('passes /onPressNewGame/ to <WinningModal />', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <WinningModalWrapper
        onPressNewGame={onPress}
        winner={TileState.Player1}
      />,
    );
    fireEvent.press(getByText('new game'));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressQuit/ to <WinningModal />', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <WinningModalWrapper onPressQuit={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText('quit'));
    expect(onPress).toHaveBeenCalled();
  });
});
