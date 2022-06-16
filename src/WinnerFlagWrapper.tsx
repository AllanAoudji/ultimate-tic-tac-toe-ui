import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinnerFlag from './WinnerFlag';

interface Props {
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  winner?: TileState;
}

const WinnerFlagWrapper: React.FC<Props> = ({
  onPressNewGame = () => {},
  onPressQuit = () => {},
  winner = TileState.Empty,
}) => {
  if (winner === TileState.Empty) {
    return null;
  }
  return (
    <WinnerFlag
      onPressNewGame={onPressNewGame}
      onPressQuit={onPressQuit}
      winner={winner}
    />
  );
};

export default WinnerFlagWrapper;
