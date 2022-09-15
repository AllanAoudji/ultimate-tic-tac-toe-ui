import AsyncStorage from '@react-native-async-storage/async-storage';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';
import {v4 as uuidv4} from 'uuid';

import MockFetchingErrorModal from '../src/FetchingErrorModal';
import GamesHistoryScreen from '../src/GamesHistoryScreen';
import {HistoryProvider} from '../src/History.context';

jest.mock('../src/FetchingErrorModalWrapper', () => ({
  __esModule: true,
  default: ({visible, error, ...props}: {visible: boolean; error: string}) => {
    if (visible) {
      return <MockFetchingErrorModal text={error} {...props} />;
    }
    return null;
  },
}));

const renderer = () => {
  const renderGame = render(<GamesHistoryScreen />, {wrapper: HistoryProvider});

  const {
    findAllByTestId,
    findByTestId,
    findByText,
    getAllByTestId,
    getByTestId,
    getByText,
    queryAllByTestId,
    queryByTestId,
    queryByText,
  } = renderGame;

  const fingGameHistory = async () =>
    await findAllByTestId('gameHistory__container');
  const findFetchingErrorModal = () =>
    findByTestId('fetchingErrorModal__container--pressable');
  const findText = (text: string) => findByText(text);

  const getContainer = () => getByTestId('gamesHistoryScreen__container');
  const getFetchingErrorModal = () =>
    getByTestId('fetchingErrorModal__container--pressable');
  const getGameHistory = () => getAllByTestId('gameHistory__container');
  const getGamesHistory = () =>
    getByTestId('gamesHistory__container--flatList');
  const getText = (text: string) => getByText(text);
  const getTryAgainPressable = () => getByText('try again?');

  const queryContainer = () => queryByTestId('gamesHistoryScreen__container');
  const queryFetchingErrormodal = () =>
    queryByTestId('fetchingErrorModal__container--pressable');
  const queryGameHistory = () => queryAllByTestId('gameHistory__container');
  const queryGamesHistory = () =>
    queryByTestId('gamesHistory__container--flatList');
  const queryLoading = () => queryByText('loading');

  return {
    container: {
      find: {
        games: fingGameHistory,
        fetchingErrorModal: findFetchingErrorModal,
        text: findText,
      },
      get: {
        container: getContainer,
        fetchingErrorModal: getFetchingErrorModal,
        games: getGameHistory,
        gamesHistory: getGamesHistory,
        text: getText,
      },
      press: {
        fetchingErrorModal: () => {
          fireEvent.press(getFetchingErrorModal());
        },
        tryAgainPressable: () => {
          fireEvent.press(getTryAgainPressable());
        },
      },
      query: {
        container: queryContainer,
        fetchingErrorModal: queryFetchingErrormodal,
        games: queryGameHistory,
        gamesHistory: queryGamesHistory,
        loading: queryLoading,
      },
    },
    render: renderGame,
  };
};

const game = {
  _id: uuidv4(),
  createdAt: new Date().toISOString(),
  history: [],
  winner: [TileState.Player1, WinningLine.BottomRow],
};

describe('<GamesHistoryScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a <View />', async () => {
    const {container} = await waitFor(() => renderer());
    expect(container.query.container()).not.toBeNull();
  });

  it('renders <GamesHistory />', async () => {
    const {container} = await waitFor(() => renderer());
    expect(container.query.gamesHistory()).not.toBeNull();
  });

  it('renders one <GameHistory /> based on History.context', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(JSON.stringify([game])),
    );
    const {container} = renderer();
    const games = await waitFor(() => container.find.games());
    expect(games).toHaveLength(1);
  });

  it('renders <FetchingErrorModal /> if games have failed to fetch', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('fail'),
    );
    const {container} = renderer();
    const fetchingErrorModal = await waitFor(() =>
      container.find.fetchingErrorModal(),
    );
    expect(fetchingErrorModal).not.toBeNull();
  });

  it('renders <FetchingErrorModal /> with "failed to fetch history"', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('fail'),
    );
    const {container} = renderer();
    const errorText = await waitFor(() =>
      container.find.text('failed to fetch history'),
    );
    expect(errorText).not.toBeNull();
  });

  it('does not renders <FetchingErrorModal /> if games are fetched', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('fail'),
    );
    const {container} = renderer();
    const fetchingErrorModal = await waitFor(() =>
      container.query.fetchingErrorModal(),
    );
    expect(fetchingErrorModal).toBeNull();
  });

  it('closes <FetchingErrorModal /> when press on the "try again?" <Pressable />', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('fail'),
    );
    const {container} = renderer();
    await waitFor(() => container.press.tryAgainPressable());
    expect(container.query.fetchingErrorModal()).toBeNull();
  });

  it('fetch one more time history when press on the "try again?" <Pressable />', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('fail'),
    );
    const {container} = renderer();
    await waitFor(() => container.press.tryAgainPressable());
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
  });
});
