import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Tile from '../src/Tile';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

const IMAGE_TEST_ID = 'image';
const TEMP_IMAGE_TEST_ID = 'temp-image';
const TILE_TEST_ID = 'tile';
const imageSource = (image: string) => `../assets/images/${image}.png`;

describe('<Tile />', () => {
  const imgSourceX = require(imageSource('X'));
  const imgSourceO = require(imageSource('O'));
  let handlePress: jest.Mock;

  beforeEach(() => {
    handlePress = jest.fn();
  });
  afterEach(() => {
    handlePress.mockClear();
  });

  it('renders a <Pressable />', () => {
    const {getByTestId} = render(<Tile onPress={handlePress} />);
    fireEvent.press(getByTestId(TILE_TEST_ID));
    expect(handlePress).toHaveBeenCalled();
  });

  it('not renders an <Image /> if /state === Empty/', () => {
    const {queryByTestId} = render(<Tile />);
    expect(queryByTestId(IMAGE_TEST_ID)).toBeNull();
  });

  it('renders an "X" <Image /> if /state === player1/', () => {
    const {getByTestId} = render(<Tile state={TileState.Player1} />);
    expect(getByTestId(IMAGE_TEST_ID).props.source).toBe(imgSourceX);
  });

  it('renders an "O" <Image /> if /state === player2/', () => {
    const {getByTestId} = render(<Tile state={TileState.Player2} />);
    expect(getByTestId(IMAGE_TEST_ID).props.source).toBe(imgSourceO);
  });

  it('not triggers /onPress/ if /state !== Empty/', () => {
    const {getByTestId} = render(
      <Tile onPress={handlePress} state={TileState.Player1} />,
    );
    fireEvent.press(getByTestId(TILE_TEST_ID));
    expect(handlePress).toHaveBeenCalledTimes(0);
  });

  it('renders a temporary <Image /> if /selected === true/', () => {
    const imgSource = require(imageSource('X'));
    const {getByTestId} = render(
      <Tile currentPlayer={TileState.Player1} selected={true} />,
    );
    fireEvent.press(getByTestId(TILE_TEST_ID));
    expect(getByTestId(TEMP_IMAGE_TEST_ID).props.source).toBe(imgSource);
  });

  it('temporary <Image /> should be based on the /currentPlayer/', () => {
    const imgSource = require(imageSource('O'));
    const {getByTestId} = render(
      <Tile currentPlayer={TileState.Player2} selected={true} />,
    );
    fireEvent.press(getByTestId(TILE_TEST_ID));
    expect(getByTestId(TEMP_IMAGE_TEST_ID).props.source).toBe(imgSource);
  });

  it('not renders a temporary <Image /> if /selected === false/', () => {
    const {queryByTestId} = render(<Tile />);
    expect(queryByTestId(TEMP_IMAGE_TEST_ID)).toBeNull();
  });

  it('not renders temporary <Image /> if /state !== Empty/', () => {
    const {queryByTestId} = render(
      <Tile selected={true} state={TileState.Player1} />,
    );
    expect(queryByTestId(TEMP_IMAGE_TEST_ID)).toBeNull();
  });

  it('not triggers /onPress/ if /selected === true/', () => {
    const {getByTestId} = render(
      <Tile onPress={handlePress} selected={true} />,
    );
    fireEvent.press(getByTestId(TILE_TEST_ID));
    expect(handlePress).toHaveBeenCalledTimes(0);
  });
});
