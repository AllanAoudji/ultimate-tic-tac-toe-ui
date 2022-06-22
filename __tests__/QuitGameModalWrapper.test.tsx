import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import QuitGameModalWrapper from '../src/QuitGameModalWrapper';

describe('<QuitGameModalWrapper />', () => {
  const QUIT_GAME_MODAL_CONTAINER = 'quitGameModal__container',
    NO_TEXT = 'no',
    YES_TEXT = 'yes';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders <QuitGameModal /> if /visible === true/', () => {
    const {queryByTestId} = render(<QuitGameModalWrapper visible={true} />);
    expect(queryByTestId(QUIT_GAME_MODAL_CONTAINER)).not.toBeNull();
  });

  it('does not render <QuitGameModal /> if /visible === false/', () => {
    const {queryByTestId} = render(<QuitGameModalWrapper />);
    expect(queryByTestId(QUIT_GAME_MODAL_CONTAINER)).toBeNull();
  });

  it('passes /onPressNo/ to <QuitGameModal />', () => {
    const {getByText} = render(
      <QuitGameModalWrapper onPressNo={onPress} visible={true} />,
    );
    fireEvent.press(getByText(NO_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressYes/ to <QuitGameModal />', () => {
    const {getByText} = render(
      <QuitGameModalWrapper onPressYes={onPress} visible={true} />,
    );
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /disabled/ to <QuitGameModal />', () => {
    const {getByText} = render(
      <QuitGameModalWrapper
        disabled={true}
        onPressYes={onPress}
        onPressNo={onPress}
        visible={true}
      />,
    );
    fireEvent.press(getByText(YES_TEXT));
    fireEvent.press(getByText(NO_TEXT));
    expect(onPress).not.toHaveBeenCalled();
  });
});
