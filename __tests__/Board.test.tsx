import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import {imageSource} from './testUtils';

import Board from '../src/Board';

describe('<Board />', () => {
  const TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable';
  beforeEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection');
  });

  afterEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection').mockRestore();
  });

  it('renders a <View />', () => {
    const {queryByTestId} = render(<Board />);
    expect(queryByTestId('board__container')).toBeTruthy();
  });

  it('renders nine <Section />', () => {
    const {getAllByTestId} = render(<Board />);
    expect(getAllByTestId('section__container')).toHaveLength(9);
  });

  it('passes onPress to <Section />', () => {
    const onPressReturned = jest.fn();
    const onPress = jest.fn(() => onPressReturned);
    const {getAllByTestId} = render(<Board onPress={onPress} />);
    expect(onPress).toHaveBeenCalledTimes(81);
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    expect(onPressReturned).toHaveBeenCalled();
  });

  it('validates sections based on history', () => {
    const onPress = jest.fn();
    const {getAllByTestId} = render(
      <Board history={[1]} onPress={() => onPress} />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('passes /activePlayer/ to <Section />', () => {
    const imgSourceX = require(imageSource('X'));
    const {getByTestId} = render(<Board selectedTileIndex={0} />);
    expect(getByTestId('tile__image--temp').props.source).toBe(imgSourceX);
  });

  it('/activePlayer/ is based on /history/', () => {
    const imgSourceO = require(imageSource('O'));
    const {getByTestId} = render(<Board history={[1]} selectedTileIndex={0} />);
    expect(getByTestId('tile__image--temp').props.source).toBe(imgSourceO);
  });

  it("sets all <Section />'s /valid/ to false if /gameIsWon === true/", () => {
    const onPress = jest.fn();
    const {getAllByTestId} = render(
      <Board gameIsDone={true} onPress={() => onPress} />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[30]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[55]);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders a "grid" <BackgroundImage />', () => {
    const imageSourceGrid = require(imageSource('boardGrid'));
    const {getByTestId} = render(<Board />);
    expect(getByTestId('board__image--grid').props.source).toBe(
      imageSourceGrid,
    );
  });

  it('calls /getActiveSection/ with /mode/', () => {
    render(<Board mode={ultimateTicTactToAlgorithm.Mode.Continue} />);
    expect(ultimateTicTactToAlgorithm.getActiveSection).toHaveBeenCalledWith(
      expect.anything(),
      ultimateTicTactToAlgorithm.Mode.Continue,
    );
  });

  it('calls /getActiveSection/ with /mode === Normal/ if /mode === undefined/', () => {
    render(<Board />);
    expect(ultimateTicTactToAlgorithm.getActiveSection).toHaveBeenCalledWith(
      expect.anything(),
      ultimateTicTactToAlgorithm.Mode.Normal,
    );
  });

  it('disables each <Tile /> if /disabled === true/', () => {
    const {getAllByTestId} = render(<Board disabled={true} />);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[80].props
        .accessibilityState.disabled,
    ).toBe(true);
  });
});
