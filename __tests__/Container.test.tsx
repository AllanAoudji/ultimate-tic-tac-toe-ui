import {render} from '@testing-library/react-native';
import React from 'react';
import {
  FlexAlignType,
  ImageResizeMode,
  ImageSourcePropType,
  Text,
} from 'react-native';

import Container from '../src/Container';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import {getSource, getStyle, imageSource} from './testUtils';

const renderer = (
  options: {
    alignItems?: FlexAlignType;
    backgroundColor?: keyof Theming.ColorTheme;
    borderColor?: keyof Theming.ColorTheme;
    borderRadius?: 1 | 2 | 4 | 8 | 16 | 32;
    borderWidth?: 1 | 2 | 4 | 8;
    children?: React.ReactNode;
    flex?: number;
    flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    height?: '25%' | '33%' | '50%' | '66%' | '75%' | '100%' | number;
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    margin?: keyof Theming.SpacingTheme;
    marginBottom?: keyof Theming.SpacingTheme;
    marginHorizontal?: keyof Theming.SpacingTheme;
    marginLeft?: keyof Theming.SpacingTheme;
    marginRight?: keyof Theming.SpacingTheme;
    marginTop?: keyof Theming.SpacingTheme;
    marginVertical?: keyof Theming.SpacingTheme;
    opacity?: 0.1 | 0.2 | 0.4 | 0.8 | 1;
    padding?: keyof Theming.SpacingTheme;
    paddingBottom?: keyof Theming.SpacingTheme;
    paddingHorizontal?: keyof Theming.SpacingTheme;
    paddingLeft?: keyof Theming.SpacingTheme;
    paddingRight?: keyof Theming.SpacingTheme;
    paddingTop?: keyof Theming.SpacingTheme;
    paddingVertical?: keyof Theming.SpacingTheme;
    pointerEvents?: 'none' | 'box-none' | 'box-only' | 'auto';
    position?: 'absolute' | 'relative';
    resizeMode?: ImageResizeMode;
    rotate?: '0deg' | '90deg' | '180deg' | '270deg';
    shadow?: keyof Theming.ShadowTheme;
    shadowColor?: keyof Theming.ColorTheme;
    source?: ImageSourcePropType;
    testID?: string;
    width?: '25%' | '33%' | '50%' | '66%' | '75%' | '100%' | number;
  } = {},
) => {
  const children: React.ReactNode = options.children || (
    <Text>hello world</Text>
  );
  const renderContainer = render(
    <Container
      alignItems={options.alignItems}
      backgroundColor={options.backgroundColor}
      borderColor={options.borderColor}
      borderRadius={options.borderRadius}
      borderWidth={options.borderWidth}
      flex={options.flex}
      flexDirection={options.flexDirection}
      flexWrap={options.flexWrap}
      height={options.height}
      justifyContent={options.justifyContent}
      margin={options.margin}
      marginBottom={options.marginBottom}
      marginHorizontal={options.marginHorizontal}
      marginLeft={options.marginLeft}
      marginRight={options.marginRight}
      marginTop={options.marginTop}
      marginVertical={options.marginVertical}
      opacity={options.opacity}
      padding={options.padding}
      paddingBottom={options.paddingBottom}
      paddingHorizontal={options.paddingHorizontal}
      paddingLeft={options.paddingLeft}
      paddingRight={options.paddingRight}
      paddingTop={options.paddingTop}
      paddingVertical={options.paddingVertical}
      pointerEvents={options.pointerEvents}
      position={options.position}
      resizeMode={options.resizeMode}
      rotate={options.rotate}
      shadow={options.shadow}
      shadowColor={options.shadowColor}
      source={options.source}
      testID={options.testID}
      width={options.width}>
      {children}
    </Container>,
  );

  const {getByTestId, getByText, queryByTestId, queryByText} = renderContainer;

  const getContainer = () => getByTestId('container__container');
  const getImageBackground = () => getByTestId('container__imageBackground');

  const queryContainer = () => queryByTestId('container__container');
  const queryImageBackground = () =>
    queryByTestId('container__imageBackground');

  return {
    container: {
      get: {
        byTestId: (testId: string) => getByTestId(testId),
        byText: (text: string) => getByText(text),
        container: getContainer,
        imageBackground: getImageBackground,
      },
      query: {
        byTestId: (testId: string) => queryByTestId(testId),
        byText: (text: string) => queryByText(text),
        container: queryContainer,
        imageBackground: queryImageBackground,
      },
    },
    render: renderContainer,
  };
};

describe('<Container />', () => {
  it('renders a <View />', () => {
    const {container} = renderer();
    expect(container.query.container).not.toBeNull();
  });

  it('renders a <View /> with another testID', () => {
    const {container} = renderer({testID: 'anotherTestId'});
    expect(container.query.byTestId('anotherTestId')).not.toBeNull();
  });

  it('renders /children/', () => {
    const {container} = renderer();
    expect(container.query.byText('hello world')).not.toBeNull();
  });

  it('renders another /children/', () => {
    const {container} = renderer({children: <Text>another hello world</Text>});
    expect(container.query.byText('another hello world')).not.toBeNull();
  });

  it('sets /pointerEvents === auto', () => {
    const {container} = renderer({pointerEvents: 'auto'});
    expect(container.get.container().props.pointerEvents).toBe('auto');
  });

  it('sets a /pointerEvents === undefined/ by default', () => {
    const {container} = renderer();
    expect(container.get.container().props.pointerEvents).toBeUndefined();
  });

  it(`sets /backgroundColor: ${DEFAULT_LIGHT_THEME.color.background}/ by default`, () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        backgroundColor: DEFAULT_LIGHT_THEME.color.surface,
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

  it('sets /borderColor: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        borderColor: undefined,
      }),
    );
  });

  it('sets another /borderColor/', () => {
    const {container} = renderer({borderColor: 'playerO'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        borderColor: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it('sets /borderRadius: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        borderRadius: undefined,
      }),
    );
  });

  it('sets another /borderRadius/', () => {
    const {container} = renderer({borderRadius: 2});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        borderRadius: 2,
      }),
    );
  });

  it('sets /borderWith: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        borderWidth: undefined,
      }),
    );
  });

  it('sets another /borderWidth/', () => {
    const {container} = renderer({borderWidth: 2});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        borderWidth: 2,
      }),
    );
  });

  it('sets /opacity: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: undefined,
      }),
    );
  });

  it('sets another /opacity/', () => {
    const {container} = renderer({opacity: 0.2});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        opacity: 0.2,
      }),
    );
  });

  it('sets /alignItems: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        alignItems: undefined,
      }),
    );
  });

  it('sets another /alignItems/', () => {
    const {container} = renderer({alignItems: 'flex-end'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        alignItems: 'flex-end',
      }),
    );
  });

  it('sets /justifyContent: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        justifyContent: undefined,
      }),
    );
  });

  it('sets another /justifyContent/', () => {
    const {container} = renderer({justifyContent: 'flex-end'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        justifyContent: 'flex-end',
      }),
    );
  });

  it('sets /margin: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        margin: undefined,
      }),
    );
  });

  it('sets another /margin/', () => {
    const {container} = renderer({margin: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        margin: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /marginHorizontal: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginHorizontal: undefined,
      }),
    );
  });

  it('sets another /marginHorizontal/', () => {
    const {container} = renderer({marginHorizontal: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginHorizontal: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /marginVertical: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginVertical: undefined,
      }),
    );
  });

  it('sets another /marginVertical/', () => {
    const {container} = renderer({marginVertical: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginVertical: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /marginBottom: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginBottom: undefined,
      }),
    );
  });

  it('sets another /marginBottom/', () => {
    const {container} = renderer({marginBottom: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginBottom: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /marginLeft: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginLeft: undefined,
      }),
    );
  });

  it('sets another /marginLeft/', () => {
    const {container} = renderer({marginLeft: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginLeft: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /marginRight: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginRight: undefined,
      }),
    );
  });

  it('sets another /marginRight/', () => {
    const {container} = renderer({marginRight: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginRight: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /marginTop: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginTop: undefined,
      }),
    );
  });

  it('sets another /marginTop/', () => {
    const {container} = renderer({marginTop: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        marginTop: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /padding: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        padding: undefined,
      }),
    );
  });

  it('sets another /padding/', () => {
    const {container} = renderer({padding: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        padding: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /paddingHorizontal: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingHorizontal: undefined,
      }),
    );
  });

  it('sets another /paddingHorizontal/', () => {
    const {container} = renderer({paddingHorizontal: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingHorizontal: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /paddingVertical: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingVertical: undefined,
      }),
    );
  });

  it('sets another /paddingVertical/', () => {
    const {container} = renderer({paddingVertical: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingVertical: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /paddingBottom: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingBottom: undefined,
      }),
    );
  });

  it('sets another /paddingBottom/', () => {
    const {container} = renderer({paddingBottom: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingBottom: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /paddingLeft: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingLeft: undefined,
      }),
    );
  });

  it('sets another /paddingLeft/', () => {
    const {container} = renderer({paddingLeft: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingLeft: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /paddingRight: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingRight: undefined,
      }),
    );
  });

  it('sets another /paddingRight/', () => {
    const {container} = renderer({paddingRight: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingRight: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /paddingTop: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingTop: undefined,
      }),
    );
  });

  it('sets another /paddingTop/', () => {
    const {container} = renderer({paddingTop: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        paddingTop: DEFAULT_LIGHT_THEME.spacing.base,
      }),
    );
  });

  it('sets /flexWrap: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        flexWrap: undefined,
      }),
    );
  });

  it('sets another /flexWrap/', () => {
    const {container} = renderer({flexWrap: 'wrap'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        flexWrap: 'wrap',
      }),
    );
  });

  it('sets /flexDirection: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        flexDirection: undefined,
      }),
    );
  });

  it('sets another /flexDirection/', () => {
    const {container} = renderer({flexDirection: 'row'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        flexDirection: 'row',
      }),
    );
  });

  it('sets /height: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        height: undefined,
      }),
    );
  });

  it('sets another /height/', () => {
    const {container} = renderer({height: '25%'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        height: '25%',
      }),
    );
  });

  it('sets /width: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        width: undefined,
      }),
    );
  });

  it('sets another /width/', () => {
    const {container} = renderer({width: '25%'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        width: '25%',
      }),
    );
  });

  it('sets /position: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        position: undefined,
      }),
    );
  });

  it('sets another /position/', () => {
    const {container} = renderer({position: 'absolute'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        position: 'absolute',
      }),
    );
  });

  it('sets /rotate: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        transform: undefined,
      }),
    );
  });

  it('sets another /rotate/', () => {
    const {container} = renderer({rotate: '90deg'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        transform: expect.arrayContaining([
          {
            rotate: '90deg',
          },
        ]),
      }),
    );
  });

  it('sets /elevation: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        elevation: undefined,
      }),
    );
  });

  it('sets another /elevation/', () => {
    const {container} = renderer({shadow: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        elevation: DEFAULT_LIGHT_THEME.shadow.base.elevation,
      }),
    );
  });

  it('sets /shadowOffset: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowOffset: undefined,
      }),
    );
  });

  it('sets another /shadowOffset/', () => {
    const {container} = renderer({shadow: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowOffset: DEFAULT_LIGHT_THEME.shadow.base.shadowOffset,
      }),
    );
  });

  it('sets /shadowOpacity: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowOpacity: undefined,
      }),
    );
  });

  it('sets another /shadowOpacity/', () => {
    const {container} = renderer({shadow: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowOpacity: DEFAULT_LIGHT_THEME.shadow.base.shadowOpacity,
      }),
    );
  });

  it('sets /shadowRadius: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowRadius: undefined,
      }),
    );
  });

  it('sets another /shadowRadius/', () => {
    const {container} = renderer({shadow: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowRadius: DEFAULT_LIGHT_THEME.shadow.base.shadowRadius,
      }),
    );
  });

  it('sets /shadowColor: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowColor: undefined,
      }),
    );
  });

  it(`sets /shadowColor: ${DEFAULT_LIGHT_THEME.color.onSurface}/ if /shadow !== undefined/ by default`, () => {
    const {container} = renderer({shadow: 'base'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowColor: DEFAULT_LIGHT_THEME.color.onSurface,
      }),
    );
  });

  it('sets another /shadowColor/', () => {
    const {container} = renderer({shadow: 'base', shadowColor: 'background'});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        shadowColor: DEFAULT_LIGHT_THEME.color.background,
      }),
    );
  });

  it('sets /flex: undefined/ by default', () => {
    const {container} = renderer();
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        flex: undefined,
      }),
    );
  });

  it('sets another /flex/', () => {
    const {container} = renderer({flex: 1});
    expect(getStyle(container.get.container())).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });

  describe('renders an <ImageBackground />', () => {
    it('if /props.source !== undefined/', () => {
      const source = require(imageSource('X'));
      const {container} = renderer({source});
      expect(container.query.imageBackground()).not.toBeNull();
      expect(getSource(container.get.imageBackground())).toBe(source);
    });

    it(' with another testID', () => {
      const source = require(imageSource('X'));
      const {container} = renderer({source, testID: 'anotherTestId'});
      expect(container.query.byTestId('anotherTestId')).not.toBeNull();
    });

    it('renders /children/', () => {
      const source = require(imageSource('X'));
      const {container} = renderer({source});
      expect(container.query.byText('hello world')).not.toBeNull();
    });

    it('renders another /children/', () => {
      const source = require(imageSource('X'));
      const {container} = renderer({
        source,
        children: <Text>another hello world</Text>,
      });
      expect(container.query.byText('another hello world')).not.toBeNull();
    });

    it('with another source', () => {
      const source = require(imageSource('O'));
      const {container} = renderer({source});
      expect(getSource(container.get.imageBackground())).toBe(source);
    });

    it('with props.resizeMode', () => {
      const source = require(imageSource('O'));
      const {container} = renderer({resizeMode: 'contain', source});
      expect(container.get.imageBackground().props.resizeMode).toBe('contain');
    });

    it('with another resizeMode', () => {
      const source = require(imageSource('O'));
      const {container} = renderer({resizeMode: 'repeat', source});
      expect(container.get.imageBackground().props.resizeMode).toBe('repeat');
    });

    it('and passes styles', () => {
      const source = require(imageSource('O'));
      const {container} = renderer({
        height: '50%',
        source,
      });
      expect(getStyle(container.get.imageBackground())).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            height: '50%',
          }),
        ]),
      );
    });
  });
});
