import {render} from '@testing-library/react-native';
import React from 'react';
import {generateAssets, TileState} from 'ultimate-tic-tac-toe-algorithm';
import Board from '../src/Board';

describe('<Board />', () => {
  let board: TileState[];

  beforeEach(() => {
    ({board} = generateAssets());
  });

  it('renders a <View />', () => {
    const {queryByTestId} = render(<Board board={board} />);
    expect(queryByTestId('board__container')).toBeTruthy();
  });

  it('renders nine <Section />', () => {
    const {getAllByTestId} = render(<Board board={board} />);
    expect(getAllByTestId('section__container')).toHaveLength(9);
  });
});
