export type ThemePaletteKey =
  | 'black0'
  | 'black4'
  | 'black5'
  | 'black7'
  | 'black9'
  | 'black13'
  | 'black20'
  | 'black30'
  | 'black40'
  | 'black50'
  | 'black60'
  | 'white0'
  | 'white2_7'
  | 'white5'
  | 'white8'
  | 'white9'
  | 'white15'
  | 'white16'
  | 'pink80'
  | 'pink63'
  | 'pink41'
  | 'pink31'
  | 'pink15'
  | 'pink10'
  | 'red'
  | 'success'
  | 'orange'
  | 'yellow'
  | 'lime'
  | 'blue'
  | 'blue_stroke'
  | 'blue_background'
  | 'blue_text'
  | 'chineseBlack'
  | 'charlistonGreen'
  | 'arsenic'
  | 'slateGrey'
  | 'metalicSilver'
  | 'white'
  | 'blueberry'
  | 'frenchSkyBlue'
  | 'lavender'
  | 'pastelRed'
  | 'caribbeanGreen'
  | 'coral'
  | 'deepKomaru';

export interface ThemePalette extends Record<ThemePaletteKey, string> {
  backgound: {
    main: string;
  };
  text: {
    main: string;
  };
}
