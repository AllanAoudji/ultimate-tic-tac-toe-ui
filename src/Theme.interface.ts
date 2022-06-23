export interface ColorTheme {
  background: string;
  onPlayerO: string;
  onPlayerX: string;
  onPrimary: string;
  onSurface: string;
  playerO: string;
  playerX: string;
  primary: string;
  surface: string;
}

export interface SpacingTheme {
  base: number;
  double: number;
}

export interface Theme {
  id: string;
  color: ColorTheme;
  spacing: SpacingTheme;
}
