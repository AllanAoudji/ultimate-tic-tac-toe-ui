import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import FetchingErrorModal from '../src/FetchingErrorModal';

const renderer = (
  options: {
    disabledClose?: boolean;
    disabledTryAgain?: boolean;
    onPress?: () => void;
    onPressClose?: () => void;
    text?: string;
  } = {},
) => {
  const renderFetchingErrorModal = render(
    <FetchingErrorModal
      disabledClose={options.disabledClose || false}
      disabledTryAgain={options.disabledTryAgain || false}
      onPress={options.onPress}
      onPressClose={options.onPressClose}
      text={options.text || 'hello world'}
    />,
  );

  const {getByTestId, getByText, queryByText} = renderFetchingErrorModal;

  const getCloseContainer = () =>
    getByTestId('fetchingErrorModal__container--close');
  const getContainer = () =>
    getByTestId('fetchingErrorModal__container--pressable');
  const getText = (text: string) => getByText(text);
  const getTryAgainPressable = () => getByText('try again?');

  const queryTryAgainPressable = () => queryByText('try again?');

  return {
    container: {
      get: {
        closeContainer: getCloseContainer,
        container: getContainer,
        text: getText,
        tryAgainPressable: getTryAgainPressable,
      },
      press: {
        tryAgainPressable: () => {
          fireEvent.press(getTryAgainPressable());
        },
        container: () => {
          fireEvent.press(getContainer());
        },
      },
      query: {
        tryAgainPressable: queryTryAgainPressable,
      },
    },
    render: renderFetchingErrorModal,
  };
};

describe('<FetchingErrorModal />', () => {
  it('renders a <Container />', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders a text from props', () => {
    const text = 'error text';
    const {container} = renderer({text});
    expect(container.get.text(text)).not.toBeNull();
  });

  it('renders a "try again?" <Pressable /> if /onPress !== undefined/', () => {
    const {container} = renderer({onPress: () => {}});
    expect(container.get.tryAgainPressable()).not.toBeNull();
  });

  it('does not renders a "try again?" <Pressable /> if /onPress === undefined/', () => {
    const {container} = renderer();
    expect(container.query.tryAgainPressable()).toBeNull();
  });

  it('renders a /close/ <Pressable />', () => {
    const {container} = renderer();
    expect(container.get.closeContainer()).not.toBeNull();
  });

  it('triggers /onPress/ when "try again?" <Pressable /> is pressed', () => {
    const onPress = jest.fn();
    const {container} = renderer({onPress});
    container.press.tryAgainPressable();
    expect(onPress).toHaveBeenCalled();
  });

  it('triggers /onPressClose/ when <Container /> is pressed', () => {
    const onPressClose = jest.fn();
    const {container} = renderer({onPressClose});
    container.press.container();
    expect(onPressClose).toHaveBeenCalled();
  });

  it('disables <Container /> if /disabledClose === true/', () => {
    const onPressClose = jest.fn();
    const {container} = renderer({disabledClose: true, onPressClose});
    container.press.container();
    expect(onPressClose).not.toHaveBeenCalled();
  });

  it('disables "try again?" <Pressable /> if /disabledTryAgain === true/', () => {
    const onPress = jest.fn();
    const {container} = renderer({disabledTryAgain: true, onPress});
    container.press.tryAgainPressable();
    expect(onPress).not.toHaveBeenCalled();
  });
});
