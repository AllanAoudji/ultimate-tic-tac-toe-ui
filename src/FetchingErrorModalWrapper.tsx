import React from 'react';
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
  const handlePressClose = React.useCallback(() => {
    if (setVisible) {
      setVisible(false);
    }
  }, [setVisible]);

  const delay = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (visible) {
      delay.current = setTimeout(() => handlePressClose(), 3000);
    } else {
      if (delay.current) {
        clearTimeout(delay.current);
        delay.current = null;
      }
    }
    return () => {
      if (delay.current) {
        clearTimeout(delay.current);
      }
    };
  }, [handlePressClose, visible]);

  if (visible) {
    return (
      <FetchingErrorModal
        onPress={onPress}
        onPressClose={handlePressClose}
        text={error}
      />
    );
  }
  return null;
};

export default FetchingErrorModalWrapper;
