import {
  DEFAULT_SHADOW_THEME,
  DEFAULT_SPACING_THEME,
} from './DefaultGeneral.theme';

const DEFAULT_LIGHT_COLOR_THEME: Theming.ColorTheme = {
  background: '#dedede',
  black: '#000',
  onPlayerO: '#fff',
  onPlayerX: '#fff',
  onPrimary: '#fff',
  onSurface: '#000',
  playerO: '#f41f03',
  playerX: '#f41f03',
  primary: '#03a9f4',
  surface: '#fff',
  white: '#fff',
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME: Theming.Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  shadow: DEFAULT_SHADOW_THEME,
  spacing: DEFAULT_SPACING_THEME,
};
