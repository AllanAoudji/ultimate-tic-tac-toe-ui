import {fireEvent, render} from '@testing-library/react-native';
import {mockRandomForEach, mockRandom, resetMockRandom} from 'jest-mock-random';
import React from 'react';

import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import {imageSource} from './testUtils';

import Game from '../src/Game';
import {act} from 'react-test-renderer';

const spyPlay: (winner?: ultimateTicTactToAlgorithm.SectionState) => void = (
  winner = [
    ultimateTicTactToAlgorithm.TileState.Player1,
    ultimateTicTactToAlgorithm.WinningLine.TopRow,
  ],
) => {
  jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockReturnValue({
    history: [80],
    mode: ultimateTicTactToAlgorithm.Mode.Normal,
    sectionStates: new Array(9).fill([
      ultimateTicTactToAlgorithm.TileState.Empty,
      null,
    ]),
    winner,
  });
};

describe('<Game />', () => {
  const BOARD_CONTAINER_TEST_ID = 'board__container',
    IT_S_A_DRAW_TEXT = "it's a draw",
    NEW_GAME_TEXT = 'new game',
    PLAYER_O_COLOR = '#ed1327',
    PLAYER_O_TEXT = 'player o',
    PLAYER_X_COLOR = '#0012ff',
    PLAYER_X_TEXT = 'player x',
    PLAYER_BOARD_CONTAINER_TEST_ID = 'playerBoard__container',
    PLAY_TEXT = 'play',
    PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'playButton__container--pressable',
    QUIT_TEXT = 'quit',
    SECTION_IMAGE_PLAYER = 'section__image--player',
    SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID =
      'surrendButton__container--pressable',
    SURREND_MODAL_CONTAINER_INNER_TEST_ID = 'surrendModal__container--inner',
    SURREND_MODAL_CONTAINER_TEST_ID = 'surrendModal__container',
    TILE_CONTAINER_PRESSABLE_TEST_ID = 'tile__container--pressable',
    TILE_IMAGE_STATE_TEST_ID = 'tile__image--state',
    TILE_IMAGE_TEMP_TEST_ID = 'tile__image--temp',
    WINNING_MODAL_CONTAINER_TEST_ID = 'winningModal__container',
    YES_TEXT = 'yes';

  // BOTTOM <PlayerBoard is always player1
  mockRandomForEach([0.5]);

  beforeEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection');
    jest.spyOn(ultimateTicTactToAlgorithm, 'play');
  });

  afterEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection').mockRestore();
    jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockRestore();
  });

  it('renders two <PlayerBoard />', () => {
    const {queryAllByTestId} = render(<Game />);
    expect(queryAllByTestId(PLAYER_BOARD_CONTAINER_TEST_ID).length).toBe(2);
  });

  it('renders first <PlayerBoard /> with /position === TOP/', () => {
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAYER_BOARD_CONTAINER_TEST_ID)[0].props.style.transform,
    ).toEqual([{rotate: '180deg'}]);
  });

  it('choses player randomly', () => {
    mockRandom(0.5);
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props.style
        .backgroundColor,
    ).toBe(PLAYER_O_COLOR);
    resetMockRandom();
  });

  it('renders the other player with a 50/50 ramdom chance', () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props.style
        .backgroundColor,
    ).toBe(PLAYER_X_COLOR);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props.style
        .backgroundColor,
    ).toBe(PLAYER_O_COLOR);
    resetMockRandom();
  });

  it(`disables "${PLAY_TEXT}" <Pressable /> on mount`, () => {
    const {getAllByTestId} = render(<Game />);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('opens player TOP <SurrendModal /> when <SurrendButton /> is pressed', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_O_COLOR);
  });

  it('opens player BOTTOM <SurrendModal /> when <SurrendButton /> is pressed', () => {
    const {getAllByTestId, getByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(PLAYER_X_COLOR);
  });

  it('renders <WinningModal /> with /winner === Player1/ if player2 surrend', () => {
    const {getAllByTestId, getByText, queryByTestId, queryByText} = render(
      <Game />,
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    expect(queryByText(PLAYER_X_TEXT)).not.toBeNull();
  });

  it('renders <WinningModal /> with /winner === Player2/ if player1 surrend', () => {
    const {getAllByTestId, getByText, queryByTestId, queryByText} = render(
      <Game />,
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    expect(queryByText(PLAYER_O_TEXT)).not.toBeNull();
  });

  it(`resets /winner/ when "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getByText, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryByTestId(WINNING_MODAL_CONTAINER_TEST_ID)).toBeNull();
  });

  it('randomized /players/ when  "new game" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText} = render(<Game />);
    mockRandom(0.499);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props.style
        .backgroundColor,
    ).toBe(PLAYER_X_COLOR);
    resetMockRandom();
  });

  it('disables <SurrendButton /> if /winner !== Empty/', () => {
    const {getAllByTestId, getByText} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('closes both <SurrendModal /> when a player surrend', async () => {
    let {queryAllByTestId, getAllByTestId, getAllByText} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getAllByText(YES_TEXT)[0]);
    expect(queryAllByTestId(SURREND_MODAL_CONTAINER_TEST_ID).length).toBe(0);
  });

  it('renders a <Board />', () => {
    const {queryByTestId} = render(<Game />);
    expect(queryByTestId(BOARD_CONTAINER_TEST_ID)).not.toBeNull();
  });

  it('renders a player1 temp <Image /> when press on a <Tile /> if /history.length === 0/', () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getByTestId, queryAllByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(queryAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(queryByTestId(TILE_IMAGE_TEMP_TEST_ID)).not.toBeNull();
    expect(getByTestId(TILE_IMAGE_TEMP_TEST_ID).props.source).toBe(
      IMAGE_PLAYER_X,
    );
  });

  it(`enables player BOTTOM "${PLAY_TEXT}" <Pressable /> if it's the player turn and /selectedTileIndex !== null/`, () => {
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(false);
  });

  it(`pushes /selectedTileIndex/ on /history/ when press on BOTTOM player "${PLAY_TEXT}" <Pressable />`, () => {
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID)[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
  });

  it(`enables player TOP "${PLAY_TEXT}" <Pressable /> if its's the player turn and /selectedTileIndex !== null/`, () => {
    mockRandom(0.499);
    const {getAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(false);
    resetMockRandom();
  });

  it(`pushes /selectedTileIndex/ on /history/ when press on TOP player "${PLAY_TEXT}" <Pressable />`, () => {
    mockRandom(0.499);
    let IMAGE_PLAYER_X = require(imageSource('X'));
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText('play')[0]);
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID)[0].props.source).toBe(
      IMAGE_PLAYER_X,
    );
    resetMockRandom();
  });

  it(`resets /history/ when "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getAllByText, getByText, queryAllByTestId} = render(
      <Game />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID).length).toBe(0);
  });

  it(`resets /selectedTileIndex/ when "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId(TILE_IMAGE_TEMP_TEST_ID).length).toBe(0);
  });

  it(`resets /selectedTileIndex/ when "${PLAY_TEXT}" <Pressable /> is pressed`, () => {
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(getAllByText(PLAY_TEXT)[0]);
    expect(queryAllByTestId(TILE_IMAGE_STATE_TEST_ID).length).toBe(1);
  });

  it('displays <WinnigFlag /> if game is won', () => {
    spyPlay();
    const {getAllByTestId, queryByText, getAllByText} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(queryByText(PLAYER_X_TEXT)).not.toBeNull();
  });

  it('displays Draw <WinningModal /> if game is a draw', () => {
    spyPlay([
      ultimateTicTactToAlgorithm.TileState.Empty,
      ultimateTicTactToAlgorithm.WinningLine.Draw,
    ]);
    const {getAllByTestId, getAllByText, queryByText} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(queryByText(IT_S_A_DRAW_TEXT)).not.toBeNull();
  });

  it('disables press <Tile /> if /winner !== EMPTY/', () => {
    spyPlay();
    const {getAllByTestId, getAllByText, queryByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1]);
    expect(queryByTestId(TILE_IMAGE_TEMP_TEST_ID)).toBeNull();
  });

  it('closes both <SurrendModal /> when game is a draw', () => {
    spyPlay([
      ultimateTicTactToAlgorithm.TileState.Empty,
      ultimateTicTactToAlgorithm.WinningLine.Draw,
    ]);
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(queryAllByTestId(SURREND_MODAL_CONTAINER_TEST_ID).length).toBe(0);
  });

  it('disabled <SurrendButton /> if game is a draw', () => {
    spyPlay([
      ultimateTicTactToAlgorithm.TileState.Empty,
      ultimateTicTactToAlgorithm.WinningLine.Draw,
    ]);
    const {getAllByTestId, getAllByText} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('disables press <Tile /> if game is a draw', () => {
    spyPlay([
      ultimateTicTactToAlgorithm.TileState.Empty,
      ultimateTicTactToAlgorithm.WinningLine.Draw,
    ]);
    const {getAllByTestId, getAllByText, queryByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1]);
    expect(queryByTestId(TILE_IMAGE_TEMP_TEST_ID)).toBeNull();
  });

  it('call /onPressQuit/ when "quit" <Pressable /> is pressed', () => {
    const onPressQuit = jest.fn();
    const {getAllByTestId, getByText} = render(
      <Game onPressQuit={onPressQuit} />,
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(QUIT_TEXT));
    expect(onPressQuit).toHaveBeenCalled();
  });

  it('calls /play/ with /mode/', () => {
    const {getAllByTestId, getAllByText} = render(
      <Game mode={ultimateTicTactToAlgorithm.Mode.Continue} />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(ultimateTicTactToAlgorithm.play).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        mode: ultimateTicTactToAlgorithm.Mode.Continue,
      }),
    );
  });

  it('calls /play/ with /mode === Normal/ if /mode === undefined/', async () => {
    const {getAllByTestId, getAllByText} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    await fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(ultimateTicTactToAlgorithm.play).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        mode: ultimateTicTactToAlgorithm.Mode.Normal,
      }),
    );
  });

  it('passes /mode/ to <Board />', () => {
    render(<Game mode={ultimateTicTactToAlgorithm.Mode.Continue} />);
    expect(ultimateTicTactToAlgorithm.getActiveSection).toHaveBeenCalledWith(
      expect.anything(),
      ultimateTicTactToAlgorithm.Mode.Continue,
    );
  });

  it('disables BOTTOM <PlayButton /> if /disabled === true/', () => {
    const {getAllByTestId} = render(<Game disabled={true} />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('disables TOP <PlayButton /> if /disabled === true/', () => {
    mockRandom(0.49);
    const {getAllByTestId} = render(<Game disabled={true} />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(
      getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    resetMockRandom();
  });

  it('disables BOTTOM <SurrendButton /> if /disabled === true/', () => {
    const {getAllByTestId} = render(<Game disabled={true} />);
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('disables TOP <SurrendButton /> if /disabled === true/', () => {
    const {getAllByTestId} = render(<Game disabled={true} />);
    expect(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('hides BOTTOM <SurrendModal /> if /disabled === true/', () => {
    const {getAllByTestId, queryByTestId, rerender} = render(<Game />);
    act(() => {
      fireEvent.press(
        getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
      );
    });
    rerender(<Game disabled={true} />);
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).toBeNull();
  });

  it('hides TOP <SurrendModal /> if /disabled === true/', () => {
    const {getAllByTestId, queryByTestId, rerender} = render(<Game />);
    act(() => {
      fireEvent.press(
        getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
      );
    });
    rerender(<Game disabled={true} />);
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).toBeNull();
  });

  it('disables <Board /> if /disabled == true', () => {
    const {getAllByTestId} = render(<Game disabled={true} />);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1].props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[2].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('calls /setGameIsDone/ when game is finished (win/surrend/draw)', () => {
    spyPlay();
    const setGameIsDone = jest.fn();
    const {getAllByTestId, getAllByText} = render(
      <Game setGameIsDone={setGameIsDone} />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(setGameIsDone).toHaveBeenCalledWith(true);
  });

  it(`calls /setGameIsDone/ when ${NEW_GAME_TEXT} <Pressable /> start`, () => {
    const setGameIsDone = jest.fn();
    const {getAllByTestId, getByText} = render(
      <Game setGameIsDone={setGameIsDone} />,
    );
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(setGameIsDone).toHaveBeenCalledWith(false);
  });

  it('closes Player BOTTOM <SurrendModal /> if Player BOTTOM presses a <Tile />', () => {
    const {getAllByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).toBeNull();
  });

  it('closes Player TOP <SurrendModal /> if Playyer TOP presses a <Tile />', () => {
    const {getAllByTestId, queryByTestId} = render(<Game />);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0],
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1]);
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).not.toBeNull();
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[1]);
    fireEvent.press(getAllByTestId(PLAY_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[0]);
    expect(queryByTestId(SURREND_MODAL_CONTAINER_TEST_ID)).toBeNull();
  });

  it('passes /sectionStates/ to board', () => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockReturnValue({
      history: [80],
      mode: ultimateTicTactToAlgorithm.Mode.Normal,
      sectionStates: new Array(9).fill([
        ultimateTicTactToAlgorithm.TileState.Player1,
        ultimateTicTactToAlgorithm.WinningLine.BottomRow,
      ]),
      winner: [ultimateTicTactToAlgorithm.TileState.Empty, null],
    });
    const {getAllByTestId, getAllByText, queryAllByTestId} = render(<Game />);
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    expect(queryAllByTestId(SECTION_IMAGE_PLAYER)).toHaveLength(9);
  });

  it('resets /sectionStates/ to board', () => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockReturnValue({
      history: [80],
      mode: ultimateTicTactToAlgorithm.Mode.Normal,
      sectionStates: new Array(9).fill([
        ultimateTicTactToAlgorithm.TileState.Player1,
        ultimateTicTactToAlgorithm.WinningLine.BottomRow,
      ]),
      winner: [ultimateTicTactToAlgorithm.TileState.Empty, null],
    });
    const {getAllByTestId, getAllByText, getByText, queryAllByTestId} = render(
      <Game />,
    );
    fireEvent.press(getAllByTestId(TILE_CONTAINER_PRESSABLE_TEST_ID)[0]);
    fireEvent.press(getAllByText(PLAY_TEXT)[1]);
    fireEvent.press(
      getAllByTestId(SURREND_BUTTON_CONTAINER_PRESSABLE_TEST_ID)[1],
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NEW_GAME_TEXT));
    expect(queryAllByTestId(SECTION_IMAGE_PLAYER)).toHaveLength(0);
  });
});
