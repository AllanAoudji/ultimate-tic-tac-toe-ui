import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import PlayButton from '../src/PlayButton';
import {getSource, getStyle, imageSource} from './testUtils';

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

    const BACKGROUND_IMAGE = 'playButton__backgroundImage';
    const BACKGROUND_IMAGE_CONTAINER = 'playButton__backgroundImage--container';
    const CONTAINER_PRESSABLE = 'playButton__container--pressable';
    const PLAY_TEXT = 'play';

    const getBackgroundImage = () => getByTestId(BACKGROUND_IMAGE);
    const getBackgroundImageContainer = () =>
      getByTestId(BACKGROUND_IMAGE_CONTAINER);
    const getContainer = () => getByTestId(CONTAINER_PRESSABLE);
    const getPlayText = () => getByText(PLAY_TEXT);

    const queryBackgroundImage = () => queryByTestId(BACKGROUND_IMAGE);
    const queryBackgroundImageContainer = () =>
      queryByTestId(BACKGROUND_IMAGE_CONTAINER);
    const queryContainer = () => queryByTestId(CONTAINER_PRESSABLE);
    const queryPlayText = () => queryByText(PLAY_TEXT);

    return {
      assets: {
        backgroundBlue: require(imageSource('button_background_blue')),
        backgroundRed: require(imageSource('button_background_red')),
      },
      container: {
        get: {
          backgroundImage: getBackgroundImage,
          backgroundImageContainer: getBackgroundImageContainer,
          container: getContainer,
          playText: getPlayText,
        },
        press: {
          button: () => {
            fireEvent.press(getPlayText());
          },
        },
        query: {
          backgroundImage: queryBackgroundImage,
          backgroundImageContainer: queryBackgroundImageContainer,
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

  it('display background_blue if /player === Player1/', () => {
    const {assets, container} = renderer();
    expect(getSource(container.get.backgroundImage())).toBe(
      assets.backgroundBlue,
    );
  });

  it('display background_red if /player === Player2/', () => {
    const {assets, container} = renderer({player: TileState.Player2});
    expect(getSource(container.get.backgroundImage())).toBe(
      assets.backgroundRed,
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

  it('sets pressable /opacity: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          opacity: undefined,
        }),
      ]),
    );
  });

  it('sets imageBackground--container /opacity: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.backgroundImageContainer())).toEqual(
      expect.objectContaining({
        opacity: undefined,
      }),
    );
  });

  it('sets imageBackground--container /opacity: 0.4/ if /active === false/', () => {
    const {container} = renderer({active: false});
    expect(getStyle(container.get.backgroundImageContainer())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });

  it('sets imageBackground--container /opacity: 0.4/ if /disabled === true/', () => {
    const {container} = renderer({disabled: true});
    expect(getStyle(container.get.backgroundImageContainer())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });
});
