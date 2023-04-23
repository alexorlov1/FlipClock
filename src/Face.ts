import Dictionary from "./Dictionary";
import EventEmitter from "./EventEmitter";
import FaceValue from "./FaceValue";
import FlipClock from "./FlipClock";
import { language, prop, ref } from "./functions";
import Attributes from "./types/Attributes";
import VNode from "./VNode";

/**
 * The Face is an abstract class that is base class for all other faces. The
 * Face class provides the boilerplate functionality needed by the clock. Its
 * the responsiblity of the child class to implement the rendering and
 * functionality of the clock.
 * 
 * @public
 */
export default abstract class Face extends EventEmitter {

    /**
     * The number of milliseconds it takes to animate one turn of the face.
     */
    public animationRate: number = 500

    /**
     * Should the face automatically start on mount.
     */
    public autoStart: boolean = true

    /**
     * The dictionary used to translate strings.
     * 
     * @readonly
     */
    protected readonly dictionary: Dictionary;
    
    /**
     * The language of the dictionary.
     * 
     * @readonly
     */
    public readonly language: string

    /**
     * The previous reactive state.
     */
    protected prevState?: Attributes

    /**
     * The reactive state.
     */
    protected state: Attributes

    /**
     * A value used to compare against the current value that is used to
     * determine if the clock should stop.
     */
    public stopAt: FaceValue|string|number|((instance: FlipClock) => boolean)

    /**
     * An array of watcher callback functions.
     */
    protected watchers: Function[] = []

    /**
     * Instantiate a Clock face with a given value and attributes.
     * 
     * @param attributes - The options passed to the instance.
     */
    constructor(attributes: Partial<Face> = {}) {
        super();
        
        this.animationRate = prop(attributes.animationRate, this.animationRate);
        this.autoStart = prop(attributes.autoStart, this.autoStart);
        this.stopAt = attributes.stopAt;

        this.dictionary = language(
            this.language = attributes.language || 'en-us'
        );

        this.state = ref({
            value: this.defaultValue(attributes.value)
        });
        
        this.watch(() => this.emit('render'));
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     *
     * @param instance - The FlipClock instance.
     * @param fn - A callback that runs with each interval.
     */
    abstract interval(instance: FlipClock, fn?: Function): void;

    /**
     * Render the clock face.
     * 
     * @returns The face's VNode.
     */
    abstract render(): VNode;

    /**
     * Get the face value.
     */
    get value(): FaceValue {
        return this.state.value;
    }
    /**
     * Set the face value.
     */
    set value(value: any) {
        this.prevState = {
            value: this.state.value
        }

        this.state.value = FaceValue.make(value);
    }

    /**
     * Get the last face value.
     * 
     * @returns A FaceValue instance.
     */
    get lastValue(): FaceValue|undefined {
        return this.prevState?.value;
    }

    /**
     * Get the default FaceValue using the instantiated value.
     * 
     * @param value - The value passed from instantiation.
     * @returns A FaceValue instance.
     */
    defaultValue(value: any): FaceValue {
        return FaceValue.make(value);
    }

    /**
     * Dispatch the event and call the method that correspond to given hook.
     * 
     * @param key - The name of the hook being dispatched.
     * @param args - The arguments passed to the callbacks. 
     */
    hook(key: string, ...args): void {
        this[key](...args);
        this.emit(key, ...args);
    }

    /**
     * Bind a watcher function to the state.
     * 
     * @param fn - The watcher callback function.
     * @returns A function to unwatch the callback.
     */
    watch(fn: Function): Function {
        const unwatch = this.state.watch(fn);

        this.watchers.push(unwatch);

        return unwatch;
    }
    
    /**
     * Reset the watchers.
     * 
     * @returns The `Face` instance.
     */
    resetWatchers(): this {
        for(const unwatch of this.watchers) {
            unwatch();
        }

        this.watchers = [];
        
        return this;
    }

    shouldStop(instance: FlipClock): boolean {
        if(this.stopAt === undefined) {
            return false;
        }

        if(typeof this.stopAt === 'function') {
            return this.stopAt(instance)
        }

        return FaceValue.make(this.stopAt).compare(this.value);
    }

    /**
     * Run before the animation.
     * 
     * @param instance - The FlipClock instance.
     */
    beforeMount(instance: FlipClock): void {
        //
    }

    /**
     * The `mounted` hook.
     * 
     * @param instance - The FlipClock instance.
     */
    mounted(instance: FlipClock): void {
        //
    }

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     * 
     * @param instance - The FlipClock instance.
     */
    beforeCreate(instance: FlipClock): void {
        //
    }

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     * 
     * @param instance - The FlipClock instance.
     * @param vnode - The VNode instance.
     */
    afterCreate(instance: FlipClock, vnode: VNode): void {
        //
    }

    /**
     * The `beforeUnmount` hook.
     * 
     * @param instance - The FlipClock instance.
     * @param vnode - The VNode instance.
     */
    beforeUnmount(instance: FlipClock): void {
        //
    }

    /**
     * The `unmounted` hook.
     * 
     * @param instance - The FlipClock instance.
     */
    unmounted(instance: FlipClock): void {
        //
    }

    /**
     * The `afterRender` hook.
     * 
     * @param instance - The FlipClock instance.
     * @param vnode - The VNode instance.
     */
    afterRender(instance: FlipClock, vnode: VNode): void {
        //
    }

    /**
     * The `beforeAnimation` hook.
     * 
     * @param instance - The FlipClock instance.
     * @param vnode - The VNode instance.
     */
    beforeAnimation(instance: FlipClock, vnode: VNode): void {
        instance.el.querySelectorAll('.animate').forEach(
            el => el.classList.remove('animate')
        );
    }

    /**
     * The `afterAnimation` hook.
     * 
     * @param instance - The FlipClock instance.
     * @param vnode - The VNode instance.
     */
    afterAnimation(instance: FlipClock, vnode: VNode): void {
        if(this.shouldStop(instance)) {
            instance.stop();
        }
    }

    /**
     * The `started` hook.
     * 
     * @param instance - The FlipClock instance.
     */
    started(instance: FlipClock): void {
        //
    }

    /**
     * The `stopped` hook.
     * 
     * @param instance - The FlipClock instance.
     */
    stopped(instance: FlipClock): void {
        //
    }
}