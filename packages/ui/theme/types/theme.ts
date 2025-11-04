import { ThemePalette } from './palette';
import { ThemeSpacing } from './spacing';
import { ThemeTypography } from './typography';

export interface Theme {
  palette: ThemePalette;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
}
