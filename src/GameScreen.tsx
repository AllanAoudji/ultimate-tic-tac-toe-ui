import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';
import Game from './Game';

type RootStackParamList = {
  Game: {mode: Mode};
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC<Props> = ({navigation, route}) => {
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
