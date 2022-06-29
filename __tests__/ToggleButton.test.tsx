import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import ToggleButton from '../src/ToggleButton';
import {getStyle} from './testUtils';

describe('<ToggleButton />', () => {
  const renderer = (
    options: {
      activeThumbBackgroundColor?: keyof Theming.ColorTheme;
      activeTrackBackgroundColor?: keyof Theming.ColorTheme;
      disabled?: boolean;
      inactiveThumbBackgroundColor?: keyof Theming.ColorTheme;
      inactiveTrackBackgroundColor?: keyof Theming.ColorTheme;
      label?: string;
      margin?: keyof Theming.SpacingTheme;
      marginBottom?: keyof Theming.SpacingTheme;
      marginHorizontal?: keyof Theming.SpacingTheme;
      marginLeft?: keyof Theming.SpacingTheme;
      marginRight?: keyof Theming.SpacingTheme;
      marginTop?: keyof Theming.SpacingTheme;
      marginVertical?: keyof Theming.SpacingTheme;
      onPress?: () => void;
      state?: boolean;
    } = {},
  ) => {
    const renderToggleButton = render(
      <ToggleButton
        activeThumbBackgroundColor={options.activeThumbBackgroundColor}
        activeTrackBackgroundColor={options.activeTrackBackgroundColor}
        disabled={options.disabled}
        inactiveThumbBackgroundColor={options.inactiveThumbBackgroundColor}
        inactiveTrackBackgroundColor={options.inactiveTrackBackgroundColor}
        label={options.label}
        margin={options.margin}
        marginBottom={options.marginBottom}
        marginHorizontal={options.marginHorizontal}
        marginLeft={options.marginLeft}
        marginRight={options.marginRight}
        marginTop={options.marginTop}
        marginVertical={options.marginVertical}
        onPress={options.onPress}
        state={options.state}
      />,
    );

    const {getByTestId, getByText, queryByTestId, queryByText} =
      renderToggleButton;

    const getContainer = () => getByTestId('toggleButton__container');
    const getInnerContainer = () =>
      getByTestId('toggleButton__container--inner');
    const getPressable = () => getByTestId('toggleButton__pressable');
    const getText = (text: string) => getByText(text);
    const getThumb = () => getByTestId('toggleButton__thumb');
    const getTrack = () => getByTestId('toggleButton__track');

    const queryContainer = () => queryByTestId('toggleButton__container');
    const queyInnerContainer = () =>
      queryByTestId('toggleButton__container--inner');
    const queryPresable = () => queryByTestId('toggleButton__pressable');
    const queryText = (text: string) => queryByText(text);
    const queryThumb = () => queryByTestId('toggleButton__thumb');
    const queryTrack = () => queryByTestId('toggleButton__track');

    return {
      container: {
        get: {
          container: getContainer,
          innerContainer: getInnerContainer,
          pressable: getPressable,
          text: getText,
          thumb: getThumb,
          track: getTrack,
        },
        press: {
          pressable: () => {
            fireEvent.press(getPressable());
          },
        },
        query: {
          container: queryContainer,
          innerContainer: queyInnerContainer,
          pressable: queryPresable,
          text: queryText,
          thumb: queryThumb,
          track: queryTrack,
        },
      },
      render: renderToggleButton,
    };
  };

  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('render a <Container />', () => {
    const {container} = renderer();
    expect(container.query.container()).not.toBeNull();
  });

  it('renders a label', () => {
    const {container} = renderer({label: 'label'});
    expect(container.query.text('label')).not.toBeNull();
  });

  it('renders another label', () => {
    const {container} = renderer({label: 'another label'});
    expect(container.query.text('another label')).not.toBeNull();
  });

  it('do not renders a label if /label === undefined/', () => {
    const {container} = renderer();
    expect(container.query.text('label')).toBeNull();
  });

  it('renders a <Pressable />', () => {
    const {container} = renderer();
    expect(container.query.pressable()).not.toBeNull();
  });

  it('renders a "track" <Container />', () => {
    const {container} = renderer();
    expect(container.query.track()).not.toBeNull();
  });

  it('renders a "thumb" <View />', () => {
    const {container} = renderer();
    expect(container.query.thumb()).not.toBeNull();
  });

  it('passes /margin/ to <Container />', () => {
    const {container} = renderer({margin: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        margin: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /margin/ to <Container />', () => {
    const {container} = renderer({margin: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        margin: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('passes /marginBottom/ to <Container />', () => {
    const {container} = renderer({marginBottom: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginBottom: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /marginBottom/ to <Container />', () => {
    const {container} = renderer({marginBottom: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginBottom: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('passes /marginHorizontal/ to <Container />', () => {
    const {container} = renderer({marginHorizontal: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginHorizontal: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /marginHorizontal/ to <Container />', () => {
    const {container} = renderer({marginHorizontal: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginHorizontal: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('passes /marginLeft/ to <Container />', () => {
    const {container} = renderer({marginLeft: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginLeft: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /marginLeft/ to <Container />', () => {
    const {container} = renderer({marginLeft: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginLeft: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('passes /marginRight/ to <Container />', () => {
    const {container} = renderer({marginRight: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginRight: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /marginRight/ to <Container />', () => {
    const {container} = renderer({marginRight: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginRight: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('passes /marginTop/ to <Container />', () => {
    const {container} = renderer({marginTop: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginTop: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /marginTop/ to <Container />', () => {
    const {container} = renderer({marginTop: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginTop: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('passes /marginVertical/ to <Container />', () => {
    const {container} = renderer({marginVertical: 'large'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginVertical: DEFAULT_LIGHT_THEME.spacing.large,
      }),
    );
  });

  it('passes another /marginVertical/ to <Container />', () => {
    const {container} = renderer({marginVertical: 'smaller'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginVertical: DEFAULT_LIGHT_THEME.spacing.smaller,
      }),
    );
  });

  it('calls /onPress/ when <Pressable /> is pressed', () => {
    const {container} = renderer({onPress});
    container.press.pressable();
    expect(onPress).toHaveBeenCalled();
  });

  it('do not calls /onPress/ if /disabled === true/', () => {
    const {container} = renderer({disabled: true, onPress});
    container.press.pressable();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('sets /opacity: undefined/ if /disabled === false/', () => {
    const {container} = renderer({onPress});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: undefined,
      }),
    );
  });

  it(`sets "track" /backgroundColor: ${DEFAULT_LIGHT_THEME.color.grey}/ by default`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.track())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.grey,
      }),
    );
  });

  it(`sets "track" /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /inactiveTrackBackgroundColor === "playerO"/`, () => {
    const {container} = renderer({
      inactiveTrackBackgroundColor: 'playerO',
    });
    expect(getStyle(container.get.track())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`sets "tack" /backgroundColor! ${DEFAULT_LIGHT_THEME.color.grey}/ by default if /state === true/`, () => {
    const {container} = renderer({
      inactiveTrackBackgroundColor: 'playerO',
      state: true,
    });
    expect(getStyle(container.get.track())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.grey,
      }),
    );
  });

  it(`sets "tack" /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /activeTrackBackgroundColor: playerO/ and /state === true/`, () => {
    const {container} = renderer({
      activeTrackBackgroundColor: 'playerO',
      state: true,
    });
    expect(getStyle(container.get.track())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`sets "thumb" /backgroundColor: ${DEFAULT_LIGHT_THEME.color.white}/ by default`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.white,
      }),
    );
  });

  it(`sets "thumb /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerO} if /inactiveThumbBackgroundColor ==="playerO"/`, () => {
    const {container} = renderer({inactiveThumbBackgroundColor: 'playerO'});
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`sets "thumb" /backgroundColor: ${DEFAULT_LIGHT_THEME.color.white}/ by default if /state === true/`, () => {
    const {container} = renderer({
      inactiveThumbBackgroundColor: 'playerO',
      state: true,
    });
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.white,
      }),
    );
  });

  it(`sets "thumb" /backgroundColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /activeThumbBackgroundColor: playerO/ and /state === true/`, () => {
    const {container} = renderer({
      activeThumbBackgroundColor: 'playerO',
      state: true,
    });
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it('sets "thumb" /left: 0/ if /state === false || undefined/', () => {
    const {container} = renderer();
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        left: 0,
      }),
    );
  });

  it('sets "thumb" /left: 30/ if  /state === true/', () => {
    const {container} = renderer({state: true});
    expect(getStyle(container.get.thumb())).toEqual(
      expect.objectContaining({
        left: 30,
      }),
    );
  });

  it('sets /opacity: 0.4/ if /onPress === undefined/', () => {
    const {container} = renderer();
    expect(getStyle(container.get.innerContainer())).toEqual(
      expect.objectContaining({
        opacity: 0.4,
      }),
    );
  });
});
