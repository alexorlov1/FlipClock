import { FaceHooks, FaceState } from "./Face";
import FlipClock from "./FlipClock";
import VNode from "./VNode";
import { DigitizedValue, DigitizedValues } from "./helpers/digitizer";

export type ThemeRenderFunction<T = FaceState> = (instance: FlipClock, context: T) => VNode

export type Theme = {
    render: ThemeRenderFunction
} & FaceHooks

export type ThemeContext = {
    currentValue: DigitizedValues | DigitizedValue,
    lastValue?: DigitizedValues | DigitizedValue | undefined,
    targetValue?: DigitizedValues | DigitizedValue | undefined
}