import React from 'react';
import {
  GestureResponderEvent,
  ImageBackground,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  getSections,
  getActiveSection,
  getActivePlayer,
  Mode,
} from 'ultimate-tic-tac-toe-algorithm';
import Section from './Section';

interface Props {
  gameIsDone?: boolean;
  history?: number[];
  mode?: Mode;
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  selectedTileIndex?: number | null;
}

const Board: React.FC<Props> = ({
  gameIsDone = false,
  history = [],
  mode = Mode.Normal,
  onPress = () => () => {},
  selectedTileIndex = null,
}) => {
  const validSection = React.useMemo(
    () => getActiveSection(history, mode),
    [history, mode],
  );

  return (
    <View testID="board__container">
      <ImageBackground
        source={require('../assets/images/boardGrid.png')}
        style={styles.container}
        testID="board__image--grid">
        {getSections(history).map((section, index) => (
          <Section
            activePlayer={getActivePlayer(history)}
            key={section.position}
            onPress={onPress}
            selectedTileIndex={selectedTileIndex}
            tiles={section.tiles}
            valid={
              !gameIsDone &&
              (validSection !== null ? validSection === index : true)
            }
          />
        ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create<{container: ViewStyle}>({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
});

export default Board;
