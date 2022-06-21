import {StackActions} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Game from './Game';

const GameScreen: React.FC<Screen.RootStack.GameNavigationProps> = ({
  route,
}) => {
  const onPressQuit = React.useCallback(() => {
    StackActions.replace('Home');
  }, []);

  return (
    <View testID="gameScreen__container">
      <Game mode={route.params.mode} onPressQuit={onPressQuit} />
    </View>
  );
};

export default GameScreen;
