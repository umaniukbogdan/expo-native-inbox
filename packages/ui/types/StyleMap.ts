import { UniversalStyle } from "./UniversalStyle";

export type StyleMap<Styles = object, Style = UniversalStyle> = Record<
  keyof Styles,
  Style
>;
