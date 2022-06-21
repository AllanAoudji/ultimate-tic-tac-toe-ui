import React from 'react';
import {View} from 'react-native';
import Game from './Game';

const GameScreen: React.FC<Screen.RootStack.GameNavigationProps> = ({
  navigation,
  route,
}) => {
  const onPressQuit = React.useCallback(
    () => navigation.navigate('Home'),
    [navigation],
  );
  return (
    <View testID="gameScreen__container">
      <Game mode={route.params.mode} onPressQuit={onPressQuit} />
    </View>
  );
};

export default GameScreen;
