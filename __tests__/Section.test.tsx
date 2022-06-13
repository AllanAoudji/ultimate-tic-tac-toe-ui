import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {
  generateAssets,
  getSections,
  Tile,
  TileState,
} from 'ultimate-tic-tac-toe-algorithm';
import Section from '../src/Section';

const imageSource = (image: string) => `../assets/images/${image}.png`;

describe('<Section/>', () => {
  const imgSourceO = require(imageSource('O'));
  const imgSourceX = require(imageSource('X'));
  let tiles: Tile[][], handlePress: jest.Mock;

  beforeEach(() => {
    handlePress = jest.fn();
    const assets = generateAssets();
    tiles = getSections(assets.board)[0].tiles;
  });

  afterEach(() => {
    handlePress.mockRestore();
  });

  it('renders a <View />', () => {
    const {getByTestId} = render(<Section />);
    expect(getByTestId('section')).toBeTruthy();
  });

  it('contains nine <Tile />', () => {
    const {getByTestId} = render(<Section tiles={tiles} />);
    expect(getByTestId('section').children).toHaveLength(9);
  });

  it('passes /state/ on each <Tile />', () => {
    tiles[0][0].state = TileState.Player1;
    tiles[0][1].state = TileState.Player2;
    const {getAllByTestId} = render(<Section tiles={tiles} />);
    expect(getAllByTestId('image')).toHaveLength(2);
    expect(getAllByTestId('image')[0].props.source).toBe(imgSourceX);
    expect(getAllByTestId('image')[1].props.source).toBe(imgSourceO);
  });

  it('calls /onPress/ on each <Tile /> with proper /tile.index1D/', () => {
    render(<Section onPress={handlePress} tiles={tiles} />);
    expect(handlePress).toHaveBeenCalledTimes(9);
    expect(handlePress).toHaveBeenCalledWith(0);
    expect(handlePress).toHaveBeenCalledWith(1);
    expect(handlePress).toHaveBeenCalledWith(2);
  });

  it('disables each <Tile /> if <Section /> if /valid === false/', () => {
    const {getAllByTestId} = render(
      <Section onPress={() => handlePress} tiles={tiles} valid={false} />,
    );
    fireEvent.press(getAllByTestId('tile')[0]);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it("renders tile's <TempImage /> if /selectedTileIndex === tile.index1D/", () => {
    const {getAllByTestId} = render(
      <Section selectedTileIndex={2} tiles={tiles} />,
    );
    expect(getAllByTestId('temp-image')).toHaveLength(1);
  });

  it('passes /currentPlayer/ to <Tile />', () => {
    const {getByTestId} = render(
      <Section
        currentPlayer={TileState.Player2}
        selectedTileIndex={2}
        tiles={tiles}
      />,
    );
    expect(getByTestId('temp-image').props.source).toBe(imgSourceO);
  });
});
