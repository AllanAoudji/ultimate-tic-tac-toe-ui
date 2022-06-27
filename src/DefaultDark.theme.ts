import {
  DEFAULT_SHADOW_THEME,
  DEFAULT_SPACING_THEME,
} from './DefaultGeneral.theme';

const DEFAULT_DARK_COLOR_THEME: Theming.ColorTheme = {
  background: '#3f3f3f',
  black: '#000',
  blackTransparent: 'rgba(0,0,0,0.6)',
  onPlayerO: '#fff',
  onPlayerX: '#fff',
  onPrimary: '#fff',
  onSurface: '#fff',
  playerO: '#f41f03',
  playerX: '#f41f03',
  primary: '#03a9f4',
  surface: '#545454',
  white: '#fff',
  whiteTransparent: 'rgba(255,255,255,0.6)',
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME: Theming.Theme = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  shadow: DEFAULT_SHADOW_THEME,
  spacing: DEFAULT_SPACING_THEME,
};
