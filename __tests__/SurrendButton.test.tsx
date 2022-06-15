import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

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
        fill: '#ed1327',
      }).length,
    ).toBe(1);
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
