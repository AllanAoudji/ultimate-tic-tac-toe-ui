import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import QuitGameModal from '../src/QuitGameModal';

describe('<QuitGameModal />', () => {
  const QUIT_GAME_BACKGROUND_PRESSABLE_TEST_ID =
      'quitGameModal__background--pressable',
    QUIT_GAME_CONTAINER_TEST_ID = 'quitGameModal__container',
    NO_TEXT = 'no',
    YES_TEXT = 'yes';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a <View />', () => {
    const {queryByTestId} = render(<QuitGameModal />);
    expect(queryByTestId(QUIT_GAME_CONTAINER_TEST_ID)).not.toBeNull();
  });

  it('renders a title', () => {
    const {queryByText} = render(<QuitGameModal />);
    expect(queryByText('quit game?')).not.toBeNull();
  });

  it('renders a <Pressable /> background', () => {
    const {queryByTestId} = render(<QuitGameModal />);
    expect(
      queryByTestId(QUIT_GAME_BACKGROUND_PRESSABLE_TEST_ID),
    ).not.toBeNull();
  });

  it('calls /onPressNo/ when <Pressable /> background is pressed', () => {
    const {getByTestId} = render(<QuitGameModal onPressNo={onPress} />);
    fireEvent.press(getByTestId(QUIT_GAME_BACKGROUND_PRESSABLE_TEST_ID));
    expect(onPress).toHaveBeenCalled();
  });

  it(`renders a "${NO_TEXT}" <Pressable />`, () => {
    const {queryByText} = render(<QuitGameModal />);
    expect(queryByText(NO_TEXT)).not.toBeNull();
  });

  it(`calls /onPressNo/ when "${NO_TEXT}" <Pressable /> is pressed`, () => {
    const {getByText} = render(<QuitGameModal onPressNo={onPress} />);
    fireEvent.press(getByText(NO_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it(`renders a "${YES_TEXT}" <Pressable />`, () => {
    const {queryByText} = render(<QuitGameModal />);
    expect(queryByText(YES_TEXT)).not.toBeNull();
  });

  it(`calls /onPressYes/ when "${YES_TEXT}" <Pressable /> is pressed`, () => {
    const {getByText} = render(<QuitGameModal onPressYes={onPress} />);
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it(`disables ${NO_TEXT} <Pressable /> if /disabled === true`, () => {
    const {getByText} = render(
      <QuitGameModal disabled={true} onPressNo={onPress} />,
    );
    fireEvent.press(getByText(NO_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it(`disables ${YES_TEXT} <Pressable /> if /disabled === true/`, () => {
    const {getByText} = render(
      <QuitGameModal disabled={true} onPressYes={onPress} />,
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('disables <Pressable /> background if /disabled === true/', () => {
    const {getByTestId} = render(
      <QuitGameModal disabled={true} onPressNo={onPress} />,
    );
    fireEvent.press(getByTestId(QUIT_GAME_BACKGROUND_PRESSABLE_TEST_ID));
    expect(onPress).not.toHaveBeenCalled();
  });
});
