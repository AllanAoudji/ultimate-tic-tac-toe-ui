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

import Container from './src/Container';
import Loader from './src/Loader';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <Loader>
      <Container flex={1}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Container>
    </Loader>
  );
};

export default App;
