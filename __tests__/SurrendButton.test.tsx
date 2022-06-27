import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import SurrendButton from '../src/SurrendButton';

describe('<SurrendButton />', () => {
  const SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
    'surrendButton__container--pressable';

  it('renders a <Pressable />', () => {
    const {queryByTestId} = render(<SurrendButton />);
    expect(
      queryByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID),
    ).not.toBeNull();
  });

  it('contains <SurrendIcon />', () => {
    const {queryByTestId} = render(<SurrendButton />);
    expect(queryByTestId('surrendIcon__container--svg')).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<SurrendButton onPress={onPress} />);
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /player/ to <SurrendIcon />', () => {
    const {getByTestId} = render(<SurrendButton player={TileState.Player2} />);
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).findAllByProps({
        fill: DEFAULT_LIGHT_THEME.color.playerO,
      }).length,
    ).toBe(1);
  });

  it(`set /borderColors: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /player === Player2/`, () => {
    const {getByTestId} = render(<SurrendButton player={TileState.Player2} />);
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
  });

  it(`set /borderColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ if /player === Player1/`, () => {
    const {getByTestId} = render(<SurrendButton />);
    expect(
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
  });

  it('not calls /onPress/ if /disabled === true/', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <SurrendButton disabled={true} onPress={onPress} />,
    );
    fireEvent.press(getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID));
    expect(onPress).not.toHaveBeenCalled();
  });
});
