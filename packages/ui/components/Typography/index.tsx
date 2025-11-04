import { FC, ReactNode, useMemo } from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { ThemePaletteKey, ThemeTypographyKey, theme } from '../../theme';

export interface TypographyProps extends TextProps {
  children: ReactNode;
  variant?: ThemeTypographyKey;
  style?: StyleProp<TextStyle>;
  textAlign?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
  palette?: ThemePaletteKey;
  color?: ColorValue;
}

export const Typography: FC<TypographyProps> = (props) => {
  const {
    children,
    variant = 'base',
    textAlign,
    textTransform,
    color,
    palette,
    style,
    allowFontScaling = false,
    ...rest
  } = props;

  const textStyle = useMemo(() => {
    let result: TextStyle = {};
    if (variant in theme.typography) {
      result = {
        ...theme.typography[variant],
      };
    }

    result.color = color || theme.palette.text.main;
    if (palette && palette in theme.palette) {
      result.color = theme.palette[palette];
    }

    if (textAlign) {
      result.textAlign = textAlign;
    }
    if (textTransform) {
      result.textTransform = textTransform;
    }

    if (style) {
      return StyleSheet.compose(result, style);
    }
    return result;
  }, [variant, textAlign, textTransform, palette, color, style]);

  return (
    <Text allowFontScaling={allowFontScaling} style={textStyle} {...rest}>
      {children}
    </Text>
  );
};
