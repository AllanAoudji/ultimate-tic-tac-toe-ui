import {render} from '@testing-library/react-native';
import React from 'react';

import {jsonSource, getStyle} from './testUtils';

import Asset from '../src/Asset';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

const mockLottie = jest.fn();
const mockPlay = jest.fn();
jest.mock('lottie-react-native', () => {
  const {forwardRef, useEffect} = require('react');
  return forwardRef((props: any, ref: any) => {
    useEffect(() => {
      if (ref.current) {
        ref.current.play = mockPlay;
      }
    }, [ref]);
    const {View} = require('react-native');
    mockLottie(props);
    return <View {...props} ref={ref} />;
  });
});

// should have a padding
// different sizes

const renderer = (
  options: {
    disabled?: boolean;
    padding?: keyof Theming.SpacingTheme;
    state?: 'EMPTY' | 'PLAY' | 'VISIBLE';
    type?:
      | 'LBottomBlue'
      | 'LBottomRed'
      | 'LMiddleHorBlue'
      | 'LMiddleHorRed'
      | 'LTopBlue'
      | 'LTopRed'
      | 'O1'
      | 'X1';
  } = {},
) => {
  const renderAsset = render(
    <Asset
      disabled={options.disabled}
      padding={options.padding}
      state={options.state}
      type={options.type}
    />,
  );

  const {getByTestId} = renderAsset;

  const getContainer = () => getByTestId('asset__container--lottie');

  return {
    container: {
      get: {
        container: getContainer,
      },
    },
    render: renderAsset,
  };
};

const LBottomBlue = require(jsonSource('LBottomBlue'));
const LBottomRed = require(jsonSource('LBottomRed'));
const LMiddleHorBlue = require(jsonSource('LMiddleHorBlue'));
const LMiddleHorRed = require(jsonSource('LMiddleHorRed'));
const LTopBlue = require(jsonSource('LTopBlue'));
const LTopRed = require(jsonSource('LTopRed'));
const O1 = require(jsonSource('O1'));
const X1 = require(jsonSource('X1'));

describe('<Asset />', () => {
  beforeEach(() => {
    mockLottie.mockClear();
    mockPlay.mockClear();
  });

  it('renders a <Lottie /> component', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders with a default /source/', () => {
    renderer();
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        source: X1,
      }),
    );
  });

  it('renders with /loop === false/', () => {
    renderer();
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        loop: false,
      }),
    );
  });

  it('displays the image by default', () => {
    renderer();
    expect(mockPlay).toHaveBeenCalledWith(26, 26);
  });

  it('displays the image by default if /type === "O1"/', () => {
    renderer({type: 'O1'});
    expect(mockPlay).toHaveBeenCalledWith(28, 28);
  });

  it('triggers the animation if /state === "PLAY"/', () => {
    renderer({state: 'PLAY'});
    expect(mockPlay).toHaveBeenCalledWith(0, 26);
  });

  it('triggers the animation if /state === "PLAY"/ and /type === "O1"/', () => {
    renderer({state: 'PLAY', type: 'O1'});
    expect(mockPlay).toHaveBeenCalledWith(0, 28);
  });

  it('displays nothing if /state === "EMPTY"', () => {
    renderer({state: 'EMPTY'});
    expect(mockPlay).toHaveBeenCalledWith(0, 0);
  });

  it('displays with /padding === theme.spacing.smallest/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        padding: undefined,
      }),
    );
  });

  it('displays with another /padding/', () => {
    const {container} = renderer({padding: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        padding: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  describe('renders with /source === ', () => {
    it('LBottomBlue/', () => {
      renderer({type: 'LBottomBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LBottomBlue,
        }),
      );
    });

    it('LBottomRed/', () => {
      renderer({type: 'LBottomRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LBottomRed,
        }),
      );
    });

    it('LMiddleHorBlue/', () => {
      renderer({type: 'LMiddleHorBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LMiddleHorBlue,
        }),
      );
    });

    it('LMiddleHorRed/', () => {
      renderer({type: 'LMiddleHorRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LMiddleHorRed,
        }),
      );
    });

    it('LTopBlue/', () => {
      renderer({type: 'LTopBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LTopBlue,
        }),
      );
    });

    it('LTopRed/', () => {
      renderer({type: 'LTopRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LTopRed,
        }),
      );
    });

    it('O1/', () => {
      renderer({type: 'O1'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: O1,
        }),
      );
    });

    it('X1/', () => {
      renderer({type: 'X1'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: X1,
        }),
      );
    });
  });

  describe('displays with /optacity ===', () => {
    it('1/ by default', () => {
      const {container} = renderer();
      expect(getStyle(container.get.container())).toEqual(
        expect.objectContaining({
          opacity: 1,
        }),
      );
    });

    it('0.4/ if /disabled === true/', () => {
      const {container} = renderer({disabled: true});
      expect(getStyle(container.get.container())).toEqual(
        expect.objectContaining({
          opacity: 0.4,
        }),
      );
    });
  });
});
