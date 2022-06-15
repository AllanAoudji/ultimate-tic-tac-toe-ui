import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import PlayerBoard from '../src/PlayerBoard';

describe('<PlayerBoard />', () => {
  const NO_TEXT = 'no',
    PLAY_BUTTON_CONTAINER_PRESSABLE = 'playButton__container--pressable',
    PLAY_TEXT = 'play',
    PLAYER_BOARD_CONTAINER_TEST_ID = 'playerBoard__container',
    PLAYER_BOARD_CONTAINER_OPACITY_TEST_ID = 'playerBoard__container--opacity',
    SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'surrendButton__container--pressable',
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

  it('renders <SurrendModal /> when <SurrendButton /> is pressed', () => {
    const {getByTestId, queryByText} = render(<PlayerBoard />);
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    expect(queryByText(SURREND_TEXT)).not.toBeNull();
  });

  it('hides <SurrendModal /> when "yes" <Button /> is pressed', () => {
    const {getByTestId, getByText, queryByText} = render(<PlayerBoard />);
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    fireEvent.press(getByText(YES_TEXT));
    expect(queryByText(SURREND_TEXT)).toBeNull();
  });

  it('hides <SurrendModal /> when "no" <Button /> is pressed', () => {
    const {getByTestId, getByText, queryByText} = render(<PlayerBoard />);
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    fireEvent.press(getByText(NO_TEXT));
    expect(queryByText(SURREND_TEXT)).toBeNull();
  });

  it('calls /onSurrend/ when "yes" <Button /> is Pressed', () => {
    const {getByTestId, getByText} = render(
      <PlayerBoard onSurrend={onPress} />,
    );
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('disables <PlayButton /> if /disabled === true/', () => {
    const {getByText} = render(
      <PlayerBoard disabled={true} onPressPlay={onPress} />,
    );
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('disables <PlayButton /> if <SurrendModal /> is visible', () => {
    const {getByTestId, getByText} = render(
      <PlayerBoard onPressPlay={onPress} />,
    );
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    fireEvent.press(getByText(PLAY_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('disables <SurrendButton /> if <SurrendModal /> is visible', () => {
    const {getByTestId} = render(<PlayerBoard onPressPlay={onPress} />);
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('set /opacity: 0.5/ if /disabled === true/', () => {
    const {getByTestId} = render(<PlayerBoard disabled={true} />);
    expect(
      getByTestId(PLAYER_BOARD_CONTAINER_OPACITY_TEST_ID).props.style.opacity,
    ).toBe(0.5);
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
});
