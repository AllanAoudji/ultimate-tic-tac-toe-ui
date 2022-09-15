import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import Container from './Container';
import {ThemeContext} from './Theme.context';
import Typography from './Typography';

interface Props {
  disabled?: boolean;
  onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const QuitGameModal: React.FC<Props> = ({
  disabled = false,
  onPressNo = () => {},
  onPressYes = () => {},
}) => {
  const {theme} = React.useContext(ThemeContext);
  const styles = React.useMemo(() => quitGameModalStyles(theme), [theme]);
  return (
    <Container
      alignItems="center"
      flex={1}
      justifyContent="center"
      testID="quitGameModal__container">
      <Pressable
        disabled={disabled}
        onPress={onPressNo}
        style={styles.background}
        testID="quitGameModal__background--pressable"
      />
      <Container alignItems="center" padding="normal" width="100%">
        <Container
          alignItems="center"
          backgroundColor="surface"
          borderColor="onSurface"
          borderRadius={16}
          borderWidth={2}
          margin="large"
          paddingTop="largest"
          width="100%">
          <Typography fontSize="larger" textTransform="uppercase">
            quit game?
          </Typography>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            marginTop="large"
            width="100%">
            <Pressable
              disabled={disabled}
              onPress={onPressYes}
              style={styles.button}>
              <Typography fontSize="largest">yes</Typography>
            </Pressable>
            <Pressable
              disabled={disabled}
              onPress={onPressNo}
              style={styles.button}>
              <Typography fontSize="largest">no</Typography>
            </Pressable>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

const quitGameModalStyles = (theme: Theming.Theme) =>
  StyleSheet.create<{background: ViewStyle; button: ViewStyle}>({
    background: {
      backgroundColor: theme.color.blackTransparent,
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    button: {
      paddingBottom: theme.spacing.largest,
      paddingHorizontal: theme.spacing.large,
      paddingTop: theme.spacing.normal,
    },
  });

export default QuitGameModal;
