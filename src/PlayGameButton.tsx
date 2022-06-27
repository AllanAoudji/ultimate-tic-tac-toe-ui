import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {ThemeContext} from './Theme.context';
import Typography from './Typography';

interface Props {
  backgroundColor?: keyof Theming.ColorTheme;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
}

const PlayGameButton: React.FC<Props> = ({
  backgroundColor,
  disabled = false,
  onPress = () => {},
  title,
}) => {
  const {theme} = React.useContext(ThemeContext);
  const stylesProps = React.useMemo(
    () => stylesPlayGameButton({backgroundColor, disabled}),
    [backgroundColor, disabled],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

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

const stylesPlayGameButton =
  ({
    backgroundColor,
    disabled,
  }: {
    backgroundColor?: keyof Theming.ColorTheme;
    disabled: boolean;
  }) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{container: ViewStyle}>({
      container: {
        backgroundColor: backgroundColor
          ? theme.color[backgroundColor]
          : theme.color.playerX,
        opacity: disabled ? 0.4 : 1,
      },
    });

export default PlayGameButton;
