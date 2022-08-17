import AsyncStorage from '@react-native-async-storage/async-storage';
import {SectionState} from 'ultimate-tic-tac-toe-algorithm';
import {v4 as uuidv4} from 'uuid';

type saveGameProps = {
  history: number[];
  winner: SectionState;
};
type saveGame = (props: saveGameProps) => Promise<{OK: boolean}>;

const useGameHistory: () => {saveGame: saveGame} = () => {
  const saveGame: saveGame = async props => {
    const game = {
      date: new Date(),
      ...props,
    };
    const uniqueId = uuidv4();
    try {
      await AsyncStorage.setItem(uniqueId, JSON.stringify(game));
    } catch {
      return {OK: false};
    }
    return {OK: true};
  };

  return {saveGame};
};

export default useGameHistory;
