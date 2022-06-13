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
const tiles1 = getSections(assets.board)[0].tiles;
tiles1[0][0].state = TileState.Player2;
tiles1[0][2].state = TileState.Player2;
tiles1[1][1].state = TileState.Player2;
tiles1[1][2].state = TileState.Player1;
tiles1[2][0].state = TileState.Player2;
tiles1[2][1].state = TileState.Player1;
const tiles2 = getSections(assets.board)[1].tiles;
tiles2[0][0].state = TileState.Player1;
tiles2[0][1].state = TileState.Player1;
tiles2[0][2].state = TileState.Player1;
const tiles3 = getSections(assets.board)[2].tiles;
tiles3[1][0].state = TileState.Player2;
tiles3[1][1].state = TileState.Player2;
tiles3[1][2].state = TileState.Player2;
const tiles4 = getSections(assets.board)[3].tiles;

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Section tiles={tiles1} />
        <Section tiles={tiles2} />
        <Section tiles={tiles3} />
        <Section tiles={tiles4} />
        <Section tiles={tiles4} />
        <Section tiles={tiles4} />
        <Section tiles={tiles4} />
        <Section tiles={tiles4} />
        <Section tiles={tiles4} />
      </View>
    </View>
  );
};

export default App;
