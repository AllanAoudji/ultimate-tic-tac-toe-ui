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
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Board from './src/Board';
import PlayerBoard from './src/PlayerBoard';
import WinnerFlagWrapper from './src/WinnerFlagWrapper';

const App = () => {
  return (
    <>
      <PlayerBoard
        disabledPlayButton={true}
        position="TOP"
        player={TileState.Player2}
      />
      <Board history={[]} />
      <PlayerBoard disabledPlayButton={true} />
      <WinnerFlagWrapper />
    </>
  );
};

export default App;
