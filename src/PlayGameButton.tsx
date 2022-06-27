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
  color?: keyof Theming.ColorTheme;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  marginBottom?: keyof Theming.SpacingTheme;
  marginTop?: keyof Theming.SpacingTheme;
  marginVertical?: keyof Theming.SpacingTheme;
  title: string;
}

const PlayGameButton: React.FC<Props> = ({
  backgroundColor,
  color,
  disabled = false,
  onPress = () => {},
  marginBottom,
  marginTop,
  marginVertical,
  title,
}) => {
  const {theme} = React.useContext(ThemeContext);

  const defaultColor = React.useMemo<keyof Theming.ColorTheme>(
    () => color || 'onSurface',
    [color],
  );
  const stylesProps = React.useMemo(
    () =>
      stylesPlayGameButton({
        backgroundColor,
        disabled,
        marginBottom,
        marginTop,
        marginVertical,
      }),
    [backgroundColor, disabled, marginBottom, marginTop, marginVertical],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="playGameButton__container--pressable">
      <Typography color={defaultColor} textTransform="capitalize">
        {title}
      </Typography>
    </Pressable>
  );
};

const stylesPlayGameButton =
  ({
    backgroundColor,
    disabled,
    marginBottom,
    marginTop,
    marginVertical,
  }: {
    backgroundColor?: keyof Theming.ColorTheme;
    disabled: boolean;
    marginBottom?: keyof Theming.SpacingTheme;
    marginTop?: keyof Theming.SpacingTheme;
    marginVertical?: keyof Theming.SpacingTheme;
  }) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{container: ViewStyle}>({
      container: {
        alignItems: 'center',
        backgroundColor: backgroundColor
          ? theme.color[backgroundColor]
          : theme.color.playerX,
        borderRadius: 100,
        marginBottom: marginBottom ? theme.spacing[marginBottom] : undefined,
        marginTop: marginTop ? theme.spacing[marginTop] : undefined,
        marginVertical: marginVertical
          ? theme.spacing[marginVertical]
          : undefined,
        opacity: disabled ? 0.4 : 1,
        paddingVertical: theme.spacing.largest,
        width: '100%',
      },
    });

export default PlayGameButton;
