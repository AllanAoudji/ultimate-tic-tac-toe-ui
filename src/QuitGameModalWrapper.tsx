import React from 'react';
import {GestureResponderEvent} from 'react-native';

import QuitGameModal from './QuitGameModal';

interface Props {
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  visible?: boolean;
}

const QuitGameModalWrapper: React.FC<Props> = ({
  onPressNo = () => {},
  onPressYes = () => {},
  visible = false,
}) => {
  if (visible) {
    return <QuitGameModal onPressNo={onPressNo} onPressYes={onPressYes} />;
  }
  return null;
};

export default QuitGameModalWrapper;
