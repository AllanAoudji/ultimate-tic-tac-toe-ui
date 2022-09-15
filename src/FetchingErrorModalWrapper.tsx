import React from 'react';
import {Animated, ViewStyle} from 'react-native';
import FetchingErrorModal from './FetchingErrorModal';

type props = {
  error: string;
  onPress?: () => void;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
};

const FetchingErrorModalWrapper: React.FC<props> = ({
  error,
  onPress,
  setVisible,
  visible = false,
}) => {
  const delay = React.useRef<NodeJS.Timeout | null>(null);
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
  const handlePressClose = React.useCallback(() => {
    if (setVisible) {
      setVisible(false);
    }
  }, [setVisible]);

  React.useEffect(() => {
    if (!show && visible) {
      delay.current = setTimeout(() => handlePressClose(), 3000);
      setShow(true);
      fadeIn();
    }
    if (show && !visible) {
      fadeOut();
      if (delay.current) {
        clearTimeout(delay.current);
        delay.current = null;
      }
    }
  }, [fadeIn, fadeOut, handlePressClose, show, visible]);

  // when component unmount
  // clean timer
  React.useEffect(
    () => () => {
      if (delay.current) {
        clearTimeout(delay.current);
      }
    },
    [],
  );

  if (show) {
    return (
      <Animated.View
        style={animatedStyle}
        testID="fetchingErrorModalWrapper__container--animated">
        <FetchingErrorModal
          onPress={onPress}
          onPressClose={handlePressClose}
          text={error}
        />
      </Animated.View>
    );
  }

  return null;
};

export default FetchingErrorModalWrapper;
