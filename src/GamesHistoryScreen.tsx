import React from 'react';
import {View} from 'react-native';

import {HistoryContext} from './History.context';
import GamesHistory from './GamesHistory';
import {Text} from 'react-native-svg';
import FetchingErrorModalWrapper from './FetchingErrorModalWrapper';

const GamesHistoryScreen = () => {
  const [visibleFetchingErrorModal, setVisibleFetchingErrorModal] =
    React.useState<boolean>(false);

  const firstUpdate = React.useRef(true);

  const {fetchGamesFromHistory, games, status} =
    React.useContext(HistoryContext);

  const onPressTryAgain = React.useCallback(() => {
    setVisibleFetchingErrorModal(false);
    fetchGamesFromHistory();
  }, [fetchGamesFromHistory]);

  // Should by trigger only once on mount
  React.useEffect(() => {
    if (!firstUpdate.current) {
      return;
    }
    firstUpdate.current = false;
    if (status === 'PENDING' || status === 'ERROR') {
      fetchGamesFromHistory();
    }
  }, [fetchGamesFromHistory, status]);

  React.useEffect(() => {
    if (status === 'ERROR') {
      setVisibleFetchingErrorModal(true);
    }
  }, [status]);

  return (
    <View testID="gamesHistoryScreen__container">
      {(status === 'PENDING' || status === 'LOADING') && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      <GamesHistory games={games} />
      <FetchingErrorModalWrapper
        error="failed to fetch history"
        onPress={onPressTryAgain}
        setVisible={setVisibleFetchingErrorModal}
        visible={visibleFetchingErrorModal}
      />
    </View>
  );
};

export default GamesHistoryScreen;
