import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import SurrendIcon from './SurrendIcon';

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendButton: React.FC<Props> = ({
  onPress = () => {},
  player = TileState.Player1,
}) => (
  <Pressable onPress={onPress} testID="surrendButton__container--pressable">
    <SurrendIcon player={player} />
  </Pressable>
);

export default SurrendButton;
