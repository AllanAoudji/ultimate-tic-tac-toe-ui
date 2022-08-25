import React from 'react';
import {SectionState} from 'ultimate-tic-tac-toe-algorithm';

import useGameHistory from './useGameHistory.hook';

type addGameToHistory = (props: {
  history: number[];
  winner: SectionState;
}) => void;

type ProvidedValue = {
  addGameToHistory: addGameToHistory;
  failed: boolean;
  fetchGamesFromHistory: () => void;
  games: Ressource.Game[];
  loadingGames: boolean;
  status: status;
};

type status = 'PENDING' | 'LOADING' | 'SUCCESS' | 'ERROR';

const HistoryContext = React.createContext<ProvidedValue>({
  addGameToHistory: () => {},
  failed: false,
  fetchGamesFromHistory: () => {},
  games: [],
  loadingGames: false,
  status: 'PENDING',
});

const HistoryProvider: React.FC = ({children}) => {
  const {getGames, saveGame} = useGameHistory();

  const [failed, setFailed] = React.useState<boolean>(false);
  const [games, setGames] = React.useState<Ressource.Game[]>([]);
  const [loadingGames, setLoadingGames] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<status>('PENDING');

  const mounted = React.useRef(false);

  const addGameToHistory = React.useCallback<addGameToHistory>(
    async props => {
      setFailed(false);
      setLoadingGames(true);
      const history = await saveGame(props);
      if (mounted.current) {
        if (history.OK) {
          setGames(history.history);
          setStatus('SUCCESS');
        } else {
          setFailed(true);
        }
        setLoadingGames(false);
      }
    },
    [saveGame],
  );

  const fetchGamesFromHistory = React.useCallback<() => void>(async () => {
    setFailed(false);
    setLoadingGames(true);
    const history = await getGames();
    if (mounted.current) {
      if (history.OK) {
        setGames(history.history);
        setStatus('SUCCESS');
      } else {
        setFailed(true);
      }
      setLoadingGames(false);
    }
  }, [getGames]);

  const value = React.useMemo(
    () => ({
      addGameToHistory,
      failed,
      fetchGamesFromHistory,
      games,
      loadingGames,
      status,
    }),
    [
      addGameToHistory,
      failed,
      fetchGamesFromHistory,
      games,
      loadingGames,
      status,
    ],
  );

  React.useEffect(() => {
    if (loadingGames) {
      setStatus('LOADING');
    }
  }, [loadingGames]);
  React.useEffect(() => {
    if (failed) {
      setStatus('ERROR');
    }
  }, [failed]);

  // Cleanup effect to prevent leaks
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

export {HistoryContext, HistoryProvider};
