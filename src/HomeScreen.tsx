import React from 'react';
import {View} from 'react-native';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import Logo from './Logo';
import PlayGameButton from './PlayGameButton';

const HomeScreen: React.FC<Screen.RootStack.HomeNavigationProps> = ({
  navigation,
}) => {
  const handlePress = React.useCallback(
    (mode: Mode) => () => navigation.navigate('Game', {mode}),
    [navigation],
  );

  return (
    <View testID="homeScreen__container">
      <Logo />
      <PlayGameButton
        onPress={handlePress(Mode.Normal)}
        title="play normal game"
      />
      <PlayGameButton
        onPress={handlePress(Mode.Continue)}
        title="play continue game"
      />
    </View>
  );
};

export default HomeScreen;
