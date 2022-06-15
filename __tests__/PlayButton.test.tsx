import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import PlayButton from '../src/PlayButton';

describe('<PlayButton />', () => {
  const PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'playButton__container--pressable',
    PLAY_TEXT = 'play';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a button', () => {
    const {queryByText} = render(<PlayButton />);
    expect(queryByText(PLAY_TEXT)).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const {getByText} = render(<PlayButton onPress={onPress} />);
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('not calls /onPress/ if /disabled === true/', () => {
    const {getByText} = render(
      <PlayButton disabled={true} onPress={onPress} />,
    );
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders a blue background', () => {
    const {getByTestId} = render(<PlayButton />);
    expect(
      getByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props.style
        .backgroundColor,
    ).toBe('#0012ff');
  });

  it('renders a red background if /player === Player2', () => {
    const {getByTestId} = render(<PlayButton player={TileState.Player2} />);
    expect(
      getByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props.style
        .backgroundColor,
    ).toBe('#ed1327');
  });
});
