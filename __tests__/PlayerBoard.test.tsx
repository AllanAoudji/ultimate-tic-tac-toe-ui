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

    const PLAY_TEXT = 'play';
    const PLAY_BUTTON_CONTAINER_TEST_ID = 'playButton__container--pressable';
    const PLAY_BUTTON_BACKGROUND_IMAGE_TEST_ID = 'playButton__backgroundImage';
    const PLAY_BUTTON_BACKGROUND_IMAGE_CONTAINER_TEST_ID =
      'playButton__backgroundImage--container';
    const PLAYER_BOARD_CONTAINER_TEST_ID = 'playerBoard__container';
    const NO_TEXT = 'no';
    const SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'surrendButton__container--pressable';
    const SURREND_BUTTON_CONTAINER_IMAGE_TEST_ID = 'surrendButton__image';
    const SURREND_TEXT = 'Surrend?';
    const YES_TEXT = 'yes';

    const {getByTestId, getByText, queryByTestId, queryByText} =
      renderPlayerBoard;

    // GET
    const getContainer = () => getByTestId(PLAYER_BOARD_CONTAINER_TEST_ID);
    const getNoButton = () => getByText(NO_TEXT);
    const getPlayButton = () => getByText(PLAY_TEXT);
    const getPlayButtonContainer = () =>
      getByTestId(PLAY_BUTTON_CONTAINER_TEST_ID);
    const getPlayButtonBackgroundImage = () =>
      getByTestId(PLAY_BUTTON_BACKGROUND_IMAGE_TEST_ID);
    const getPlayButtonBackgroundImageContainer = () =>
      getByTestId(PLAY_BUTTON_BACKGROUND_IMAGE_CONTAINER_TEST_ID);
    const getSurrendButtonContainerPressable = () =>
      getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID);
    const getSurrendButtonImage = () =>
      getByTestId(SURREND_BUTTON_CONTAINER_IMAGE_TEST_ID);
    const getSurrendModalText = () => getByText(SURREND_TEXT);
    const getYesButton = () => getByText(YES_TEXT);

    // QUERY
    const queryContainer = () => queryByTestId(PLAYER_BOARD_CONTAINER_TEST_ID);
    const queryNoButton = () => queryByText(NO_TEXT);
    const queryPlayButton = () => queryByText(PLAY_TEXT);
    const queryPlayButtonContainer = () =>
      queryByTestId(PLAY_BUTTON_CONTAINER_TEST_ID);
    const queryPlayButtonBackgroundImage = () =>
      queryByTestId(PLAY_BUTTON_BACKGROUND_IMAGE_TEST_ID);
    const queryPlayButtonBackgroundImageContainer = () =>
      queryByTestId(PLAY_BUTTON_BACKGROUND_IMAGE_CONTAINER_TEST_ID);
    const querySurrendButtonContainerPressable = () =>
      queryByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID);
    const querySurrendButtonImage = () =>
      queryByTestId(SURREND_BUTTON_CONTAINER_IMAGE_TEST_ID);
    const querySurrendModalText = () => queryByText(SURREND_TEXT);
    const queryYesButton = () => queryByText(YES_TEXT);

    return {
      assets: {
        image: {
          playButtonBackgroundBlue: require(imageSource(
            'button_background_blue',
          )),
          playButtonBackgroundRed: require(imageSource(
            'button_background_red',
          )),
          surrendButtonBlue: require(imageSource('surrend_button_blue')),
          surrendButtonRed: require(imageSource('surrend_button_red')),
        },
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
          surrendButtonContainerPressable: getSurrendButtonContainerPressable,
          surrendButtonImage: getSurrendButtonImage,
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
            fireEvent.press(getSurrendButtonContainerPressable());
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
          surrendButtonContainerPressable: querySurrendButtonContainerPressable,
          surrendButtonImage: querySurrendButtonImage,
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
    expect(container.get.surrendButtonContainerPressable()).not.toBeNull();
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
      expect(getDisabled(container.get.surrendButtonContainerPressable())).toBe(
        true,
      );
    });
  });

  describe('passes /player/ to', () => {
    it('<PlayButton />', () => {
      const {assets, container} = renderer({player: TileState.Player2});
      expect(getSource(container.get.playButtonBackgroundImage())).toBe(
        assets.image.playButtonBackgroundRed,
      );
    });

    it('<SurrendButton />', () => {
      const {assets, container} = renderer({player: TileState.Player2});
      expect(getSource(container.get.surrendButtonImage())).toEqual(
        assets.image.surrendButtonRed,
      );
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
