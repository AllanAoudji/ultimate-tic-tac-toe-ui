import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinningModal from './WinningModal';

interface Props {
  disabled?: boolean;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  visible?: boolean;
  winner?: TileState;
}

const WinningModalWrapper: React.FC<Props> = ({
  disabled = false,
  onPressNewGame,
  onPressQuit,
  visible = false,
  winner = TileState.Empty,
}) => {
  if (!visible || winner === TileState.Empty) {
    return null;
  }

  return (
    <WinningModal
      disabled={disabled}
      onPressNewGame={onPressNewGame}
      onPressQuit={onPressQuit}
      winner={winner}
    />
  );
};

export default WinningModalWrapper;
