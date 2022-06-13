import React from 'react';
import {View} from 'react-native';
import {getSections, TileState} from 'ultimate-tic-tac-toe-algorithm';
import Section from './Section';

interface Props {
  board: TileState[];
}

const Board: React.FC<Props> = ({board}) => (
  <View testID="board__container">
    {getSections(board).map(section => (
      <Section key={section.position} tiles={section.tiles} />
    ))}
  </View>
);

export default Board;
