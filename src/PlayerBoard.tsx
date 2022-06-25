import React from 'react';
import {GestureResponderEvent, useWindowDimensions} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Container from './Container';

import PlayButton from './PlayButton';
import SurrendButton from './SurrendButton';
import SurrendModalWrapper from './SurrendModalWrapper';

interface Props {
  disabledPlayButton?: boolean;
  disabledSurrendButton?: boolean;
  disabledSurrendModal?: boolean;
  onPressPlay?: ((event: GestureResponderEvent) => void) | null | undefined;
  onSurrend?: () => void;
  player?: TileState.Player1 | TileState.Player2;
  position?: 'TOP' | 'BOTTOM';
  setVisibleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  visibleModal?: boolean;
}

const PlayerBoard: React.FC<Props> = ({
  disabledPlayButton = false,
  disabledSurrendButton = false,
  disabledSurrendModal = false,
  onPressPlay = () => {},
  onSurrend = () => {},
  player = TileState.Player1,
  position = 'BOTTOM',
  setVisibleModal = () => {},
  visibleModal = false,
}) => {
  const {width, height} = useWindowDimensions();

  const onPressSurrend = React.useCallback(
    () => setVisibleModal(true),
    [setVisibleModal],
  );
  const onPressYes = React.useCallback(() => {
    setVisibleModal(false);
    onSurrend();
  }, [onSurrend, setVisibleModal]);
  const onPressNo = React.useCallback(
    () => setVisibleModal(false),
    [setVisibleModal],
  );

  return (
    <Container
      height={(height - width) / 2}
      justifyContent="space-between"
      paddingHorizontal="double"
      paddingVertical="double"
      rotate={position === 'TOP' ? '180deg' : '0deg'}
      testID="playerBoard__container">
      <Container
        opacity={disabledPlayButton ? 0.4 : 1}
        testID="playerBoard__container--opacity">
        <PlayButton
          disabled={disabledPlayButton || visibleModal}
          onPress={onPressPlay}
          player={player}
        />
      </Container>
      <Container alignItems="flex-end">
        <SurrendButton
          disabled={disabledSurrendButton || visibleModal}
          onPress={onPressSurrend}
          player={player}
        />
      </Container>
      <SurrendModalWrapper
        disabled={disabledSurrendModal}
        onPressNo={onPressNo}
        onPressYes={onPressYes}
        player={player}
        visible={visibleModal}
      />
    </Container>
  );
};

export default PlayerBoard;
