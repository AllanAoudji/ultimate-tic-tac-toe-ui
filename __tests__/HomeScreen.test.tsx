import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import HomeScreen from '../src/HomeScreen';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('<HomeScreen />', () => {
  const HOME_SCREEN_CONTAINER = 'homeScreen__container',
    PLAY_CONTINUE_GAME_TEXT = 'play continue game',
    PLAY_GAME_BUTTON_CONTAINER_PRESSABLE =
      'playGameButton__container--pressable',
    PLAY_NORMAL_GAME_TEXT = 'play normal game';
  let props: any, renderer: RenderAPI;

  beforeEach(() => {
    props = createTestProps({});
    renderer = render(<HomeScreen {...props} />);
  });

  it('renders a <Container />', () => {
    const {queryByTestId} = renderer;
    expect(queryByTestId(HOME_SCREEN_CONTAINER)).not.toBeNull();
  });

  it('renders two <PlayGameButton />', () => {
    const {queryAllByTestId} = renderer;
    expect(queryAllByTestId(PLAY_GAME_BUTTON_CONTAINER_PRESSABLE)).toHaveLength(
      2,
    );
  });

  it(`renders a <PlayGameButton /> with /title === ${PLAY_NORMAL_GAME_TEXT}/`, () => {
    const {queryByText} = renderer;
    expect(queryByText(PLAY_NORMAL_GAME_TEXT)).not.toBeNull();
  });

  it(`calls /navigation.navigate/ with /mode === Normal/ when press on "${PLAY_NORMAL_GAME_TEXT}" <PlayGameButton />`, () => {
    const {getByText} = renderer;
    fireEvent.press(getByText(PLAY_NORMAL_GAME_TEXT));
    expect(props.navigation.navigate).toHaveBeenCalledWith('Game', {
      mode: Mode.Normal,
    });
  });

  it(`renders a <PlayGameButton /> with /title === "${PLAY_CONTINUE_GAME_TEXT}"/`, () => {
    const {queryByText} = renderer;
    expect(queryByText(PLAY_CONTINUE_GAME_TEXT)).not.toBeNull();
  });

  it(`calls /navigation.navigate/ with /mode === Continue/ when press on "${PLAY_CONTINUE_GAME_TEXT}" <PlayGameButton />`, () => {
    const {getByText} = renderer;
    fireEvent.press(getByText(PLAY_CONTINUE_GAME_TEXT));
    expect(props.navigation.navigate).toHaveBeenCalledWith('Game', {
      mode: Mode.Continue,
    });
  });

  it('renders a <Logo />', () => {
    const {queryByTestId} = renderer;
    expect(queryByTestId('logo__container--svg')).not.toBeNull();
  });
});
