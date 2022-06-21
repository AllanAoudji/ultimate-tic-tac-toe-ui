import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';

import Navigation from '../src/Navigation';

describe('<Navigation />', () => {
  const component = (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );

  it('renders <HomeScreen /> on mount', async () => {
    const {findByTestId} = render(component);
    const logo = await findByTestId('homeScreen__container');
    expect(logo).not.toBeNull();
  });

  it('pressing on one of the <PlayGameButton /> takes you to the <GameScreen />', async () => {
    const {findByTestId, getByText} = render(component);
    const playGameButton = getByText('play normal game');
    fireEvent.press(playGameButton);
    const gameScreen = await findByTestId('gameScreen__container');
    expect(gameScreen).not.toBeNull();
  });

  it('pressing on the "quit" <Pressable /> takes you to the <HomeScreen />', async () => {
    const {findByTestId, getAllByTestId, getByText} = render(component);
    const playGameButton = getByText('play continue game');
    fireEvent.press(playGameButton);
    const surrendButtons = getAllByTestId(
      'surrendButton__container--pressable',
    );
    fireEvent.press(surrendButtons[0]);
    fireEvent.press(getByText('yes'));
    fireEvent.press(getByText('quit'));
    const gameScreen = await findByTestId('homeScreen__container');
    expect(gameScreen).not.toBeNull();
  });
});
