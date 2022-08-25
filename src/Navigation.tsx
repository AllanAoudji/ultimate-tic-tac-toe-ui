import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import GameScreen from './GameScreen';
import GamesHistoryScreen from './GamesHistoryScreen';
import HomeScreen from './HomeScreen';

const {Screen, Navigator} =
  createNativeStackNavigator<Screen.RootStack.ParamList>();

const Navigation: React.FC = () => (
  <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Screen
      component={GameScreen}
      initialParams={{mode: Mode.Normal}}
      name="Game"
    />
    <Screen component={GamesHistoryScreen} name="GamesHistory" />
    <Screen component={HomeScreen} name="Home" />
  </Navigator>
);

export default Navigation;
