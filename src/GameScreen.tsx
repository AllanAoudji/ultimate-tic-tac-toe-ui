import {StackActions, useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {BackHandler} from 'react-native';
import {View} from 'react-native';

import Game from './Game';
import QuitGameModalWrapper from './QuitGameModalWrapper';

const GameScreen: React.FC<Screen.RootStack.GameNavigationProps> = ({
  route,
}) => {
  const [gameIsDone, setGameIsDone] = React.useState<boolean>(false);
  const [quitGameModalVisible, setQuitGameModalVisible] =
    React.useState<boolean>(false);

  const onPressQuit = React.useCallback(() => {
    StackActions.replace('Home');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!gameIsDone) {
          if (quitGameModalVisible) {
            setQuitGameModalVisible(false);
          } else {
            setQuitGameModalVisible(true);
          }
          return true;
        }
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [gameIsDone, quitGameModalVisible]),
  );

  return (
    <View testID="gameScreen__container">
      <Game
        setGameIsDone={setGameIsDone}
        mode={route.params.mode}
        onPressQuit={onPressQuit}
      />
      <QuitGameModalWrapper visible={quitGameModalVisible} />
    </View>
  );
};

export default GameScreen;
