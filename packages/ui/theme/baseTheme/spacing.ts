import { ThemeSpacing } from '../types';

const base = 4;

const get = (size: number) => size * base;

export const spacing: ThemeSpacing = {
  base,
  get,
  gutters: {
    sm: get(2),
    md: get(4),
  },
  /** @deprecated */
  screenHorizontalPadding: get(4),
};
