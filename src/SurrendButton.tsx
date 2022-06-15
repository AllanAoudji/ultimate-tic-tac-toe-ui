import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import SurrendIcon from './SurrendIcon';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendButton: React.FC<Props> = ({
  disabled,
  onPress = () => {},
  player = TileState.Player1,
}) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    testID="surrendButton__container--pressable">
    <SurrendIcon player={player} />
  </Pressable>
);

export default SurrendButton;
