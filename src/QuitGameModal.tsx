import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';

import Container from './Container';
import Typography from './Typography';

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
  <Container testID="quitGameModal__container">
    <Typography>quit game?</Typography>
    <Pressable disabled={disabled} onPress={onPressYes}>
      <Typography>yes</Typography>
    </Pressable>
    <Pressable disabled={disabled} onPress={onPressNo}>
      <Typography>no</Typography>
    </Pressable>
    <Pressable
      disabled={disabled}
      onPress={onPressNo}
      testID="quitGameModal__background--pressable"
    />
  </Container>
);

export default QuitGameModal;
