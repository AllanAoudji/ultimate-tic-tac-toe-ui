import {render} from '@testing-library/react-native';
import React from 'react';

import Logo from '../src/Logo';

describe('<Logo />', () => {
  it('render a <Svg />', () => {
    const {queryByTestId} = render(<Logo />);
    expect(queryByTestId('logo__container--svg')).not.toBeNull();
  });

  it('sets initial /width === 100/', () => {
    const {getByTestId} = render(<Logo />);
    expect(getByTestId('logo__container--svg').props.width).toBe(100);
  });

  it('sets initial /height/ relative to /width/ ((width * viewBox.width) / viewBox.height)', () => {
    const {getByTestId} = render(<Logo />);
    expect(getByTestId('logo__container--svg').props.height).toBe(20);
  });

  it('sets /width === props.width/', () => {
    const width = 400;
    const {getByTestId} = render(<Logo width={width} />);
    expect(getByTestId('logo__container--svg').props.width).toBe(width);
  });

  it('sets /height/ relative to /props.width/', () => {
    const width = 400,
      height = (width * 100) / 500;
    const {getByTestId} = render(<Logo width={width} />);
    expect(getByTestId('logo__container--svg').props.height).toBe(height);
  });
});
