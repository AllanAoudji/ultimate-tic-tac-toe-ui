import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

import Container from './Container';
import {ThemeContext} from './Theme.context';
import Typography from './Typography';

interface Props {
  activeThumbBackgroundColor?: keyof Theming.ColorTheme;
  activeTrackBackgroundColor?: keyof Theming.ColorTheme;
  disabled?: boolean;
  inactiveThumbBackgroundColor?: keyof Theming.ColorTheme;
  inactiveTrackBackgroundColor?: keyof Theming.ColorTheme;
  label?: string;
  margin?: keyof Theming.SpacingTheme;
  marginBottom?: keyof Theming.SpacingTheme;
  marginHorizontal?: keyof Theming.SpacingTheme;
  marginLeft?: keyof Theming.SpacingTheme;
  marginRight?: keyof Theming.SpacingTheme;
  marginTop?: keyof Theming.SpacingTheme;
  marginVertical?: keyof Theming.SpacingTheme;
  onPress?: (state: boolean) => void;
  state?: boolean;
}

const ToggleButton: React.FC<Props> = ({
  activeThumbBackgroundColor,
  activeTrackBackgroundColor,
  disabled,
  inactiveThumbBackgroundColor,
  inactiveTrackBackgroundColor,
  label,
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  onPress,
  state = false,
}) => {
  const {theme} = React.useContext(ThemeContext);

  const containerOpacity = React.useMemo(() => {
    if (disabled || !onPress) {
      return 0.4;
    }
    return undefined;
  }, [disabled, onPress]);
  const propsStyles = React.useMemo(
    () =>
      toggleButtonStyles({
        activeThumbBackgroundColor,
        inactiveThumbBackgroundColor,
        state,
      }),
    [activeThumbBackgroundColor, inactiveThumbBackgroundColor, state],
  );
  const styles = React.useMemo(() => propsStyles(theme), [propsStyles, theme]);

  const trackBackgroundColor = React.useMemo<keyof Theming.ColorTheme>(() => {
    if (state) {
      return activeTrackBackgroundColor || 'grey';
    } else {
      return inactiveTrackBackgroundColor || 'grey';
    }
  }, [activeTrackBackgroundColor, inactiveTrackBackgroundColor, state]);

  const handlePress = React.useCallback(() => {
    if (onPress) {
      if (state) {
        onPress(false);
      } else {
        onPress(true);
      }
    }
  }, [onPress, state]);

  return (
    <Container
      margin={margin}
      marginBottom={marginBottom}
      marginHorizontal={marginHorizontal}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginVertical={marginVertical}
      opacity={containerOpacity}
      testID="toggleButton__container">
      {label && <Typography>{label}</Typography>}
      <Pressable
        disabled={disabled}
        onPress={handlePress}
        testID="toggleButton__pressable">
        <Container
          backgroundColor={trackBackgroundColor}
          testID="toggleButton__track">
          <View style={styles.track} testID="toggleButton__thumb" />
        </Container>
      </Pressable>
    </Container>
  );
};

const toggleButtonStyles =
  ({
    activeThumbBackgroundColor,
    inactiveThumbBackgroundColor,
    state,
  }: {
    activeThumbBackgroundColor?: keyof Theming.ColorTheme;
    inactiveThumbBackgroundColor?: keyof Theming.ColorTheme;
    state: boolean;
  }) =>
  (theme: Theming.Theme) => {
    let trackBackgroundColor: keyof Theming.ColorTheme;
    if (state) {
      trackBackgroundColor = activeThumbBackgroundColor || 'white';
    } else {
      trackBackgroundColor = inactiveThumbBackgroundColor || 'white';
    }

    return StyleSheet.create<{track: ViewStyle}>({
      track: {
        backgroundColor: theme.color[trackBackgroundColor],
        left: state ? 100 : 0,
      },
    });
  };

export default ToggleButton;
