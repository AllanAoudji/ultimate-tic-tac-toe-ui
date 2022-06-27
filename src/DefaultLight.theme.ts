import {
  DEFAULT_FONT_SIZE,
  DEFAULT_SHADOW_THEME,
  DEFAULT_SPACING_THEME,
} from './DefaultGeneral.theme';

const DEFAULT_LIGHT_COLOR_THEME: Theming.ColorTheme = {
  background: '#dedede',
  black: '#000',
  blackTransparent: 'rgba(0,0,0,0.6)',
  grey: 'rgb(163, 163, 163)',
  greyTransparent: 'rgba(163, 163, 163,0.6)',
  onPlayerO: '#fff',
  onPlayerX: '#fff',
  onPrimary: '#fff',
  onSurface: '#000',
  playerO: '#f41f03',
  playerX: '#3689ff',
  primary: '#03a9f4',
  surface: '#fff',
  white: '#fff',
  whiteTransparent: 'rgba(255,255,255,0.6)',
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME: Theming.Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  fontSize: DEFAULT_FONT_SIZE,
  shadow: DEFAULT_SHADOW_THEME,
  spacing: DEFAULT_SPACING_THEME,
};
