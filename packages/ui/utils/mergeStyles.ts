import { merge } from "lodash";
import { StyleMap } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeStyles = <T extends StyleMap = StyleMap<any>>(
  ...styles: Array<T>
): T => {
  return merge(...styles) as T;
};
