import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import {getSource, getStyle, imageSource} from './testUtils';

import {DEFAULT_DARK_THEME} from '../src/DefaultDark.theme';
import SurrendButton from '../src/SurrendButton';

const renderer = (
  options: {
    disabled?: boolean;
    onPress?: () => {};
    player?: TileState.Player1 | TileState.Player2;
  } = {},
) => {
  const renderSurrendButton = render(
    <SurrendButton
      disabled={options.disabled}
      onPress={options.onPress}
      player={options.player}
    />,
  );

  const SURREND_BUTTON_CONTAINER_INNER_TEST_ID =
    'surrendButton__container--inner';
  const SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
    'surrendButton__container--pressable';
  const SURREND_BUTTON_IMAGE_TEST_ID = 'surrendButton__image';

  const {getByTestId, queryByTestId} = renderSurrendButton;

  // GET
  const getContainerInner = () =>
    getByTestId(SURREND_BUTTON_CONTAINER_INNER_TEST_ID);
  const getContainerPressable = () =>
    getByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID);
  const getImage = () => getByTestId(SURREND_BUTTON_IMAGE_TEST_ID);

  // QUERY
  const queryContainerInner = () =>
    queryByTestId(SURREND_BUTTON_CONTAINER_INNER_TEST_ID);
  const queryContainerPressable = () =>
    queryByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID);
  const queryImage = () => queryByTestId(SURREND_BUTTON_IMAGE_TEST_ID);

  return {
    assets: {
      image: {
        surrendButtonBlue: require(imageSource('surrend_button_blue')),
        surrendButtonRed: require(imageSource('surrend_button_red')),
      },
    },
    container: {
      get: {
        containerInner: getContainerInner,
        containerPressable: getContainerPressable,
        image: getImage,
      },
      press: {
        containerPressable: () => {
          fireEvent.press(getContainerPressable());
        },
      },
      query: {
        containerInner: queryContainerInner,
        containerPressable: queryContainerPressable,
        image: queryImage,
      },
    },
    renderSurrendButton,
  };
};

describe('<SurrendButton />', () => {
  it('renders a <Pressable />', () => {
    const {container} = renderer();
    expect(container.get.containerPressable()).not.toBeNull();
  });

  it('renders an inner <Container />', () => {
    const {container} = renderer();
    expect(container.get.containerInner()).not.toBeNull();
  });

  it('renders an <Image /> with a surrend_button source', () => {
    const {container} = renderer();
    expect(container.get.image()).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const onPress = jest.fn();
    const {container} = renderer({onPress});
    container.press.containerPressable();
    expect(onPress).toHaveBeenCalled();
  });

  it('does not calls /onPress/ if /disabled === true/', () => {
    const onPress = jest.fn();
    const {container} = renderer({disabled: true, onPress});
    container.press.containerPressable();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('sets <Container /> style to be a square', () => {
    const {container} = renderer();
    expect(getStyle(container.get.containerPressable())).toEqual(
      expect.objectContaining({
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        padding: DEFAULT_DARK_THEME.spacing.normal,
        width: 50,
      }),
    );
  });

  describe('renders <Image /> with /source ===', () => {
    it('surrend_button_blue.png/ by default', () => {
      const {assets, container} = renderer();
      expect(getSource(container.get.image())).toBe(
        assets.image.surrendButtonBlue,
      );
    });

    it('surrend_button_red.png/ if /player === Player2/', () => {
      const {assets, container} = renderer({player: TileState.Player2});
      expect(getSource(container.get.image())).toBe(
        assets.image.surrendButtonRed,
      );
    });
  });

  describe('sets inner <Container /> /opacity: 0.4/ if', () => {
    it('/disabled === true/', () => {
      const {container} = renderer({disabled: true});
      expect(getStyle(container.get.containerInner())).toEqual(
        expect.objectContaining({
          opacity: 0.4,
        }),
      );
    });

    it('/onPress === undefined/', () => {
      const {container} = renderer();
      expect(getStyle(container.get.containerInner())).toEqual(
        expect.objectContaining({
          opacity: 0.4,
        }),
      );
    });
  });
});
