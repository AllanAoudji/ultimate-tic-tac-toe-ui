import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {ThemeContext} from './Theme.context';

interface Props {
  color?: 'onPlayerO' | 'onPlayerX' | 'onPrimary' | 'onSurface';
}

const Typography: React.FC<Props> = ({children, color = 'onSurface'}) => {
  const {theme} = React.useContext(ThemeContext);

  const stylesProps = React.useMemo(() => stylesTypography(color), [color]);
  const styles = React.useMemo(() => stylesProps(theme), [stylesProps, theme]);

  return <Text style={styles.textStyle}>{children}</Text>;
};

const stylesTypography =
  (color: 'onPlayerO' | 'onPlayerX' | 'onPrimary' | 'onSurface') =>
  (theme: Theming.Theme) =>
    StyleSheet.create<{textStyle: TextStyle}>({
      textStyle: {
        color: theme.color[color],
      },
    });

export default Typography;
