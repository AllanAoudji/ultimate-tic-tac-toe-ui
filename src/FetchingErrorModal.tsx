import React from 'react';
import {GestureResponderEvent, Pressable, Text, View} from 'react-native';

type props = {
  disabledClose?: boolean;
  disabledTryAgain?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressClose?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
};

const FetchingErrorModal: React.FC<props> = ({
  disabledClose = false,
  disabledTryAgain = false,
  onPress,
  onPressClose,
  text,
}) => {
  const handlePressClose = React.useCallback(
    (event: GestureResponderEvent) => {
      if (onPressClose) {
        onPressClose(event);
      }
    },
    [onPressClose],
  );
  const handlePressTryAgain = React.useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        onPress(event);
      }
    },
    [onPress],
  );

  return (
    <Pressable
      disabled={disabledClose}
      onPress={handlePressClose}
      testID="fetchingErrorModal__container--pressable">
      <View testID="fetchingErrorModal__container--close">
        <Text>x</Text>
      </View>
      <Text>{text}</Text>
      {onPress && (
        <Pressable disabled={disabledTryAgain} onPress={handlePressTryAgain}>
          <Text>try again?</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default FetchingErrorModal;
