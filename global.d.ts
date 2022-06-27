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
      black: string;
      blackTransparent: string;
      grey: string;
      greyTransparent: string;
      onPlayerO: string;
      onPlayerX: string;
      onPrimary: string;
      onSurface: string;
      playerO: string;
      playerX: string;
      primary: string;
      surface: string;
      white: string;
      whiteTransparent: string;
    }
    interface FontSizeTheme {
      large: number;
      larger: number;
      largest: number;
      normal: number;
      small: number;
      smaller: number;
      smallest: number;
    }
    interface Shadow {
      elevation: number;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
    }
    interface ShadowTheme {
      base: Shadow;
      double: Shadow;
    }
    interface SpacingTheme {
      large: number;
      larger: number;
      largest: number;
      normal: number;
      small: number;
      smaller: number;
      smallest: number;
    }
    interface Theme {
      id: string;
      color: ColorTheme;
      fontSize: FontSizeTheme;
      shadow: ShadowTheme;
      spacing: SpacingTheme;
    }
  }
}
