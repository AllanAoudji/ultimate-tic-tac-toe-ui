import React from 'react';
import {
  generateAssets,
  getActivePlayer,
  getTileIndexPositionAndSection,
  Mode,
  play,
  SectionState,
  TileState,
  WinningLine,
} from 'ultimate-tic-tac-toe-algorithm';

import Board from './Board';
import PlayerBoard from './PlayerBoard';
import WinningModalWrapper from './WinningModalWrapper';

interface Props {
  disabled?: boolean;
  setGameIsDone?: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: Mode;
  onPressQuit?: () => void;
}

const initialAssets = generateAssets();

const arrayEquals = (a: any, b: any) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val, index) => val === b[index]);

const normalizeGameIsDone: (winner: SectionState) => boolean = winner =>
  winner[0] !== TileState.Empty || winner[1] === WinningLine.Draw;

const normalizeWinner = (winner: SectionState) => {
  if (winner[1] === WinningLine.Draw) {
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
  setGameIsDone,
  mode = Mode.Normal,
  onPressQuit = () => {},
}) => {
  const [history, setHistory] = React.useState<number[]>(initialAssets.history);
  const [players, setPlayers] = React.useState<
    [
      TileState.Player1 | TileState.Player2,
      TileState.Player1 | TileState.Player2,
    ]
  >(randomizePlayer());
  const [sectionStates, setSectionStates] = React.useState<SectionState[]>(
    initialAssets.sectionStates,
  );
  const [selectedTileIndex, setSelectedTilIndex] = React.useState<
    number | null
  >(null);
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
      if (getActivePlayer(history) === players[0] && visibleModalPlayerTop) {
        setVisibleModalPlayerTop(false);
      }
      if (getActivePlayer(history) === players[1] && visibleModalPlayerBottom) {
        setVisibleModalPlayerBottom(false);
      }
    },
    [history, players, visibleModalPlayerBottom, visibleModalPlayerTop],
  );
  const onPressNewGame = React.useCallback(() => {
    setHistory([]);
  }, []);
  const onPressPlay = React.useCallback(() => {
    if (selectedTileIndex !== null) {
      const assets = play(selectedTileIndex, {
        history,
        mode,
        sectionStates,
        winner,
      });
      setHistory(assets.history);
      const {section} = getTileIndexPositionAndSection(selectedTileIndex);
      if (!arrayEquals(sectionStates[section], assets.sectionStates[section])) {
        setSectionStates(assets.sectionStates);
      }
      if (normalizeGameIsDone(assets.winner)) {
        setWinner(assets.winner);
      }
    }
    setSelectedTilIndex(null);
  }, [history, mode, sectionStates, selectedTileIndex, winner]);
  const onSurrend = React.useCallback(
    (player: TileState.Player1 | TileState.Player2) => () => {
      if (!normalizeGameIsDone(winner)) {
        setWinner([player, WinningLine.Surrender]);
      }
    },
    [winner],
  );

  React.useEffect(() => {
    if (normalizeGameIsDone(winner) || disabled) {
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
      if (setGameIsDone) {
        setGameIsDone(false);
      }
      setPlayers(randomizePlayer());
      setSectionStates(initialAssets.sectionStates);
      setSelectedTilIndex(null);
      setWinner([TileState.Empty, null]);
    }
  }, [history, setGameIsDone]);
  React.useEffect(() => {
    if (normalizeGameIsDone(winner)) {
      if (setGameIsDone) {
        setGameIsDone(true);
      }
    }
  }, [setGameIsDone, winner]);

  return (
    <>
      <PlayerBoard
        disabledPlayButton={
          getActivePlayer(history) !== players[0] ||
          selectedTileIndex === null ||
          disabled
        }
        disabledSurrendButton={normalizeGameIsDone(winner) || disabled}
        onPressPlay={onPressPlay}
        onSurrend={onSurrend(players[1])}
        player={players[0]}
        position="TOP"
        setVisibleModal={setVisibleModalPlayerTop}
        visibleModal={visibleModalPlayerTop}
      />
      <Board
        disabled={disabled}
        gameIsDone={normalizeGameIsDone(winner)}
        history={history}
        mode={mode}
        sectionStates={sectionStates}
        onPress={onPressBoard}
        selectedTileIndex={selectedTileIndex}
      />
      <PlayerBoard
        disabledPlayButton={
          getActivePlayer(history) !== players[1] ||
          selectedTileIndex === null ||
          disabled
        }
        disabledSurrendButton={normalizeGameIsDone(winner) || disabled}
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
