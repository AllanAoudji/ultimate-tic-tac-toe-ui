import React from 'react';
import {View} from 'react-native';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import Logo from './Logo';
import PlayGameButton from './PlayGameButton';

const HomeScreen: React.FC<Screen.RootStack.HomeNavigationProps> = ({
  navigation,
}) => {
  const handlePress = React.useCallback(
    () => navigation.navigate('Game', {mode: Mode.Normal}),
    [navigation],
  );

  return (
    <View testID="homeScreen__container">
      <Logo />
      <PlayGameButton onPress={handlePress} title="play normal game" />
    </View>
  );
};

export default HomeScreen;
