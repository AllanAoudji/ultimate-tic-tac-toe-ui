import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {ThemeContext} from './Theme.context';

type textTransform = 'capitalize' | 'lowercase' | 'none' | 'uppercase';
interface Props {
  color?: keyof Theming.ColorTheme;
  textTransform?: textTransform;
}

const Typography: React.FC<Props> = ({
  children,
  color = 'onSurface',
  textTransform = 'none',
}) => {
  const {theme} = React.useContext(ThemeContext);

  const stylesProps = React.useMemo(
    () => stylesTypography({color, textTransform}),
    [color, textTransform],
  );
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return <Text style={styles.textStyle}>{children}</Text>;
};

const stylesTypography =
  ({
    color,
    textTransform,
  }: {
    color: keyof Theming.ColorTheme;
    textTransform: textTransform;
  }) =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{textStyle: TextStyle}>({
      textStyle: {
        color: theme.color[color],
        textTransform,
      },
    });

export default Typography;
