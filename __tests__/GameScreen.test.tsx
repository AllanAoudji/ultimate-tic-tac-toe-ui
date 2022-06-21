import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {mockRandomForEach} from 'jest-mock-random';
import React from 'react';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import GameScreen from '../src/GameScreen';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      mode: ultimateTicTactToAlgorithm.Mode.Continue,
    },
  },
  ...props,
});

describe('<GameScreen />', () => {
  let props: any, renderer: RenderAPI;

  mockRandomForEach([0.5]);

  beforeEach(() => {
    props = createTestProps({});
    renderer = render(<GameScreen {...props} />);
    jest.spyOn(ultimateTicTactToAlgorithm, 'play');
  });

  afterEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockRestore();
  });

  it('renders a <View />', () => {
    const {queryByTestId} = renderer;
    expect(queryByTestId('gameScreen__container')).not.toBeNull();
  });

  it('renders a <Game />', () => {
    const {queryAllByTestId, queryByTestId} = renderer;
    expect(queryByTestId('board__container')).not.toBeNull();
    expect(queryAllByTestId('playerBoard__container')).toHaveLength(2);
  });

  it('calls navigation.navigate when "quit" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText} = renderer;
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('quit'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('Home');
  });

  it('passes /route.params.mode/ to <Game />', () => {
    const {getAllByTestId, getAllByText} = renderer;
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    fireEvent.press(getAllByText('play')[1]);
    expect(ultimateTicTactToAlgorithm.play).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        mode: ultimateTicTactToAlgorithm.Mode.Continue,
      }),
    );
  });
});
