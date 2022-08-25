import React from 'react';
import {FlatList} from 'react-native';
import GameHistory from './GameHistory';

type props = {
  games: Ressource.Game[];
};

const GamesHistory: React.FC<props> = ({games}) => {
  const keyExtractor = React.useCallback(
    (item: Ressource.Game) => item._id,
    [],
  );
  const renderItem = React.useCallback(
    ({item}: {item: Ressource.Game}) => (
      <GameHistory
        _id={item._id}
        date={item.createdAt}
        history={item.history}
        winner={item.winner[0]}
      />
    ),
    [],
  );

  return (
    <FlatList
      data={games}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      testID="gamesHistory__container--flatList"
    />
  );
};

export default GamesHistory;
