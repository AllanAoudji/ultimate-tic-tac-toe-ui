import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import {
  getDisabled,
  getSource,
  getStyle,
  imageSource,
  jsonSource,
} from './testUtils';

import Tile from '../src/Tile';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

const mockLottie = jest.fn();
jest.mock('lottie-react-native', () => {
  const {forwardRef, useEffect} = require('react');
  return forwardRef((props: any, ref: any) => {
    useEffect(() => {
      if (ref.current) {
        ref.current.play = () => {};
      }
    }, [ref]);
    const {View} = require('react-native');
    mockLottie(props);
    return <View {...props} ref={ref} />;
  });
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

  const GAME_ASSET_CONTAINER_TEST_ID = 'gameAsset__container';
  const GAME_ASSET_IMAGE_VISIBLE_TEST_ID = 'gameAsset__image--visible';
  const TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable';

  const {getByTestId, queryByTestId} = renderTile;

  const getContainer = () => getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID);
  const getGameAsset = () => getByTestId(GAME_ASSET_CONTAINER_TEST_ID);
  const getGameAssetImageVisible = () =>
    getByTestId(GAME_ASSET_IMAGE_VISIBLE_TEST_ID);

  const queryGameAssetImageVisible = () =>
    queryByTestId(GAME_ASSET_IMAGE_VISIBLE_TEST_ID);

  return {
    assets: {
      json: {
        O1: require(jsonSource('O1')),
        X1: require(jsonSource('X1')),
      },
      image: {
        O1: require(imageSource('O1')),
        X1: require(imageSource('X1')),
      },
    },
    container: {
      get: {
        container: getContainer,
        gameAsset: getGameAsset,
        gameAssetImageVisible: getGameAssetImageVisible,
      },
      press: {
        container: () => {
          fireEvent.press(getContainer());
        },
      },
      query: {
        gameAssetImageVisible: queryGameAssetImageVisible,
      },
    },
    render: renderTile,
  };
};

describe('<Tile />', () => {
  beforeEach(() => {
    mockLottie.mockClear();
  });

  it('renders a <Pressable />', () => {
    const onPress = jest.fn();
    const {container} = renderer({onPress});
    container.press.container();
    expect(onPress).toHaveBeenCalled();
  });

  it('renders an <GameAsset /> with /padding === "smaller"/', () => {
    const {container} = renderer({
      activePlayer: TileState.Player1,
      selected: true,
    });
    expect(getStyle(container.get.gameAsset())).toEqual(
      expect.objectContaining({
        padding: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('renders <GameAsset /> with /opacity === 0.4/ if /selected === true/', () => {
    const {container} = renderer({
      activePlayer: TileState.Player1,
      selected: true,
    });
    container.press.container();
    expect(getStyle(container.get.gameAsset())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });

  it('<Asset /> with /opacity === 0.4/ should be based on the /activePlayer/', () => {
    const {assets, container} = renderer({
      activePlayer: TileState.Player2,
      selected: true,
    });
    container.press.container();
    expect(getSource(container.get.gameAssetImageVisible())).toEqual(
      assets.image.O1,
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
      const {assets} = renderer({state: TileState.Player1});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.X1,
        }),
      );
    });

    it('"O1"/ if /state === player2/', () => {
      const {assets} = renderer({state: TileState.Player2});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.O1,
        }),
      );
    });
  });

  describe('does not renders <Asset /> (/state === "EMPTY"/) if', () => {
    it('/state === Empty/', () => {
      const {container} = renderer({state: TileState.Empty});
      expect(mockLottie).not.toHaveBeenCalled();
      expect(container.query.gameAssetImageVisible()).toBeNull();
    });

    it('/selected === false/', () => {
      const {container} = renderer({selected: false});
      expect(mockLottie).not.toHaveBeenCalled();
      expect(container.query.gameAssetImageVisible()).toBeNull();
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
