import React from 'react';
import {v4 as uuidv4} from 'uuid';

import {fireEvent, render} from '@testing-library/react-native';
import GameHistory from '../src/GameHistory';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

const renderer = (
  options: {
    _id?: string;
    date?: string;
    disabled?: true;
    history?: number[];
    onPress?: () => void;
    surrend?: boolean;
    winner?: TileState.Player1 | TileState.Player2;
  } = {},
) => {
  const renderGameHistory = render(
    <GameHistory
      _id={options._id || uuidv4()}
      date={options.date || new Date().toISOString()}
      disabled={options.disabled}
      history={options.history || []}
      onPress={options.onPress}
      surrend={options.surrend}
      winner={options.winner || TileState.Player1}
    />,
  );

  const {queryByTestId, queryByText, getByTestId, getByText} =
    renderGameHistory;

  const queryText = (text: string) => queryByText(text);
  const queryDate = () => queryByTestId('gameHistory__date');

  const getContainer = () => getByTestId('gameHistory__container');
  const getDate = () => getByTestId('gameHistory__date');
  const getPressable = () => getByTestId('gameHistory__container--pressable');
  const getText = (text: string) => getByText(text);

  return {
    container: {
      query: {
        date: queryDate,
        text: queryText,
      },
      get: {
        container: getContainer,
        date: getDate,
        pressable: getPressable,
        text: getText,
      },
      press: {
        container: () => {
          fireEvent.press(getPressable());
        },
      },
    },
    render: renderGameHistory,
  };
};

describe('<GameHistory />', () => {
  it('displays a view', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('displays a Presable', () => {
    const {container} = renderer();
    expect(container.get.pressable).not.toBeNull();
  });

  it('calls /onPress/ with /_id/', () => {
    const _id = uuidv4();
    const onPress = jest.fn();
    const history = [0];
    const {container} = renderer({_id, history, onPress});
    container.press.container();
    expect(onPress).toHaveBeenCalledWith(_id);
  });

  it('do not calls /onPress/ if /disabled === true/', () => {
    const onPress = jest.fn();
    const history = [0];
    const {container} = renderer({disabled: true, history, onPress});
    container.press.container();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('do not calls /onPress/ if /history.length === 0/', () => {
    const onPress = jest.fn();
    const {container} = renderer({onPress});
    container.press.container();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('display the humain formatted date', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-01-02'));
    const date = new Date('2022-01-01').toISOString();
    const {container} = renderer({date});
    expect(container.query.text('there is a day ago')).not.toBeNull();
  });

  it('do not display date if /date/ is invalid', () => {
    const date = 'wrong date';
    const {container} = renderer({date});
    expect(container.query.date()).toBeNull();
  });

  it('displays /winner/', () => {
    const winner = TileState.Player1;
    const {container} = renderer({winner});
    expect(container.get.text('winner: X')).not.toBeNull();
  });

  it('displays /history.length/ with /move/', () => {
    const history: number[] = [];
    const {container} = renderer({history});
    expect(container.get.text('number of move: 0')).not.toBeNull();
  });

  it('displays /history.length/ with /moves/', () => {
    const history: number[] = [1, 1];
    const {container} = renderer({history});
    expect(container.get.text('number of moves: 2')).not.toBeNull();
  });

  it('displays /(surrend)/ if /surrend === true/', () => {
    const surrend = true;
    const {container} = renderer({surrend});
    expect(container.get.text('number of move: 0 (surrend)')).not.toBeNull();
  });
});
