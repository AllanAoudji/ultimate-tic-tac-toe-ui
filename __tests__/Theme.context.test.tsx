import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {act} from 'react-test-renderer';

import {getStyle} from './testUtils';

import {
  DEFAULT_DARK_THEME,
  DEFAULT_DARK_THEME_ID,
} from '../src/DefaultDark.theme';
import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from '../src/DefaultLight.theme';
import {ThemeProvider, ThemeContext} from '../src/Theme.context';

const renderer = (
  initialTheme:
    | typeof DEFAULT_LIGHT_THEME
    | typeof DEFAULT_DARK_THEME = DEFAULT_LIGHT_THEME,
) => {
  const Component = () => {
    const {localThemeIsSet, theme, toggleTheme} =
      React.useContext(ThemeContext);
    const style = React.useMemo(() => styleComponent(theme), [theme]);
    return (
      <View style={style.viewStyle} testID="view">
        <Text style={style.textStyle}>text</Text>
        <Pressable disabled={!localThemeIsSet} onPress={toggleTheme}>
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
        padding: theme.spacing.normal,
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
        padding: DEFAULT_DARK_THEME.spacing.normal,
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
        padding: DEFAULT_LIGHT_THEME.spacing.normal,
      }),
    );
    expect(getStyle(container.get.text())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  };

  it('do not calls AsyncStoraga.setItem on mount', () => {
    renderer();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('calls AsyncStorage.setItem when toggleTheme is pressed with new theme.id', async () => {
    const {container} = renderer();
    await act(async () => {
      container.press.toggle();
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'THEME_ID',
      DEFAULT_DARK_THEME_ID,
    );
    await act(async () => {
      container.press.toggle();
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'THEME_ID',
      DEFAULT_LIGHT_THEME_ID,
    );
  });

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
    it('light and dark theme', async () => {
      const {container} = renderer();
      await act(async () => {
        container.press.toggle();
      });
      expectDarkTheme(container);
    });

    it('dark and light theme', async () => {
      const {container} = renderer(DEFAULT_DARK_THEME);
      await act(async () => {
        container.press.toggle();
      });
      expectLightTheme(container);
    });
  });
});
