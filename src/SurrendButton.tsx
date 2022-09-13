import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import Container from './Container';

import {ThemeContext} from './Theme.context';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendButton: React.FC<Props> = ({
  disabled,
  onPress,
  player = TileState.Player1,
}) => {
  const {theme} = React.useContext(ThemeContext);
  const styles = React.useMemo(() => surrendButtonStyles(theme), [theme]);

  const opacity = React.useMemo(() => {
    if (!onPress || disabled) {
      return 0.4;
    }
    return undefined;
  }, [onPress, disabled]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="surrendButton__container--pressable">
      <Container opacity={opacity} testID="surrendButton__container--inner">
        {player === TileState.Player1 ? (
          <Image
            source={require('../assets/images/surrend_button_blue.png')}
            testID="surrendButton__image"
          />
        ) : (
          <Image
            source={require('../assets/images/surrend_button_red.png')}
            testID="surrendButton__image"
          />
        )}
      </Container>
    </Pressable>
  );
};

const surrendButtonStyles = (theme: Theming.Theme) =>
  StyleSheet.create<{container: ViewStyle}>({
    container: {
      alignItems: 'center',
      height: 50,
      justifyContent: 'center',
      padding: theme.spacing.normal,
      width: 50,
    },
  });

export default SurrendButton;
