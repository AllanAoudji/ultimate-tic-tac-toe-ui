import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

import {DEFAULT_DARK_THEME, DEFAULT_DARK_THEME_ID} from './DefaultDark.theme';
import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from './DefaultLight.theme';

import {ThemeProvider} from '../src/Theme.context';

const Loader: React.FC = ({children}) => {
  const [assetsLoading, setAssetLoading] = React.useState<boolean>(true);
  const [initialTheme, setInitialTheme] = React.useState<Theming.Theme | null>(
    null,
  );

  // Load THEME_ID from local storage
  React.useEffect(() => {
    const loadStoreThemeId = async () => {
      try {
        const localTheme = await AsyncStorage.getItem('THEME_ID');
        if (
          !localTheme ||
          (localTheme !== DEFAULT_DARK_THEME_ID &&
            localTheme !== DEFAULT_LIGHT_THEME_ID)
        ) {
          await AsyncStorage.setItem('THEME_ID', DEFAULT_LIGHT_THEME_ID);
          setInitialTheme(DEFAULT_LIGHT_THEME);
        } else if (localTheme === DEFAULT_LIGHT_THEME_ID) {
          setInitialTheme(DEFAULT_LIGHT_THEME);
        } else {
          setInitialTheme(DEFAULT_DARK_THEME);
        }
      } catch {
        setInitialTheme(DEFAULT_LIGHT_THEME);
      }
    };
    loadStoreThemeId();
  }, []);

  // When all assets are loaded, hide Splash Screen
  React.useEffect(() => {
    if (initialTheme !== null) {
      setAssetLoading(false);
      SplashScreen.hide();
    }
  }, [initialTheme]);

  if (assetsLoading) {
    return null;
  }

  return (
    <ThemeProvider initialTheme={initialTheme || DEFAULT_LIGHT_THEME}>
      {children}
    </ThemeProvider>
  );
};

export default Loader;
