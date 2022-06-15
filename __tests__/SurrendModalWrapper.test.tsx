import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

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
});
