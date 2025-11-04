const hexRegex = /^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
const rgbRegex =
  /^rgb\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*\)$/i;
const rgbaRegex =
  /^rgba\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[,/]\s*(\d*(\.\d+)?)\s*\)$/i;
const hslRegex =
  /^hsl\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})%\s*[, ]\s*(\d{1,3})%\s*\)$/i;
const hslaRegex =
  /^hsla\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})%\s*[, ]\s*(\d{1,3})%\s*[,/]\s*(\d*(\.\d+)?)\s*\)$/i;
const hwbRegex =
  /^hwb\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})%\s*[, ]\s*(\d{1,3})%\s*\)$/i;

export const isValidColor = (color: string): boolean => {
  if (!color) {
    return false;
  }
  return (
    hexRegex.test(color) ||
    rgbRegex.test(color) ||
    rgbaRegex.test(color) ||
    hslRegex.test(color) ||
    hslaRegex.test(color) ||
    hwbRegex.test(color)
  );
};

export const hexToAlpha = (color: string, opacity: number): string => {
  // Works only for 6 symbol hex
  // TODO: check hex format
  const opacity16 = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
  let opacityHex = opacity16.toString(16).toUpperCase();
  if (opacityHex.length === 1) {
    opacityHex = opacityHex + opacityHex;
  }
  return color + opacityHex;
};
