export type FormatNumberValue = number | string;

export interface FormatNumberOptions {
  locale?: string;
  startSymbol?: string;
  endSymbol?: string;
  decimals?: number;
  decimalsMin?: number;
  decimalsMax?: number;
  convertFromDecimalPlaces?: number;
  preset?: PresetKey;
  minify?: boolean;
}

type PresetKey = "priceUSD" | "%" | "priceHKD" | "";

const presets: Record<PresetKey, Partial<FormatNumberOptions>> = {
  priceUSD: {
    decimals: 0,
    startSymbol: "$ ",
  },
  priceHKD: {
    decimals: 0,
    startSymbol: "HK$",
  },
  "%": {
    decimals: 0,
    endSymbol: " %",
  },
  "": {
    decimals: 0,
    endSymbol: "",
  },
};

export const formatNumber = (
  value: FormatNumberValue,
  options: FormatNumberOptions = {}
) => {
  let { preset, ...restOptions } = options;
  if (preset && preset in presets) {
    restOptions = {
      ...presets[preset],
      ...restOptions,
    };
  }

  let {
    locale = "en-US",
    startSymbol,
    endSymbol,
    decimals,
    decimalsMin,
    decimalsMax,
    minify,
    convertFromDecimalPlaces,
  } = restOptions;

  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (convertFromDecimalPlaces !== undefined && convertFromDecimalPlaces > 0) {
    value = value / Math.pow(10, convertFromDecimalPlaces);
  }
  if (minify && typeof value === "number") {
    if (value >= 1000000) {
      value = value / 1000000;
      endSymbol = "M";
    } else if (value >= 1000) {
      value = value / 1000;
      endSymbol = "K";
    }
  }
  value = value.toLocaleString(locale, {
    minimumFractionDigits: decimalsMin || decimals,
    maximumFractionDigits: decimalsMax || decimals,
  });
  if (startSymbol) {
    value = `${startSymbol}${value}`;
  }
  if (endSymbol) {
    value = `${value}${endSymbol}`;
  }
  return value;
};
