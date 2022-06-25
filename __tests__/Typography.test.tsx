import {render} from '@testing-library/react-native';
import React from 'react';

import {getStyle} from './testUtils';

import {ThemeProvider} from '../src/Theme.context';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import Typography from '../src/Typography';

const renderer = (
  options: {
    children?: string;
    color?: 'onPlayerO' | 'onPlayerX' | 'onPrimary' | 'onSurface';
  } = {children: 'hello world'},
) => {
  const children = options.children || 'hello world';
  const renderTypography = render(
    <ThemeProvider initialTheme={DEFAULT_LIGHT_THEME}>
      <Typography color={options.color}>{children}</Typography>
    </ThemeProvider>,
  );

  const {getByText, queryByText} = renderTypography;

  const getText = () => getByText(children);
  const queryText = () => queryByText(children);

  return {
    container: {
      get: {
        text: getText,
      },
      query: {
        text: queryText,
      },
    },
    render: renderTypography,
  };
};

describe('<Typography />', () => {
  it('renders <Text /> with children', () => {
    const {container} = renderer();
    expect(container.query.text()).not.toBeNull();
  });

  it('renders <Text /> with another children', () => {
    const {container} = renderer({children: 'another hello world'});
    expect(container.query.text()).not.toBeNull();
  });

  it('sets /color: theme.color.onSurface/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.text())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  });

  it('sets another /color/', () => {
    const {container} = renderer({color: 'onPlayerO'});
    expect(getStyle(container.get.text())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onPlayerO,
      }),
    );
  });
});
