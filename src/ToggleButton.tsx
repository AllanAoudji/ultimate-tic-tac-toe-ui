import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

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
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  state?: boolean;
}

const ToggleButton: React.FC<Props> = ({
  activeThumbBackgroundColor,
  activeTrackBackgroundColor,
  disabled = false,
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
    if (!onPress) {
      return 0.4;
    }
    return undefined;
  }, [onPress]);
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

  return (
    <Container
      alignItems="center"
      flexDirection="row"
      margin={margin}
      marginBottom={marginBottom}
      marginHorizontal={marginHorizontal}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginVertical={marginVertical}
      testID="toggleButton__container">
      {label && <Typography>{label}</Typography>}
      <Container
        marginLeft="normal"
        opacity={containerOpacity}
        testID="toggleButton__container--inner">
        <Pressable
          disabled={disabled}
          onPress={onPress}
          style={styles.pressable}
          testID="toggleButton__pressable">
          <Container
            backgroundColor={trackBackgroundColor}
            borderRadius={8}
            height={14}
            testID="toggleButton__track"
            width="100%">
            <View style={styles.thumb} testID="toggleButton__thumb" />
          </Container>
        </Pressable>
      </Container>
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

    return StyleSheet.create<{
      pressable: ViewStyle;
      thumb: ViewStyle;
    }>({
      pressable: {
        height: 20,
        justifyContent: 'center',
        width: 50,
      },
      thumb: {
        ...theme.shadow.base,
        backgroundColor: theme.color[trackBackgroundColor],
        borderRadius: 10,
        height: 20,
        left: state ? 30 : 0,
        position: 'absolute',
        top: -3,
        width: 20,
      },
    });
  };

export default ToggleButton;
