import React from 'react';
import {Pressable, Text} from 'react-native';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import Logo from './Logo';
import PlayGameButton from './PlayGameButton';
import ToggleThemeButton from './ToggleThemeButton';

const HomeScreen: React.FC<Screen.RootStack.HomeNavigationProps> = ({
  navigation,
}) => {
  const handlePressGame = React.useCallback(
    (mode: Mode) => () => navigation.navigate('Game', {mode}),
    [navigation],
  );
  const handlePressGamesHistory = React.useCallback(() => {
    navigation.navigate('GamesHistory');
  }, [navigation]);

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
            onPress={handlePressGame(Mode.Normal)}
            title="play normal game"
          />
          <PlayGameButton
            backgroundColor="playerO"
            color="onPlayerO"
            onPress={handlePressGame(Mode.Continue)}
            title="play continue game"
          />
          <Pressable
            onPress={handlePressGamesHistory}
            testID="homeScreen__pressable--history">
            <Text>games history</Text>
          </Pressable>
        </Container>
      </Container>
    </Container>
  );
};

export default HomeScreen;
