import React from 'react';
import {GestureResponderEvent} from 'react-native';
import SurrendModal from './SurrendModal';

interface Props {
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
  visible?: boolean;
}

const SurrendModalWrapper: React.FC<Props> = ({
  onPressNo = () => {},
  onPressYes = () => {},
  visible = false,
}) => {
  if (visible) {
    return <SurrendModal onPressNo={onPressNo} onPressYes={onPressYes} />;
  }
  return null;
};

export default SurrendModalWrapper;
