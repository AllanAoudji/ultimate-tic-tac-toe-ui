import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StatusBar} from 'react-native';

import {DEFAULT_DARK_THEME, DEFAULT_DARK_THEME_ID} from './DefaultDark.theme';
import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from './DefaultLight.theme';

interface Props {
  initialTheme: Theming.Theme;
}
interface ProvidedValue {
  localThemeIsSet: boolean;
  theme: Theming.Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ProvidedValue>({
  localThemeIsSet: true,
  theme: DEFAULT_LIGHT_THEME,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<Props> = ({children, initialTheme}) => {
  const [localThemeIsSet, setLocalThemeIsSet] = React.useState<boolean>(true);
  const [theme, setTheme] = React.useState<Theming.Theme>(initialTheme);

  let [isMount, setIsMount] = React.useState<boolean>(true);

  const toggleTheme = React.useCallback(() => {
    setIsMount(false);
    setTheme(currentTheme => {
      if (currentTheme.id === DEFAULT_LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME;
      }
      return DEFAULT_LIGHT_THEME;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      localThemeIsSet,
      theme,
      toggleTheme,
    }),
    [localThemeIsSet, theme, toggleTheme],
  );

  React.useEffect(() => {
    const setLocalTheme = async () => {
      setLocalThemeIsSet(false);
      try {
        if (theme.id === DEFAULT_LIGHT_THEME_ID) {
          await AsyncStorage.setItem('THEME_ID', DEFAULT_LIGHT_THEME_ID);
        } else {
          await AsyncStorage.setItem('THEME_ID', DEFAULT_DARK_THEME_ID);
        }
      } finally {
        setLocalThemeIsSet(true);
      }
    };
    if (!isMount) {
      setLocalTheme();
    }
  }, [isMount, theme]);

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        backgroundColor={theme.color.background}
        barStyle="dark-content"
      />
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
