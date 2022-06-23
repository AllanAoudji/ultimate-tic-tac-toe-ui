import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace Screen {
    namespace RootStack {
      type ParamList = {
        Game: {mode: Mode};
        Home: undefined;
      };
      type GameNavigationProps = NativeStackScreenProps<ParamList, 'Game'>;
      type HomeNavigationProps = NativeStackScreenProps<ParamList, 'Home'>;
    }
  }
  namespace Theming {
    interface ColorTheme {
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
    interface SpacingTheme {
      base: number;
      double: number;
    }
    interface Theme {
      id: string;
      color: ColorTheme;
      spacing: SpacingTheme;
    }
  }
}
