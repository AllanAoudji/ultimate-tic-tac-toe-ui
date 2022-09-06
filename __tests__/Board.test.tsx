import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import {imageSource, getDisabled, getSource, jsonSource} from './testUtils';

import Board from '../src/Board';

const mockLottie = jest.fn();
jest.mock('lottie-react-native', () => {
  const {forwardRef, useEffect} = require('react');
  return forwardRef(({onAnimationFinish, ...props}: any, ref: any) => {
    useEffect(() => {
      if (ref.current) {
        ref.current.play = () => {};
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
    disabled?: boolean;
    history?: number[];
    gameIsDone?: boolean;
    mode?: ultimateTicTactToAlgorithm.Mode;
    onAnimationFinish?: () => void;
    onPress?: (
      index: number,
    ) =>
      | ((event?: GestureResponderEvent | undefined) => void)
      | null
      | undefined;
    sectionStates?: ultimateTicTactToAlgorithm.SectionState[];
    selectedTileIndex?: number | null;
    winner?: ultimateTicTactToAlgorithm.SectionState;
  } = {},
) => {
  const renderBoard = render(
    <Board
      disabled={options.disabled}
      history={options.history}
      gameIsDone={options.gameIsDone}
      mode={options.mode}
      onAnimationFinish={options.onAnimationFinish}
      onPress={options.onPress}
      sectionStates={options.sectionStates}
      selectedTileIndex={options.selectedTileIndex}
      winner={options.winner}
    />,
  );

  const {getAllByTestId, getByTestId, queryByTestId} = renderBoard;

  const getGameAsset = () => getByTestId('gameAsset__container');
  const getSectionContainers = () => getAllByTestId('section__container');
  const getTileContainers = () => getAllByTestId('tile__container--pressable');

  const getBoardImage = () => getByTestId('board__image--grid');
  const getContainer = () => getByTestId('board__container');
  const getGameAssetImage = () => getByTestId('gameAsset__image');
  const getTileContainer = (index: number) => getTileContainers()[index];

  const queryGameAsset = () => queryByTestId('gameAsset__container');

  return {
    assets: {
      image: {
        imageSourceGrid: require(imageSource('boardGrid')),
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
        boardImage: getBoardImage,
        container: getContainer,
        gameAsset: getGameAsset,
        gameAssetImage: getGameAssetImage,
        sectionContainers: getSectionContainers,
        tileContainer: getTileContainer,
        tileContainers: getTileContainers,
      },
      press: {
        tileContainer: (index: number) => {
          fireEvent.press(getTileContainer(index));
        },
      },
      query: {
        gameAsset: queryGameAsset,
      },
    },
    renderBoard,
  };
};

describe('<Board />', () => {
  beforeEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection');
    mockLottie.mockClear();
  });

  afterEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection').mockRestore();
  });

  it('renders a <Container />', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders nine <Section />', () => {
    const {container} = renderer();
    expect(container.get.sectionContainers()).toHaveLength(9);
  });

  it('renders a "grid" <BackgroundImage />', () => {
    const {assets, container} = renderer();
    expect(getSource(container.get.boardImage())).toBe(
      assets.image.imageSourceGrid,
    );
  });

  it('passes onPress to <Section />', () => {
    const onPressReturned = jest.fn();
    const onPress = jest.fn(() => onPressReturned);
    const {container} = renderer({onPress});
    expect(onPress).toHaveBeenCalledTimes(81);
    container.press.tileContainer(0);
    expect(onPressReturned).toHaveBeenCalled();
  });

  it('validates sections based on history', () => {
    const onPress = jest.fn();
    const {container} = renderer({history: [1], onPress: () => onPress});
    container.press.tileContainer(0);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('passes /activePlayer/ to <Section />', () => {
    const {container} = renderer({selectedTileIndex: 0});
    expect(container.get.gameAssetImage()).not.toBeNull();
  });

  it('/activePlayer/ is based on /history/', () => {
    const {assets, container} = renderer({history: [1], selectedTileIndex: 0});
    expect(getSource(container.get.gameAssetImage())).toEqual(assets.image.O1);
  });

  it("sets all <Section />'s /valid/ to false if /gameIsWon === true/", () => {
    const onPress = jest.fn();
    const {container} = renderer({gameIsDone: true, onPress: () => onPress});
    container.press.tileContainer(0);
    container.press.tileContainer(30);
    container.press.tileContainer(55);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('calls /getActiveSection/ with /mode/', () => {
    renderer({mode: ultimateTicTactToAlgorithm.Mode.Continue});
    expect(ultimateTicTactToAlgorithm.getActiveSection).toHaveBeenCalledWith(
      expect.anything(),
      ultimateTicTactToAlgorithm.Mode.Continue,
    );
  });

  it('calls /getActiveSection/ with /mode === Normal/ if /mode === undefined/', () => {
    renderer();
    expect(ultimateTicTactToAlgorithm.getActiveSection).toHaveBeenCalledWith(
      expect.anything(),
      ultimateTicTactToAlgorithm.Mode.Normal,
    );
  });

  it('disables each <Tile /> if /disabled === true/', () => {
    const {container} = renderer({disabled: true});
    expect(getDisabled(container.get.tileContainer(0))).toBe(true);
    expect(getDisabled(container.get.tileContainer(1))).toBe(true);
    expect(getDisabled(container.get.tileContainer(80))).toBe(true);
  });

  it('passes /mode/ to each <Section />', () => {
    const {renderBoard} = renderer({
      mode: ultimateTicTactToAlgorithm.Mode.Normal,
    });
    expect(
      renderBoard.container.findAllByProps({
        mode: ultimateTicTactToAlgorithm.Mode.Normal,
        activePlayer: ultimateTicTactToAlgorithm.TileState.Player1,
      }),
    ).toHaveLength(9);
  });

  it('passes the other /mode/ to each <Section />', () => {
    const {renderBoard} = renderer({
      mode: ultimateTicTactToAlgorithm.Mode.Continue,
    });
    expect(
      renderBoard.container.findAllByProps({
        mode: ultimateTicTactToAlgorithm.Mode.Continue,
        activePlayer: ultimateTicTactToAlgorithm.TileState.Player1,
      }),
    ).toHaveLength(9);
  });

  it('passes sectionState to each <Section />', () => {
    const {sectionStates} = ultimateTicTactToAlgorithm.generateAssets();
    sectionStates[0] = [
      ultimateTicTactToAlgorithm.TileState.Player1,
      ultimateTicTactToAlgorithm.WinningLine.LeftColumn,
    ];
    const {assets} = renderer({sectionStates});
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        source: assets.json.X1,
      }),
    );
  });

  it('passes onAnimationFinish to <WinningImage />', () => {
    const onAnimationFinish = jest.fn();
    renderer({
      onAnimationFinish,
      winner: [
        ultimateTicTactToAlgorithm.TileState.Player1,
        ultimateTicTactToAlgorithm.WinningLine.BottomRow,
      ],
    });
    expect(onAnimationFinish).toHaveBeenCalled();
  });

  it('calls onAnimationFinish if /winner[0] === Draw/', () => {
    const onAnimationFinish = jest.fn();
    renderer({
      onAnimationFinish,
      winner: [ultimateTicTactToAlgorithm.TileState.Draw, null],
    });
    expect(onAnimationFinish).toHaveBeenCalled();
  });

  it('calls onAnimationFinish if /winner[1] === Surrender/', () => {
    const onAnimationFinish = jest.fn();
    renderer({
      onAnimationFinish,
      winner: [
        ultimateTicTactToAlgorithm.TileState.Player1,
        ultimateTicTactToAlgorithm.WinningLine.Surrender,
      ],
    });
    expect(onAnimationFinish).toHaveBeenCalled();
  });

  describe('displays a <GameAsset />', () => {
    describe('if /winner[0] === Player1/ and', () => {
      const player1 = ultimateTicTactToAlgorithm.TileState.Player1;

      it('/winner === BottomRow/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.BottomRow],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LBottomBlue,
          }),
        );
      });

      it('/winner === LeftColum/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.LeftColumn],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LLeftBlue,
          }),
        );
      });

      it('/winner === MiddleColumn/', () => {
        const {assets} = renderer({
          winner: [
            player1,
            ultimateTicTactToAlgorithm.WinningLine.MiddleColumn,
          ],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LMiddleVerticalBlue,
          }),
        );
      });

      it('/winner === MiddleRow/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.MiddleRow],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LMiddleHorizontalBlue,
          }),
        );
      });

      it('/winner === RightColumn/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.RightColumn],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LRightBlue,
          }),
        );
      });

      it('/winner === TopLeftBottomRightDiagonal/', () => {
        const {assets} = renderer({
          winner: [
            player1,
            ultimateTicTactToAlgorithm.WinningLine.TopLeftBottomRightDiagonal,
          ],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LDiagonalTopLeftBottomRightBlue,
          }),
        );
      });

      it('/winner === TopRightBottomLeftDiagonal/', () => {
        const {assets} = renderer({
          winner: [
            player1,
            ultimateTicTactToAlgorithm.WinningLine.TopRightBottomLeftDiagonal,
          ],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LDiagonalTopRightBottomLeftBlue,
          }),
        );
      });

      it('/winner === TopRow/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.TopRow],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LTopBlue,
          }),
        );
      });
    });

    describe('does not display a <GameAsset /> if', () => {
      it('/winner[0] === Empty/', () => {
        const {container} = renderer({
          winner: [ultimateTicTactToAlgorithm.TileState.Empty, null],
        });
        expect(container.query.gameAsset()).toBeNull();
      });

      it('/winner[1] === Draw/', () => {
        const {container} = renderer({
          winner: [ultimateTicTactToAlgorithm.TileState.Draw, null],
        });
        expect(container.query.gameAsset()).toBeNull();
      });

      it('/winner[1] === Surrender/', () => {
        const {container} = renderer({
          winner: [
            ultimateTicTactToAlgorithm.TileState.Player1,
            ultimateTicTactToAlgorithm.WinningLine.Surrender,
          ],
        });
        expect(container.query.gameAsset()).toBeNull();
      });
    });

    describe('if /winner[0] === Player2/ and', () => {
      const player1 = ultimateTicTactToAlgorithm.TileState.Player2;

      it('/winner === BottomRow/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.BottomRow],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LBottomRed,
          }),
        );
      });

      it('/winner === LeftColum/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.LeftColumn],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LLeftRed,
          }),
        );
      });

      it('/winner === MiddleColumn/', () => {
        const {assets} = renderer({
          winner: [
            player1,
            ultimateTicTactToAlgorithm.WinningLine.MiddleColumn,
          ],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LMiddleVerticalRed,
          }),
        );
      });

      it('/winner === MiddleRow/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.MiddleRow],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LMiddleHorizontalRed,
          }),
        );
      });

      it('/winner === RightColumn/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.RightColumn],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LRightRed,
          }),
        );
      });

      it('/winner === TopLeftBottomRightDiagonal/', () => {
        const {assets} = renderer({
          winner: [
            player1,
            ultimateTicTactToAlgorithm.WinningLine.TopLeftBottomRightDiagonal,
          ],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LDiagonalTopLeftBottomRightRed,
          }),
        );
      });

      it('/winner === TopRightBottomLeftDiagonal/', () => {
        const {assets} = renderer({
          winner: [
            player1,
            ultimateTicTactToAlgorithm.WinningLine.TopRightBottomLeftDiagonal,
          ],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LDiagonalTopRightBottomLeftRed,
          }),
        );
      });

      it('/winner === TopRow/', () => {
        const {assets} = renderer({
          winner: [player1, ultimateTicTactToAlgorithm.WinningLine.TopRow],
        });
        expect(mockLottie).toHaveBeenCalledWith(
          expect.objectContaining({
            source: assets.json.LTopRed,
          }),
        );
      });
    });
  });
});
