import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {
  getSections,
  getActiveSection,
  getActivePlayer,
  Mode,
  SectionState,
} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import Section from './Section';

interface Props {
  disabled?: boolean;
  gameIsDone?: boolean;
  history?: number[];
  mode?: Mode;
  sectionStates?: SectionState[];
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  selectedTileIndex?: number | null;
}

const Board: React.FC<Props> = ({
  disabled = false,
  gameIsDone = false,
  history = [],
  mode = Mode.Normal,
  sectionStates,
  onPress = () => () => {},
  selectedTileIndex = null,
}) => {
  const validSection = React.useMemo(
    () => getActiveSection(history, mode),
    [history, mode],
  );

  return (
    <Container testID="board__container">
      <Container
        flexDirection="row"
        flexWrap="wrap"
        padding="base"
        source={require('../assets/images/boardGrid.png')}
        testID="board__image--grid">
        {getSections(history).map((section, index) => (
          <Section
            activePlayer={getActivePlayer(history)}
            disabled={disabled}
            key={section.position}
            mode={mode}
            onPress={onPress}
            sectionState={sectionStates ? sectionStates[index] : undefined}
            selectedTileIndex={selectedTileIndex}
            tiles={section.tiles}
            valid={
              !gameIsDone &&
              (validSection !== null ? validSection === index : true)
            }
          />
        ))}
      </Container>
    </Container>
  );
};

export default Board;
