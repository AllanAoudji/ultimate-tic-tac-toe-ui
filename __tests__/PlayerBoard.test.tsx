import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import PlayerBoard from '../src/PlayerBoard';
import {getStyle} from './testUtils';

describe('<PlayerBoard />', () => {
  const NO_TEXT = 'no',
    PLAY_BUTTON_CONTAINER_PRESSABLE = 'playButton__container--pressable',
    PLAY_TEXT = 'play',
    PLAYER_BOARD_CONTAINER_TEST_ID = 'playerBoard__container',
    PLAYER_BOARD_CONTAINER_OPACITY_TEST_ID = 'playerBoard__container--opacity',
    SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'surrendButton__container--pressable',
    SURRENDER_MODAL_BUTTON_NO_TEST_ID = 'surrendModal__button--no',
    SURRENDER_MODAL_BUTTON_YES_TEST_ID = 'surrendModal__button--yes',
    SURREND_TEXT = 'Surrend?',
    YES_TEXT = 'yes';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a <View />', () => {
    const {queryByTestId} = render(<PlayerBoard />);
    expect(queryByTestId(PLAYER_BOARD_CONTAINER_TEST_ID)).not.toBeNull();
  });

  it('renders a <PlayButton />', () => {
    const {queryByText} = render(<PlayerBoard />);
    expect(queryByText(PLAY_TEXT)).not.toBeNull();
  });

  it('renders a <SurrendButton />', () => {
    const {queryByTestId} = render(<PlayerBoard />);
    expect(
      queryByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID),
    ).not.toBeNull();
  });

  it('passes /onPressPlay/ to <PlayButton />', () => {
    const {getByText} = render(<PlayerBoard onPressPlay={onPress} />);
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /player/ to <PlayButton />', () => {
    const {getByTestId} = render(<PlayerBoard player={TileState.Player2} />);
    expect(
      getByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE).props.style.backgroundColor,
    ).toBe('#ed1327');
  });

  it('passes /player/ to <SurrendButton />', () => {
    const {getByTestId} = render(<PlayerBoard player={TileState.Player2} />);
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).findAllByProps({
        fill: '#ed1327',
      }).length,
    ).toBe(1);
  });

  it('renders <SurrendModal /> if /visibleModal === true/', () => {
    const {queryByText} = render(<PlayerBoard visibleModal={true} />);
    expect(queryByText(SURREND_TEXT)).not.toBeNull();
  });

  it('calls /setVisibleModal/ with /false/ when "yes" <Button /> is pressed', () => {
    const {getByText} = render(
      <PlayerBoard setVisibleModal={onPress} visibleModal={true} />,
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).toHaveBeenCalledWith(false);
  });

  it('calls /setVisibleModal/ with /false/ when "no" <Button /> is pressed', () => {
    const {getByText} = render(
      <PlayerBoard setVisibleModal={onPress} visibleModal={true} />,
    );
    fireEvent.press(getByText(NO_TEXT));
    expect(onPress).toHaveBeenCalledWith(false);
  });

  it('calls /onSurrend/ when "yes" <Button /> is Pressed', () => {
    const {getByText} = render(
      <PlayerBoard onSurrend={onPress} visibleModal={true} />,
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('disables <PlayButton /> if /disabledPlayButton === true/', () => {
    const {getByText} = render(
      <PlayerBoard disabledPlayButton={true} onPressPlay={onPress} />,
    );
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('disables <PlayButton /> if <SurrendModal /> is visible', () => {
    const {getByText} = render(
      <PlayerBoard onPressPlay={onPress} visibleModal={true} />,
    );
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('disables <SurrendButton /> if <SurrendModal /> is visible', () => {
    const {getByTestId} = render(
      <PlayerBoard onPressPlay={onPress} visibleModal={true} />,
    );
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('disabled <Pressable /> from <SurrendModal /> if /disabledSurrendModal === true/', () => {
    const {getByTestId} = render(
      <PlayerBoard disabledSurrendModal={true} visibleModal={true} />,
    );
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    expect(
      getByTestId(SURRENDER_MODAL_BUTTON_NO_TEST_ID).props.accessibilityState
        .disabled,
    ).toBe(true);
    expect(
      getByTestId(SURRENDER_MODAL_BUTTON_YES_TEST_ID).props.accessibilityState
        .disabled,
    ).toBe(true);
  });

  it('set /opacity: 0.4/ if /disabledPlayButton === true/', () => {
    const {getByTestId} = render(<PlayerBoard disabledPlayButton={true} />);
    expect(
      getByTestId(PLAYER_BOARD_CONTAINER_OPACITY_TEST_ID).props.style.opacity,
    ).toBe(0.4);
  });

  it('set /opacity: 1/ if /disabled === false/', () => {
    const {getByTestId} = render(<PlayerBoard />);
    expect(
      getByTestId(PLAYER_BOARD_CONTAINER_OPACITY_TEST_ID).props.style.opacity,
    ).toBe(1);
  });

  it('set /rotate: 180deg/ if /position === TOP/', () => {
    const {getByTestId} = render(<PlayerBoard position="TOP" />);
    expect(
      getByTestId(PLAYER_BOARD_CONTAINER_TEST_ID).props.style.transform,
    ).toEqual([{rotate: '180deg'}]);
  });

  it('set /rotate: 0def/ if /position === BOTTOM/', () => {
    const {getByTestId} = render(<PlayerBoard />);
    expect(
      getByTestId(PLAYER_BOARD_CONTAINER_TEST_ID).props.style.transform,
    ).toEqual([{rotate: '0deg'}]);
  });

  it('passes /player/ on <SurrendModalWrapper />', () => {
    const {getByText} = render(
      <PlayerBoard player={TileState.Player2} visibleModal={true} />,
    );
    expect(getStyle(getByText(SURREND_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it('disables <SurrendButton /> if /disabledSurrendButton === true/', () => {
    const {getByTestId} = render(<PlayerBoard disabledSurrendButton={true} />);
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props
        .accessibilityState.disabled,
    ).toBe(true);
  });
});
