import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import PlayerBoard from '../src/PlayerBoard';
import {getDisabled, getSource, getStyle, imageSource} from './testUtils';

describe('<PlayerBoard />', () => {
  const renderer = (
    options: {
      activePlayButton?: boolean;
      disabledPlayButton?: boolean;
      disabledSurrendButton?: boolean;
      disabledSurrendModal?: boolean;
      onPressPlay?: () => void;
      onSurrend?: () => void;
      player?: TileState.Player1 | TileState.Player2;
      position?: 'BOTTOM' | 'TOP';
      setVisibleModal?: () => void;
      visibleModal?: boolean;
    } = {},
  ) => {
    const renderPlayerBoard = render(
      <PlayerBoard
        activePlayButton={options.activePlayButton}
        disabledPlayButton={options.disabledPlayButton}
        disabledSurrendButton={options.disabledSurrendButton}
        disabledSurrendModal={options.disabledSurrendModal}
        onPressPlay={options.onPressPlay}
        onSurrend={options.onSurrend}
        player={options.player}
        position={options.position}
        setVisibleModal={options.setVisibleModal}
        visibleModal={options.visibleModal}
      />,
    );

    const {getByTestId, getByText, queryByTestId, queryByText} =
      renderPlayerBoard;

    const getContainer = () => getByTestId('playerBoard__container');
    const getNoButton = () => getByText('no');
    const getPlayButton = () => getByText('play');
    const getPlayButtonContainer = () =>
      getByTestId('playButton__container--pressable');
    const getPlayButtonBackgroundImage = () =>
      getByTestId('playButton__backgroundImage');
    const getPlayButtonBackgroundImageContainer = () =>
      getByTestId('playButton__backgroundImage--container');
    const getSurrendButton = () =>
      getByTestId('surrendButton__container--pressable');
    const getSurrendModalText = () => getByText('Surrend?');
    const getYesButton = () => getByText('yes');

    const queryContainer = () => queryByTestId('playerBoard__container');
    const queryNoButton = () => queryByText('no');
    const queryPlayButton = () => queryByText('play');
    const queryPlayButtonContainer = () =>
      queryByTestId('playButton__container--pressable');
    const queryPlayButtonBackgroundImage = () =>
      queryByTestId('playButton__backgroundImage');
    const queryPlayButtonBackgroundImageContainer = () =>
      queryByTestId('playButton__backgroundImage--container');
    const querySurrendButton = () =>
      queryByTestId('surrendButton__container--pressable');
    const querySurrendModalText = () => queryByText('Surrend?');
    const queryYesButton = () => queryByText('yes');

    return {
      assets: {
        playButtonBackgroundBlue: require(imageSource(
          'button_background_blue',
        )),
        playButtonBackgroundRed: require(imageSource('button_background_red')),
      },
      container: {
        get: {
          container: getContainer,
          no: getNoButton,
          playButton: getPlayButton,
          playButtonContainer: getPlayButtonContainer,
          playButtonBackgroundImage: getPlayButtonBackgroundImage,
          playButtonBackgroundImageContainer:
            getPlayButtonBackgroundImageContainer,
          surrendButton: getSurrendButton,
          surrendModalText: getSurrendModalText,
          yesButton: getYesButton,
        },
        press: {
          noButton: () => {
            fireEvent.press(getNoButton());
          },
          playButton: () => {
            fireEvent.press(getPlayButton());
          },
          surrendButton: () => {
            fireEvent.press(getSurrendButton());
          },
          yesButton: () => {
            fireEvent.press(getYesButton());
          },
        },
        query: {
          container: queryContainer,
          no: queryNoButton,
          playButton: queryPlayButton,
          playButtonContainer: queryPlayButtonContainer,
          playButtonBackgroundImage: queryPlayButtonBackgroundImage,
          playButtonBackgroundImageContainer:
            queryPlayButtonBackgroundImageContainer,
          surrendButton: querySurrendButton,
          surrendModalText: querySurrendModalText,
          yesButton: queryYesButton,
        },
      },
      render: renderPlayerBoard,
    };
  };

  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a <Container />', () => {
    const {container} = renderer();
    expect(container.query.container()).not.toBeNull();
  });

  it('renders a <PlayButton />', () => {
    const {container} = renderer();
    expect(container.query.playButton()).not.toBeNull();
  });

  it('renders a <SurrendButton />', () => {
    const {container} = renderer();
    expect(container.query.surrendButton()).not.toBeNull();
  });

  it('renders <SurrendModal /> if /visibleModal === true/', () => {
    const {container} = renderer({visibleModal: true});
    expect(container.query.surrendModalText).not.toBeNull();
  });

  it('passes /onPressPlay/ to <PlayButton />', () => {
    const {container} = renderer({onPressPlay: onPress});
    container.press.playButton();
    expect(onPress).toHaveBeenCalled();
  });

  it('calls /onSurrend/ when "yes" <Button /> is Pressed', () => {
    const {container} = renderer({onSurrend: onPress, visibleModal: true});
    container.press.yesButton();
    expect(onPress).toHaveBeenCalled();
  });

  it('disables <Pressable /> from <SurrendModal /> if /disabledSurrendModal === true/', () => {
    const {container} = renderer({
      disabledSurrendModal: true,
      setVisibleModal: onPress,
      visibleModal: true,
    });
    container.press.yesButton();
    container.press.noButton();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('sets /rotate: 180deg/ if /position === TOP/', () => {
    const {container} = renderer({position: 'TOP'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        transform: [{rotate: '180deg'}],
      }),
    );
  });

  it('sets /rotate: 0deg/ if /position === BOTTOM/', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        transform: [{rotate: '0deg'}],
      }),
    );
  });

  describe('calls /setVisibleModal/ with /false/ when', () => {
    it('"yes" <Button /> is pressed', () => {
      const {container} = renderer({
        setVisibleModal: onPress,
        visibleModal: true,
      });
      container.press.yesButton();
      expect(onPress).toHaveBeenCalledWith(false);
    });

    it('"no" <Button /> is pressed', () => {
      const {container} = renderer({
        setVisibleModal: onPress,
        visibleModal: true,
      });
      container.press.noButton();
      expect(onPress).toHaveBeenCalledWith(false);
    });
  });

  describe('sets <PlayButton />', () => {
    it('/opacity: 0.4/ if /disabledPlayButton === true/', () => {
      const {container} = renderer({disabledPlayButton: true});
      expect(
        getStyle(container.get.playButtonBackgroundImageContainer()),
      ).toEqual(
        expect.objectContaining({
          opacity: 0.4,
        }),
      );
    });

    it('/opacity: undefined/ if /disabledPlayButton === false || undefined/', () => {
      const {container} = renderer();
      expect(
        getStyle(container.get.playButtonBackgroundImageContainer()),
      ).toEqual(
        expect.objectContaining({
          opacity: undefined,
        }),
      );
    });

    it('/opacity: 0.4/ if /activePlayButton === false/', () => {
      const {container} = renderer({activePlayButton: false});
      expect(
        getStyle(container.get.playButtonBackgroundImageContainer()),
      ).toEqual(
        expect.objectContaining({
          opacity: 0.4,
        }),
      );
    });

    it('/opacity: 1/ if /activePlayButton === true || undefined/', () => {
      const {container} = renderer({activePlayButton: true});
      expect(
        getStyle(container.get.playButtonBackgroundImageContainer()),
      ).toEqual(
        expect.objectContaining({
          opacity: undefined,
        }),
      );
    });
  });

  describe('disables <PlayButton /> if', () => {
    it('/disabledPlayButton === true/', () => {
      const {container} = renderer({
        disabledPlayButton: true,
        onPressPlay: onPress,
      });
      container.press.playButton();
      expect(onPress).not.toHaveBeenCalled();
    });

    it('<SurrendModal /> is visible', () => {
      const {container} = renderer({onPressPlay: onPress, visibleModal: true});
      container.press.playButton();
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('disables <SurrendButton /> if', () => {
    it('<SurrendModal /> is visible', () => {
      const {container} = renderer({onSurrend: onPress, visibleModal: true});
      container.press.surrendButton();
      expect(onPress).not.toHaveBeenCalled();
    });

    it('/disabledSurrendButton === true/', () => {
      const {container} = renderer({disabledSurrendButton: true});
      expect(getDisabled(container.get.surrendButton())).toBe(true);
    });
  });

  describe('passes /player/ to', () => {
    it('<PlayButton />', () => {
      const {assets, container} = renderer({player: TileState.Player2});
      expect(getSource(container.get.playButtonBackgroundImage())).toBe(
        assets.playButtonBackgroundRed,
      );
    });

    it('<SurrendButton />', () => {
      const {container} = renderer({player: TileState.Player2});
      expect(
        container.get
          .surrendButton()
          .findAllByProps({fill: DEFAULT_LIGHT_THEME.color.playerO}),
      ).toHaveLength(1);
    });

    it('<SurrendModalWrapper />', () => {
      const {container} = renderer({
        player: TileState.Player2,
        visibleModal: true,
      });
      expect(getStyle(container.get.surrendModalText())).toEqual(
        expect.objectContaining({
          color: DEFAULT_LIGHT_THEME.color.playerO,
        }),
      );
    });
  });
});
