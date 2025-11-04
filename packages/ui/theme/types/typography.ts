import { TextStyle } from 'react-native';
import { fontFamilies } from '../baseTheme/fontConst';

export type FontFamilyKey = keyof typeof fontFamilies;

export type ThemeTypographyCreateTextStyle = (
  fontSize: TextStyle['fontSize'],
  lineHeight: TextStyle['lineHeight'],
  fontWeight?: TextStyle['fontWeight'],
  letterSpacing?: TextStyle['letterSpacing'],
  fontStyle?: FontFamilyKey,
) => TextStyle;

export type ThemeTypographyKey =
  | 'base'
  | 'head14'
  | 'head16'
  | 'head20'
  | 'head22'
  | 'head28'
  | 'head37'
  | 'head40C'
  | 'head40B'
  | 'head14Bold'
  | 'head16Bold'
  | 'head20Bold'
  | 'head22Bold'
  | 'head24Bold'
  | 'head26Bold'
  | 'head28Bold'
  | 'head32Bold'
  | 'head16Medium'
  | 'head17Medium'
  | 'text12'
  | 'text14'
  | 'text16'
  | 'text12Bold'
  | 'text14Bold'
  | 'text16Bold'
  | 'caption10'
  | 'caption12'
  | 'caption10Bold'
  | 'caption12Bold'
  | 'caption10Upper'
  | 'caption12Upper'
  //v1
  | 'header40Bold'
  | 'header40Regular'
  | 'header28Bold'
  | 'header28Regular'
  | 'header22Bold'
  | 'header22Regular'
  | 'titleCase14'
  | 'titleCase16'
  | 'text12Regular'
  | 'text14Regular';

export interface ThemeTypography extends Record<ThemeTypographyKey, TextStyle> {
  createTextStyle: ThemeTypographyCreateTextStyle;
}
