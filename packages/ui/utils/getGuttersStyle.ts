import { ViewStyle } from "react-native";
import { spacing } from "../theme/baseTheme/spacing";
import { ThemeSpacingGutter } from "../theme/types/spacing";

export type GuttersOption = boolean | ThemeSpacingGutter;

export const getGuttersStyles = (gutter?: GuttersOption): ViewStyle => {
  if (typeof gutter === "string" && gutter in spacing.gutters) {
    return {
      paddingHorizontal: spacing.gutters[gutter],
    };
  }
  if (gutter) {
    return {
      paddingHorizontal: spacing.gutters.md,
    };
  }
  return {};
};
