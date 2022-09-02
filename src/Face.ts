import Dictionary from "./Dictionary";
import EventEmitter from "./EventEmitter";
import FaceValue from "./FaceValue";
import FlipClock from "./FlipClock";
import { language, prop, ref } from "./functions";
import Attributes from "./types/Attributes";
import VNode from "./VNode";

export default abstract class Face extends EventEmitter {

    /**
     * The dictionary used to translate strings.
     * 
     * @var {Dictionary}
     */
    public dictionary: Dictionary;
    
    /**
     *The language used to translate strings.
     * 
     * @var {string}
     */
    public language: string

    /**
     * The number of milliseconds it takes to animate one turn of the face.
     * 
     * @var {number}
     */
    public animationRate: number

    /**
     * Should the face automatically start on mount.
     * 
     * @var {number}
     */
    public autoStart: boolean

    /**
     * The previous reactive state.
     * 
     * @var {Attributes}
     */
    public prevState?: Attributes

    /**
     * The reactive state.
     * 
     * @var {Attributes}
     */
    public state: Attributes

    /**
     * An array of watcher callback functions.
     * 
     * @var {Function[]}
     */
    protected watchers: Function[] = []

    /**
     * Instantiate a Clock face with a given value and attributes.
     * 
     * @param {Attributes} attributes
     */
    constructor(
        attributes: Partial<Face> = {}
    ) {
        super();

        this.animationRate = prop(attributes.animationRate, 500) ;
        this.autoStart = prop(attributes.autoStart, true);
        this.language = attributes.language || 'en-us';
        this.dictionary = language(this.language);

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
     * @param  {FlipClock} instance
     * @param  {Function} fn
     * @return {this}
     */
    abstract interval(instance: FlipClock, fn?: Function): void;

    /**
     * Render the clock face.
     * 
     * @return {VNode}
     */
    abstract render(): VNode;

    /**
     * Get the face value.
     * 
     * @return {any}
     */
    get value(): any {
        return this.state.value;
    }

    /**
     * Set the face value.
     * 
     * @param {any} value
     * @return {void}
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
     * @return {FaceValue}
     */
    get lastValue(): FaceValue|undefined {
        return this.prevState?.value;
    }

    /**
     * Get the default value if no value is passed.
     * 
     * @param {any} value
     * @returns {FaceValue}
     */
    defaultValue(value: any): FaceValue {
        return value instanceof FaceValue ? value : new FaceValue(value);
    }

    /**
     * Dispatch the event and call the method that correspond to given hook.
     * 
     * @param {string} key 
     * @param {...args} args 
     */
    hook(key: string, ...args) {
        this[key](...args);
        this.emit(key, ...args);
    }

    /**
     * Bind a watcher function to the state.
     * 
     * @param {Function} fn
     * @return {Function}
     */
    watch(fn: Function): Function {
        const unwatch = this.state.watch(fn);

        this.watchers.push(unwatch);

        return unwatch;
    }
    
    /**
     * Reset the watchers.
     * 
     * @returns {this}
     */
    resetWatchers(): this {
        for(const unwatch of this.watchers) {
            unwatch();
        }

        this.watchers = [];
        
        return this;
    }

    /**
     * Run before the animation.
     * 
     * @param {FlipClock} instance
     * @return {void}
     */
    beforeMount(instance: FlipClock): void {
        //
    }

    /**
     * The `mounted` hook.
     * 
     * @param {FlipClock} instance
     * @return {void}
     */
    mounted(instance: FlipClock): void {
        //
    }

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     * 
     * @param {FlipClock} instance
     */
    beforeCreate(instance: FlipClock): void {
        //
    }

    /**
     * The `beforeCreate` hook.
     * 
     * This is the hook to change the VNode before it hits the DOM.
     * 
     * @param {FlipClock} instance
     * @param {VNode} vnode
     */
    afterCreate(instance: FlipClock, vnode: VNode): void {
        //
    }

    /**
     * The `beforeUnmount` hook.
     * 
     * @param {FlipClock} instance
     * @return {void}
     */
    beforeUnmount(instance: FlipClock): void {
        //
    }

    /**
     * The `unmounted` hook.
     * 
     * @param {FlipClock} instance
     * @return {void}
     */
    unmounted(instance: FlipClock): void {
        //
    }

    /**
     * The `afterRender` hook.
     * 
     * @param {FlipClock} instance
     * @param {VNode} vnode
     * @return {void}
     */
    afterRender(instance: FlipClock, vnode: VNode): void {
        //
    }

    /**
     * The `beforeAnimation` hook.
     * 
     * @param {FlipClock} instance
     * @param {VNode} vnode
     * @return {void}
     */
    beforeAnimation(instance: FlipClock, vnode: VNode): void {
        instance.el.querySelectorAll('.animate').forEach(
            el => el.classList.remove('animate')
        );
    }

    /**
     * The `afterAnimation` hook.
     * 
     * @param {FlipClock} instance
     * @param {VNode} vnode
     * @return {void}
     */
    afterAnimation(instance: FlipClock, vnode: VNode): void {
        //
    }

    /**
     * The `started` hook.
     * 
     * @param {FlipClock} instance
     * @return {void}
     */
    started(instance: FlipClock): void {
        //
    }

    /**
     * The `stopped` hook.
     * 
     * @param {FlipClock} instance
     * @return {void}
     */
    stopped(instance: FlipClock): void {
        //
    }
}