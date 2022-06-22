import React from 'react';
import {
  generateAssets,
  getActivePlayer,
  Mode,
  play,
  SectionState,
  TileState,
  WiningLine,
} from 'ultimate-tic-tac-toe-algorithm';

import Board from './Board';
import PlayerBoard from './PlayerBoard';
import WinningModalWrapper from './WinningModalWrapper';

interface Props {
  disabled?: boolean;
  mode?: Mode;
  onPressQuit?: () => void;
}

const initialAssets = generateAssets();

const gameIsDone: (winner: SectionState) => boolean = winner =>
  winner[0] !== TileState.Empty || winner[1] === WiningLine.Draw;

const normalizeWinner = (winner: SectionState) => {
  if (winner[1] === WiningLine.Draw) {
    return winner[1];
  }
  return winner[0];
};

const randomizePlayer: () => [
  TileState.Player1 | TileState.Player2,
  TileState.Player1 | TileState.Player2,
] = () =>
  Math.random() < 0.5
    ? [TileState.Player1, TileState.Player2]
    : [TileState.Player2, TileState.Player1];

const Game: React.FC<Props> = ({
  disabled = false,
  mode = Mode.Normal,
  onPressQuit = () => {},
}) => {
  let [history, setHistory] = React.useState<number[]>(initialAssets.history);
  const [players, setPlayers] = React.useState<
    [
      TileState.Player1 | TileState.Player2,
      TileState.Player1 | TileState.Player2,
    ]
  >(randomizePlayer());
  let [selectedTileIndex, setSelectedTilIndex] = React.useState<number | null>(
    null,
  );
  const [visibleModalPlayerBottom, setVisibleModalPlayerBottom] =
    React.useState<boolean>(false);
  const [visibleModalPlayerTop, setVisibleModalPlayerTop] =
    React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<SectionState>(
    initialAssets.winner,
  );

  const onPressBoard = React.useCallback(
    (tileIndex: number) => () => {
      setSelectedTilIndex(tileIndex);
    },
    [],
  );
  const onPressNewGame = React.useCallback(() => {
    setHistory([]);
  }, []);
  const onPressPlay = React.useCallback(() => {
    if (selectedTileIndex !== null) {
      const assets = play(selectedTileIndex, {
        history,
        mode,
        winner,
      });
      setHistory(assets.history);
      if (gameIsDone(assets.winner)) {
        setWinner(assets.winner);
      }
    }
    setSelectedTilIndex(null);
  }, [history, mode, selectedTileIndex, winner]);
  const onSurrend = React.useCallback(
    (player: TileState.Player1 | TileState.Player2) => () => {
      if (!gameIsDone(winner)) {
        setWinner([player, WiningLine.Surrender]);
      }
    },
    [winner],
  );

  React.useEffect(() => {
    if (gameIsDone(winner) || disabled) {
      if (visibleModalPlayerBottom) {
        setVisibleModalPlayerBottom(false);
      }
      if (visibleModalPlayerTop) {
        setVisibleModalPlayerTop(false);
      }
    }
  }, [disabled, visibleModalPlayerBottom, visibleModalPlayerTop, winner]);
  React.useEffect(() => {
    if (history.length === 0) {
      setPlayers(randomizePlayer());
      setSelectedTilIndex(null);
      setWinner([TileState.Empty, null]);
    }
  }, [history]);

  return (
    <>
      <PlayerBoard
        disabledPlayButton={
          getActivePlayer(history) !== players[0] ||
          selectedTileIndex === null ||
          disabled
        }
        disabledSurrendButton={gameIsDone(winner) || disabled}
        onPressPlay={onPressPlay}
        onSurrend={onSurrend(players[1])}
        player={players[0]}
        position="TOP"
        setVisibleModal={setVisibleModalPlayerTop}
        visibleModal={visibleModalPlayerTop}
      />
      <Board
        disabled={disabled}
        gameIsDone={gameIsDone(winner)}
        history={history}
        mode={mode}
        onPress={onPressBoard}
        selectedTileIndex={selectedTileIndex}
      />
      <PlayerBoard
        disabledPlayButton={
          getActivePlayer(history) !== players[1] ||
          selectedTileIndex === null ||
          disabled
        }
        disabledSurrendButton={gameIsDone(winner) || disabled}
        onPressPlay={onPressPlay}
        onSurrend={onSurrend(players[0])}
        player={players[1]}
        setVisibleModal={setVisibleModalPlayerBottom}
        visibleModal={visibleModalPlayerBottom}
      />
      <WinningModalWrapper
        onPressNewGame={onPressNewGame}
        onPressQuit={onPressQuit}
        winner={normalizeWinner(winner)}
      />
    </>
  );
};

export default Game;

// props.disabled =>
// visibleModalPlayer = false
// ... disabled Board => Section => Tile
// ... WinningModal

// WinningModalWrapper should be in parent
// React.useEffect(() => {...}, [history]) // should reset all states
