import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface Props {
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
}

const PlayGameButton: React.FC<Props> = ({
  backgroundColor = '#0012ff',
  color = '#fff',
  disabled = false,
  onPress = () => {},
  title,
}) => {
  const styles = React.useMemo(
    () => stylesPlayNormalGameButton({backgroundColor, color, disabled}),
    [backgroundColor, color, disabled],
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="playGameButton__container--pressable">
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const stylesPlayNormalGameButton = ({
  backgroundColor,
  color,
  disabled,
}: {
  backgroundColor: string;
  color: string;
  disabled: boolean;
}) =>
  StyleSheet.create<{container: ViewStyle; title: TextStyle}>({
    container: {
      backgroundColor,
      opacity: disabled ? 0.5 : 1,
    },
    title: {
      color,
    },
  });

export default PlayGameButton;
