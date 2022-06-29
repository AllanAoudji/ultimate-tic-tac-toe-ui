import AsyncStorage from '@react-native-async-storage/async-storage';
import {render, waitFor} from '@testing-library/react-native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ReactTestInstance} from 'react-test-renderer';
import Container from '../src/Container';
import {
  DEFAULT_DARK_THEME,
  DEFAULT_DARK_THEME_ID,
} from '../src/DefaultDark.theme';
import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from '../src/DefaultLight.theme';

import Loader from '../src/Loader';
import {getStyle} from './testUtils';

describe('<Loader />', () => {
  afterEach(() => {
    jest.spyOn(AsyncStorage, 'getItem').mockRestore();
    jest.spyOn(AsyncStorage, 'setItem').mockRestore();
  });

  it('calls /AsyncStorage.getItem/ to fetch theme saved by the user', async () => {
    await waitFor(async () => {
      render(<Loader />);
    });
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('THEME_ID');
  });

  it('calls /SplashScreen.hide/ when /AsyncStorage.getItem/ is done', async () => {
    await waitFor(async () => {
      render(<Loader />);
    });
    expect(SplashScreen.hide).toHaveBeenCalled();
  });

  it('calls /AsyncStorage.setItem/ if local /theme_Id === undefined/', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockReturnValue(Promise.resolve(null));
    await waitFor(async () => {
      render(<Loader />);
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'THEME_ID',
      DEFAULT_LIGHT_THEME_ID,
    );
  });

  it(`calls AsyncStorage.setItem if local /theme_Id === ${DEFAULT_LIGHT_THEME_ID} | ${DEFAULT_DARK_THEME_ID}/`, async () => {
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValue(Promise.resolve('wrong theme id'));
    await waitFor(async () => {
      render(<Loader />);
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'THEME_ID',
      DEFAULT_LIGHT_THEME_ID,
    );
  });

  it('do not calls AsyncStorage.setItem if local theme_id !== undefined', async () => {
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValue(Promise.resolve(DEFAULT_LIGHT_THEME_ID));
    await waitFor(async () => {
      render(<Loader />);
    });
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('passes DEFAULT_LIGHT_THEME to <ThemeProvider />', async () => {
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValue(Promise.resolve(DEFAULT_DARK_THEME_ID));
    let container: ReactTestInstance;
    const {findByTestId} = render(
      <Loader>
        <Container testID="container" backgroundColor="surface" />
      </Loader>,
    );
    container = await findByTestId('container');
    expect(getStyle(container)).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_DARK_THEME.color.surface,
      }),
    );
  });

  it('passes DEFAULT_DARK_THEME to <ThemeProvider />', async () => {
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValue(Promise.resolve(DEFAULT_DARK_THEME_ID));
    const {findByTestId} = render(
      <Loader>
        <Container testID="container" backgroundColor="surface" />
      </Loader>,
    );
    const container = await findByTestId('container');
    expect(getStyle(container)).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_DARK_THEME.color.surface,
      }),
    );
  });

  it('passes DEFAULT_LIGHT_THEME to <ThemeProvider /> if /AsyncStorage.getItem || AsyncStorage.setItem/ is rejected', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockReturnValue(Promise.reject());
    const {findByTestId} = render(
      <Loader>
        <Container testID="container" backgroundColor="surface" />
      </Loader>,
    );
    const container = await findByTestId('container');
    expect(getStyle(container)).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.surface,
      }),
    );
  });
});
