export type ThemeSpacingGutter = 'sm' | 'md';

export interface ThemeSpacing {
  base: number;
  get(size: number): number;
  gutters: Record<ThemeSpacingGutter, number>;
  /** @deprecated */
  screenHorizontalPadding: number;
}
