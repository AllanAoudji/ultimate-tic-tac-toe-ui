import {StackActions, useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {BackHandler} from 'react-native';
import {View} from 'react-native';

import Game from './Game';
import QuitGameModalWrapper from './QuitGameModalWrapper';

const GameScreen: React.FC<Screen.RootStack.GameNavigationProps> = ({
  route,
}) => {
  const [quitGameModalVisible, setQuitGameModalVisible] =
    React.useState<boolean>(false);

  const onPressQuit = React.useCallback(() => {
    StackActions.replace('Home');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (quitGameModalVisible) {
          setQuitGameModalVisible(false);
        } else {
          setQuitGameModalVisible(true);
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [quitGameModalVisible]),
  );

  return (
    <View testID="gameScreen__container">
      <Game mode={route.params.mode} onPressQuit={onPressQuit} />
      <QuitGameModalWrapper visible={quitGameModalVisible} />
    </View>
  );
};

export default GameScreen;
