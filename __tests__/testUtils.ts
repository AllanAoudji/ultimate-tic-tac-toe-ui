import {ReactTestInstance} from 'react-test-renderer';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

const getDisabled = (instance: ReactTestInstance) =>
  instance.props.accessibilityState.disabled;
const getSource = (instance: ReactTestInstance) => instance.props.source;
const getStyle = (instance: ReactTestInstance) => instance.props.style;

const imageSource = (image: string) => `../assets/images/${image}.png`;

const spyPlay: () => {
  mockDraw: () => void;
  mockRestore: () => void;
  mockSectionStates: (
    player?:
      | ultimateTicTactToAlgorithm.TileState.Player1
      | ultimateTicTactToAlgorithm.TileState.Player2,
  ) => void;
  mockSectionStatesWithAWinner: (
    player?:
      | ultimateTicTactToAlgorithm.TileState.Player1
      | ultimateTicTactToAlgorithm.TileState.Player2,
  ) => void;
  mockWinner: (
    player?:
      | ultimateTicTactToAlgorithm.TileState.Player1
      | ultimateTicTactToAlgorithm.TileState.Player2,
  ) => void;
} = () => {
  const spy = jest.spyOn(ultimateTicTactToAlgorithm, 'play');
  return {
    mockDraw: () => {
      spy.mockReturnValue({
        history: [0],
        mode: ultimateTicTactToAlgorithm.Mode.Normal,
        sectionStates: new Array(9).fill([
          ultimateTicTactToAlgorithm.TileState.Empty,
          null,
        ]),
        winner: [ultimateTicTactToAlgorithm.TileState.Draw, null],
      });
    },
    mockRestore: () => spy.mockRestore(),
    mockSectionStates: (
      player:
        | ultimateTicTactToAlgorithm.TileState.Player1
        | ultimateTicTactToAlgorithm.TileState.Player2 = ultimateTicTactToAlgorithm
        .TileState.Player1,
    ) => {
      spy.mockReturnValue({
        history: [0],
        mode: ultimateTicTactToAlgorithm.Mode.Normal,
        sectionStates: new Array(9).fill([
          player,
          ultimateTicTactToAlgorithm.WinningLine.BottomRow,
        ]),
        winner: [ultimateTicTactToAlgorithm.TileState.Empty, null],
      });
    },
    mockSectionStatesWithAWinner: (
      player:
        | ultimateTicTactToAlgorithm.TileState.Player1
        | ultimateTicTactToAlgorithm.TileState.Player2 = ultimateTicTactToAlgorithm
        .TileState.Player1,
    ) => {
      spy.mockReturnValue({
        history: [0],
        mode: ultimateTicTactToAlgorithm.Mode.Normal,
        sectionStates: new Array(9).fill([
          player,
          ultimateTicTactToAlgorithm.WinningLine.BottomRow,
        ]),
        winner: [player, ultimateTicTactToAlgorithm.WinningLine.BottomRow],
      });
    },
    mockWinner: (
      player:
        | ultimateTicTactToAlgorithm.TileState.Player1
        | ultimateTicTactToAlgorithm.TileState.Player2 = ultimateTicTactToAlgorithm
        .TileState.Player1,
    ) => {
      spy.mockReturnValue({
        history: [0],
        mode: ultimateTicTactToAlgorithm.Mode.Normal,
        sectionStates: new Array(9).fill([
          ultimateTicTactToAlgorithm.TileState.Empty,
          null,
        ]),
        winner: [player, ultimateTicTactToAlgorithm.WinningLine.TopRow],
      });
    },
  };
};

export {getDisabled, getSource, getStyle, imageSource, spyPlay};
