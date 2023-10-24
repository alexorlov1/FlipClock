import { FaceValue } from "./FaceValue";
import { FlipClock } from "./FlipClock";

export interface FaceHooks {
    /**
     * The `afterCreate` hook.
     * 
     * After the clock has been created.
     */
    afterCreate?: (instance: FlipClock) => void;

    /**
     * The `beforeMount` hook.
     */
    beforeMount?: (instance: FlipClock) => void;

    /**
     * The `afterMount` hook.
     */
    afterMount?: (instance: FlipClock) => void;

    /**
     * The `beforeUnmount` hook.
     */
    beforeUnmount?: (instance: FlipClock) => void;

    /**
     * The `afterUnmount` hook.
     */
    afterUnmount?: (instance: FlipClock) => void;

    /**
     * The `beforeInterval` hook.
     */
    beforeInterval?: (instance: FlipClock) => void;

    /**
     * The `afterInterval` hook.
     */
    afterInterval?: (instance: FlipClock) => void;

    /**
     * The `beforeStart` hook.
     */
    beforeStart?: (instance: FlipClock) => void;

    /**
     * The `afterStart` hook.
     */
    afterStart?: (instance: FlipClock) => void;

    /**
     * The `beforeStop` hook.
     */
    beforeStop?: (instance: FlipClock) => void;

    /**
     * The `afterStop` hook.
     */
    afterStop?: (instance: FlipClock) => void;
}

export type FaceHookArgs<T extends keyof FaceHooks> = FaceHooks[T] extends (...args: infer A) => any ? A : never;

export interface Face extends FaceHooks {

    value: FaceValue<any>

    /**
     * This method is called with every timer interval. The purpose of method is
     * to return a new value. Each time the value changes, the clock is be
     * re-rendered.
     */
    interval(instance: FlipClock): void;
    
}