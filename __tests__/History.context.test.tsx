import AsyncStorage from '@react-native-async-storage/async-storage';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {act} from 'react-test-renderer';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';
import {v4 as uuidv4} from 'uuid';

import {HistoryContext, HistoryProvider} from '../src/History.context';

const renderer = () => {
  const Component = () => {
    const {
      addGameToHistory,
      failed,
      fetchGamesFromHistory,
      games,
      loadingGames,
      status,
    } = React.useContext(HistoryContext);

    const [gamesHaveLoaded, setGamesHaveLoaded] =
      React.useState<boolean>(false);
    const [gamesStateHasLoaded, setGamesStateHasLoaded] =
      React.useState<boolean>(false);

    const handlePressAddGame = React.useCallback(
      () =>
        addGameToHistory({
          history: [],
          winner: [TileState.Player1, WinningLine.LeftColumn],
        }),
      [addGameToHistory],
    );

    React.useEffect(() => {
      if (loadingGames) {
        setGamesHaveLoaded(true);
      }
    }, [loadingGames]);
    React.useEffect(() => {
      if (status === 'LOADING') {
        setGamesStateHasLoaded(true);
      }
    }, [status]);

    return (
      <>
        {loadingGames && <Text>loading</Text>}
        {gamesHaveLoaded && <Text>games has loaded</Text>}
        {failed && <Text>failed</Text>}
        <Pressable testID="addGame" onPress={handlePressAddGame} />
        <Pressable testID="fetchGame" onPress={fetchGamesFromHistory} />
        {games.map(game => (
          <View testID="game" key={game._id} />
        ))}
        <Text>{status}</Text>
        {gamesStateHasLoaded && <Text>games state has loaded</Text>}
      </>
    );
  };

  const renderHistory = render(
    <HistoryProvider>
      <Component />
    </HistoryProvider>,
  );

  const {getByTestId, getByText, queryAllByTestId, queryByText} = renderHistory;

  const getAddGamePressable = () => getByTestId('addGame');
  const getFetchGamesPressable = () => getByTestId('fetchGame');
  const getText = (text: string) => getByText(text);

  const queryFailed = () => queryByText('failed');
  const queryGame = () => queryAllByTestId('game');
  const queryLoading = () => queryByText('loading');
  const queryGamesHasLoaded = () => queryByText('games has loaded');
  const queryGamesStateHasLoaded = () => queryByText('games state has loaded');

  return {
    container: {
      get: {
        addGamePressable: getAddGamePressable,
        fetchGamePressable: getFetchGamesPressable,
        text: getText,
      },
      query: {
        failed: queryFailed,
        games: queryGame,
        gamesHasLoaded: queryGamesHasLoaded,
        gamesStateHasLoaded: queryGamesStateHasLoaded,
        loading: queryLoading,
      },
      press: {
        addGame: () => {
          fireEvent.press(getAddGamePressable());
        },
        fetchGames: () => {
          fireEvent.press(getFetchGamesPressable());
        },
      },
    },
    render: renderHistory,
  };
};

describe('<History />', () => {
  it('has no game on mount', () => {
    const {container} = renderer();
    expect(container.query.games()).toHaveLength(0);
  });

  it('does not dislay loading on mount', () => {
    const {container} = renderer();
    expect(container.query.loading()).toBeNull();
    expect(container.query.gamesHasLoaded()).toBeNull();
  });

  it('add a game', async () => {
    const {container} = renderer();
    await act(async () => {
      container.press.addGame();
    });
    expect(container.query.games()).toHaveLength(1);
  });

  it('fetches games', async () => {
    const game = {
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
      history: [],
      winner: [TileState.Player1, WinningLine.BottomRow],
    };
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(JSON.stringify([game])),
    );
    const {container} = renderer();
    await act(async () => {
      container.press.fetchGames();
    });
    expect(container.query.games()).toHaveLength(1);
  });

  describe('sets loading to true when games are', () => {
    it('added to history', async () => {
      const {container} = renderer();
      await act(async () => {
        container.press.addGame();
      });
      expect(container.query.gamesHasLoaded()).not.toBeNull();
      expect(container.query.loading()).toBeNull();
    });

    it('fetched', async () => {
      const {container} = renderer();
      await act(async () => {
        container.press.fetchGames();
      });
      expect(container.query.gamesHasLoaded()).not.toBeNull();
      expect(container.query.loading()).toBeNull();
    });
  });

  describe('sets failed to true if', () => {
    it('addGameToHistory failed', async () => {
      (AsyncStorage.setItem as jest.Mock).mockImplementationOnce(() =>
        Promise.reject('failed'),
      );
      const {container} = renderer();
      await act(async () => {
        container.press.addGame();
      });
      expect(container.query.failed()).not.toBeNull();
    });

    it('fetchGamesFromHistory failed', async () => {
      (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
        Promise.reject('failed'),
      );
      const {container} = renderer();
      await act(async () => {
        container.press.fetchGames();
      });
      expect(container.query.failed()).not.toBeNull();
    });
  });

  describe('renders /status ===', () => {
    it('"PENDING"/ on mount', () => {
      const {container} = renderer();
      expect(container.get.text('PENDING')).not.toBeNull();
    });

    describe('"LOADING"/ when', () => {
      it('games are fetching', async () => {
        const {container} = renderer();
        await act(async () => {
          container.press.fetchGames();
        });
        expect(container.query.gamesStateHasLoaded()).not.toBeNull();
      });

      it('game is added to history', async () => {
        const {container} = renderer();
        await act(async () => {
          container.press.addGame();
        });
        expect(container.query.gamesStateHasLoaded()).not.toBeNull();
      });
    });

    describe('"SUCCESS"/ after', () => {
      it('fetching games', async () => {
        const {container} = renderer();
        await act(async () => {
          container.press.fetchGames();
        });
        expect(container.get.text('SUCCESS')).not.toBeNull();
      });

      it('adding game to history', async () => {
        const {container} = renderer();
        await act(async () => {
          container.press.fetchGames();
        });
        expect(container.get.text('SUCCESS')).not.toBeNull();
      });
    });

    describe('"ERROR"/ if', () => {
      it('fetching games failed', async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('failed'),
        );
        const {container} = renderer();
        await act(async () => {
          container.press.fetchGames();
        });
        expect(container.get.text('ERROR')).not.toBeNull();
      });

      it('adding game to history failed', async () => {
        (AsyncStorage.setItem as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('failed'),
        );
        const {container} = renderer();
        await act(async () => {
          container.press.addGame();
        });
        expect(container.get.text('ERROR')).not.toBeNull();
      });
    });
  });
});
