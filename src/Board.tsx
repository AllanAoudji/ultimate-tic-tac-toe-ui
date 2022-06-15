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
} from 'ultimate-tic-tac-toe-algorithm';
import Section from './Section';

interface Props {
  gameIsWon?: boolean;
  history?: number[];
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  selectedTileIndex?: number | null;
}

const Board: React.FC<Props> = ({
  gameIsWon = false,
  history = [],
  onPress = () => () => {},
  selectedTileIndex = null,
}) => {
  const validSection = React.useMemo(
    () => getActiveSection(history),
    [history],
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
              !gameIsWon &&
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
