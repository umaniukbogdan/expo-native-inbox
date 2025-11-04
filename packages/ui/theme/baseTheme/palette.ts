import { ThemePalette, ThemePaletteKey } from '../types';

const colors: Record<ThemePaletteKey, string> = {
  // black
  black0: '#000000',
  black4: '#0A0A0A',
  black5: '#0F0F0F',
  black7: '#121212',
  black9: '#181818',
  black13: '#212121',
  black20: '#2F2F2F',
  black30: '#4D4D4D',
  black40: '#666666',
  black50: '#808080',
  black60: '#A6A6A6',

  // white
  white0: '#FFFFFF',
  white2_7: '#F8F8F8',
  white5: '#F2F2F2',
  white8: '#EBEBEB',
  white9: '#FFF5E8',
  white15: '#D9D9D9',
  white16: '#FFFFFF29',

  // pink
  pink80: '#F1A7DC',
  pink63: '#E45DBF',
  pink41: '#BB16A3',
  pink31: '#821B60',
  pink15: '#4A003D',
  pink10: '#38032F',

  red: '#E34242',

  success: '#00A388',

  orange: '#F58750',
  lime: '#BCFF00',
  yellow: '#D2B285',
  blue: '#448EF6',
  blue_stroke: '#21477C',
  blue_background: '#02224F',
  blue_text: '#448EF6',
  chineseBlack: '#0C0F12',
  charlistonGreen: '#25282D',
  arsenic: '#3D4149',
  slateGrey: '#797E8A',
  white: '#FFFFFF',
  metalicSilver: '#A4A8B0',
  blueberry: '#448EF6',
  frenchSkyBlue: '#82B6FF',
  lavender: '#E7ECF7',
  pastelRed: '#FF6060',
  caribbeanGreen: '#16D69A',
  coral: '#F58750',
  deepKomaru: '#2D4064'
};

export const palette: ThemePalette = {
  backgound: {
    main: colors.black4,
  },
  text: {
    main: colors.black60,
  },

  ...colors,
};
