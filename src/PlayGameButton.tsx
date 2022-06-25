import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Typography from './Typography';

interface Props {
  backgroundColor?: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
}

const PlayGameButton: React.FC<Props> = ({
  backgroundColor = '#0012ff',
  disabled = false,
  onPress = () => {},
  title,
}) => {
  const styles = React.useMemo(
    () => stylesPlayNormalGameButton({backgroundColor, disabled}),
    [backgroundColor, disabled],
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="playGameButton__container--pressable">
      <Typography>{title}</Typography>
    </Pressable>
  );
};

const stylesPlayNormalGameButton = ({
  backgroundColor,
  disabled,
}: {
  backgroundColor: string;
  disabled: boolean;
}) =>
  StyleSheet.create<{container: ViewStyle}>({
    container: {
      backgroundColor,
      opacity: disabled ? 0.5 : 1,
    },
  });

export default PlayGameButton;
