import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';

import QuitGameModalWrapper from '../src/QuitGameModalWrapper';
import {getStyle} from './testUtils';

const renderer = (
  options: {
    disabled?: boolean;
    onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
    onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
    visible?: boolean;
  } = {},
) => {
  const renderQuitGameModalWrapper = render(
    <QuitGameModalWrapper
      disabled={options.disabled}
      onPressNo={options.onPressNo}
      onPressYes={options.onPressYes}
      visible={options.visible}
    />,
  );

  const CONTAINER_ANIMATED_TEST_ID =
    'quitGameModalWrapper__container--animated';
  const NO_TEXT = 'no';
  const QUIT_GAME_MODAL_CONTAINER_TEST_ID = 'quitGameModal__container';
  const YES_TEXT = 'yes';

  const {getByTestId, getByText, queryByTestId, queryByText} =
    renderQuitGameModalWrapper;

  const getContainerAnimated = () => getByTestId(CONTAINER_ANIMATED_TEST_ID);
  const getNoButton = () => getByText(NO_TEXT);
  const getQuitGameModalContainer = () =>
    getByTestId(QUIT_GAME_MODAL_CONTAINER_TEST_ID);
  const getYesButton = () => getByText(YES_TEXT);

  const queryContainerAnimated = () =>
    queryByTestId(CONTAINER_ANIMATED_TEST_ID);
  const queryNoButton = () => queryByText(NO_TEXT);
  const queryQuiGameModalContainer = () =>
    queryByTestId(QUIT_GAME_MODAL_CONTAINER_TEST_ID);
  const queryYesButton = () => queryByText(YES_TEXT);

  return {
    container: {
      get: {
        containerAnimated: getContainerAnimated,
        noButton: getNoButton,
        quitGameModalContainer: getQuitGameModalContainer,
        yesButton: getYesButton,
      },
      press: {
        noButton: () => {
          fireEvent.press(getNoButton());
        },
        yesButton: () => {
          fireEvent.press(getYesButton());
        },
      },
      query: {
        containerAnimated: queryContainerAnimated,
        noButton: queryNoButton,
        QuitGameModalWrapper: queryQuiGameModalContainer,
        yesButton: queryYesButton,
      },
    },
    renderQuitGameModalWrapper,
  };
};

describe('<QuitGameModalWrapper />', () => {
  it('renders <QuitGameModal /> if /visible === true/', () => {
    const {container} = renderer({visible: true});
    expect(container.get.quitGameModalContainer()).not.toBeNull();
  });

  it('does not render <QuitGameModal /> if /visible === false/', () => {
    const {container} = renderer();
    expect(container.query.QuitGameModalWrapper()).toBeNull();
  });

  it('renders an <Animated.View /> if /visible === true/', () => {
    const {container} = renderer({visible: true});
    expect(container.get.containerAnimated()).not.toBeNull();
  });

  it('does not render <Animted.View /> if /visible === true/', () => {
    const {container} = renderer();
    expect(container.query.containerAnimated()).toBeNull();
  });

  it('<Animated.View /> should have /position: absolute/', () => {
    const {container} = renderer({visible: true});
    expect(getStyle(container.get.containerAnimated())).toEqual(
      expect.objectContaining({
        position: 'absolute',
      }),
    );
  });

  it('<Animated.View /> should have /opacity: 0, scale: 1.04/ on mount', () => {
    const {container} = renderer({visible: true});
    expect(getStyle(container.get.containerAnimated())).toEqual(
      expect.objectContaining({
        opacity: 0,
        transform: expect.arrayContaining([
          expect.objectContaining({
            scale: 1.04,
          }),
        ]),
      }),
    );
  });

  it('passes /onPressNo/ to <QuitGameModal />', () => {
    const onPressNo = jest.fn();
    const {container} = renderer({onPressNo, visible: true});
    container.press.noButton();
    expect(onPressNo).toHaveBeenCalled();
  });

  it('passes /onPressYes/ to <QuitGameModal />', () => {
    const onPressYes = jest.fn();
    const {container} = renderer({onPressYes, visible: true});
    container.press.yesButton();
    expect(onPressYes).toHaveBeenCalled();
  });

  it('passes /disabled/ to <QuitGameModal />', () => {
    const onPress = jest.fn();
    const {container} = renderer({
      disabled: true,
      onPressNo: onPress,
      onPressYes: onPress,
      visible: true,
    });
    container.press.noButton();
    container.press.yesButton();
    expect(onPress).not.toHaveBeenCalled();
  });
});
