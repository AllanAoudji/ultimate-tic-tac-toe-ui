const DEFAULT_DARK_COLOR_THEME: Theming.ColorTheme = {
  background: '#3f3f3f',
  onPlayerO: '#fff',
  onPlayerX: '#fff',
  onPrimary: '#fff',
  onSurface: '#fff',
  playerO: '#f41f03',
  playerX: '#f41f03',
  primary: '#03a9f4',
  surface: '#545454',
};

const DEFAULT_DARK_SHADOW_THEME: Theming.ShadowTheme = {
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

const DEFAULT_DARK_SPACING_THEME: Theming.SpacingTheme = {
  large: 32,
  larger: 64,
  largest: 16,
  normal: 8,
  small: 2,
  smaller: 1,
  smallest: 4,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME: Theming.Theme = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  shadow: DEFAULT_DARK_SHADOW_THEME,
  spacing: DEFAULT_DARK_SPACING_THEME,
};
