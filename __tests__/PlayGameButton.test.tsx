import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import PlayGameButton from '../src/PlayGameButton';

describe('<PlayGameButton />', () => {
  const PLAY_GAME_BUTTON_CONTAINER_PRESSABLE =
      'playGameButton__container--pressable',
    TITLE_TEXT = 'title';

  it('renders a <Pressable />', () => {
    const {queryByTestId} = render(<PlayGameButton title={TITLE_TEXT} />);
    expect(queryByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE)).not.toBeNull();
  });

  it('renders /title/', () => {
    const {queryByText} = render(<PlayGameButton title={TITLE_TEXT} />);
    expect(queryByText(TITLE_TEXT)).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <PlayGameButton onPress={onPress} title={TITLE_TEXT} />,
    );
    fireEvent.press(getByText(TITLE_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call /onPress/ if /disabled === true/', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <PlayGameButton disabled={true} onPress={onPress} title={TITLE_TEXT} />,
    );
    fireEvent.press(getByText(TITLE_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('set /opacity: 0.5/ if /disabled === true/', () => {
    const {getByTestId} = render(
      <PlayGameButton disabled={true} title={TITLE_TEXT} />,
    );
    expect(
      getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE).props.style.opacity,
    ).toBe(0.5);
  });

  it('set /opacity: 1/ if /disabled === false/', () => {
    const {getByTestId} = render(<PlayGameButton title={TITLE_TEXT} />);
    expect(
      getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE).props.style.opacity,
    ).toBe(1);
  });
});
