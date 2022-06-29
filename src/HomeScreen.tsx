import React from 'react';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import Logo from './Logo';
import PlayGameButton from './PlayGameButton';
import ToggleThemeButton from './ToggleThemeButton';

const HomeScreen: React.FC<Screen.RootStack.HomeNavigationProps> = ({
  navigation,
}) => {
  const handlePress = React.useCallback(
    (mode: Mode) => () => navigation.navigate('Game', {mode}),
    [navigation],
  );

  return (
    <Container
      alignItems="flex-end"
      flex={1}
      backgroundColor="background"
      padding="largest"
      testID="homeScreen__container">
      <ToggleThemeButton />
      <Container
        alignItems="center"
        flex={1}
        justifyContent="center"
        width="100%">
        <Logo width={180} />
        <Container paddingHorizontal="larger" marginTop="larger" width="100%">
          <PlayGameButton
            backgroundColor="playerX"
            color="onPlayerX"
            marginBottom="largest"
            onPress={handlePress(Mode.Normal)}
            title="play normal game"
          />
          <PlayGameButton
            backgroundColor="playerO"
            color="onPlayerO"
            onPress={handlePress(Mode.Continue)}
            title="play continue game"
          />
        </Container>
      </Container>
    </Container>
  );
};

export default HomeScreen;
