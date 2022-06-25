import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import {getStyle} from './testUtils';

import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import SurrendModalWrapper from '../src/SurrendModalWrapper';

describe('<SurrendModalWrapper />', () => {
  const SURREND_TEXT = 'Surrend?';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockReset();
  });

  it('does not render <SurrendModal /> on mount', () => {
    const {queryByText} = render(<SurrendModalWrapper />);
    expect(queryByText(SURREND_TEXT)).toBeNull();
  });

  it('renders <SurrendModal /> if /visible === true/', () => {
    const {getByText} = render(<SurrendModalWrapper visible={true} />);
    expect(getByText(SURREND_TEXT)).not.toBeNull();
  });

  it('passes /onPressYes/ to <SurrendModal />', () => {
    const {getByText} = render(
      <SurrendModalWrapper onPressYes={onPress} visible={true} />,
    );
    fireEvent.press(getByText('yes'));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressNo/ to <SurrendModal />', () => {
    const {getByText} = render(
      <SurrendModalWrapper onPressNo={onPress} visible={true} />,
    );
    fireEvent.press(getByText('no'));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /player/ to <SurrendModal />', () => {
    const {getByText} = render(
      <SurrendModalWrapper player={TileState.Player2} visible={true} />,
    );
    expect(getStyle(getByText(SURREND_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it('passes /disabled/ to <SurrendModal />', () => {
    const {getByTestId} = render(
      <SurrendModalWrapper disabled={true} visible={true} />,
    );
    expect(
      getByTestId('surrendModal__button--no').props.accessibilityState.disabled,
    ).toBe(true);
    expect(
      getByTestId('surrendModal__button--yes').props.accessibilityState
        .disabled,
    ).toBe(true);
  });
});
