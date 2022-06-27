import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {ThemeContext} from './Theme.context';

type textTransform = 'capitalize' | 'lowercase' | 'none' | 'uppercase';
interface Props {
  color?: keyof Theming.ColorTheme;
  fontSize?: keyof Theming.FontSizeTheme;
  textTransform?: textTransform;
}

const Typography: React.FC<Props> = ({
  children,
  color = 'onSurface',
  fontSize = 'normal',
  textTransform = 'none',
}) => {
  const {theme} = React.useContext(ThemeContext);

  const stylesProps = React.useMemo(
    () => stylesTypography({color, fontSize, textTransform}),
    [color, fontSize, textTransform],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return <Text style={styles.textStyle}>{children}</Text>;
};

const stylesTypography =
  ({
    color,
    fontSize,
    textTransform,
  }: {
    color: keyof Theming.ColorTheme;
    fontSize: keyof Theming.FontSizeTheme;
    textTransform: textTransform;
  }) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{textStyle: TextStyle}>({
      textStyle: {
        color: theme.color[color],
        fontSize: theme.fontSize[fontSize],
        textTransform,
      },
    });

export default Typography;
