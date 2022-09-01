import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import {imageSource, getDisabled, getSource} from './testUtils';

import Board from '../src/Board';

const mockAsset = jest.fn();
jest.mock('../src/Asset', () => (props: any) => {
  const {View} = require('react-native');
  mockAsset(props);
  return <View {...props} />;
});

const renderer = (
  options: {
    disabled?: boolean;
    history?: number[];
    gameIsDone?: boolean;
    mode?: ultimateTicTactToAlgorithm.Mode;
    onPress?: (
      index: number,
    ) =>
      | ((event?: GestureResponderEvent | undefined) => void)
      | null
      | undefined;
    sectionStates?: ultimateTicTactToAlgorithm.SectionState[];
    selectedTileIndex?: number | null;
  } = {},
) => {
  const renderBoard = render(
    <Board
      disabled={options.disabled}
      history={options.history}
      gameIsDone={options.gameIsDone}
      mode={options.mode}
      onPress={options.onPress}
      sectionStates={options.sectionStates}
      selectedTileIndex={options.selectedTileIndex}
    />,
  );

  const {getAllByTestId, getByTestId} = renderBoard;

  const getSectionContainers = () => getAllByTestId('section__container');
  const getTileContainers = () => getAllByTestId('tile__container--pressable');

  const getBoardImage = () => getByTestId('board__image--grid');
  const getContainer = () => getByTestId('board__container');
  const getTileContainer = (index: number) => getTileContainers()[index];

  return {
    assets: {
      imageSourceGrid: require(imageSource('boardGrid')),
    },
    container: {
      get: {
        boardImage: getBoardImage,
        container: getContainer,
        sectionContainers: getSectionContainers,
        tileContainer: getTileContainer,
        tileContainers: getTileContainers,
      },
      press: {
        tileContainer: (index: number) => {
          fireEvent.press(getTileContainer(index));
        },
      },
    },
    renderBoard,
  };
};

describe('<Board />', () => {
  beforeEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection');
    mockAsset.mockClear();
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
    expect(getSource(container.get.boardImage())).toBe(assets.imageSourceGrid);
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
    renderer({selectedTileIndex: 0});
    expect(mockAsset).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        disabled: true,
        type: 'X1',
      }),
    );
  });

  it('/activePlayer/ is based on /history/', () => {
    renderer({history: [1], selectedTileIndex: 0});
    expect(mockAsset).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        disabled: true,
        type: 'O1',
      }),
    );
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
    renderer({sectionStates});
    expect(mockAsset).toHaveBeenCalledTimes(82);
  });
});
