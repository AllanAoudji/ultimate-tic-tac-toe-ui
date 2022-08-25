import {fireEvent, render} from '@testing-library/react-native';
import {mockRandom, resetMockRandom} from 'jest-mock-random';
import React from 'react';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import {
  getDisabled,
  getSource,
  getStyle,
  imageSource,
  spyPlay,
} from './testUtils';

import Game from '../src/Game';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import * as useGameHistory from '../src/useGameHistory.hook';
import {HistoryProvider} from '../src/History.context';

const renderer = (
  options: {
    disabled?: boolean;
    firstPlayer?: 'BOTTOM' | 'TOP';
    mode?: ultimateTicTactToAlgorithm.Mode;
    onPressQuit?: () => {};
    setGameIsDone?: React.Dispatch<React.SetStateAction<boolean>>;
  } = {
    firstPlayer: 'BOTTOM',
  },
) => {
  const firstPlayer = options.firstPlayer || 'BOTTOM';

  mockRandom(firstPlayer === 'BOTTOM' ? 0.5 : 0.4999);
  const renderBoard = render(
    <Game
      disabled={options.disabled}
      onPressQuit={options.onPressQuit}
      mode={options.mode}
      setGameIsDone={options.setGameIsDone}
    />,
    {wrapper: HistoryProvider},
  );
  resetMockRandom();

  const {
    getAllByTestId,
    getByTestId,
    getByText,
    queryAllByTestId,
    queryByTestId,
    queryByText,
    rerender,
  } = renderBoard;

  const getBoard = () => getByTestId('board__container');
  const getBoards = () => getAllByTestId('playerBoard__container');
  const getNewGameButton = () => getByText('new game');
  const getPlayButtons = () =>
    getAllByTestId('playButton__container--pressable');
  const getPlayerOText = () => getByText('player o');
  const getPlayerXText = () => getByText('player x');
  const getQuitGameText = () => getByText('quit');
  const getSectionPlayerImages = () => getAllByTestId('section__image--player');
  const getSurrendButtons = () =>
    getAllByTestId('surrendButton__container--pressable');
  const getSurrendModalContainer = () => getByTestId('surrendModal__container');
  const getSurrendModalInnerContainer = () =>
    getByTestId('surrendModal__container--inner');
  const getTiles = () => getAllByTestId('tile__container--pressable');
  const getTilesTempImage = () => getByTestId('tile__image--temp');
  const getYesButton = () => getByText('yes');

  const queryBoard = () => queryByTestId('board__container');
  const queryItsADrawText = () => queryByText("it's a draw");
  const queryPlayerOText = () => queryByText('player o');
  const queryPlayerXText = () => queryByText('player x');
  const querySectionPlayerImages = () =>
    queryAllByTestId('section__image--player');
  const querySurrendModal = () => queryByTestId('surrendModal__container');
  const queryTileTempImage = () => queryByTestId('tile__image--temp');
  const queryTileTempImages = () => queryAllByTestId('tile__image--temp');
  const queryTileImageState = () => queryAllByTestId('tile__image--state');
  const queryWinningModal = () => queryByTestId('winningModal__container');

  return {
    assets: {
      images: {
        playerO: require(imageSource('O')),
        playerX: require(imageSource('X')),
      },
    },
    container: {
      get: {
        board: getBoard,
        playerOText: getPlayerOText,
        playerXText: getPlayerXText,
        sectionImagePlayers: getSectionPlayerImages,
        tileTempImage: getTilesTempImage,
        tiles: getTiles,
        tile: (index: number) => getTiles()[index],
      },
      query: {
        board: queryBoard,
        itsADrawText: queryItsADrawText,
        playerOText: queryPlayerOText,
        playerXText: queryPlayerXText,
        sectionImagePlayers: querySectionPlayerImages,
        tileTempImage: queryTileTempImage,
        tileTempImages: queryTileTempImages,
        tileStateImages: queryTileImageState,
        tileStateImage: () => queryTileImageState()[0],
        winningModal: queryWinningModal,
      },
    },
    players: {
      get: {
        board: getBoards,
        playButtons: getPlayButtons,
        surrendButtons: getSurrendButtons,
        surrendModal: getSurrendModalContainer,
        surrendModalInnerContainer: getSurrendModalInnerContainer,
      },
      press: {
        tile: (index = 0) => {
          fireEvent.press(getTiles()[index]);
        },
        winnnigModalNewGame: () => {
          fireEvent.press(getNewGameButton());
        },
      },
      query: {
        surrendModal: querySurrendModal,
      },
    },
    playerBottom: {
      get: {
        board: () => getBoards()[1],
        playButton: () => getPlayButtons()[1],
        surrendButton: () => getSurrendButtons()[1],
      },
      press: {
        newGameAfterSurrend: () => {
          fireEvent.press(getSurrendButtons()[1]);
          fireEvent.press(getYesButton());
          fireEvent.press(getNewGameButton());
        },
        play: (index = 0) => {
          fireEvent.press(getTiles()[index]);
          fireEvent.press(getPlayButtons()[1]);
        },
        playWithoutSelectATile: () => {
          fireEvent.press(getPlayButtons()[1]);
        },
        quitGameAfterSurrend: () => {
          fireEvent.press(getSurrendButtons()[1]);
          fireEvent.press(getYesButton());
          fireEvent.press(getQuitGameText());
        },
        surrendButton: () => {
          fireEvent.press(getSurrendButtons()[1]);
        },
        surrendGame: () => {
          fireEvent.press(getSurrendButtons()[1]);
          fireEvent.press(getYesButton());
        },
      },
    },
    playerTop: {
      get: {
        board: () => getBoards()[0],
        playButton: () => getPlayButtons()[0],
        surrendButton: () => getSurrendButtons()[0],
      },
      press: {
        newGameAfterSurrend: () => {
          fireEvent.press(getSurrendButtons()[0]);
          fireEvent.press(getYesButton());
          fireEvent.press(getNewGameButton());
        },
        play: (index = 0) => {
          fireEvent.press(getTiles()[index]);
          fireEvent.press(getPlayButtons()[0]);
        },
        playWithoutSelectATile: () => {
          fireEvent.press(getPlayButtons()[0]);
        },
        quitGameAfterSurrend: () => {
          fireEvent.press(getSurrendButtons()[0]);
          fireEvent.press(getYesButton());
          fireEvent.press(getQuitGameText());
        },
        surrendButton: () => {
          fireEvent.press(getSurrendButtons()[0]);
        },
        surrendGame: () => {
          fireEvent.press(getSurrendButtons()[0]);
          fireEvent.press(getYesButton());
        },
      },
    },
    rerender: (
      rerenderOptions: {
        disabled?: boolean;
        mode?: ultimateTicTactToAlgorithm.Mode;
        onPressQuit?: () => {};
      } = {},
    ) => rerender(<Game {...rerenderOptions} />),
    render: renderBoard,
    setFirstPlayer: (resetFirstPlayer: 'BOTTOM' | 'TOP') => {
      mockRandom(resetFirstPlayer ? 0.4999 : 0.5);
    },
  };
};

describe('<Game />', () => {
  const NEW_GAME_TEXT = 'new game';
  const PLAY_TEXT = 'play';
  const YES_TEXT = 'yes';
  const saveGameMocked = jest.fn();

  beforeEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection');
    jest.spyOn(ultimateTicTactToAlgorithm, 'play');
    jest.spyOn(useGameHistory, 'default').mockImplementation(() => ({
      getGames: saveGameMocked,
      saveGame: saveGameMocked,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ultimateTicTactToAlgorithm, 'getActiveSection').mockRestore();
    jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockRestore();
    jest.spyOn(useGameHistory, 'default').mockRestore();
    spyPlay().mockRestore();
  });

  it('renders two <PlayerBoard />', () => {
    const {players} = renderer();
    expect(players.get.board()).toHaveLength(2);
  });

  it('renders first <PlayerBoard /> with /position === TOP/', () => {
    const {playerTop} = renderer();
    expect(getStyle(playerTop.get.board()).transform).toEqual([
      {rotate: '180deg'},
    ]);
  });

  it('choses player randomly', () => {
    const {playerBottom} = renderer();
    expect(getStyle(playerBottom.get.playButton())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it('renders the other player with a 50/50 ramdom chance', () => {
    const {playerBottom, playerTop} = renderer({
      firstPlayer: 'TOP',
    });
    expect(getStyle(playerBottom.get.playButton())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.grey,
      }),
    );
    expect(getStyle(playerTop.get.playButton())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it(`disables each "${PLAY_TEXT}" <Pressable /> on mount`, () => {
    const {playerBottom, playerTop} = renderer();
    expect(getDisabled(playerTop.get.playButton())).toBe(true);
    expect(getDisabled(playerBottom.get.playButton())).toBe(true);
  });

  it('renders a <Board />', () => {
    const {container} = renderer();
    expect(container.query.board).not.toBeNull();
  });

  it('renders a player1 temp <Image /> when press on a <Tile /> if /history.length === 0/', () => {
    const {assets, container, players} = renderer();
    players.press.tile();
    expect(container.query.tileTempImage()).not.toBeNull();
    expect(getSource(container.get.tileTempImage())).toBe(
      assets.images.playerX,
    );
  });

  it(`enables player BOTTOM "${PLAY_TEXT}" <Pressable /> if it's the player turn and /selectedTileIndex !== null/`, () => {
    const {playerBottom, players} = renderer();
    players.press.tile();
    expect(getDisabled(playerBottom.get.playButton())).toBe(false);
  });

  it(`enables player TOP "${PLAY_TEXT}" <Pressable /> if its's the player turn and /selectedTileIndex !== null/`, () => {
    const {playerTop, players} = renderer({firstPlayer: 'TOP'});
    players.press.tile();
    expect(getDisabled(playerTop.get.playButton())).toBe(false);
  });

  it('displays <WinnigFlag /> if game is won', () => {
    spyPlay().mockWinner();
    const {container, playerBottom} = renderer();
    playerBottom.press.play();
    expect(container.query.playerXText).not.toBeNull();
  });

  it('call /onPressQuit/ when "quit" <Pressable /> is pressed', () => {
    const onPressQuit = jest.fn();
    const {playerBottom} = renderer({onPressQuit});
    playerBottom.press.quitGameAfterSurrend();
    expect(onPressQuit).toHaveBeenCalled();
  });

  it('passes /mode/ to <Board />', () => {
    renderer({mode: ultimateTicTactToAlgorithm.Mode.Continue});
    expect(ultimateTicTactToAlgorithm.getActiveSection).toHaveBeenCalledWith(
      expect.anything(),
      ultimateTicTactToAlgorithm.Mode.Continue,
    );
  });

  it(`resets /selectedTileIndex/ when "${PLAY_TEXT}" <Pressable /> is pressed`, () => {
    const {container, playerBottom, playerTop} = renderer();
    playerBottom.press.play();
    playerTop.press.playWithoutSelectATile();
    expect(container.query.tileStateImages()).toHaveLength(1);
  });

  it('closes Player BOTTOM <SurrendModal /> if Player BOTTOM presses a <Tile />', () => {
    const {playerBottom, players} = renderer();
    playerBottom.press.surrendButton();
    players.press.tile();
    expect(players.query.surrendModal()).toBeNull();
  });

  it('closes Player TOP <SurrendModal /> if Player TOP presses a <Tile />', () => {
    const {playerTop, players} = renderer({firstPlayer: 'TOP'});
    playerTop.press.surrendButton();
    players.press.tile();
    expect(players.query.surrendModal()).toBeNull();
  });

  it('passes /sectionStates/ to board', () => {
    spyPlay().mockSectionStates();
    const {container, playerBottom} = renderer();
    playerBottom.press.play();
    expect(container.query.sectionImagePlayers()).toHaveLength(9);
  });

  it("deactivates <PlayButton /> of a player if it's not his turn", () => {
    const {playerBottom, playerTop} = renderer();
    expect(getStyle(playerTop.get.playButton())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.grey,
      }),
    );
    playerBottom.press.play();
    expect(getStyle(playerBottom.get.playButton())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.grey,
      }),
    );
  });

  it('saves game in local storage when it won', () => {
    const {playerTop} = renderer();
    playerTop.press.surrendGame();
    expect(saveGameMocked).toHaveBeenCalled();
  });

  it('does not save game in local storage if game is not won', () => {
    const {playerTop} = renderer();
    playerTop.press.play();
    expect(saveGameMocked).not.toHaveBeenCalled();
  });

  describe('renders <WinningModal /> with', () => {
    it('/winner === Player1/ if Player2 surrend', () => {
      const {container, playerTop} = renderer();
      playerTop.press.surrendGame();
      expect(container.query.winningModal()).not.toBeNull();
      expect(container.query.playerXText()).not.toBeNull();
    });

    it('/winner === Player2/ if Player1 surrend', () => {
      const {container, playerBottom} = renderer();
      playerBottom.press.surrendGame();
      expect(container.query.winningModal()).not.toBeNull();
      expect(container.query.playerOText()).not.toBeNull();
    });
  });

  describe('opens <SurrendModal />', () => {
    it('of the TOP player when <SurrendButton /> is pressed', () => {
      const {playerTop, players} = renderer();
      playerTop.press.surrendButton();
      expect(players.query.surrendModal()).not.toBeNull();
      expect(
        getStyle(players.get.surrendModalInnerContainer()).borderColor,
      ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
    });

    it('of the BOTTOM player when <SurrendButton /> is pressed', () => {
      const {playerBottom, players} = renderer();
      playerBottom.press.surrendButton();
      expect(players.query.surrendModal()).not.toBeNull();
      expect(
        getStyle(players.get.surrendModalInnerContainer()).borderColor,
      ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
    });
  });

  describe(`if "${NEW_GAME_TEXT}" <Pressable /> is pressed`, () => {
    it('resets /winner/', () => {
      const {container, playerBottom} = renderer();
      playerBottom.press.newGameAfterSurrend();
      expect(container.query.winningModal()).toBeNull();
    });

    it('randomize /players/', () => {
      const {playerBottom, playerTop, setFirstPlayer} = renderer();
      setFirstPlayer('BOTTOM');
      playerBottom.press.newGameAfterSurrend();
      expect(getStyle(playerTop.get.playButton()).backgroundColor).toBe(
        DEFAULT_LIGHT_THEME.color.playerX,
      );
    });

    it('resets /history/', () => {
      const {container, playerBottom} = renderer();
      playerBottom.press.play();
      playerBottom.press.newGameAfterSurrend();
      expect(container.query.tileStateImages()).toHaveLength(0);
    });

    it('resets /selectedTileIndex/', () => {
      const {container, playerBottom, players} = renderer();
      players.press.tile();
      playerBottom.press.newGameAfterSurrend();
      expect(container.query.tileTempImage()).toBeNull();
    });

    it('resets /sectionStates/', () => {
      spyPlay().mockSectionStatesWithAWinner();
      const {container, playerBottom, players} = renderer();
      playerBottom.press.play();
      players.press.winnnigModalNewGame();
      expect(container.query.sectionImagePlayers()).toHaveLength(0);
    });
  });

  describe('if game is a draw', () => {
    beforeEach(() => {
      spyPlay().mockDraw();
    });

    it('displays Draw <WinningModal />', () => {
      const {container, playerBottom} = renderer();
      playerBottom.press.play();
      expect(container.query.itsADrawText()).not.toBeNull();
    });

    it('closes both <SurrendModal />', () => {
      const {players, playerBottom, playerTop} = renderer();
      playerTop.press.surrendButton();
      playerBottom.press.play();
      expect(players.query.surrendModal()).toBeNull();
    });

    it('disabled <SurrendButton />', () => {
      const {playerBottom, playerTop} = renderer();
      playerBottom.press.play();
      expect(getDisabled(playerBottom.get.surrendButton())).toBe(true);
      expect(getDisabled(playerTop.get.surrendButton())).toBe(true);
    });

    it('disables press <Tile />', () => {
      const {container, playerBottom, players} = renderer();
      playerBottom.press.play();
      players.press.tile();
      expect(container.query.tileTempImage()).toBeNull();
    });
  });

  describe('if /disabled === true/', () => {
    it('disables BOTTOM <PlayButton />', () => {
      const {playerBottom, players, rerender} = renderer();
      players.press.tile();
      rerender({disabled: true});
      expect(getDisabled(playerBottom.get.playButton())).toBe(true);
    });

    it('disables TOP <PlayButton />', () => {
      const {playerTop, players, rerender} = renderer({
        firstPlayer: 'TOP',
      });
      players.press.tile();
      rerender({disabled: true});
      expect(getDisabled(playerTop.get.playButton())).toBe(true);
    });

    it('disables BOTTOM <SurrendButton />', () => {
      const {playerBottom} = renderer({disabled: true});
      expect(getDisabled(playerBottom.get.surrendButton())).toBe(true);
    });

    it('disables TOP <SurrendButton />', () => {
      const {playerTop} = renderer({disabled: true});
      expect(getDisabled(playerTop.get.surrendButton())).toBe(true);
    });

    it('disables <Board />', () => {
      const {container} = renderer({disabled: true});
      expect(getDisabled(container.get.tile(0))).toBe(true);
      expect(getDisabled(container.get.tile(1))).toBe(true);
      expect(getDisabled(container.get.tile(2))).toBe(true);
    });
  });

  describe('calls /ultimateTicTacToeAlgorithm.play/ with', () => {
    it('/mode === Continue/', () => {
      const {playerBottom} = renderer({
        mode: ultimateTicTactToAlgorithm.Mode.Continue,
      });
      playerBottom.press.play();
      expect(ultimateTicTactToAlgorithm.play).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          mode: ultimateTicTactToAlgorithm.Mode.Continue,
        }),
      );
    });

    it('/mode === Normal/', () => {
      const {playerBottom} = renderer();
      playerBottom.press.play();
      expect(ultimateTicTactToAlgorithm.play).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          mode: ultimateTicTactToAlgorithm.Mode.Normal,
        }),
      );
    });
  });

  describe('if /winner !== Empty/', () => {
    it('disables <SurrendButton />', () => {
      const {playerBottom, playerTop} = renderer();
      playerBottom.press.surrendGame();
      expect(getDisabled(playerBottom.get.surrendButton())).toBe(true);
      expect(getDisabled(playerTop.get.surrendButton())).toBe(true);
    });

    it('disables press <Tile />', () => {
      spyPlay().mockWinner();
      const {container, players, playerBottom} = renderer();
      playerBottom.press.play();
      players.press.tile();
      expect(container.query.tileTempImage()).toBeNull();
    });
  });

  describe('if a player surrend', () => {
    it('closes <SurrendModal /> when a player surrend', () => {
      let {playerBottom, players} = renderer();
      playerBottom.press.surrendGame();
      expect(players.query.surrendModal()).toBeNull();
    });

    it('closes other <SurrendModal /> when a player surrend', () => {
      let {playerTop, players} = renderer();
      playerTop.press.surrendGame();
      expect(players.query.surrendModal()).toBeNull();
    });
  });

  describe('calls /setGameIsDone/', () => {
    it('when game is finished (win/surrend/draw)', () => {
      spyPlay().mockWinner();
      const setGameIsDone = jest.fn();
      const {playerBottom} = renderer({setGameIsDone});
      playerBottom.press.play();
      expect(setGameIsDone).toHaveBeenCalledWith(true);
    });

    it(`when ${YES_TEXT} <Pressable /> is press`, () => {
      const setGameIsDone = jest.fn();
      const {playerBottom} = renderer({setGameIsDone});
      playerBottom.press.surrendGame();
      expect(setGameIsDone).toHaveBeenCalledWith(true);
    });
  });

  describe('pushes /selectedTileIndex/ on /history/ when press on', () => {
    it(`BOTTOM player "${PLAY_TEXT}" <Pressable />`, () => {
      const {assets, container, playerBottom} = renderer();
      playerBottom.press.play();
      expect(getSource(container.query.tileStateImage())).toBe(
        assets.images.playerX,
      );
    });

    it(`TOP player "${PLAY_TEXT}" <Pressable />`, () => {
      const {assets, container, playerTop} = renderer({
        firstPlayer: 'TOP',
      });
      playerTop.press.play();
      expect(getSource(container.query.tileStateImage())).toBe(
        assets.images.playerX,
      );
    });
  });
});
