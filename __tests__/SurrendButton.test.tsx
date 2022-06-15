import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import SurrendButton from '../src/SurrendButton';

describe('<SurrendButton />', () => {
  it('renders a <Pressable />', () => {
    const {queryByTestId} = render(<SurrendButton />);
    expect(queryByTestId('surrendButton__container--pressable')).not.toBeNull();
  });

  it('contains <SurrendIcon />', () => {
    const {queryByTestId} = render(<SurrendButton />);
    expect(queryByTestId('surrendIcon__container--svg')).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<SurrendButton onPress={onPress} />);
    fireEvent.press(getByTestId('surrendButton__container--pressable'));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /player/ to <SurrendIcon />', () => {
    const {getByTestId} = render(<SurrendButton player={TileState.Player2} />);
    expect(
      getByTestId('surrendButton__container--pressable').findAllByProps({
        fill: '#ed1327',
      }).length,
    ).toBe(1);
  });
});
