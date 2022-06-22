import React from 'react';
import {GestureResponderEvent} from 'react-native';

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
  if (visible) {
    return (
      <QuitGameModal
        disabled={disabled}
        onPressNo={onPressNo}
        onPressYes={onPressYes}
      />
    );
  }
  return null;
};

export default QuitGameModalWrapper;
