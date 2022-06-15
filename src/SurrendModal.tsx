import React from 'react';
import {View, Text, Pressable, GestureResponderEvent} from 'react-native';

interface Props {
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const SurrendModal: React.FC<Props> = ({
  onPressNo = () => {},
  onPressYes = () => {},
}) => (
  <View>
    <Text>Surrend?</Text>
    <Pressable onPress={onPressYes}>
      <Text>yes</Text>
    </Pressable>
    <Pressable onPress={onPressNo}>
      <Text>no</Text>
    </Pressable>
  </View>
);

export default SurrendModal;
