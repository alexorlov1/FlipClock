import { FaceValue } from "./FaceValue";
import VNode from "./VNode";

/**
 * The theme template function.
 */
export type ThemeTemplateFunction = (value: FaceValue, lastValue?: FaceValue) => VNode;