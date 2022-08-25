import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {act} from 'react-test-renderer';
import FetchingErrorModalWrapper from '../src/FetchingErrorModalWrapper';

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

  const getText = (text: string) => getByText(text);
  const getFetchingErrorModal = () =>
    getByTestId('fetchingErrorModal__container--pressable');
  const getTryAgainPressable = () => getByText('try again?');

  const queryFetchingErrorModal = () =>
    queryByTestId('fetchingErrorModal__container--pressable');

  return {
    container: {
      get: {
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

  it('passes /setVisible/ to <FetchingErrorModal /> has /onPressClose/ and calls it with /false/ on press', () => {
    const setVisible = jest.fn();
    const {container} = renderer({setVisible, visible: true});
    container.press.fetchingErrorModal();
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it('calls /setVisible/ after a time out if visible === true', () => {
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
