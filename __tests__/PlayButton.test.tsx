import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import PlayButton from '../src/PlayButton';
import {getStyle} from './testUtils';

describe('<PlayButton />', () => {
  const renderer = (
    options: {
      active?: boolean;
      disabled?: boolean;
      onPress?: () => {};
      player?: TileState.Player1 | TileState.Player2;
    } = {},
  ) => {
    const renderPlayButton = render(
      <PlayButton
        active={options.active}
        disabled={options.disabled}
        onPress={options.onPress}
        player={options.player}
      />,
    );

    const {getByTestId, getByText, queryByTestId, queryByText} =
      renderPlayButton;

    const getContainer = () => getByTestId('playButton__container--pressable');
    const getPlayText = () => getByText('play');

    const queryContainer = () =>
      queryByTestId('playButton__container--pressable');
    const queryPlayText = () => queryByText('play');

    return {
      container: {
        get: {
          container: getContainer,
          playText: getPlayText,
        },
        press: {
          button: () => {
            fireEvent.press(getPlayText());
          },
        },
        query: {
          container: queryContainer,
          playText: queryPlayText,
        },
      },
      render: renderPlayButton,
    };
  };

  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a button', () => {
    const {container} = renderer();
    expect(container.query.container()).not.toBeNull();
    expect(container.query.playText()).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const {container} = renderer({onPress});
    container.press.button();
    expect(onPress).toHaveBeenCalled();
  });

  it('not calls /onPress/ if /disabled === true/', () => {
    const {container} = renderer({disabled: true, onPress});
    container.press.button();
    expect(onPress).not.toHaveBeenCalled();
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ if /player === Player1/`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color.onPlayerX}/ if /player === Player1/`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.playText())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onPlayerX,
      }),
    );
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /player === Player2/`, () => {
    const {container} = renderer({player: TileState.Player2});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color.onPlayerO}/ if /player === Player2/`, () => {
    const {container} = renderer({player: TileState.Player2});
    expect(getStyle(container.get.playText())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onPlayerO,
      }),
    );
  });

  it('not calls /onPress/ if /active === false/', () => {
    const {container} = renderer({active: false, onPress});
    container.press.button();
    expect(onPress).not.toHaveBeenCalled();
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.grey}/ if /active === false/`, () => {
    const {container} = renderer({active: false});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.grey,
      }),
    );
  });

  it('sets /opacity: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: undefined,
      }),
    );
  });

  it('sets /opacity: 0.4/ if /active === false/', () => {
    const {container} = renderer({active: false});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });

  it('sets /opacity: 0.4/ if /disabled === true/', () => {
    const {container} = renderer({disabled: true});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });
});
