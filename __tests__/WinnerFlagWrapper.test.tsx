import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinnerFlagWrapper from '../src/WinnerFlagWrapper';

describe('<WinnerFlagWrapper />', () => {
  it('do not renders <WinnerFlag /> if /winner === Empty/', () => {
    const {queryByTestId} = render(
      <WinnerFlagWrapper winner={TileState.Empty} />,
    );
    expect(queryByTestId('winnerFlag__container')).toBeNull();
  });

  it('renders <WinnerFlag /> if /winner === Player/', () => {
    const {queryByText} = render(
      <WinnerFlagWrapper winner={TileState.Player1} />,
    );
    expect(queryByText('player x')).not.toBeNull();
  });

  it('passes /onPressNewGame/ to <WinnerFlag />', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <WinnerFlagWrapper onPressNewGame={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText('new game'));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressQuit/ to <WinnerFlag />', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <WinnerFlagWrapper onPressQuit={onPress} winner={TileState.Player1} />,
    );
    fireEvent.press(getByText('quit'));
    expect(onPress).toHaveBeenCalled();
  });
});
