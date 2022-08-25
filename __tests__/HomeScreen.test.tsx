import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Mode} from 'ultimate-tic-tac-toe-algorithm';

import HomeScreen from '../src/HomeScreen';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

const renderer = () => {
  const props: any = createTestProps({});
  const renderHomeScreen = render(<HomeScreen {...props} />);

  const {getAllByTestId, getByTestId, getByText} = renderHomeScreen;

  const getContainer = () => getByTestId('homeScreen__container');
  const getLogo = () => getByTestId('logo__container--svg');
  const getPlayContinueGameButton = () => getByText('play continue game');
  const getPlayGameButtons = () =>
    getAllByTestId('playGameButton__container--pressable');
  const getPlayNormalGameButton = () => getByText('play normal game');
  const getPressableHistory = () => getByText('games history');

  return {
    container: {
      get: {
        container: getContainer,
        logo: getLogo,
        playContinueGameButton: getPlayContinueGameButton,
        playGameButtons: getPlayGameButtons,
        playNormalGameButton: getPlayNormalGameButton,
        pressableHistory: getPressableHistory,
      },
      press: {
        playContinueGameButton: () => {
          fireEvent.press(getPlayContinueGameButton());
        },
        playNormalGameButton: () => {
          fireEvent.press(getPlayNormalGameButton());
        },
        pressableHistory: () => {
          fireEvent.press(getPressableHistory());
        },
      },
    },
    props,
    render: renderHomeScreen,
  };
};

describe('<HomeScreen />', () => {
  it('renders a <Container />', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders two <PlayGameButton />', () => {
    const {container} = renderer();
    expect(container.get.playGameButtons()).toHaveLength(2);
  });

  it('renders a <PlayGameButton /> with /title === "play normal game"/', () => {
    const {container} = renderer();
    expect(container.get.playNormalGameButton()).not.toBeNull();
  });

  it('calls /navigation.navigate/ with /mode === Normal/ when press on "play normal game" <PlayGameButton />', () => {
    const {container, props} = renderer();
    container.press.playNormalGameButton();
    expect(props.navigation.navigate).toHaveBeenCalledWith('Game', {
      mode: Mode.Normal,
    });
  });

  it('renders a <PlayGameButton /> with /title === "play continue game"/', () => {
    const {container} = renderer();
    expect(container.get.playContinueGameButton()).not.toBeNull();
  });

  it('calls /navigation.navigate/ with /mode === Continue/ when press on "play continue game" <PlayGameButton />', () => {
    const {container, props} = renderer();
    container.press.playContinueGameButton();
    expect(props.navigation.navigate).toHaveBeenCalledWith('Game', {
      mode: Mode.Continue,
    });
  });

  it('renders a <Logo />', () => {
    const {container} = renderer();
    expect(container.get.logo()).not.toBeNull();
  });

  it('renders a "game history" <Pressable />', () => {
    const {container} = renderer();
    expect(container.get.pressableHistory()).not.toBeNull();
  });

  it('calls /navigation.navigate/ when press on "game history" <Pressable />', () => {
    const {container, props} = renderer();
    container.press.pressableHistory();
    expect(props.navigation.navigate).toHaveBeenCalledWith('GamesHistory');
  });
});
