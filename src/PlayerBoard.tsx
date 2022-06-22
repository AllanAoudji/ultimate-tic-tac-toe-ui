import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import PlayButton from './PlayButton';
import SurrendButton from './SurrendButton';
import SurrendModalWrapper from './SurrendModalWrapper';

interface Props {
  disabledNoButton?: boolean;
  disabledPlayButton?: boolean;
  disabledSurrendButton?: boolean;
  disabledYesButton?: boolean;
  onPressPlay?: ((event: GestureResponderEvent) => void) | null | undefined;
  onSurrend?: () => void;
  player?: TileState.Player1 | TileState.Player2;
  position?: 'TOP' | 'BOTTOM';
  setVisibleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  visibleModal?: boolean;
}

const PlayerBoard: React.FC<Props> = ({
  disabledNoButton = false,
  disabledPlayButton = false,
  disabledSurrendButton = false,
  disabledYesButton = false,
  onPressPlay = () => {},
  onSurrend = () => {},
  player = TileState.Player1,
  position = 'BOTTOM',
  setVisibleModal = () => {},
  visibleModal = false,
}) => {
  const {width, height} = useWindowDimensions();

  const styles = React.useMemo(
    () => playerBoardStyles({disabledPlayButton, height, position, width}),
    [disabledPlayButton, height, position, width],
  );

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
    <View style={styles.container} testID="playerBoard__container">
      <View
        style={styles.containerOpacity}
        testID="playerBoard__container--opacity">
        <PlayButton
          disabled={disabledPlayButton || visibleModal}
          onPress={onPressPlay}
          player={player}
        />
      </View>
      <View style={styles.containerSurrendButton}>
        <SurrendButton
          disabled={disabledSurrendButton || visibleModal}
          onPress={onPressSurrend}
          player={player}
        />
      </View>
      <SurrendModalWrapper
        disabledNoButton={disabledNoButton}
        disabledYesButton={disabledYesButton}
        onPressNo={onPressNo}
        onPressYes={onPressYes}
        player={player}
        visible={visibleModal}
      />
    </View>
  );
};

const playerBoardStyles = ({
  disabledPlayButton,
  height,
  position,
  width,
}: {
  disabledPlayButton: boolean;
  height: number;
  position: 'BOTTOM' | 'TOP';
  width: number;
}) =>
  StyleSheet.create<{
    container: ViewStyle;
    containerOpacity: ViewStyle;
    containerSurrendButton: ViewStyle;
  }>({
    container: {
      height: (height - width) / 2,
      justifyContent: 'space-between',
      paddingHorizontal: 40,
      paddingVertical: 20,
      transform: [{rotate: position === 'TOP' ? '180deg' : '0deg'}],
    },
    containerOpacity: {
      opacity: disabledPlayButton ? 0.5 : 1,
    },
    containerSurrendButton: {
      alignItems: 'flex-end',
    },
  });

export default PlayerBoard;
