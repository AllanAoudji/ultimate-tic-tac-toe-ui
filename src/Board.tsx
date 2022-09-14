import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {
  getSections,
  getActiveSection,
  getActivePlayer,
  Mode,
  SectionState,
  TileState,
  WinningLine,
} from 'ultimate-tic-tac-toe-algorithm';

import Container from './Container';
import GameAsset from './GameAsset';
import Section from './Section';

interface Props {
  disabled?: boolean;
  gameIsDone?: boolean;
  history?: number[];
  mode?: Mode;
  onAnimationFinish?: () => void;
  onPress?: (
    index: number,
  ) => ((event?: GestureResponderEvent) => void) | null | undefined;
  sectionStates?: SectionState[];
  selectedTileIndex?: number | null;
  winner?: SectionState;
}
interface WinningImageProps {
  onAnimationFinish?: () => void;
  state: SectionState;
}

const WinningImage: React.FC<WinningImageProps> = ({
  onAnimationFinish,
  state,
}) => {
  const type = React.useMemo(() => {
    switch (state[1]) {
      case WinningLine.BottomRow:
        if (state[0] === TileState.Player1) {
          return 'LBottomBlue';
        }
        return 'LBottomRed';
      case WinningLine.LeftColumn:
        if (state[0] === TileState.Player1) {
          return 'LLeftBlue';
        }
        return 'LLeftRed';
      case WinningLine.MiddleColumn:
        if (state[0] === TileState.Player1) {
          return 'LMiddleVerticalBlue';
        }
        return 'LMiddleVerticalRed';
      case WinningLine.MiddleRow:
        if (state[0] === TileState.Player1) {
          return 'LMiddleHorizontalBlue';
        }
        return 'LMiddleHorizontalRed';
      case WinningLine.RightColumn:
        if (state[0] === TileState.Player1) {
          return 'LRightBlue';
        }
        return 'LRightRed';
      case WinningLine.TopLeftBottomRightDiagonal:
        if (state[0] === TileState.Player1) {
          return 'LDiagonalTopLeftBottomRightBlue';
        }
        return 'LDiagonalTopLeftBottomRightRed';
      case WinningLine.TopRightBottomLeftDiagonal:
        if (state[0] === TileState.Player1) {
          return 'LDiagonalTopRightBottomLeftBlue';
        }
        return 'LDiagonalTopRightBottomLeftRed';
      case WinningLine.TopRow:
        if (state[0] === TileState.Player1) {
          return 'LTopBlue';
        }
        return 'LTopRed';
      default:
        return null;
    }
  }, [state]);

  if (!type) {
    return null;
  }
  return (
    <Container height="100%" position="absolute" width="100%">
      <GameAsset
        onAnimationFinish={onAnimationFinish}
        type={type}
        state="PLAY"
      />
    </Container>
  );
};

const Board: React.FC<Props> = ({
  disabled = false,
  gameIsDone = false,
  history = [],
  mode = Mode.Normal,
  onAnimationFinish,
  sectionStates,
  onPress = () => () => {},
  selectedTileIndex = null,
  winner = [TileState.Empty, null],
}) => {
  const validSection = React.useMemo(
    () => getActiveSection(history, mode),
    [history, mode],
  );

  // Call onAnimationFinish if game is done
  // even if it's a draw or a surrend
  // without this useEffect
  // onAnimationFinish is only trigger if a <GameAsset /> is render,
  // so, only if the game is won with a line.
  React.useEffect(() => {
    if (
      (winner[0] === TileState.Draw || winner[1] === WinningLine.Surrender) &&
      onAnimationFinish
    ) {
      onAnimationFinish();
    }
  }, [onAnimationFinish, winner]);

  return (
    <Container testID="board__container">
      <Container
        flexDirection="row"
        flexWrap="wrap"
        padding="normal"
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
      {(winner[0] === TileState.Player1 || winner[0] === TileState.Player2) && (
        <WinningImage onAnimationFinish={onAnimationFinish} state={winner} />
      )}
    </Container>
  );
};

export default React.memo(Board);
