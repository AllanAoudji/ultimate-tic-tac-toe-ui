import React from 'react';
import {GestureResponderEvent, Pressable, Text, View} from 'react-native';

interface Props {
  disabled?: boolean;
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const QuitGameModal: React.FC<Props> = ({
  disabled = false,
  onPressNo = () => {},
  onPressYes = () => {},
}) => (
  <View testID="quitGameModal__container">
    <Text>quit game?</Text>
    <Pressable disabled={disabled} onPress={onPressYes}>
      <Text>yes</Text>
    </Pressable>
    <Pressable disabled={disabled} onPress={onPressNo}>
      <Text>no</Text>
    </Pressable>
    <Pressable
      disabled={disabled}
      onPress={onPressNo}
      testID="quitGameModal__background--pressable"
    />
  </View>
);

export default QuitGameModal;
