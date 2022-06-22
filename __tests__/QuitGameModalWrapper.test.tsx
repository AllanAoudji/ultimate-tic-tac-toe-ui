import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import QuitGameModalWrapper from '../src/QuitGameModalWrapper';

describe('<QuitGameModalWrapper />', () => {
  it('renders <QuitGameModal /> if /visible === true/', () => {
    const {queryByTestId} = render(<QuitGameModalWrapper visible={true} />);

    expect(queryByTestId('quitGameModal__container')).not.toBeNull();
  });

  it('does not render <QuitGameModal /> if /visible === false/', () => {
    const {queryByTestId} = render(<QuitGameModalWrapper />);

    expect(queryByTestId('quitGameModal__container')).toBeNull();
  });

  it('passes /onPressNo/ to <QuitGameModal />', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <QuitGameModalWrapper onPressNo={onPress} visible={true} />,
    );
    fireEvent.press(getByText('no'));
    expect(onPress).toHaveBeenCalled();
  });

  it('passes /onPressYes/ to <QuitGameModal />', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <QuitGameModalWrapper onPressYes={onPress} visible={true} />,
    );
    fireEvent.press(getByText('yes'));
    expect(onPress).toHaveBeenCalled();
  });
});
