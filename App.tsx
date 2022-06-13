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
import {View} from 'react-native';
import {
  generateAssets,
  getSections,
  TileState,
} from 'ultimate-tic-tac-toe-algorithm';
import Section from './src/Section';

const assets = generateAssets();
const tiles = getSections(assets.board)[0].tiles;
tiles[0][0].state = TileState.Player1;
tiles[0][1].state = TileState.Player2;
tiles[0][2].state = TileState.Player1;
tiles[1][0].state = TileState.Player1;
tiles[1][1].state = TileState.Player2;
tiles[1][2].state = TileState.Player1;
tiles[2][0].state = TileState.Player2;
tiles[2][1].state = TileState.Player1;
tiles[2][2].state = TileState.Player2;

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
        <Section tiles={tiles} />
      </View>
    </View>
  );
};

export default App;
