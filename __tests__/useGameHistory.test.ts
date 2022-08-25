import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook} from '@testing-library/react-hooks';
import {
  SectionState,
  TileState,
  WinningLine,
} from 'ultimate-tic-tac-toe-algorithm';
import {v4 as uuidv4} from 'uuid';
import useGameHistory from '../src/useGameHistory.hook';

const generateGame = () => ({
  _id: uuidv4(),
  createdAt: new Date().toISOString(),
  history: [],
  winner: [TileState.Player1, WinningLine.Surrender],
});
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('useGameHistory.saveGame', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGames', () => {
    it('fetches games', async () => {
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.getGames();
      expect(returnValue).toEqual({
        OK: true,
        history: [],
      });
    });

    it('fetches one game', async () => {
      const game = generateGame();
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify([game])),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.getGames();
      expect(returnValue).toEqual({
        OK: true,
        history: [game],
      });
    });

    it('returns an empty array if AsyncStorage does not return an array', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify('not an array')),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.getGames();
      expect(returnValue).toEqual({
        OK: true,
        history: [],
      });
    });

    it('filters non game items', async () => {
      const game = generateGame();
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify([1, game])),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.getGames();
      expect(returnValue).toEqual({
        OK: true,
        history: [game],
      });
    });

    it('returns OK: false if AsyncStorage failed to fetch history', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.reject('failed'),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.getGames();
      expect(returnValue).toEqual({
        OK: false,
        error: 'failed to fetch history',
      });
    });

    it('return an empty history if JSON.parse fail', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve('[1, 2'),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.getGames();
      expect(returnValue).toEqual({
        OK: true,
        history: [],
      });
    });
  });

  describe('saveGame', () => {
    const history = [0];
    const winner: SectionState = [TileState.Player1, WinningLine.Surrender];

    const mockReturned = () => {
      const calls = (AsyncStorage.setItem as jest.Mock).mock.calls[0];
      return {
        key: calls[0],
        games: JSON.parse(calls[1]),
      };
    };

    it('adds a game to localStorage', async () => {
      const {result} = renderHook(() => useGameHistory());
      await result.current.saveGame({
        history,
        winner,
      });
      const {games, key} = mockReturned();
      expect(key).toEqual('GAME_HISTORY');
      expect(games).toHaveLength(1);
      expect(games[0]).toEqual(
        expect.objectContaining({
          _id: expect.stringMatching(uuidRegex),
          history,
          winner,
        }),
      );
      expect(new Date(games[0].createdAt)).toBeInstanceOf(Date);
    });

    it('pushes game to an array', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(`[${JSON.stringify(generateGame())}]`),
      );
      const {result} = renderHook(() => useGameHistory());
      await result.current.saveGame({
        history,
        winner,
      });
      expect(mockReturned().games).toHaveLength(2);
    });

    it('save only the last 20th games', async () => {
      const fullHistory = new Array(20).fill(generateGame());
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify(fullHistory)),
      );
      const {result} = renderHook(() => useGameHistory());
      await result.current.saveGame({
        history,
        winner,
      });
      const {games} = mockReturned();
      expect(games).toHaveLength(20);
    });

    it('returns history', async () => {
      const game = generateGame();
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify([game])),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.saveGame({
        history,
        winner,
      });
      expect(returnValue).toEqual({
        OK: true,
        history: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.stringMatching(uuidRegex),
          }),
          expect.objectContaining({
            _id: game._id,
          }),
        ]),
      });
    });

    it('return an history with only the current game if JSON.parse fail', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve('[1, 2'),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.saveGame({
        history,
        winner,
      });
      expect(returnValue).toEqual({
        OK: true,
        history: expect.arrayContaining([
          expect.objectContaining({
            history,
            winner,
          }),
        ]),
      });
    });

    it('filters non game items', async () => {
      const game = generateGame();
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify([1, game])),
      );
      const {result} = renderHook(() => useGameHistory());
      const returnValue = await result.current.saveGame({
        history,
        winner,
      });
      expect(returnValue).toEqual({
        OK: true,
        history: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.stringMatching(uuidRegex),
          }),
          expect.objectContaining({
            _id: game._id,
          }),
        ]),
      });
    });

    describe('returns OK: false if', () => {
      it('game is not won', async () => {
        const {result} = renderHook(() => useGameHistory());
        const returnValue = await result.current.saveGame({
          history,
          winner: [TileState.Empty, null],
        });
        expect(returnValue).toEqual({
          OK: false,
          error: 'invalid game',
        });
      });

      it('AsyncStorage failed to set item', async () => {
        (AsyncStorage.setItem as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('failed'),
        );
        const {result} = renderHook(() => useGameHistory());
        const returnValue = await result.current.saveGame({
          history,
          winner,
        });
        expect(returnValue).toEqual({
          OK: false,
          error: 'failed to save in local storage',
        });
      });

      it(' AsyncStorage failed to fetch history', async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('failed'),
        );
        const {result} = renderHook(() => useGameHistory());
        const returnValue = await result.current.saveGame({
          history,
          winner,
        });
        expect(returnValue).toEqual({
          OK: false,
          error: 'failed to fetch history',
        });
      });
    });
  });
});
