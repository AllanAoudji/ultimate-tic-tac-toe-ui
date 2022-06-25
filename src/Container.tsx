import React from 'react';
import {
  FlexAlignType,
  ImageBackground,
  ImageSourcePropType,
  ImageResizeMode,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {ThemeContext} from './Theme.context';

type borderRadius = 1 | 2 | 4 | 8 | 16 | 32;
type borderWidth = 1 | 2 | 4 | 8;
type flexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
type flexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type size = '25%' | '33%' | '50%' | '66%' | '75%' | '100%' | number;
type opacity = 0.1 | 0.2 | 0.4 | 0.8 | 1;
type justifyContent =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
type position = 'absolute' | 'relative';
type rotate = '0deg' | '90deg' | '180deg' | '270deg';

interface Props {
  alignItems?: FlexAlignType;
  backgroundColor?: keyof Theming.ColorTheme;
  borderColor?: keyof Theming.ColorTheme;
  borderRadius?: borderRadius;
  borderWidth?: borderWidth;
  children?: React.ReactNode;
  flexDirection?: flexDirection;
  flexWrap?: flexWrap;
  height?: size;
  justifyContent?: justifyContent;
  margin?: keyof Theming.SpacingTheme;
  marginBottom?: keyof Theming.SpacingTheme;
  marginHorizontal?: keyof Theming.SpacingTheme;
  marginLeft?: keyof Theming.SpacingTheme;
  marginRight?: keyof Theming.SpacingTheme;
  marginTop?: keyof Theming.SpacingTheme;
  marginVertical?: keyof Theming.SpacingTheme;
  opacity?: opacity;
  padding?: keyof Theming.SpacingTheme;
  paddingBottom?: keyof Theming.SpacingTheme;
  paddingHorizontal?: keyof Theming.SpacingTheme;
  paddingLeft?: keyof Theming.SpacingTheme;
  paddingRight?: keyof Theming.SpacingTheme;
  paddingTop?: keyof Theming.SpacingTheme;
  paddingVertical?: keyof Theming.SpacingTheme;
  position?: position;
  resizeMode?: ImageResizeMode;
  rotate?: rotate;
  shadow?: keyof Theming.ShadowTheme;
  shadowColor?: keyof Theming.ColorTheme;
  source?: ImageSourcePropType;
  testID?: string;
  width?: size;
}

const Container: React.FC<Props> = ({
  alignItems,
  backgroundColor = 'surface',
  borderColor,
  borderRadius,
  borderWidth,
  children,
  flexDirection,
  flexWrap,
  height,
  justifyContent,
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  opacity,
  padding,
  paddingBottom,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingVertical,
  position,
  resizeMode,
  rotate,
  shadow,
  shadowColor,
  source,
  testID,
  width,
}) => {
  const {theme} = React.useContext(ThemeContext);

  const stylesProps = React.useMemo(
    () =>
      stylesContainer({
        alignItems,
        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        flexDirection,
        flexWrap,
        height,
        justifyContent,
        margin,
        marginBottom,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginVertical,
        opacity,
        padding,
        paddingBottom,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingVertical,
        position,
        rotate,
        shadow,
        shadowColor,
        width,
      }),
    [
      alignItems,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      flexDirection,
      flexWrap,
      height,
      justifyContent,
      margin,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
      opacity,
      padding,
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      position,
      rotate,
      shadow,
      shadowColor,
      width,
    ],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  if (source) {
    return (
      <ImageBackground
        resizeMode={resizeMode}
        source={source}
        style={styles.container}
        testID={testID || 'container__imageBackground'}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container} testID={testID || 'container__container'}>
      {children}
    </View>
  );
};

const stylesContainer =
  ({
    alignItems,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    flexDirection,
    flexWrap,
    height,
    justifyContent,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    opacity,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    position,
    rotate,
    shadow,
    shadowColor,
    width,
  }: {
    alignItems?: FlexAlignType;
    backgroundColor: keyof Theming.ColorTheme;
    borderColor?: keyof Theming.ColorTheme;
    borderRadius?: borderRadius;
    borderWidth?: borderWidth;
    flexDirection?: flexDirection;
    flexWrap?: flexWrap;
    height?: size;
    justifyContent?: justifyContent;
    margin?: keyof Theming.SpacingTheme;
    marginBottom?: keyof Theming.SpacingTheme;
    marginHorizontal?: keyof Theming.SpacingTheme;
    marginLeft?: keyof Theming.SpacingTheme;
    marginRight?: keyof Theming.SpacingTheme;
    marginTop?: keyof Theming.SpacingTheme;
    marginVertical?: keyof Theming.SpacingTheme;
    opacity?: opacity;
    padding?: keyof Theming.SpacingTheme;
    paddingBottom?: keyof Theming.SpacingTheme;
    paddingHorizontal?: keyof Theming.SpacingTheme;
    paddingLeft?: keyof Theming.SpacingTheme;
    paddingRight?: keyof Theming.SpacingTheme;
    paddingTop?: keyof Theming.SpacingTheme;
    paddingVertical?: keyof Theming.SpacingTheme;
    position?: position;
    rotate?: rotate;
    shadow?: keyof Theming.ShadowTheme;
    shadowColor?: keyof Theming.ColorTheme;
    width?: size;
  }) =>
  (theme: Theming.Theme) => {
    const customShadowColor = shadowColor
      ? theme.color[shadowColor]
      : theme.color.onSurface;
    const transform: any[] = [];
    if (rotate) {
      transform.push({rotate});
    }

    return StyleSheet.create<{container: ViewStyle}>({
      container: {
        alignItems,
        backgroundColor: theme.color[backgroundColor],
        borderColor: borderColor ? theme.color[borderColor] : undefined,
        borderRadius,
        borderWidth,
        elevation: shadow ? theme.shadow[shadow].elevation : undefined,
        flexDirection,
        flexWrap,
        height,
        justifyContent,
        margin: margin ? theme.spacing[margin] : undefined,
        marginBottom: marginBottom ? theme.spacing[marginBottom] : undefined,
        marginHorizontal: marginHorizontal
          ? theme.spacing[marginHorizontal]
          : undefined,
        marginLeft: marginLeft ? theme.spacing[marginLeft] : undefined,
        marginRight: marginRight ? theme.spacing[marginRight] : undefined,
        marginTop: marginTop ? theme.spacing[marginTop] : undefined,
        marginVertical: marginVertical
          ? theme.spacing[marginVertical]
          : undefined,
        opacity,
        padding: padding ? theme.spacing[padding] : undefined,
        paddingBottom: paddingBottom ? theme.spacing[paddingBottom] : undefined,
        paddingHorizontal: paddingHorizontal
          ? theme.spacing[paddingHorizontal]
          : undefined,
        paddingLeft: paddingLeft ? theme.spacing[paddingLeft] : undefined,
        paddingRight: paddingRight ? theme.spacing[paddingRight] : undefined,
        paddingTop: paddingTop ? theme.spacing[paddingTop] : undefined,
        paddingVertical: paddingVertical
          ? theme.spacing[paddingVertical]
          : undefined,
        position,
        transform: transform.length ? transform : undefined,
        shadowColor: shadow ? customShadowColor : undefined,
        shadowOffset: shadow ? theme.shadow[shadow].shadowOffset : undefined,
        shadowOpacity: shadow ? theme.shadow[shadow].shadowOpacity : undefined,
        shadowRadius: shadow ? theme.shadow[shadow].shadowRadius : undefined,
        width,
      },
    });
  };

export default React.memo(Container);
