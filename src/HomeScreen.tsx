import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import Logo from './Logo';
import PlayGameButton from './PlayGameButton';

type RootStackParamList = {
  Game: {mode: Mode};
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
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
