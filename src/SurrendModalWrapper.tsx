import React from 'react';
import {Animated, GestureResponderEvent, ViewStyle} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import SurrendModal from './SurrendModal';

interface Props {
  disabled?: boolean;
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
  visible?: boolean;
}

const SurrendModalWrapper: React.FC<Props> = ({
  disabled = false,
  onPressNo = () => {},
  onPressYes = () => {},
  player = TileState.Player1,
  visible = false,
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
            outputRange: [0.96, 1],
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
    if (!show && visible) {
      setShow(true);
      fadeIn();
    }
    if (show && !visible) {
      fadeOut();
    }
  }, [fadeIn, fadeOut, show, visible]);

  if (show) {
    return (
      <Animated.View
        style={animatedStyle}
        testID="surrendModalWrapper__container--animated">
        <SurrendModal
          disabled={disabled}
          onPressNo={onPressNo}
          onPressYes={onPressYes}
          player={player}
        />
      </Animated.View>
    );
  }
  return null;
};

export default SurrendModalWrapper;
