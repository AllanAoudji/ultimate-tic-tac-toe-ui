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
}
