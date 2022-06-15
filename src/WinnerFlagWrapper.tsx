import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import WinnerFlag from './WinnerFlag';

interface Props {
  winner?: TileState;
}

const WinnerFlagWrapper: React.FC<Props> = ({winner = TileState.Empty}) => {
  if (winner === TileState.Empty) {
    return null;
  }
  return <WinnerFlag winner={winner} />;
};

export default WinnerFlagWrapper;
