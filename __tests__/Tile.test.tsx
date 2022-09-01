import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import {getDisabled} from './testUtils';

import Tile from '../src/Tile';

const mockAsset = jest.fn();
jest.mock('../src/Asset', () => (props: any) => {
  const {View} = require('react-native');
  mockAsset(props);
  return <View {...props} />;
});

const renderer = (
  options: {
    activePlayer?: TileState.Player1 | TileState.Player2;
    onPress?:
      | ((event?: GestureResponderEvent | undefined) => void)
      | null
      | undefined;
    selected?: boolean;
    state?: TileState;
    valid?: boolean;
  } = {},
) => {
  const renderTile = render(
    <Tile
      activePlayer={options.activePlayer}
      onPress={options.onPress}
      selected={options.selected}
      state={options.state}
      valid={options.valid}
    />,
  );

  const {getByTestId} = renderTile;

  const getContainer = () => getByTestId('tile__container--pressable');

  return {
    container: {
      get: {
        container: getContainer,
      },
      press: {
        container: () => {
          fireEvent.press(getContainer());
        },
      },
    },
    render: renderTile,
  };
};

describe('<Tile />', () => {
  beforeEach(() => {
    mockAsset.mockClear();
  });

  it('renders a <Pressable />', () => {
    const onPress = jest.fn();
    const {container} = renderer({onPress});
    container.press.container();
    expect(onPress).toHaveBeenCalled();
  });

  it('renders an <Asset /> with /margin === "smaller"/', () => {
    renderer();
    expect(mockAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        margin: 'smaller',
      }),
    );
  });

  it('renders <Asset /> with /disabled === true/ if /selected === true/', () => {
    const {container} = renderer({
      activePlayer: TileState.Player1,
      selected: true,
    });
    container.press.container();
    expect(mockAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        state: 'VISIBLE',
        type: 'X1',
      }),
    );
  });

  it('<Asset /> with /disabled === true/ should be based on the /activePlayer/', () => {
    const {container} = renderer({
      activePlayer: TileState.Player2,
      selected: true,
    });
    container.press.container();
    expect(mockAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        state: 'VISIBLE',
        type: 'O1',
      }),
    );
  });

  it('disables <Tile /> if /disabled === true/', () => {
    const {container} = renderer({
      selected: true,
    });
    expect(getDisabled(container.get.container())).toBe(true);
  });

  describe('renders <Asset /> with /type === ', () => {
    it('"X1"/ if /state === player1/', () => {
      renderer({state: TileState.Player1});
      expect(mockAsset).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          state: 'PLAY',
          type: 'X1',
        }),
      );
    });

    it('"O1"/ if /state === player2/', () => {
      renderer({state: TileState.Player2});
      expect(mockAsset).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          state: 'PLAY',
          type: 'O1',
        }),
      );
    });
  });

  describe('does not renders <Asset /> (/state === "EMPTY"/) if', () => {
    it('/state === Empty/', () => {
      renderer({state: TileState.Empty});
      expect(mockAsset).toHaveBeenCalledWith(
        expect.objectContaining({
          state: 'EMPTY',
        }),
      );
    });

    it('/selected === false/', () => {
      renderer({selected: false});
      expect(mockAsset).toHaveBeenCalledWith(
        expect.objectContaining({
          state: 'EMPTY',
        }),
      );
    });
  });

  describe('does not calls /onPress/ if', () => {
    it('/selected === true/', () => {
      const onPress = jest.fn();
      const {container} = renderer({onPress, selected: true});
      container.press.container();
      expect(onPress).not.toHaveBeenCalled();
    });

    it('/valid === false/', () => {
      const onPress = jest.fn();
      const {container} = renderer({onPress, valid: false});
      container.press.container();
      expect(onPress).not.toHaveBeenCalled();
    });

    it('/state !== Empty/', () => {
      const onPress = jest.fn();
      const {container} = renderer({onPress, state: TileState.Player1});
      container.press.container();
      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
