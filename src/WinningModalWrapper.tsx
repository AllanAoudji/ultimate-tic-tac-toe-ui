import React from 'react';
import {Animated, GestureResponderEvent, ViewStyle} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import WinningModal from './WinningModal';

interface Props {
  disabled?: boolean;
  onPressQuit?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressNewGame?: ((event: GestureResponderEvent) => void) | null | undefined;
  visible?: boolean;
  winner?: TileState;
}

const WinningModalWrapper: React.FC<Props> = ({
  disabled = false,
  onPressNewGame,
  onPressQuit,
  visible = false,
  winner = TileState.Empty,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0));

  const [show, setShow] = React.useState<boolean>(false);

  const animatedStyle = React.useMemo<Animated.WithAnimatedObject<ViewStyle>>(
    () => ({
      opacity: fadeAnim.current,
      position: 'absolute',
      transform: [
        {
          scale: fadeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [1.04, 1],
          }),
        },
      ],
    }),
    [],
  );

  const fadeIn = React.useCallback(() => {
    Animated.timing(fadeAnim.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const fadeOut = React.useCallback(() => {
    Animated.timing(fadeAnim.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setShow(false);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!show && visible && winner !== TileState.Empty) {
      setShow(true);
      fadeIn();
    }
    if (show && (!visible || winner === TileState.Empty)) {
      fadeOut();
    }
  }, [fadeIn, fadeOut, show, visible, winner]);

  if (!show || winner === TileState.Empty) {
    return null;
  }

  return (
    <Animated.View
      style={animatedStyle}
      testID="winningModalWrapper__container--animated">
      <WinningModal
        disabled={disabled}
        onPressNewGame={onPressNewGame}
        onPressQuit={onPressQuit}
        winner={winner}
      />
    </Animated.View>
  );
};

export default WinningModalWrapper;
