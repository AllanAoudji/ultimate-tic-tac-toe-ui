import {render} from '@testing-library/react-native';
import React from 'react';
import {TileState, WinningLine} from 'ultimate-tic-tac-toe-algorithm';

import GamesHistory from '../src/GamesHistory';

const renderer = (
  options: {
    games?: Ressource.Game[];
  } = {},
) => {
  const renderGamesHistory = render(
    <GamesHistory games={options?.games ? options.games : []} />,
  );

  const {getAllByTestId, getByTestId, queryAllByTestId} = renderGamesHistory;

  const getContainerFlatList = () =>
    getByTestId('gamesHistory__container--flatList');
  const getGames = () => getAllByTestId('gameHistory__container');

  const queryGames = () => queryAllByTestId('gameHistory__container');

  return {
    container: {
      get: {
        container: getContainerFlatList,
        games: getGames,
      },
      query: {
        games: queryGames,
      },
    },
    render: renderGamesHistory,
  };
};

const generateGameHistory = (numberOfGamesHistory = 1) => {
  const gamesHistory: Ressource.Game[] = Array.from(
    Array(numberOfGamesHistory).keys(),
  ).map(item => ({
    _id: item.toString(),
    createdAt: new Date().toISOString(),
    history: [1],
    winner: [TileState.Player1, WinningLine.BottomRow],
  }));
  return gamesHistory;
};

describe('<GamesHistory />', () => {
  it('renders a <FlatList />', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders one <GameHistory />', () => {
    const {container} = renderer({games: generateGameHistory(1)});
    expect(container.query.games()).toHaveLength(1);
  });

  it('renders no <GameHistory />', () => {
    const {container} = renderer();
    expect(container.query.games()).toHaveLength(0);
  });

  it('renders two <GameHistory />', () => {
    const {container} = renderer({games: generateGameHistory(2)});
    expect(container.query.games()).toHaveLength(2);
  });
});
