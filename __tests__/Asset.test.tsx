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
    margin?: keyof Theming.SpacingTheme;
    state?: 'EMPTY' | 'PLAY' | 'VISIBLE';
    type?:
      | 'LBottomBlue'
      | 'LBottomRed'
      | 'LDiagonalTopLeftBottomRightBlue'
      | 'LDiagonalTopLeftBottomRightRed'
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
      margin={options.margin}
      state={options.state}
      type={options.type}
    />,
  );

  const {getByTestId, queryByTestId} = renderAsset;

  const getContainer = () => getByTestId('asset__container--lottie');

  const queryContainer = () => queryByTestId('asset__container--lottie');

  return {
    container: {
      get: {
        container: getContainer,
      },
      query: {
        container: queryContainer,
      },
    },
    render: renderAsset,
  };
};

const LBottomBlue = require(jsonSource('LBottomBlue'));
const LBottomRed = require(jsonSource('LBottomRed'));
const LDiagonalTopLeftBottomRightBlue = require(jsonSource(
  'LDiagonalTopLeftBottomRightBlue',
));
const LDiagonalTopLeftBottomRightRed = require(jsonSource(
  'LDiagonalTopLeftBottomRightRed',
));
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

  it('does not render <Lottie /> if /state === "EMPTY"', () => {
    const {container} = renderer({state: 'EMPTY'});
    expect(container.query.container()).toBeNull();
  });

  it('displays with /margin === undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        margin: undefined,
      }),
    );
  });

  it('displays with another /margin/', () => {
    const {container} = renderer({margin: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        margin: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  describe('renders with /source === ', () => {
    it('"LBottomBlue"/', () => {
      renderer({type: 'LBottomBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LBottomBlue,
        }),
      );
    });

    it('"LBottomRed"/', () => {
      renderer({type: 'LBottomRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LBottomRed,
        }),
      );
    });

    it('"LDiagonalTopLeftBottomRightBlue"', () => {
      renderer({type: 'LDiagonalTopLeftBottomRightBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LDiagonalTopLeftBottomRightBlue,
        }),
      );
    });

    it('"LDiagonalTopLeftBottomRightRed"', () => {
      renderer({type: 'LDiagonalTopLeftBottomRightRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LDiagonalTopLeftBottomRightRed,
        }),
      );
    });

    it('"LMiddleHorBlue"/', () => {
      renderer({type: 'LMiddleHorBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LMiddleHorBlue,
        }),
      );
    });

    it('"LMiddleHorRed"/', () => {
      renderer({type: 'LMiddleHorRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LMiddleHorRed,
        }),
      );
    });

    it('"LTopBlue"/', () => {
      renderer({type: 'LTopBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LTopBlue,
        }),
      );
    });

    it('"LTopRed"/', () => {
      renderer({type: 'LTopRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: LTopRed,
        }),
      );
    });

    it('"O1"/', () => {
      renderer({type: 'O1'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: O1,
        }),
      );
    });

    it('"X1"/', () => {
      renderer({type: 'X1'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: X1,
        }),
      );
    });
  });

  describe('displays the image by default if /type ===', () => {
    it('"LBottomBlue"/', () => {
      renderer({type: 'LBottomBlue'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"LBottomRed"/', () => {
      renderer({type: 'LBottomRed'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"LDiagonalTopLeftBottomRightBlue"/', () => {
      renderer({type: 'LDiagonalTopLeftBottomRightBlue'});
      expect(mockPlay).toHaveBeenCalledWith(32, 32);
    });

    it('"LDiagonalTopLeftBottomRightRed"/', () => {
      renderer({type: 'LDiagonalTopLeftBottomRightRed'});
      expect(mockPlay).toHaveBeenCalledWith(32, 32);
    });

    it('"LMiddleHorBlue"/', () => {
      renderer({type: 'LMiddleHorBlue'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"LMiddleHorRed"/', () => {
      renderer({type: 'LMiddleHorRed'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"LTopBlue"/', () => {
      renderer({type: 'LTopBlue'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"LTopRed"/', () => {
      renderer({type: 'LTopRed'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"O1"/', () => {
      renderer({type: 'O1'});
      expect(mockPlay).toHaveBeenCalledWith(28, 28);
    });

    it('"X1"/', () => {
      renderer();
      expect(mockPlay).toHaveBeenCalledWith(26, 26);
    });
  });

  describe('triggers the animation if /state === "PLAY"/ and /type ===', () => {
    it('"LBottomBlue"/', () => {
      renderer({state: 'PLAY', type: 'LBottomBlue'});
      expect(mockPlay).toHaveBeenCalledWith(2, 28);
    });

    it('"LBottomRed"/', () => {
      renderer({state: 'PLAY', type: 'LBottomRed'});
      expect(mockPlay).toHaveBeenCalledWith(2, 28);
    });

    it('"LDiagonalTopLeftBottomRightBlue"/', () => {
      renderer({state: 'PLAY', type: 'LDiagonalTopLeftBottomRightBlue'});
      expect(mockPlay).toHaveBeenCalledWith(2, 32);
    });

    it('"LDiagonalTopLeftBottomRightRed"/', () => {
      renderer({state: 'PLAY', type: 'LDiagonalTopLeftBottomRightRed'});
      expect(mockPlay).toHaveBeenCalledWith(2, 32);
    });

    it('"LMiddleHorBlue"/', () => {
      renderer({state: 'PLAY', type: 'LMiddleHorBlue'});
      expect(mockPlay).toHaveBeenCalledWith(2, 28);
    });

    it('"LMiddleHorRed"/', () => {
      renderer({state: 'PLAY', type: 'LMiddleHorRed'});
      expect(mockPlay).toHaveBeenCalledWith(2, 28);
    });

    it('"LTopBlue"/', () => {
      renderer({state: 'PLAY', type: 'LTopBlue'});
      expect(mockPlay).toHaveBeenCalledWith(2, 28);
    });

    it('"O1"/', () => {
      renderer({state: 'PLAY', type: 'O1'});
      expect(mockPlay).toHaveBeenCalledWith(2, 28);
    });

    it('"X1"/', () => {
      renderer({state: 'PLAY'});
      expect(mockPlay).toHaveBeenCalledWith(2, 26);
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
