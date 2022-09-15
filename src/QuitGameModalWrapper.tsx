import React from 'react';
import {Animated, GestureResponderEvent, ViewStyle} from 'react-native';

import QuitGameModal from './QuitGameModal';

interface Props {
  disabled?: boolean;
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  visible?: boolean;
}

const QuitGameModalWrapper: React.FC<Props> = ({
  disabled = false,
  onPressNo = () => {},
  onPressYes = () => {},
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
        testID="quitGameModalWrapper__container--animated">
        <QuitGameModal
          disabled={disabled}
          onPressNo={onPressNo}
          onPressYes={onPressYes}
        />
      </Animated.View>
    );
  }
  return null;
};

export default QuitGameModalWrapper;
