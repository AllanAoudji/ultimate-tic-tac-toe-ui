/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {generateAssets} from 'ultimate-tic-tac-toe-algorithm';
import Board from './src/Board';

const assets = generateAssets();

const App = () => {
  return <Board board={assets.board} history={[53]} />;
};

export default App;
