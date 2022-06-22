import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState, WiningLine} from 'ultimate-tic-tac-toe-algorithm';

import WinningModal from './WinningModal';

interface Props {
  disabled?: boolean;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  winner?: TileState | WiningLine.Draw;
}

const WinningModalWrapper: React.FC<Props> = ({
  disabled = false,
  onPressNewGame = () => {},
  onPressQuit = () => {},
  winner = TileState.Empty,
}) => {
  if (winner === TileState.Empty) {
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
