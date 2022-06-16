import React from 'react';
import {
  getActivePlayer,
  Mode,
  play,
  SectionState,
  TileState,
  WiningLine,
} from 'ultimate-tic-tac-toe-algorithm';

import Board from './Board';
import PlayerBoard from './PlayerBoard';
import WinnerFlagWrapper from './WinnerFlagWrapper';

const randomizePlayer: () => [
  TileState.Player1 | TileState.Player2,
  TileState.Player1 | TileState.Player2,
] = () =>
  Math.random() < 0.5
    ? [TileState.Player1, TileState.Player2]
    : [TileState.Player2, TileState.Player1];

const Game: React.FC = () => {
  let [history, setHistory] = React.useState<number[]>([]);
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
  const [winner, setWinner] = React.useState<SectionState>([
    TileState.Empty,
    null,
  ]);

  const onPressBoard = React.useCallback(
    (tileIndex: number) => () => {
      setSelectedTilIndex(tileIndex);
    },
    [],
  );
  const onPressNewGame = React.useCallback(() => {
    setHistory([]);
    setPlayers(randomizePlayer());
    setSelectedTilIndex(null);
    setWinner([TileState.Empty, null]);
  }, []);
  const onPressPlay = React.useCallback(() => {
    if (selectedTileIndex !== null) {
      const assets = play(selectedTileIndex, {
        history,
        mode: Mode.Normal,
        winner,
      });
      setHistory(assets.history);
      if (assets.winner[0] !== TileState.Empty) {
        setWinner(assets.winner);
      }
    }
    setSelectedTilIndex(null);
  }, [history, selectedTileIndex, winner]);
  const onSurrend = React.useCallback(
    (player: TileState.Player1 | TileState.Player2) => () => {
      if (winner[0] === TileState.Empty) {
        setWinner([player, WiningLine.Surrender]);
      }
    },
    [winner],
  );

  React.useEffect(() => {
    if (winner[0] !== TileState.Empty) {
      if (visibleModalPlayerBottom === true) {
        setVisibleModalPlayerBottom(false);
      }
      if (visibleModalPlayerTop === true) {
        setVisibleModalPlayerTop(false);
      }
    }
  }, [visibleModalPlayerBottom, visibleModalPlayerTop, winner]);

  return (
    <>
      <PlayerBoard
        disabledPlayButton={
          getActivePlayer(history) !== players[0] || selectedTileIndex === null
        }
        disabledSurrendButton={winner[0] !== TileState.Empty}
        onPressPlay={onPressPlay}
        onSurrend={onSurrend(players[1])}
        player={players[0]}
        position="TOP"
        setVisibleModal={setVisibleModalPlayerTop}
        visibleModal={visibleModalPlayerTop}
      />
      <Board
        history={history}
        onPress={onPressBoard}
        selectedTileIndex={selectedTileIndex}
      />
      <PlayerBoard
        disabledPlayButton={
          getActivePlayer(history) !== players[1] || selectedTileIndex === null
        }
        disabledSurrendButton={winner[0] !== TileState.Empty}
        onPressPlay={onPressPlay}
        onSurrend={onSurrend(players[0])}
        player={players[1]}
        setVisibleModal={setVisibleModalPlayerBottom}
        visibleModal={visibleModalPlayerBottom}
      />
      <WinnerFlagWrapper onPressNewGame={onPressNewGame} winner={winner[0]} />
    </>
  );
};

export default Game;
