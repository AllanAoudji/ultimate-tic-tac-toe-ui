/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Navigation from './src/Navigation';

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#dedede" barStyle="dark-content" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create<{container: ViewStyle}>({
  container: {
    flex: 1,
  },
});

export default App;
