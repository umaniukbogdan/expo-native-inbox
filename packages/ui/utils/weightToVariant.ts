import type { TextStyle } from "react-native";

type Variant = "regular" | "medium" | "bold";

export const weightToVariant = (
  weight?: TextStyle["fontWeight"] | number
): Variant => {
  const w = String(weight ?? "400");

  switch (w) {
    case "700":
    case "800":
    case "900":
    case "bold":
      return "bold";
    case "500":
    case "600":
      return "medium";
    case "400":
    case "normal":
    default:
      return "regular";
  }
};
