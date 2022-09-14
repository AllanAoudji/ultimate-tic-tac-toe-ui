import {render} from '@testing-library/react-native';
import React from 'react';

import {imageSource, jsonSource, getSource, getStyle} from './testUtils';

import GameAsset from '../src/GameAsset';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

const mockLottie = jest.fn();
const mockPlay = jest.fn();
jest.mock('lottie-react-native', () => {
  const {forwardRef, useEffect} = require('react');
  return forwardRef(({onAnimationFinish, ...props}: any, ref: any) => {
    useEffect(() => {
      if (ref.current) {
        ref.current.play = mockPlay;
      }
    }, [ref]);
    useEffect(() => {
      if (onAnimationFinish) {
        onAnimationFinish();
      }
    }, [onAnimationFinish]);
    const {View} = require('react-native');
    mockLottie(props);
    return <View {...props} ref={ref} />;
  });
});

const renderer = (
  options: {
    onAnimationFinish?: () => void;
    opacity?: 0.1 | 0.2 | 0.4 | 0.8 | 1;
    padding?: keyof Theming.SpacingTheme;
    state?: 'EMPTY' | 'PLAY' | 'VISIBLE';
    type?:
      | 'LBottomBlue'
      | 'LBottomRed'
      | 'LDiagonalTopLeftBottomRightBlue'
      | 'LDiagonalTopLeftBottomRightRed'
      | 'LDiagonalTopRightBottomLeftBlue'
      | 'LDiagonalTopRightBottomLeftRed'
      | 'LLeftBlue'
      | 'LLeftRed'
      | 'LMiddleHorizontalBlue'
      | 'LMiddleHorizontalRed'
      | 'LMiddleVerticalBlue'
      | 'LMiddleVerticalRed'
      | 'LRightBlue'
      | 'LRightRed'
      | 'LTopBlue'
      | 'LTopRed'
      | 'O1'
      | 'X1';
  } = {},
) => {
  const renderAsset = render(
    <GameAsset
      onAnimationFinish={options.onAnimationFinish}
      opacity={options.opacity}
      padding={options.padding}
      state={options.state}
      type={options.type}
    />,
  );

  const {getByTestId, queryByTestId} = renderAsset;

  const getContainer = () => getByTestId('gameAsset__container');
  const getImagePlay = () => getByTestId('gameAsset__image--play');
  const getImageVisible = () => getByTestId('gameAsset__image--visible');

  const queryContainer = () => queryByTestId('gameAsset__container');
  const queryImagePlay = () => queryByTestId('gameAsset__image--play');
  const queryImageVisible = () => queryByTestId('gameAsset__image--visible');

  return {
    assets: {
      image: {
        LBottomBlue: require(imageSource('LBottomBlue')),
        LBottomRed: require(imageSource('LBottomRed')),
        LDiagonalTopLeftBottomRightBlue: require(imageSource(
          'LDiagonalTopLeftBottomRightBlue',
        )),
        LDiagonalTopLeftBottomRightRed: require(imageSource(
          'LDiagonalTopLeftBottomRightRed',
        )),
        LDiagonalTopRightBottomLeftBlue: require(imageSource(
          'LDiagonalTopRightBottomLeftBlue',
        )),
        LDiagonalTopRightBottomLeftRed: require(imageSource(
          'LDiagonalTopRightBottomLeftRed',
        )),
        LLeftBlue: require(imageSource('LLeftBlue')),
        LLeftRed: require(imageSource('LLeftRed')),
        LMiddleHorizontalBlue: require(imageSource('LMiddleHorizontalBlue')),
        LMiddleHorizontalRed: require(imageSource('LMiddleHorizontalRed')),
        LMiddleVerticalBlue: require(imageSource('LMiddleVerticalBlue')),
        LMiddleVerticalRed: require(imageSource('LMiddleVerticalRed')),
        LRightBlue: require(imageSource('LRightBlue')),
        LRightRed: require(imageSource('LRightRed')),
        LTopBlue: require(imageSource('LTopBlue')),
        LTopRed: require(imageSource('LTopRed')),
        O1: require(imageSource('O1')),
        X1: require(imageSource('X1')),
      },
      json: {
        LBottomBlue: require(jsonSource('LBottomBlue')),
        LBottomRed: require(jsonSource('LBottomRed')),
        LDiagonalTopLeftBottomRightBlue: require(jsonSource(
          'LDiagonalTopLeftBottomRightBlue',
        )),
        LDiagonalTopLeftBottomRightRed: require(jsonSource(
          'LDiagonalTopLeftBottomRightRed',
        )),
        LDiagonalTopRightBottomLeftBlue: require(jsonSource(
          'LDiagonalTopRightBottomLeftBlue',
        )),
        LDiagonalTopRightBottomLeftRed: require(jsonSource(
          'LDiagonalTopRightBottomLeftRed',
        )),
        LLeftBlue: require(jsonSource('LLeftBlue')),
        LLeftRed: require(jsonSource('LLeftRed')),
        LMiddleHorizontalBlue: require(jsonSource('LMiddleHorizontalBlue')),
        LMiddleHorizontalRed: require(jsonSource('LMiddleHorizontalRed')),
        LMiddleVerticalBlue: require(jsonSource('LMiddleVerticalBlue')),
        LMiddleVerticalRed: require(jsonSource('LMiddleVerticalRed')),
        LRightBlue: require(jsonSource('LRightBlue')),
        LRightRed: require(jsonSource('LRightRed')),
        LTopBlue: require(jsonSource('LTopBlue')),
        LTopRed: require(jsonSource('LTopRed')),
        O1: require(jsonSource('O1')),
        X1: require(jsonSource('X1')),
      },
    },
    container: {
      get: {
        container: getContainer,
        imagePlay: getImagePlay,
        imageVisible: getImageVisible,
      },
      query: {
        container: queryContainer,
        imagePlay: queryImagePlay,
        imageVisible: queryImageVisible,
      },
    },
    render: renderAsset,
  };
};

describe('<Asset />', () => {
  beforeEach(() => {
    mockLottie.mockClear();
    mockPlay.mockClear();
  });

  it('renders a <Container />', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders a <Container /> with a default style', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        height: '100%',
        position: 'relative',
        width: '100%',
      }),
    );
  });

  it('renders <Lottie /> with /loop === false/', () => {
    renderer();
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        loop: false,
      }),
    );
  });

  it('renders <Lottie /> with a default style', () => {
    renderer();
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        style: {
          height: '100%',
          position: 'absolute',
          width: '100%',
        },
      }),
    );
  });

  it('passes onAnimationFinish to <Lottie />', () => {
    const onAnimationFinish = jest.fn();
    renderer({onAnimationFinish});
    expect(onAnimationFinish).toHaveBeenCalled();
  });

  describe('renders with /source === ', () => {
    it('"LBottomBlue"/', () => {
      const {assets} = renderer({type: 'LBottomBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LBottomBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LBottomRed"/', () => {
      const {assets} = renderer({type: 'LBottomRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LBottomRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LDiagonalTopLeftBottomRightBlue"/', () => {
      const {assets} = renderer({type: 'LDiagonalTopLeftBottomRightBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LDiagonalTopLeftBottomRightBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LDiagonalTopLeftBottomRightRed"/', () => {
      const {assets} = renderer({type: 'LDiagonalTopLeftBottomRightRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LDiagonalTopLeftBottomRightRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LDiagonalTopRightBottomLeftBlue"/', () => {
      const {assets} = renderer({type: 'LDiagonalTopRightBottomLeftBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LDiagonalTopRightBottomLeftBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LDiagonalTopRightBottomLeftRed"/', () => {
      const {assets} = renderer({type: 'LDiagonalTopRightBottomLeftRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LDiagonalTopRightBottomLeftRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LLeftBlue"/', () => {
      const {assets} = renderer({type: 'LLeftBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LLeftBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LLeftRed"/', () => {
      const {assets} = renderer({type: 'LLeftRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LLeftRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LMiddleHorizontalBlue"/', () => {
      const {assets} = renderer({type: 'LMiddleHorizontalBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LMiddleHorizontalBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LMiddleHorizontalRed"/', () => {
      const {assets} = renderer({type: 'LMiddleHorizontalRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LMiddleHorizontalRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LMiddleVerticalBlue"/', () => {
      const {assets} = renderer({type: 'LMiddleVerticalBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LMiddleVerticalBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LMiddleVerticalRed"/', () => {
      const {assets} = renderer({type: 'LMiddleVerticalRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LMiddleVerticalRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LRightBlue"/', () => {
      const {assets} = renderer({type: 'LRightBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LRightBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LRightRed"/', () => {
      const {assets} = renderer({type: 'LRightRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LRightRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LTopBlue"/', () => {
      const {assets} = renderer({type: 'LTopBlue'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LTopBlue,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"LTopRed"/', () => {
      const {assets} = renderer({type: 'LTopRed'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.LTopRed,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"O1"/', () => {
      const {assets} = renderer({type: 'O1'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.O1,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });

    it('"X1"/', () => {
      const {assets} = renderer({type: 'X1'});
      expect(mockLottie).toHaveBeenCalledWith(
        expect.objectContaining({
          source: assets.json.X1,
        }),
      );
      expect(mockPlay).toHaveBeenCalledWith(0, 26);
    });
  });

  describe('displays the image by default if /type ===', () => {
    it('"LBottomBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LBottomBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LBottomBlue,
      );
    });

    it('"LBottomRed"/', () => {
      const {assets, container} = renderer({
        type: 'LBottomRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LBottomRed,
      );
    });

    it('"LDiagonalTopLeftBottomRightBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LDiagonalTopLeftBottomRightBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LDiagonalTopLeftBottomRightBlue,
      );
    });

    it('"LDiagonalTopLeftBottomRightRed"/', () => {
      const {assets, container} = renderer({
        type: 'LDiagonalTopLeftBottomRightRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LDiagonalTopLeftBottomRightRed,
      );
    });

    it('"LDiagonalTopRightBottomLeftBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LDiagonalTopRightBottomLeftBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LDiagonalTopRightBottomLeftBlue,
      );
    });

    it('"LDiagonalTopRightBottomLeftRed"/', () => {
      const {assets, container} = renderer({
        type: 'LDiagonalTopRightBottomLeftRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LDiagonalTopRightBottomLeftRed,
      );
    });

    it('"LLeftBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LLeftBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LLeftBlue,
      );
    });

    it('"LLeftRed"/', () => {
      const {assets, container} = renderer({
        type: 'LLeftRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LLeftRed,
      );
    });

    it('"LMiddleHorizontalBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LMiddleHorizontalBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LMiddleHorizontalBlue,
      );
    });

    it('"LMiddleHorizontalRed"/', () => {
      const {assets, container} = renderer({
        type: 'LMiddleHorizontalRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LMiddleHorizontalRed,
      );
    });

    it('"LMiddleVerticalBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LMiddleVerticalBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LMiddleVerticalBlue,
      );
    });

    it('"LMiddleVerticalRed"/', () => {
      const {assets, container} = renderer({
        type: 'LMiddleVerticalRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LMiddleVerticalRed,
      );
    });

    it('"LRightBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LRightBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LRightBlue,
      );
    });

    it('"LRightRed"/', () => {
      const {assets, container} = renderer({
        type: 'LRightRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LRightRed,
      );
    });

    it('"LTopBlue"/', () => {
      const {assets, container} = renderer({
        type: 'LTopBlue',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LTopBlue,
      );
    });

    it('"LTopRed"/', () => {
      const {assets, container} = renderer({
        type: 'LTopRed',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(
        assets.image.LTopRed,
      );
    });

    it('"O1"/', () => {
      const {assets, container} = renderer({
        type: 'O1',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(assets.image.O1);
    });

    it('"X1"/', () => {
      const {assets, container} = renderer({
        type: 'X1',
        state: 'VISIBLE',
      });
      expect(getSource(container.get.imageVisible())).toEqual(assets.image.X1);
    });
  });

  describe('if /state ===', () => {
    describe('"PLAY"/', () => {
      it('renders <Lotti /> with a default /source === "X1"/ ', () => {
        const {assets} = renderer();
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.X1,
          }),
        );
      });

      it('renders an image at the end of the animation', () => {
        const {container} = renderer();
        expect(container.query.imagePlay()).not.toBeNull();
      });

      it('renders a different source based on /type/', () => {
        const {assets, container} = renderer({
          type: 'LDiagonalTopRightBottomLeftRed',
        });
        expect(getSource(container.get.imagePlay())).toEqual(
          assets.image.LDiagonalTopRightBottomLeftRed,
        );
      });
    });

    describe('"VISIBLE"/', () => {
      it('does not render <Lottie />', () => {
        renderer({state: 'VISIBLE'});
        expect(mockLottie).not.toHaveBeenCalled();
      });

      it('renders an <Image />', () => {
        const {container} = renderer({state: 'VISIBLE'});
        expect(container.get.imageVisible()).not.toBeNull();
      });
    });

    describe('"EMPTY"/', () => {
      it('does not renders <Container />', () => {
        const {container} = renderer({state: 'EMPTY'});
        expect(container.query.container()).toBeNull();
      });
    });
  });

  describe('displays with /optacity ===', () => {
    it('undefined/ by default', () => {
      const {container} = renderer();
      expect(getStyle(container.get.container())).toEqual(
        expect.objectContaining({
          opacity: undefined,
        }),
      );
    });

    it('0.4/ if /opacity === 0.4/', () => {
      const {container} = renderer({opacity: 0.4});
      expect(getStyle(container.get.container())).toEqual(
        expect.objectContaining({
          opacity: 0.4,
        }),
      );
    });
  });

  describe('displays with /padding ===', () => {
    it('undefined/ by default', () => {
      const {container} = renderer();
      expect(getStyle(container.get.container())).toEqual(
        expect.objectContaining({
          padding: undefined,
        }),
      );
    });

    it('large/ if /padding === "large"/', () => {
      const {container} = renderer({padding: 'large'});
      expect(getStyle(container.get.container())).toEqual(
        expect.objectContaining({
          padding: DEFAULT_LIGHT_THEME.spacing.large,
        }),
      );
    });
  });
});
