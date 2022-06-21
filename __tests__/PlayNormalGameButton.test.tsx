import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import PlayNormalGameButton from '../src/PlayNormalGameButton';

describe('<PlayNormalGameButton />', () => {
  const title = 'title';

  it('renders a <Pressable />', () => {
    const {queryByTestId} = render(<PlayNormalGameButton title={title} />);
    expect(
      queryByTestId('playNormalGameButton__container--pressable'),
    ).not.toBeNull();
  });

  it('renders /title/', () => {
    const {queryByText} = render(<PlayNormalGameButton title={title} />);
    expect(queryByText(title)).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <PlayNormalGameButton onPress={onPress} title={title} />,
    );
    fireEvent.press(getByText(title));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call /onPress/ if /disabled === true/', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <PlayNormalGameButton disabled={true} onPress={onPress} title={title} />,
    );
    fireEvent.press(getByText(title));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('set /opacity: 0.5/ if /disabled === true/', () => {
    const {getByTestId} = render(
      <PlayNormalGameButton disabled={true} title={title} />,
    );
    expect(
      getByTestId('playNormalGameButton__container--pressable').props.style
        .opacity,
    ).toBe(0.5);
  });

  it('set /opacity: 1/ if /disabled === false/', () => {
    const {getByTestId} = render(<PlayNormalGameButton title={title} />);
    expect(
      getByTestId('playNormalGameButton__container--pressable').props.style
        .opacity,
    ).toBe(1);
  });
});
