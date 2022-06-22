import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {BackHandler} from 'react-native';
import {View} from 'react-native';

import Game from './Game';
import QuitGameModalWrapper from './QuitGameModalWrapper';

const GameScreen: React.FC<Screen.RootStack.GameNavigationProps> = ({
  route,
  navigation,
}) => {
  const [gameIsDone, setGameIsDone] = React.useState<boolean>(false);
  const [quitGameModalVisible, setQuitGameModalVisible] =
    React.useState<boolean>(false);

  const onPressNo = React.useCallback(() => {
    setQuitGameModalVisible(false);
  }, []);
  const onQuit = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

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
      <QuitGameModalWrapper
        onPressNo={onPressNo}
        onPressYes={onQuit}
        visible={quitGameModalVisible}
      />
      <Game
        disabled={quitGameModalVisible}
        setGameIsDone={setGameIsDone}
        mode={route.params.mode}
        onPressQuit={onQuit}
      />
    </View>
  );
};

export default GameScreen;
