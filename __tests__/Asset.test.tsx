import {render} from '@testing-library/react-native';
import React from 'react';

import {jsonSource} from './testUtils';

import Asset from '../src/Asset';

const mockLottie = jest.fn();
jest.mock('lottie-react-native', () => (props: any) => {
  const {View} = require('react-native');
  mockLottie(props);
  return <View {...props} />;
});

const renderer = () => {
  const renderAsset = render(<Asset />);

  const {getByTestId} = renderAsset;

  const getContainer = () => getByTestId('asset__container--lottie');

  return {
    container: {
      get: {
        container: getContainer,
      },
    },
    render: renderAsset,
  };
};

const X1 = require(jsonSource('X1'));

describe('<Asset />', () => {
  beforeEach(() => {
    mockLottie.mockClear();
  });

  it('renders a <Lottie /> component', () => {
    const {container} = renderer();
    expect(container.get.container()).not.toBeNull();
  });

  it('renders with a default /source/', () => {
    renderer();
    expect(mockLottie).toHaveBeenCalledWith(
      expect.objectContaining({
        source: X1,
      }),
    );
  });
});
