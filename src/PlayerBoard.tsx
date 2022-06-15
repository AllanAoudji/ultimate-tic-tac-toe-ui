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
  disabled?: boolean;
  onPressPlay?: ((event: GestureResponderEvent) => void) | null | undefined;
  onSurrend?: () => void;
  player?: TileState.Player1 | TileState.Player2;
  position?: 'TOP' | 'BOTTOM';
}

const PlayerBoard: React.FC<Props> = ({
  disabled = false,
  onPressPlay = () => {},
  onSurrend = () => {},
  player = TileState.Player1,
  position = 'BOTTOM',
}) => {
  const {width, height} = useWindowDimensions();

  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);

  const styles = React.useMemo(
    () => playerBoardStyles({disabled, height, position, width}),
    [disabled, height, position, width],
  );

  const onPressSurrend = React.useCallback(() => setVisibleModal(true), []);
  const onPressYes = React.useCallback(() => {
    setVisibleModal(false);
    onSurrend();
  }, [onSurrend]);
  const onPressNo = React.useCallback(() => setVisibleModal(false), []);

  return (
    <View style={styles.container} testID="playerBoard__container">
      <View
        style={styles.containerOpacity}
        testID="playerBoard__container--opacity">
        <PlayButton
          disabled={disabled || visibleModal}
          onPress={onPressPlay}
          player={player}
        />
      </View>
      <View style={styles.containerSurrendButton}>
        <SurrendButton
          disabled={visibleModal}
          onPress={onPressSurrend}
          player={player}
        />
      </View>
      <SurrendModalWrapper
        onPressNo={onPressNo}
        onPressYes={onPressYes}
        player={player}
        visible={visibleModal}
      />
    </View>
  );
};

const playerBoardStyles = ({
  disabled,
  height,
  position,
  width,
}: {
  disabled: boolean;
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
      opacity: disabled ? 0.5 : 1,
    },
    containerSurrendButton: {
      alignItems: 'flex-end',
    },
  });

export default PlayerBoard;
