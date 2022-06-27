import React from 'react';

import {DEFAULT_DARK_THEME, DEFAULT_DARK_THEME_ID} from './DefaultDark.theme';
import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from './DefaultLight.theme';

interface Props {
  initialTheme: Theming.Theme;
}
interface ProvidedValue {
  theme: Theming.Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ProvidedValue>({
  theme: DEFAULT_LIGHT_THEME,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<Props> = ({children, initialTheme}) => {
  const [theme, setTheme] = React.useState<Theming.Theme>(initialTheme);

  const toggleTheme = React.useCallback(() => {
    setTheme(currentTheme => {
      if (currentTheme.id === DEFAULT_LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME;
      }
      if (currentTheme.id === DEFAULT_DARK_THEME_ID) {
        return DEFAULT_LIGHT_THEME;
      }
      return currentTheme;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
