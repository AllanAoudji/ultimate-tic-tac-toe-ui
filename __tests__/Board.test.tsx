import {render} from '@testing-library/react-native';
import React from 'react';
import Board from '../src/Board';

describe('<Board />', () => {
  it('renders a <View />', () => {
    const {queryByTestId} = render(<Board />);
    expect(queryByTestId('board__container')).toBeTruthy();
  });
});
