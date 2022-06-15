import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import SurrendIcon from './SurrendIcon';

interface Props {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  player?: TileState.Player1 | TileState.Player2;
}

const SurrendButton: React.FC<Props> = ({
  disabled,
  onPress = () => {},
  player = TileState.Player1,
}) => {
  const styles = React.useMemo(() => surrendBUttonStyles({player}), [player]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
      testID="surrendButton__container--pressable">
      <SurrendIcon player={player} />
    </Pressable>
  );
};

const surrendBUttonStyles = ({
  player,
}: {
  player: TileState.Player1 | TileState.Player2;
}) =>
  StyleSheet.create<{container: ViewStyle}>({
    container: {
      alignItems: 'center',
      borderColor: player === TileState.Player2 ? '#ed1327' : '#0012ff',
      borderWidth: 4,
      borderRadius: 50,
      justifyContent: 'center',
      padding: 7,
    },
  });

export default SurrendButton;
