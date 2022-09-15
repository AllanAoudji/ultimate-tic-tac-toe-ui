import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import {getStyle} from './testUtils';

import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import SurrendModalWrapper from '../src/SurrendModalWrapper';

const renderer = (
  options: {
    disabled?: boolean;
    onPressNo?: ((event: GestureResponderEvent) => void) | null | undefined;
    onPressYes?: ((event: GestureResponderEvent) => void) | null | undefined;
    player?: TileState.Player1 | TileState.Player2;
    visible?: boolean;
  } = {},
) => {
  const renderSurrendModalWrapper = render(
    <SurrendModalWrapper
      disabled={options.disabled}
      onPressNo={options.onPressNo}
      onPressYes={options.onPressYes}
      player={options.player}
      visible={options.visible}
    />,
  );

  const NO_TEXT = 'no';
  const SURREND_MODAL_WRAPPER_CONTAINER_ANIMATED_TEST_ID =
    'surrendModalWrapper__container--animated';
  const SURREND_TEXT = 'Surrend?';
  const YES_TEST = 'yes';

  const {getByTestId, getByText, queryByTestId, queryByText} =
    renderSurrendModalWrapper;

  const getContainerAnimated = () =>
    getByTestId(SURREND_MODAL_WRAPPER_CONTAINER_ANIMATED_TEST_ID);
  const getNoButton = () => getByText(NO_TEXT);
  const getSurrend = () => getByText(SURREND_TEXT);
  const getYesButton = () => getByText(YES_TEST);

  const queryContainerAnimated = () =>
    queryByTestId(SURREND_MODAL_WRAPPER_CONTAINER_ANIMATED_TEST_ID);
  const queryNoButton = () => queryByText(NO_TEXT);
  const querySurrend = () => queryByText(SURREND_TEXT);
  const queryYesButton = () => queryByText(YES_TEST);

  return {
    container: {
      get: {
        containerAnimated: getContainerAnimated,
        noButton: getNoButton,
        surrend: getSurrend,
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
        surrend: querySurrend,
        yesButton: queryYesButton,
      },
    },
    renderSurrendModalWrapper,
  };
};

describe('<SurrendModalWrapper />', () => {
  it('does not render <Animated.View /> if /visible == false/', () => {
    const {container} = renderer();
    expect(container.query.containerAnimated()).toBeNull();
  });
  it('does not render <SurrendModal /> if /visible == false/', () => {
    const {container} = renderer();
    expect(container.query.surrend()).toBeNull();
  });

  it('render an <Animated.View /> if /visible === true/', () => {
    const {container} = renderer({visible: true});
    expect(container.get.containerAnimated()).not.toBeNull();
  });

  it('<Animated.View /> should have /position: absolute/', () => {
    const {container} = renderer({visible: true});
    expect(getStyle(container.get.containerAnimated())).toEqual(
      expect.objectContaining({
        position: 'absolute',
      }),
    );
  });

  it('<Animated.View /> should have /opacity: 0, scale: 0.96/ on mount', () => {
    const {container} = renderer({visible: true});
    expect(getStyle(container.get.containerAnimated())).toEqual(
      expect.objectContaining({
        opacity: 0,
        transform: expect.arrayContaining([
          expect.objectContaining({
            scale: 0.96,
          }),
        ]),
      }),
    );
  });

  it('renders <SurrendModal /> if /visible === true/', () => {
    const {container} = renderer({visible: true});
    expect(container.get.surrend()).not.toBeNull();
  });

  it('passes /onPressYes/ to <SurrendModal />', () => {
    const onPressYes = jest.fn();
    const {container} = renderer({onPressYes, visible: true});
    container.press.yesButton();
    expect(onPressYes).toHaveBeenCalled();
  });

  it('passes /onPressNo/ to <SurrendModal />', () => {
    const onPressNo = jest.fn();
    const {container} = renderer({onPressNo, visible: true});
    container.press.noButton();
    expect(onPressNo).toHaveBeenCalled();
  });

  it('passes /player/ to <SurrendModal />', () => {
    const {container} = renderer({player: TileState.Player2, visible: true});
    expect(getStyle(container.get.surrend())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it('passes /disabled/ to <SurrendModal />', () => {
    const onPressYes = jest.fn();
    const {container} = renderer({disabled: true, onPressYes, visible: true});
    container.press.yesButton();
    expect(onPressYes).not.toHaveBeenCalled();
  });
});
