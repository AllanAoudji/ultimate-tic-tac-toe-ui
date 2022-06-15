import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import SurrendModal from '../src/SurrendModal';

describe('<SurrendModal />', () => {
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('render a <View />', () => {
    const {queryByText} = render(<SurrendModal />);
    expect(queryByText('Surrend?')).not.toBeNull();
  });

  it('renders a "yes" <Pressable />', () => {
    const {queryByText} = render(<SurrendModal />);
    expect(queryByText('yes')).not.toBeNull();
  });

  it('calls /onPressYes/ when "yes" <Pressable /> is pressed', () => {
    const {getByText} = render(<SurrendModal onPressYes={onPress} />);
    fireEvent.press(getByText('yes'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders a "no" <Pressable />', () => {
    const {queryByText} = render(<SurrendModal />);
    expect(queryByText('no')).not.toBeNull();
  });

  it('calls /onPressNo/ when "no" <Pressable /> is pressed', () => {
    const {getByText} = render(<SurrendModal onPressNo={onPress} />);
    fireEvent.press(getByText('no'));
    expect(onPress).toHaveBeenCalled();
  });
});
