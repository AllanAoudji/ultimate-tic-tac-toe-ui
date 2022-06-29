import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {DEFAULT_DARK_THEME} from '../src/DefaultDark.theme';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import {ThemeProvider} from '../src/Theme.context';
import ToggleThemeButton from '../src/ToggleThemeButton';
import {getStyle} from './testUtils';

describe('<ToggleThemeButton />', () => {
  const renderer = (options: {initialTheme?: Theming.Theme} = {}) => {
    const initialTheme = options.initialTheme || DEFAULT_LIGHT_THEME;
    const Component = () => (
      <ThemeProvider initialTheme={initialTheme}>
        <ToggleThemeButton />
      </ThemeProvider>
    );

    const renderToggleThemeButton = render(<Component />);

    const {getByTestId, getByText, queryByTestId, queryByText} =
      renderToggleThemeButton;

    const getLabel = () => getByText('dark theme');
    const getThumb = () => getByTestId('toggleButton__thumb');
    const getToggleButton = () => getByTestId('toggleButton__container');

    const queryLabel = () => queryByText('dark theme');
    const queryThumb = () => queryByTestId('toggleButton__thumb');
    const queryToggleButton = () => queryByTestId('toggleButton__container');

    return {
      container: {
        get: {
          label: getLabel,
          thumb: getThumb,
          toggleButton: getToggleButton,
        },
        press: {
          toggleButton: () => {
            fireEvent.press(getToggleButton());
          },
        },
        query: {
          label: queryLabel,
          thumb: queryThumb,
          toggleButton: queryToggleButton,
        },
      },
      render: renderToggleThemeButton,
    };
  };

  it('renders a <ToggleButton />', () => {
    const {container} = renderer();
    expect(container.query.toggleButton()).not.toBeNull();
  });

  it('renders a label with "dark theme"', () => {
    const {container} = renderer();
    expect(container.query.label()).not.toBeNull();
  });

  it('/state === true/ if /theme === DEFAULT_DARK_THEME/', () => {
    const {container} = renderer({initialTheme: DEFAULT_DARK_THEME});
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        left: 100,
      }),
    );
  });

  it('/state === false/ if /theme === DEFAULT_LIGHT_THEME/', () => {
    const {container} = renderer();
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        left: 0,
      }),
    );
  });

  it('toggles theme when <ToggleButton /> is pressed', () => {
    const {container} = renderer();
    container.press.toggleButton();
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        left: 100,
      }),
    );
  });
});
