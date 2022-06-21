import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
}

const PlayGameButton: React.FC<Props> = ({
  disabled = false,
  onPress = () => {},
  title,
}) => {
  const styles = React.useMemo(
    () => stylesPlayNormalGameButton({disabled}),
    [disabled],
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="playGameButton__container--pressable">
      <Text>{title}</Text>
    </Pressable>
  );
};

const stylesPlayNormalGameButton = ({disabled}: {disabled: boolean}) =>
  StyleSheet.create<{container: ViewStyle}>({
    container: {
      opacity: disabled ? 0.5 : 1,
    },
  });

export default PlayGameButton;
