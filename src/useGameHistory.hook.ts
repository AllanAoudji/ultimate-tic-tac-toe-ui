import AsyncStorage from '@react-native-async-storage/async-storage';
import {SectionState, TileState} from 'ultimate-tic-tac-toe-algorithm';
import {v4 as uuidv4} from 'uuid';

type saveGameProps = {
  history: number[];
  winner: SectionState;
};
type saveGameReturn = {OK: true} | {OK: false; error: string};
type saveGame = (props: saveGameProps) => Promise<saveGameReturn>;

const ITEM_STORAGE_NAME = 'GAME_HISTORY';

const useGameHistory: () => {saveGame: saveGame} = () => {
  const saveGame: saveGame = async props => {
    if (props.winner[0] === TileState.Empty) {
      return {OK: false, error: 'the game is not saved'};
    }
    const uniqueId = uuidv4();
    const game = {
      date: new Date(),
      uniqueId,
      ...props,
    };
    const games = [game];
    try {
      await AsyncStorage.setItem(ITEM_STORAGE_NAME, JSON.stringify(games));
    } catch {
      return {OK: false, error: 'failed to save in local storage'};
    }
    return {OK: true};
  };

  return {saveGame};
};

export default useGameHistory;

// Should get saves games
// push saveGame to array
// save only the last 20 games
