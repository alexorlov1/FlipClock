import { FaceValue } from "./FaceValue";
import FlipClock from "./FlipClock";
import VNode from "./VNode";
import { Reactive } from "./helpers/state";

export interface FaceDefaultState {
    value: FaceValue|string|number|undefined
}

export type FaceHooks = {
    /**
     * The `beforeMount` hook.
     */
    beforeMount?: () => void;

    /**
     * The `afterMount` hook.
     */
    afterMount?: () => void;

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     */
    beforeCreate?: () => void;

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     */
    afterCreate?: (vnode: VNode) => void;

    /**
     * The `beforeUnmount` hook.
     */
    beforeUnmount?: () => void;

    /**
     * The `afterUnmount` hook.
     */
    afterUnmount?: () => void;

    /**
     * The `afterRender` hook.
     */
    afterRender?: (vnode: VNode) => void;

    /**
     * The `beforeAnimation` hook.
     */
    beforeAnimation?: (vnode: VNode) => void;

    /**
     * The `afterAnimation` hook.
     */
    afterAnimation?: (vnode: VNode) => void;

    /**
     * The `beforeStart` hook.
     */
    beforeStart?: () => void;

    /**
     * The `afterStart` hook.
     */
    afterStart?: () => void;

    /**
     * The `beforeStop` hook.
     */
    beforeStop?: () => void;

    /**
     * The `afterStop` hook.
     */
    afterStop?: () => void;
}

export function useFaceHooks(hooks: FaceHooks = {}) {
    return Object.assign({}, hooks);
}

export interface Face {

    /**
     * This method is called with every timer interval. The purpose of method is
     * to return a new value. Each time the value changes, the clock is be
     * re-rendered.
     */
    interval(instance: FlipClock): void;

    /**
     * This method delegates the clock rendering to the face. Since each face
     * is responsible for its own instantiation, there is no defined structure
     * to retreive the face's value. Its the role of the face to determine that.
     * To render the clock, pass the instance to the face and allow to call the
     * template render.
     */
    render(instance: FlipClock): VNode;

    /**
     * Get the reactive state for the face. Anytime the state changes, the face
     * will be re-rendered.
     */
    get state(): Reactive<object>
}

export type UseFaceFunction<T> = (props: T) => T
export type FaceFactoryFunction = (instance: FlipClock) => Face


// /**
//  * The Face is an abstract class that is base class for all other faces. The
//  * Face class provides the boilerplate functionality needed by the clock. Its
//  * the responsiblity of the child class to implement the rendering and
//  * functionality of the clock.
//  * 
//  * @public
//  */
// export default abstract class Face extends EventEmitter {

//     // /**
//     //  * The number of milliseconds it takes to animate one turn of the face.
//     //  */
//     // public animationRate: number = 500

//     /**
//      * Should the face automatically start on mount.
//      */
//     public autoStart: boolean = true
    
//     /**
//      * The previous reactive state.
//      */
//     protected prevState?: Attributes

//     /**
//      * The reactive state.
//      */
//     protected state: Attributes

//     /**
//      * A value used to compare against the current value that is used to
//      * determine if the clock should stop.
//      */
//     public stopAt: FaceValue|RawFaceValue|((instance: FlipClock) => boolean)

//     /**
//      * An array of watcher callback functions.
//      */
//     protected watchers: Function[] = []

//     /**
//      * Instantiate a Clock face with a given value and attributes.
//      */
//     constructor(attributes: Partial<Face> = {}) {
//         super();
        
//         // this.animationRate = prop(attributes.animationRate, this.animationRate);
//         this.autoStart = prop(attributes.autoStart, this.autoStart);
//         this.stopAt = attributes.stopAt;

//         this.state = ref(this.defineState());

//         this.value = attributes.value

//         this.prevState = ref(Object.assign(this.defineState(), {
//             value: this.state?.value
//         }))

//         this.watch(() => {    
//             this.emit('change')
//         });
//     }

//     /**
//      * Define the initial state of the clock. This allows us to watch for
//      * reactivity changes.
//      */
//     defineState(): FaceDefaultState {
//         return {
//             value: undefined
//         }
//     }

//     /**
//      * This method is called with every interval, or every time the clock
//      * should change, and handles the actual incrementing and decrementing the
//      * clock's `FaceValue`.
//      */
//     abstract interval(instance: FlipClock, fn?: Function): void;

//     /**
//      * Render the clock face.
//      */
//     abstract template(): VNode;

//     /**
//      * Get the face value.
//      */
//     get value(): FaceValue {
//         return this.state.value;
//     }

//     /**
//      * Set the face value.
//      */
//     set value(value: FaceValue) {
//         this.state.value = value;
//     }

//     /**
//      * Get the last face value.
//      */
//     get lastValue(): FaceValue|undefined {
//         return this.prevState?.value;
//     }

//     /**
//      * Get the default FaceValue using the instantiated value.
//      */
//     defaultValue(value: RawFaceValue, attributes: Partial<FaceValue> = {}): FaceValue {
//         return FaceValue.make(value, attributes);
//     }

//     /**
//      * Dispatch the event and call the method that corresponds to given hook.
//      */
//     hook(key: string, ...args): void {
//         if(key in this) {
//             this[key](...args);
//         }
        
//         this.emit(key, ...args);
//     }

//     /**
//      * Bind a watcher function to the state.
//      */
//     watch(fn: Function): Function {
//         const unwatch = this.state.watch(fn);

//         this.watchers.push(unwatch);

//         return unwatch;
//     }
    
//     /**
//      * Reset the watchers.
//      */
//     resetWatchers(): this {
//         for(const unwatch of this.watchers) {
//             unwatch();
//         }

//         this.watchers = [];
        
//         return this;
//     }

//     /**
//      * Determines if the clock should stop or not.
//      */
//     shouldStop(instance: FlipClock): boolean {
//         if(this.stopAt === undefined) {
//             return false;
//         }

//         if(typeof this.stopAt === 'function') {
//             return this.stopAt(instance)
//         }

//         if (!(this.stopAt instanceof FaceValue)) {
//             this.stopAt = FaceValue.make(this.stopAt);
//         }

//         return this.stopAt.compare(this.value);
//     }

//     /**
//      * The `beforeMount` hook.
//      */
//     beforeMount(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `afterMount` hook.
//      */
//     afterMount(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `beforeCreate` hook.
//      * 
//      * This is the hook to change the VNode before it hits the DOM.
//      */
//     beforeCreate(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `beforeCreate` hook.
//      * 
//      * This is the hook to change the VNode before it hits the DOM.
//      */
//     afterCreate(instance: FlipClock, vnode: VNode): void {
//         //
//     }

//     /**
//      * The `beforeUnmount` hook.
//      */
//     beforeUnmount(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `afterUnmount` hook.
//      */
//     afterUnmount(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `afterRender` hook.
//      */
//     afterRender(instance: FlipClock, vnode: VNode): void {
//         //
//     }

//     /**
//      * The `beforeAnimation` hook.
//      */
//     beforeAnimation(instance: FlipClock, vnode: VNode): void {
//         instance.el?.querySelectorAll('.animate').forEach(
//             el => el.classList.remove('animate')
//         );
//     }

//     /**
//      * The `afterAnimation` hook.
//      */
//     afterAnimation(instance: FlipClock, vnode: VNode): void {
//         if(this.shouldStop(instance)) {
//             instance.stop();
//         }
//     }

//     /**
//      * The `beforeStart` hook.
//      */
//     beforeStart(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `afterStart` hook.
//      */
//     afterStart(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `beforeStop` hook.
//      */
//     beforeStop(instance: FlipClock): void {
//         //
//     }

//     /**
//      * The `afterStop` hook.
//      */
//     afterStop(instance: FlipClock): void {
//         //
//     }
// }