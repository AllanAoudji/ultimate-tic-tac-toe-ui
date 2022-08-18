import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';

import {imageSource} from './testUtils';

import Tile from '../src/Tile';

const TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable';
const TILE_IMAGE_STATE_TEST_ID = 'tile__image--state';
const TILE_IMAGE_TEMP_TEST_ID = 'tile__image--temp';

describe('<Tile />', () => {
  const imgSourceO = require(imageSource('O'));
  const imgSourceX = require(imageSource('X'));
  let handlePress: jest.Mock;

  beforeEach(() => {
    handlePress = jest.fn();
  });
  afterEach(() => {
    handlePress.mockClear();
  });

  it('renders a <Pressable />', () => {
    const {getByTestId} = render(<Tile onPress={handlePress} />);
    fireEvent.press(getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID));
    expect(handlePress).toHaveBeenCalled();
  });

  it('not calls /onPress/ if /valid === false/', () => {
    const {getByTestId} = render(<Tile onPress={handlePress} valid={false} />);
    fireEvent.press(getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID));
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('not renders an <Image /> if /state === Empty/', () => {
    const {queryByTestId} = render(<Tile />);
    expect(queryByTestId(TILE_IMAGE_STATE_TEST_ID)).toBeNull();
  });

  it('renders an "X" <Image /> if /state === player1/', () => {
    const {getByTestId} = render(<Tile state={TileState.Player1} />);
    expect(getByTestId(TILE_IMAGE_STATE_TEST_ID).props.source).toBe(imgSourceX);
  });

  it('renders an "O" <Image /> if /state === player2/', () => {
    const {getByTestId} = render(<Tile state={TileState.Player2} />);
    expect(getByTestId(TILE_IMAGE_STATE_TEST_ID).props.source).toBe(imgSourceO);
  });

  it('not calls /onPress/ if /state !== Empty/', () => {
    const {getByTestId} = render(
      <Tile onPress={handlePress} state={TileState.Player1} />,
    );
    fireEvent.press(getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID));
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('renders a temporary <Image /> if /selected === true/', () => {
    const imgSource = require(imageSource('X'));
    const {getByTestId} = render(
      <Tile activePlayer={TileState.Player1} selected={true} />,
    );
    fireEvent.press(getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID));
    expect(getByTestId(TILE_IMAGE_TEMP_TEST_ID).props.source).toBe(imgSource);
  });

  it('temporary <Image /> should be based on the /activePlayer/', () => {
    const imgSource = require(imageSource('O'));
    const {getByTestId} = render(
      <Tile activePlayer={TileState.Player2} selected={true} />,
    );
    fireEvent.press(getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID));
    expect(getByTestId(TILE_IMAGE_TEMP_TEST_ID).props.source).toBe(imgSource);
  });

  it('not renders a temporary <Image /> if /selected === false/', () => {
    const {queryByTestId} = render(<Tile />);
    expect(queryByTestId(TILE_IMAGE_TEMP_TEST_ID)).toBeNull();
  });

  it('not renders temporary <Image /> if /state !== Empty/', () => {
    const {queryByTestId} = render(
      <Tile selected={true} state={TileState.Player1} />,
    );
    expect(queryByTestId(TILE_IMAGE_TEMP_TEST_ID)).toBeNull();
  });

  it('not calls /onPress/ if /selected === true/', () => {
    const {getByTestId} = render(
      <Tile onPress={handlePress} selected={true} />,
    );
    fireEvent.press(getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID));
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('disables <Tile /> if /disabled === true', () => {
    const {getByTestId} = render(<Tile disabled={true} />);
    expect(
      getByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID).props.accessibilityState
        .disabled,
    ).toBe(true);
  });
});
