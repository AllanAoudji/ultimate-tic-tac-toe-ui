import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import PlayGameButton from '../src/PlayGameButton';
import {getStyle} from './testUtils';

describe('<PlayGameButton />', () => {
  const renderer = (
    options: {
      backgroundColor?: keyof Theming.ColorTheme;
      color?: keyof Theming.ColorTheme;
      disabled?: boolean;
      marginBottom?: keyof Theming.SpacingTheme;
      marginTop?: keyof Theming.SpacingTheme;
      marginVertical?: keyof Theming.SpacingTheme;
      onPress?: () => void;
      title?: string;
    } = {},
  ) => {
    const title = options.title || 'title';
    const renderPlayGameButton = render(
      <PlayGameButton
        backgroundColor={options.backgroundColor}
        color={options.color}
        disabled={options.disabled}
        marginBottom={options.marginBottom}
        marginTop={options.marginTop}
        marginVertical={options.marginVertical}
        onPress={options.onPress}
        title={title}
      />,
    );

    const {getByTestId, getByText, queryByTestId, queryByText} =
      renderPlayGameButton;

    const getContainer = () =>
      getByTestId('playGameButton__container--pressable');
    const getText = (text: string) => getByText(text);
    const getTitle = () => getByText(title);

    const queryContainer = () =>
      queryByTestId('playGameButton__container--pressable');
    const queryText = (text: string) => queryByText(text);
    const queryTitle = () => queryByText(title);

    return {
      container: {
        get: {
          byText: (text: string) => getText(text),
          container: getContainer,
          title: getTitle,
        },
        press: {
          button: () => {
            fireEvent.press(getTitle());
          },
        },
        query: {
          byText: (text: string) => queryText(text),
          container: queryContainer,
          title: queryTitle,
        },
      },
      render: renderPlayGameButton,
    };
  };

  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('renders a <Pressable />', () => {
    const {container} = renderer();
    expect(container.query.container()).not.toBeNull();
  });

  it('renders /title/', () => {
    const {container} = renderer();
    expect(container.query.byText('title')).not.toBeNull();
  });

  it('calls /onPress/', () => {
    const {container} = renderer({onPress});
    container.press.button();
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call /onPress/ if /disabled === true/', () => {
    const {container} = renderer({disabled: true, onPress});
    container.press.button();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('set /opacity: 0.4/ if /disabled === true/', () => {
    const {container} = renderer({disabled: true});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });

  it('sets /opacity: 1/ if /disabled === false/', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: 1,
      }),
    );
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ by default`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it('sets another /backgroundColor/', () => {
    const {container} = renderer({backgroundColor: 'background'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.background,
      }),
    );
  });

  it(`sets /color: ${DEFAULT_LIGHT_THEME.color.onSurface}/ by default`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.title())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  });

  it('sets another /color/', () => {
    const {container} = renderer({color: 'playerO'});
    expect(getStyle(container.get.title())).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it('sets /marginBottom: undefined/ by default', () => {
    const {container} = renderer({color: 'playerO'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginBottom: undefined,
      }),
    );
  });

  it('sets another /marginBottom/', () => {
    const {container} = renderer({marginBottom: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginBottom: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('sets /marginTop: undefined/ by default', () => {
    const {container} = renderer({color: 'playerO'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginTop: undefined,
      }),
    );
  });

  it('sets another /marginTop/', () => {
    const {container} = renderer({marginTop: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginTop: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('sets /marginVertical: undefined/ by default', () => {
    const {container} = renderer({color: 'playerO'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginVertical: undefined,
      }),
    );
  });

  it('sets another /marginVertical/', () => {
    const {container} = renderer({marginVertical: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginVertical: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });
});
