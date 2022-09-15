import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {act} from 'react-test-renderer';
import FetchingErrorModalWrapper from '../src/FetchingErrorModalWrapper';
import {getStyle} from './testUtils';

const renderer = (
  options: {
    error?: string;
    onPress?: () => void;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    visible?: boolean;
  } = {},
) => {
  const renderFetchingErrorModalWrapper = render(
    <FetchingErrorModalWrapper
      error={options.error || 'hello world'}
      onPress={options.onPress}
      setVisible={options.setVisible}
      visible={options.visible}
    />,
  );

  const {getByTestId, getByText, queryByTestId} =
    renderFetchingErrorModalWrapper;

  const getFetchingErrorModal = () =>
    getByTestId('fetchingErrorModal__container--pressable');
  const getFetchingErrorModalWrapperContainerAnimated = () =>
    getByTestId('fetchingErrorModalWrapper__container--animated');
  const getText = (text: string) => getByText(text);
  const getTryAgainPressable = () => getByText('try again?');

  const queryFetchingErrorModalWrapperContainerAnimated = () =>
    queryByTestId('fetchingErrorModalWrapper__container--animated');
  const queryFetchingErrorModal = () =>
    queryByTestId('fetchingErrorModal__container--pressable');

  return {
    container: {
      get: {
        fetchingErrorModalWrapperContainerAnimated:
          getFetchingErrorModalWrapperContainerAnimated,
        text: getText,
      },
      press: {
        fetchingErrorModal: () => {
          fireEvent.press(getFetchingErrorModal());
        },
        tryAgainPressable: () => {
          fireEvent.press(getTryAgainPressable());
        },
      },
      query: {
        fetchingErrorModalWrapperContainerAnimated:
          queryFetchingErrorModalWrapperContainerAnimated,
        fetchingErrorModal: queryFetchingErrorModal,
      },
    },
    render: renderFetchingErrorModalWrapper,
  };
};

describe('<FetchingErrorModalWrapper />', () => {
  it('renders <FetchingErrorModal /> if /visible === true/', () => {
    const {container} = renderer({visible: true});
    expect(container.query.fetchingErrorModal()).not.toBeNull();
  });

  it("passes /error/ to <FetchingErrorModal />'s props", () => {
    const error = 'error text';
    const {container} = renderer({error, visible: true});
    expect(container.get.text(error)).not.toBeNull();
  });

  it('does not render <FetchingErrorModal /> if /visible === false/', () => {
    const {container} = renderer();
    expect(container.query.fetchingErrorModal()).toBeNull();
  });

  it('renders <Animated.View /> if /visible === true/', () => {
    const {container} = renderer({visible: true});
    expect(
      container.get.fetchingErrorModalWrapperContainerAnimated(),
    ).not.toBeNull();
  });

  it('does not render <Animated.View /> if /visible === false/', () => {
    const {container} = renderer();
    expect(
      container.query.fetchingErrorModalWrapperContainerAnimated(),
    ).toBeNull();
  });

  it('<Animated.View /> should have /position: absolute/', () => {
    const {container} = renderer({visible: true});
    expect(
      getStyle(container.get.fetchingErrorModalWrapperContainerAnimated()),
    ).toEqual(
      expect.objectContaining({
        position: 'absolute',
      }),
    );
  });

  it('<Animated.View /> should have /opacity: 0, scale: 0.96/ on mount', () => {
    const {container} = renderer({visible: true});
    expect(
      getStyle(container.get.fetchingErrorModalWrapperContainerAnimated()),
    ).toEqual(
      expect.objectContaining({
        opacity: 0,
        transform: expect.arrayContaining([
          expect.objectContaining({
            scale: 0.96,
          }),
        ]),
      }),
    );
  });

  it('passes /setVisible/ to <FetchingErrorModal /> has /onPressClose/ and calls it with /false/ on press', () => {
    const setVisible = jest.fn();
    const {container} = renderer({setVisible, visible: true});
    container.press.fetchingErrorModal();
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it('calls /setVisible/ after a time out if /visible === true/', () => {
    const setVisible = jest.fn();
    jest.useFakeTimers();
    renderer({setVisible, visible: true});
    act(() => {
      jest.runAllTimers();
    });
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it('passes /onPress/ to <FetchingErrorModal />', () => {
    const onPress = jest.fn();
    const {container} = renderer({onPress, visible: true});
    container.press.tryAgainPressable();
    expect(onPress).toHaveBeenCalled();
  });
});
