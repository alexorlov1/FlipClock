import { FaceValue } from "./FaceValue";
import FlipClock from "./FlipClock";
import VNode from "./VNode";
import { Reactive } from "./helpers/state";

export type FaceState = {
    currentValue: FaceValue,
    lastValue?: FaceValue | undefined,
    targetValue?: FaceValue | undefined
}

export type FaceHooks = {
    /**
     * The `beforeMount` hook.
     */
    beforeMount?: (instance: FlipClock) => void;

    /**
     * The `afterMount` hook.
     */
    afterMount?: (instance: FlipClock) => void;

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     */
    beforeCreate?: (instance: FlipClock) => void;

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     */
    afterCreate?: (instance: FlipClock, vnode: VNode) => void;

    /**
     * The `beforeUnmount` hook.
     */
    beforeUnmount?: (instance: FlipClock) => void;

    /**
     * The `afterUnmount` hook.
     */
    afterUnmount?: (instance: FlipClock) => void;

    /**
     * The `afterRender` hook.
     */
    afterRender?: (instance: FlipClock, vnode: VNode) => void;

    /**
     * The `beforeAnimation` hook.
     */
    beforeAnimation?: (instance: FlipClock, vnode: VNode) => void;

    /**
     * The `afterAnimation` hook.
     */
    afterAnimation?: (instance: FlipClock, vnode: VNode) => void;

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

export function useFaceHooks(hooks: FaceHooks = {}) {
    return Object.assign({}, hooks);
}

export interface Face<T extends FaceState = FaceState> {

    /**
     * This method is called with every timer interval. The purpose of method is
     * to return a new value. Each time the value changes, the clock is be
     * re-rendered.
     */
    interval(instance: FlipClock): void;

    /**
     * This method delegates the clock rendering to the face. Since each face
     * is responsible for its own instantiation. The face will then defer that
     * to the theme. This provides the face a chance to intercept before the
     * theme starts to render.
     */
    render(instance: FlipClock): VNode;

    /**
     * Get the reactive state for the face. Anytime the state changes, the face
     * will be re-rendered.
     */
    get state(): Reactive<T>
}

export type UseFaceFunction<T> = (props: T) => T