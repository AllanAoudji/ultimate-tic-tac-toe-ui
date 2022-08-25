import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import moment from 'moment';
import {
  SectionState,
  TileState,
  checkIfHistory,
  checkIfSectionState,
} from 'ultimate-tic-tac-toe-algorithm';
import {v4 as uuidv4, validate} from 'uuid';

type saveGameProps = {
  history: number[];
  winner: SectionState;
};

type saveGame = (
  props: saveGameProps,
) => Promise<
  {OK: true; history: Ressource.Game[]} | {OK: false; error: string}
>;
type getGames = () => Promise<
  | {
      OK: true;
      history: Ressource.Game[];
    }
  | {OK: false; error: string}
>;
type useGameHistory = () => {saveGame: saveGame; getGames: getGames};

const ITEM_STORAGE_KEY = 'GAME_HISTORY';

const checkIfGame: (game: any) => boolean = game => {
  if (
    typeof game !== 'object' ||
    Object.keys(game).length !== 4 ||
    !validate(game._id) ||
    !moment(game.createdAt).isValid() ||
    !checkIfHistory(game.history) ||
    !checkIfSectionState(game.winner) ||
    game.winner[0] === TileState.Empty
  ) {
    return false;
  }
  return true;
};

const useGameHistory: useGameHistory = () => {
  const getGames: getGames = React.useCallback(async () => {
    let gamesHistory: string | null;
    try {
      gamesHistory = await AsyncStorage.getItem(ITEM_STORAGE_KEY);
    } catch {
      return {
        OK: false,
        error: 'failed to fetch history',
      };
    }
    if (gamesHistory) {
      let gameHistoryParsed: Ressource.Game[];
      try {
        gameHistoryParsed = JSON.parse(gamesHistory);
      } catch {
        // Return an empty array if gamesHistory failed to parse
        return {
          OK: true,
          history: [],
        };
      }
      if (!Array.isArray(gameHistoryParsed)) {
        return {
          OK: true,
          history: [],
        };
      }
      const gameHistoryParsedFiltered = gameHistoryParsed.filter(game =>
        checkIfGame(game),
      );
      return {
        OK: true,
        history: gameHistoryParsedFiltered,
      };
    } else {
      return {
        OK: true,
        history: [],
      };
    }
  }, []);

  const saveGame: saveGame = React.useCallback(async props => {
    // Return an error if the game is not won
    if (props.winner[0] === TileState.Empty) {
      return {OK: false, error: 'invalid game'};
    }
    let gamesHistory: string | null;
    let gamesHistoryParsedFiltered: any[];

    try {
      gamesHistory = await AsyncStorage.getItem(ITEM_STORAGE_KEY);
    } catch {
      return {OK: false, error: 'failed to fetch history'};
    }

    if (gamesHistory) {
      let gamesHistoryParsed: Ressource.Game[];
      try {
        gamesHistoryParsed = JSON.parse(gamesHistory);
      } catch {
        // Use an empty array if gamesHistory failed to parse
        gamesHistoryParsed = [];
      }
      if (!Array.isArray(gamesHistoryParsed)) {
        gamesHistoryParsedFiltered = [];
      } else {
        gamesHistoryParsedFiltered = gamesHistoryParsed.filter(game =>
          checkIfGame(game),
        );
      }
    } else {
      gamesHistoryParsedFiltered = [];
    }

    const _id = uuidv4();
    const createdAt = new Date().toISOString();
    const game = {
      _id,
      createdAt,
      ...props,
    };
    const history: Ressource.Game[] = [
      game,
      ...(gamesHistoryParsedFiltered as Ressource.Game[]),
    ].slice(0, 20);
    try {
      await AsyncStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(history));
    } catch {
      return {OK: false, error: 'failed to save in local storage'};
    }
    return {OK: true, history};
  }, []);

  const returnValue = React.useMemo(
    () => ({saveGame, getGames}),
    [saveGame, getGames],
  );

  return returnValue;
};

export default useGameHistory;
