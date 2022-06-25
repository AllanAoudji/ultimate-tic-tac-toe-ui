import React from 'react';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';
import Container from './Container';

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
    <Container testID="homeScreen__container">
      <Logo />
      <PlayGameButton
        onPress={handlePress(Mode.Normal)}
        title="play normal game"
      />
      <PlayGameButton
        onPress={handlePress(Mode.Continue)}
        title="play continue game"
      />
    </Container>
  );
};

export default HomeScreen;
