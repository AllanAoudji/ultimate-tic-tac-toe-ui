import moment from 'moment';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

type Props = {
  _id: string;
  date: string;
  disabled?: boolean;
  history: number[];
  onPress?: (_id: string) => void;
  surrend?: boolean;
  winner: TileState.Player1 | TileState.Player2;
};

const GameHistory: React.FC<Props> = ({
  _id,
  date,
  disabled = false,
  history,
  onPress,
  surrend = false,
  winner,
}) => {
  const handlePress = React.useCallback(() => {
    if (onPress && history.length > 0) {
      onPress(_id);
    }
  }, [_id, history, onPress]);

  const formattedHistory = React.useMemo(() => {
    return `number of move${history.length > 0 ? 's' : ''}: ${history.length} ${
      surrend ? '(surrend)' : ''
    }`;
  }, [history, surrend]);
  const formattedWinner = React.useMemo(() => {
    let OOrX: 'O' | 'X';
    if (winner === TileState.Player1) {
      OOrX = 'X';
    } else {
      OOrX = 'O';
    }
    return `winner: ${OOrX}`;
  }, [winner]);
  const validDate = React.useMemo(() => {
    const timestamp = Date.parse(date);
    if (isNaN(timestamp) === false && moment(date).isValid()) {
      return `there is ${moment(date).fromNow()}`;
    } else {
      return null;
    }
  }, [date]);

  return (
    <View testID="gameHistory__container">
      <Pressable
        disabled={disabled}
        onPress={handlePress}
        testID="gameHistory__container--pressable">
        <Text>{formattedWinner}</Text>
        <Text>{formattedHistory}</Text>
        {validDate && <Text testID="gameHistory__date">{validDate}</Text>}
      </Pressable>
    </View>
  );
};

export default GameHistory;
