import React from 'react';
import {GestureResponderEvent, Pressable, Text, View} from 'react-native';

interface Props {
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const QuitGameModal: React.FC<Props> = ({
  onPressNo = () => {},
  onPressYes = () => {},
}) => (
  <View testID="quitGameModal__container">
    <Text>quit game?</Text>
    <Pressable onPress={onPressYes}>
      <Text>yes</Text>
    </Pressable>
    <Pressable onPress={onPressNo}>
      <Text>no</Text>
    </Pressable>
    <Pressable
      onPress={onPressNo}
      testID="quitGameModal__background--pressable"
    />
  </View>
);

export default QuitGameModal;
