export type FormatDateValue = number | string | Date;

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
  mode?:
    | "date"
    | "time"
    | "dateTime"
    | "fromNowDays"
    | "dateHoursMinutes"
    | "prettyDate"
    | "dd.mm.yyyy"
    | "dd/mm/yyyy"
    | "sessionDateTime";
  preset?: PresetKey;
}

type PresetKey =
  | "shortDateTime"
  | "shortDate"
  | "shortTime"
  | "sessionDateTime";

const presets: Record<PresetKey, Partial<FormatDateOptions>> = {
  shortDate: {
    mode: "date",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  },
  shortTime: {
    mode: "time",
    hour: "2-digit",
    minute: "2-digit",
  },
  shortDateTime: {
    mode: "dateTime",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  },
  sessionDateTime: {
    mode: "sessionDateTime",
  },
};

export const formatDate = (
  value: FormatDateValue,
  options: FormatDateOptions = {}
) => {
  let { preset, ...restOptions } = options;
  if (preset && preset in presets) {
    restOptions = {
      ...presets[preset],
      ...restOptions,
    };
  }

  const { locale = "en-US", mode = "dateTime", ...rest } = restOptions;
  const date = new Date(value);
  let result = "";

  if (isNaN(date.getTime())) return "";

  if (mode === "sessionDateTime") {
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  if (mode === "prettyDate") {
    const parts = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .split(" ");

    if (parts.length === 3) {
      return `${parts[0]} ${parts[1]}, ${parts[2]}`;
    }
    return date.toDateString();
  }

  if (mode === "dd.mm.yyyy") {
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
  } else if (mode === "dd/mm/yyyy") {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } else if (mode === "date") {
    result = date.toLocaleDateString(locale, rest);
  } else if (mode === "time") {
    result = date.toLocaleTimeString(locale, rest);
  } else if (mode === "dateTime") {
    result = date.toLocaleString(locale, rest);
  } else if (mode === "dateHoursMinutes") {
    result = date.toLocaleString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (mode === "fromNowDays") {
    const now = Date.now();
    const diffDays = (now - date.getTime()) / 1000 / 60 / 60 / 24;
    if (diffDays < 1) {
      return formatDate(date, { preset: "shortTime" });
    }
    if (diffDays > 1 && diffDays < 2) {
      //@ts-ignore
      return "day_ago";
    }
    if (diffDays > 2 && diffDays < 5) {
      //@ts-ignore
      return "days_ago";
    }
    if (diffDays > 5) {
      return formatDate(date, {
        mode: "date",
        day: "numeric",
        month: "short",
        locale: "en-US",
      });
    }
    //@ts-ignore
    return "day ago";
  }

  return result;
};
