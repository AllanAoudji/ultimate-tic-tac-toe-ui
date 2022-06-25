import {NavigationContext} from '@react-navigation/native';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {mockRandomForEach} from 'jest-mock-random';
import React from 'react';
import {BackHandler} from 'react-native';
import {act} from 'react-test-renderer';
import * as ultimateTicTactToAlgorithm from 'ultimate-tic-tac-toe-algorithm';

import GameScreen from '../src/GameScreen';

let mockCallbacks: {[index: string]: (() => void)[]} = {};
const helperTriggerListeners = (eventName: string) => {
  (mockCallbacks[eventName] || []).forEach(callback => callback());
};

describe('<GameScreen />', () => {
  const actualNav = jest.requireActual('@react-navigation/native'),
    createTestProps = (props: Object) => ({
      route: {
        params: {
          mode: ultimateTicTactToAlgorithm.Mode.Continue,
        },
      },
      navigation: {
        pop: jest.fn(),
      },
      ...props,
    }),
    navContext = (isFocused: boolean) => ({
      ...actualNav.navigation,
      navigate: () => {},
      dangerouslyGetState: () => {},
      setOptions: () => {},
      addListener: () => () => {},
      isFocused: () => isFocused,
    });
  let props: any, renderer: (isVisible?: boolean) => RenderAPI;

  mockRandomForEach([0.5]);

  beforeEach(() => {
    mockCallbacks = {};
    jest.spyOn(ultimateTicTactToAlgorithm, 'play');
    jest
      .spyOn(BackHandler, 'addEventListener')
      .mockImplementation(
        (
          eventName: 'hardwareBackPress',
          handler: () => boolean | null | undefined,
        ) => {
          mockCallbacks[eventName] = mockCallbacks[eventName] || [];
          mockCallbacks[eventName].push(handler);
          return {
            remove: () => {},
          };
        },
      );
    jest
      .spyOn(BackHandler, 'removeEventListener')
      .mockImplementation(
        (
          eventName: 'hardwareBackPress',
          handler: () => boolean | null | undefined,
        ) => {
          const indexOf = (mockCallbacks[eventName] || []).indexOf(handler);
          if (indexOf !== -1) {
            mockCallbacks[eventName] = mockCallbacks[eventName].splice(
              indexOf,
              1,
            );
          }
        },
      );
    props = createTestProps({});

    renderer = (isVisible?: boolean) =>
      render(
        <NavigationContext.Provider
          value={navContext(isVisible === undefined ? true : isVisible)}>
          <GameScreen {...props} />
        </NavigationContext.Provider>,
      );
  });

  afterEach(() => {
    jest.spyOn(ultimateTicTactToAlgorithm, 'play').mockRestore();
    jest.spyOn(BackHandler, 'addEventListener').mockRestore();
    jest.spyOn(BackHandler, 'removeEventListener').mockRestore();
  });

  it('renders a <Container />', () => {
    const {queryByTestId} = renderer();
    expect(queryByTestId('gameScreen__container')).not.toBeNull();
  });

  it('renders a <Game />', () => {
    const {queryAllByTestId, queryByTestId} = renderer();
    expect(queryByTestId('board__container')).not.toBeNull();
    expect(queryAllByTestId('playerBoard__container')).toHaveLength(2);
  });

  it('calls navigation.pop when "quit" <Pressable /> is pressed', () => {
    const {getAllByTestId, getByText} = renderer();
    fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('quit'));
    expect(props.navigation.pop).toHaveBeenCalled();
  });

  it('passes /route.params.mode/ to <Game />', () => {
    const {getAllByTestId, getAllByText} = renderer();
    fireEvent.press(getAllByTestId('tile__container--pressable')[0]);
    fireEvent.press(getAllByText('play')[1]);
    expect(ultimateTicTactToAlgorithm.play).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        mode: ultimateTicTactToAlgorithm.Mode.Continue,
      }),
    );
  });

  it('renders <QuitGameModal /> when BackPress is pressed', () => {
    const {queryByTestId} = renderer();
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });

    expect(queryByTestId('quitGameModal__container')).not.toBeNull();
  });

  it('hides <QuitGameModal /> when BackPress is pressed', () => {
    const {queryByTestId} = renderer();
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });
    expect(queryByTestId('quitGameModal__container')).toBeNull();
  });

  it('not calls /BackHandler.addEventListener if <GameScreen /> is not focused', () => {
    renderer(false);
    expect(BackHandler.addEventListener).not.toHaveBeenCalled();
  });

  it('calls /BackHandler.removeEventListener/ if component is not visible', () => {
    const {rerender} = renderer();
    rerender(
      <NavigationContext.Provider value={navContext(false)}>
        <GameScreen {...props} />
      </NavigationContext.Provider>,
    );
    expect(BackHandler.removeEventListener).toHaveBeenCalled();
  });

  it('return /BackHandler.addEventListener/ callback() === false if game is won', () => {
    const {getAllByTestId, getByText} = renderer();
    act(() => {
      fireEvent.press(getAllByTestId('surrendButton__container--pressable')[0]);
    });
    act(() => {
      fireEvent.press(getByText('yes'));
    });
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });
    act(() => {
      const {calls} = (BackHandler.addEventListener as jest.Mock).mock;
      const returnedCallBackFunction = calls[calls.length - 1][1]();
      expect(returnedCallBackFunction).toBe(false);
    });
  });

  it('disables <Game /> if <QuitModal /> is visible', () => {
    const {getAllByTestId} = renderer();
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });
    expect(
      getAllByTestId('tile__container--pressable')[0].props.accessibilityState
        .disabled,
    ).toBe(true);
    expect(
      getAllByTestId('surrendButton__container--pressable')[0].props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('calls navigation.pop when <QuitGameModal /> "yes" <Pressable /> is pressed', () => {
    const {getByText} = renderer();
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });
    act(() => {
      fireEvent.press(getByText('yes'));
    });
    expect(props.navigation.pop).toHaveBeenCalled();
  });

  it('closes <QuitGameModal /> when "no" <Pressable /> is pressed', () => {
    const {getByText, queryByTestId} = renderer();
    act(() => {
      helperTriggerListeners('hardwareBackPress');
    });
    act(() => {
      fireEvent.press(getByText('no'));
    });
    expect(queryByTestId('quitGameModal__container')).toBeNull();
  });
});
