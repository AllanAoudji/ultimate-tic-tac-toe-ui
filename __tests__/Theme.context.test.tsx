import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {DEFAULT_DARK_THEME} from '../src/DefaultDark.theme';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import {ThemeProvider, ThemeContext} from '../src/Theme.context';
import {getStyle} from './testUtils';

const renderer = (
  initialTheme:
    | typeof DEFAULT_LIGHT_THEME
    | typeof DEFAULT_DARK_THEME = DEFAULT_LIGHT_THEME,
) => {
  const Component = () => {
    const {theme, toggleTheme} = React.useContext(ThemeContext);
    const style = React.useMemo(() => styleComponent(theme), [theme]);
    return (
      <View style={style.viewStyle} testID="view">
        <Text style={style.textStyle}>text</Text>
        <Pressable onPress={toggleTheme}>
          <Text>toggle</Text>
        </Pressable>
      </View>
    );
  };

  const styleComponent = (theme: Theming.Theme) =>
    StyleSheet.create<{textStyle: TextStyle; viewStyle: ViewStyle}>({
      textStyle: {
        color: theme.color.onSurface,
      },
      viewStyle: {
        backgroundColor: theme.color.background,
        borderColor: theme.color.surface,
        padding: theme.spacing.base,
      },
    });

  const renderTheme = render(
    <ThemeProvider initialTheme={initialTheme}>
      <Component />
    </ThemeProvider>,
  );

  const {getByTestId, getByText} = renderTheme;

  const getToggle = () => getByText('toggle');
  const getText = () => getByText('text');
  const getView = () => getByTestId('view');

  return {
    container: {
      get: {
        toggle: getToggle,
        text: getText,
        view: getView,
      },
      press: {
        toggle: () => {
          fireEvent.press(getToggle());
        },
      },
    },
    render: renderTheme,
  };
};

describe('<Theme />', () => {
  const expectDarkTheme = (container: {[key: string]: any}) => {
    expect(getStyle(container.get.view())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_DARK_THEME.color.background,
        borderColor: DEFAULT_DARK_THEME.color.surface,
        padding: DEFAULT_DARK_THEME.spacing.base,
      }),
    );
    expect(getStyle(container.get.text())).toEqual(
      expect.objectContaining({
        color: DEFAULT_DARK_THEME.color.onSurface,
      }),
    );
  };
  const expectLightTheme = (container: {[key: string]: any}) => {
    expect(getStyle(container.get.view())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.background,
        borderColor: DEFAULT_LIGHT_THEME.color.surface,
        padding: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
    expect(getStyle(container.get.text())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  };

  describe('renders children with', () => {
    it('lightTheme', () => {
      const {container} = renderer();
      expectLightTheme(container);
    });

    it('darkTheme', () => {
      const {container} = renderer(DEFAULT_DARK_THEME);
      expectDarkTheme(container);
    });
  });

  describe('toggle between', () => {
    it('light and dark theme', () => {
      const {container} = renderer();
      container.press.toggle();
      expectDarkTheme(container);
    });

    it('dark and light theme', () => {
      const {container} = renderer(DEFAULT_DARK_THEME);
      container.press.toggle();
      expectLightTheme(container);
    });
  });
});
