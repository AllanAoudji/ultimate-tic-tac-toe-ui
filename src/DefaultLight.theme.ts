const DEFAULT_LIGHT_COLOR_THEME: Theming.ColorTheme = {
  background: '#dedede',
  onPlayerO: '#fff',
  onPlayerX: '#fff',
  onPrimary: '#fff',
  onSurface: '#000',
  playerO: '#f41f03',
  playerX: '#f41f03',
  primary: '#03a9f4',
  surface: '#fff',
};

const DEFAULT_LIGHT_SPACING_THEME: Theming.SpacingTheme = {
  base: 8,
  double: 16,
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME: Theming.Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  spacing: DEFAULT_LIGHT_SPACING_THEME,
};
