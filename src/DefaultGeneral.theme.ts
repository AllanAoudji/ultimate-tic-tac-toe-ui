const DEFAULT_FONT_SIZE: Theming.FontSizeTheme = {
  large: 24,
  larger: 28,
  largest: 20,
  normal: 16,
  small: 8,
  smaller: 4,
  smallest: 12,
};

const DEFAULT_SHADOW_THEME: Theming.ShadowTheme = {
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

const DEFAULT_SPACING_THEME: Theming.SpacingTheme = {
  large: 32,
  larger: 64,
  largest: 16,
  normal: 8,
  small: 2,
  smaller: 1,
  smallest: 4,
};

export {DEFAULT_FONT_SIZE, DEFAULT_SHADOW_THEME, DEFAULT_SPACING_THEME};
