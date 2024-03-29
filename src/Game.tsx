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
import {HistoryContext} from './History.context';

interface Props {
  disabled?: boolean;
  setGameIsDone?: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: Mode;
  onPressQuit?: () => void;
}

const initialAssets = generateAssets();

// -------------------------------
// -------------------------------
// utile functions
// -------------------------------
// -------------------------------
const arrayEquals = (a: any, b: any) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val, index) => val === b[index]);
const normalizeGameIsDone: (winner: SectionState) => boolean = winner =>
  winner[0] !== TileState.Empty;
const randomizePlayer: () => [
  TileState.Player1 | TileState.Player2,
  TileState.Player1 | TileState.Player2,
] = () =>
  Math.random() < 0.5
    ? [TileState.Player1, TileState.Player2]
    : [TileState.Player2, TileState.Player1];

// -------------------------------
// -------------------------------
// Component
// -------------------------------
// -------------------------------
const Game: React.FC<Props> = ({
  disabled = false,
  setGameIsDone,
  mode = Mode.Normal,
  onPressQuit = () => {},
}) => {
  // -------------------------------
  // states
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
  const [visibleModalWinner, setVisibleModalWinner] =
    React.useState<boolean>(false);

  const firstUpdate = React.useRef(true);

  const {addGameToHistory} = React.useContext(HistoryContext);

  const onAnimationFinish = React.useCallback(() => {
    setVisibleModalWinner(true);
  }, []);
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

  // Trigger when game is won by a player
  // Clear hide surrend modals
  // and save game in local storage
  React.useEffect(() => {
    if (normalizeGameIsDone(winner)) {
      if (visibleModalPlayerBottom) {
        setVisibleModalPlayerBottom(false);
      }
      if (visibleModalPlayerTop) {
        setVisibleModalPlayerTop(false);
      }
      addGameToHistory({history, winner});
    }
  }, [
    addGameToHistory,
    history,
    visibleModalPlayerBottom,
    visibleModalPlayerTop,
    winner,
  ]);

  // Reset all states when history.length === 0
  // (when game reset)
  React.useLayoutEffect(() => {
    // Do not trigger on first mount
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (history.length === 0) {
      if (setGameIsDone) {
        setGameIsDone(false);
      }
      setPlayers(randomizePlayer());
      setSectionStates(initialAssets.sectionStates);
      setSelectedTilIndex(null);
      setVisibleModalWinner(false);
      setWinner([TileState.Empty, null]);
    }
  }, [history, setGameIsDone]);

  // Call setGameIsDone (Component props) when game is done
  // Use to show/hide BackHandler
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
        activePlayButton={getActivePlayer(history) === players[0]}
        disabledPlayButton={selectedTileIndex === null || disabled}
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
        onAnimationFinish={onAnimationFinish}
        winner={winner}
      />
      <PlayerBoard
        activePlayButton={getActivePlayer(history) === players[1]}
        disabledPlayButton={selectedTileIndex === null || disabled}
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
        visible={visibleModalWinner}
        winner={winner[0]}
      />
    </>
  );
};

export default React.memo(Game);
