import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import PlayGameButton from '../src/PlayGameButton';
import {getStyle} from './testUtils';

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
    expect(getStyle(getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE))).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });

  it('sets /opacity: 1/ if /disabled === false/', () => {
    const {getByTestId} = render(<PlayGameButton title={TITLE_TEXT} />);
    expect(
      getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE).props.style.opacity,
    ).toBe(1);
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.onPrimary}/ if /backgroundColor === onPrimary/`, () => {
    const {getByTestId} = render(
      <PlayGameButton backgroundColor="onPrimary" title={TITLE_TEXT} />,
    );
    expect(getStyle(getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE))).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.onPrimary,
      }),
    );
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.background}/ if /backgroundColor === background/`, () => {
    const {getByTestId} = render(
      <PlayGameButton backgroundColor="background" title={TITLE_TEXT} />,
    );
    expect(getStyle(getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE))).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.background,
      }),
    );
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ if /backgroundColor === undefined/`, () => {
    const {getByTestId} = render(<PlayGameButton title={TITLE_TEXT} />);
    expect(getStyle(getByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE))).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color.onSurface}/ if /color === undefined/`, () => {
    const {getByText} = render(<PlayGameButton title={TITLE_TEXT} />);
    expect(getStyle(getByText(TITLE_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  });
});
