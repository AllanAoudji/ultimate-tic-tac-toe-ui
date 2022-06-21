import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import Home from '../src/Home';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('<Home />', () => {
  let props: any, renderer: RenderAPI;
  beforeEach(() => {
    props = createTestProps({});
    renderer = render(<Home {...props} />);
  });

  it('renders a <View />', () => {
    const {queryByTestId} = renderer;
    expect(queryByTestId('home__container')).not.toBeNull();
  });

  it('renders a <PlayGameButton />', () => {
    const {queryByTestId} = renderer;
    expect(
      queryByTestId('playGameButton__container--pressable'),
    ).not.toBeNull();
  });

  it('renders <PlayGameButton /> with /title === "play normal game"/', () => {
    const {queryByText} = renderer;
    expect(queryByText('play normal game')).not.toBeNull();
  });

  it('calls /navigation.navigate/ on press <PlayGameButton />', () => {
    const {getByText} = renderer;
    fireEvent.press(getByText('play normal game'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('Game', {
      mode: Mode.Normal,
    });
  });

  it('renders a <Logo />', () => {
    const {queryByTestId} = renderer;
    expect(queryByTestId('logo__container--svg')).not.toBeNull();
  });
});
