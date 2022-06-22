import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import SurrendModal from './SurrendModal';

interface Props {
  disabled?: boolean;
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
  visible?: boolean;
}

const SurrendModalWrapper: React.FC<Props> = ({
  disabled = false,
  onPressNo = () => {},
  onPressYes = () => {},
  player = TileState.Player1,
  visible = false,
}) => {
  if (visible) {
    return (
      <SurrendModal
        disabled={disabled}
        onPressNo={onPressNo}
        onPressYes={onPressYes}
        player={player}
      />
    );
  }
  return null;
};

export default SurrendModalWrapper;
