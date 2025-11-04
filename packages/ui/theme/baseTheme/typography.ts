import { TextStyle } from 'react-native';
import { weightToVariant } from '../../utils';
import { ThemeTypography, ThemeTypographyCreateTextStyle } from '../types';
import { fontFamilies } from './fontConst';

const createTextStyle: ThemeTypographyCreateTextStyle = (
  fontSize,
  lineHeight,
  fontWeight = '400',
  letterSpacing,
  fontFamilyProp = 'INTER',
): TextStyle => {
  const variant = weightToVariant(fontWeight);
  const fontFamily = fontFamilies[fontFamilyProp][variant];
  return { fontFamily, fontSize, lineHeight, letterSpacing };
};

export const typography: ThemeTypography = {
  createTextStyle,

  base: { fontFamily: fontFamilies.INTER.regular },
  head14: createTextStyle(14, 18, '400'),
  head16: createTextStyle(16, 17.6, '400'),
  head20: createTextStyle(20, 24, '400'),
  head22: createTextStyle(22, 28, '400'),
  head28: createTextStyle(28, 34, '400'),
  head37: createTextStyle(37, 41, '400'),
  head40C: createTextStyle(40, 48, '700'),
  head40B: createTextStyle(40, 54.5, '700'),

  head14Bold: createTextStyle(14, 18, '700', 0.28),
  head16Bold: createTextStyle(16, 18.2, '700'),
  head20Bold: createTextStyle(20, 22.5, '700'),
  head22Bold: createTextStyle(22, 28, '700'),
  head24Bold: createTextStyle(24, 30, '700'),
  head26Bold: createTextStyle(26, 30, '700'),
  head28Bold: createTextStyle(28, 36.4, '700'),
  head32Bold: createTextStyle(32, 35.5, '700'),

  head16Medium: createTextStyle(16, 18.2, '500'),
  head17Medium: createTextStyle(17, 22.1, '500'),

  text12: createTextStyle(12, 18, '400', 0.1),
  text14: createTextStyle(14, 21, '400', 0.1),
  text16: createTextStyle(16, 24, '400'),

  text12Bold: createTextStyle(12, 16.8, '700', 0.12),
  text14Bold: createTextStyle(14, 18, '700', 0.28),
  text16Bold: createTextStyle(16, 20, '700', 0.32),

  caption10: createTextStyle(10, 14, '400', 0.5),
  caption12: createTextStyle(12, 16.5, '400', 0.24),

  caption10Bold: createTextStyle(10, 12, '700', 0.5),
  caption12Bold: createTextStyle(12, 13.1, '700'),

  caption10Upper: {
    ...createTextStyle(10, 12, '500', 0.5),
    textTransform: 'uppercase',
  } as TextStyle,
  caption12Upper: {
    ...createTextStyle(12, 16, '700', 0.72),
    textTransform: 'uppercase',
  } as TextStyle,

  //v1
  header40Bold: createTextStyle(40, 48, '700'),
  header40Regular: createTextStyle(40, 48, '400'),
  header28Bold: createTextStyle(28, 36.4, '700'),
  header28Regular: createTextStyle(28, 36.4, '400'),
  header22Bold: createTextStyle(22, 26.4, '700'),
  header22Regular: createTextStyle(22, 26.4, '400'),
  titleCase14: createTextStyle(14, 16.8, '500'),
  titleCase16: createTextStyle(16, 19.2, '500'),
  text12Regular: createTextStyle(12, 16.8, '400'),
  text14Regular: createTextStyle(14, 19.6, '400'),
};
