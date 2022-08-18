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

const ITEM_STORAGE_NAME = 'GAME_HISTORY';

const checkIfGame: (game: any) => boolean = game => {
  if (
    typeof game !== 'object' ||
    Object.keys(game).length !== 4 ||
    !validate(game._id) ||
    !moment(game.createdAt).isValid() ||
    !checkIfHistory(game.history) ||
    !checkIfSectionState(game.winner)
  ) {
    return false;
  }
  return true;
};

const useGameHistory: useGameHistory = () => {
  const getGames: getGames = React.useCallback(async () => {
    let gamesHistory: string | null;
    try {
      gamesHistory = await AsyncStorage.getItem(ITEM_STORAGE_NAME);
    } catch {
      return {
        OK: false,
        error: 'failed to fetch history',
      };
    }
    if (gamesHistory) {
      let gameHistoryParse: Ressource.Game[];
      try {
        gameHistoryParse = JSON.parse(gamesHistory);
      } catch {
        // Return an empty array if gamesHistory failed to parse
        return {
          OK: true,
          history: [],
        };
      }
      if (!Array.isArray(gameHistoryParse)) {
        return {
          OK: true,
          history: [],
        };
      }
      const gameHistoryParseFiltered = gameHistoryParse.filter(game =>
        checkIfGame(game),
      );
      return {
        OK: true,
        history: gameHistoryParseFiltered,
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
    let gamesHistoryArray: any[];

    try {
      gamesHistory = await AsyncStorage.getItem(ITEM_STORAGE_NAME);
    } catch {
      return {OK: false, error: 'failed to fetch history'};
    }

    if (gamesHistory) {
      let gamesHistoryParse: Ressource.Game[];
      try {
        gamesHistoryParse = JSON.parse(gamesHistory);
      } catch {
        // Use an empty array if gamesHistory failed to parse
        gamesHistoryParse = [];
      }
      if (!Array.isArray(gamesHistoryParse)) {
        gamesHistoryArray = [];
      } else {
        gamesHistoryArray = gamesHistoryParse;
      }
    } else {
      gamesHistoryArray = [];
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
      ...(gamesHistoryArray as Ressource.Game[]),
    ].slice(0, 20);
    try {
      await AsyncStorage.setItem(ITEM_STORAGE_NAME, JSON.stringify(history));
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
