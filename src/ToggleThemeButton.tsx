import React from 'react';
import {DEFAULT_DARK_THEME_ID} from './DefaultDark.theme';
import {ThemeContext} from './Theme.context';
import ToggleButton from './ToggleButton';

const ToggleThemeButton: React.FC = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);

  const state = React.useMemo(() => {
    return theme.id === DEFAULT_DARK_THEME_ID ? true : false;
  }, [theme]);

  return (
    <ToggleButton label="dark theme" onPress={toggleTheme} state={state} />
  );
};

export default ToggleThemeButton;
