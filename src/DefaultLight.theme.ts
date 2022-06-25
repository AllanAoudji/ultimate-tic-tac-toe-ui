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

const DEFAULT_LIGHT_SHADOW_THEME: Theming.ShadowTheme = {
  base: {
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  double: {
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
};

const DEFAULT_LIGHT_SPACING_THEME: Theming.SpacingTheme = {
  base: 8,
  double: 16,
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME: Theming.Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  shadow: DEFAULT_LIGHT_SHADOW_THEME,
  spacing: DEFAULT_LIGHT_SPACING_THEME,
};
