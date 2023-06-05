import EventEmitter from "./EventEmitter";
import { Face } from "./Face";
import Timer from "./Timer";
import VNode from "./VNode";
import { diff } from "./helpers/dom";
import call from "./helpers/functions";
import { createEffect } from "./helpers/signal";
import { Reactive, useState } from "./helpers/state";
import { Theme, ThemeRenderFunction } from "./types";

export type FlipClockProps = {
    face: Face
    theme: Theme
    timer?: Timer | number
} & Partial<Pick<FlipClock, 'el' | 'autoStart' | 'emitter'>>;

/**
 * The FlipClock class starts, stops, resets, mounts, and unmounts the clock.
 * The clock also tracks the time and renders the clock with each interval.
 * 
 * @public
 */
export default class FlipClock {
    
    /**
     * Determines if the clock should automatically start when it is mounted.
     */
    public readonly autoStart: boolean = true

    /**
     * The element the count is mounted.
     */
    public el?: Element

    /**
     * The event emitter.
     */
    public readonly emitter: EventEmitter

    /**
     * The face used to display the clock.
     */
    public readonly state: Reactive<{face: Face}>

    /**
     * The face used to display the clock.
     */
    public readonly theme: { render: ThemeRenderFunction }
    
    /**
     * The face value displayed on the clock.
     */
    public readonly timer: Timer

    /**
     * The current VNode.
     */
    protected $node?: VNode;
    
    /**
     * Construct the FlipClock.
     */
    constructor(props: FlipClockProps) {
        this.state = useState({
            face: props.face
        })

        this.el = props.el
        this.theme = props.theme;
        this.emitter = props.emitter || new EventEmitter();
        
        this.autoStart = props.autoStart === undefined
            ? this.autoStart
            : props.autoStart;
            
        this.timer = props.timer instanceof Timer
            ? props.timer
            : new Timer(props.timer);
        
        if(this.el) {
            this.mount(this.el);
        }
    }

    get animationRate() {
        return parseInt(getComputedStyle(this.el)?.animationDuration.replace(/s$/, '')) * 1000;
    }

    get face() {
        return this.state.face;
    }

    set face(face: Face) {
        this.state.face = face;

        createEffect(() => this.render());
    }

    get node(): VNode | undefined {
        return this.$node;
    }

    /**
     * Mount the clock instance to the DOM.
     */
    mount(el: Element) {
        this.hook('beforeMount');

        this.el = el;

        this.render();
        
        this.hook('afterMount');

        if(this.autoStart && this.timer.isStopped) {
            window.requestAnimationFrame(() => this.start());
        }

        return this;
    }

    /**
     * Render the clock instance.
     */
    render() {
        this.hook('beforeRender');

        let prevNode: VNode = this.$node;

        this.$node = this.face.render(this);

        diff(this.el, this.$node, prevNode);

        this.hook('afterRender', this.$node);

        return this.$node;
    }

    /**
     * Start the clock instance.
     */
    start(fn?: Function): this {
        this.hook('beforeStart');

        this.timer.start(() => {
            requestAnimationFrame(() => {
                this.hook('interval');
                this.render();
            
                call(fn);      
            });      
        });

        this.hook('afterStarted');

        return this;
    }

    /**
     * Stop the clock instance.
     */
    stop(fn?: Function): this {
        this.hook('beforeStop');
        
        this.timer.stop((...args) => {
            call(fn, ...args);

            this.hook('afterStop', ...args)
        });

        return this;
    }

    /**
     * Toggle starting/stopping the clock instance.
     */
    toggle(fn?: Function): this {
        if(this.timer.isStopped) {
            this.start(fn);
        }
        else {
            this.stop(fn);
        }
        
        return this;
    }

    /**
     * Unmount the clock instance from the DOM.
     */
    unmount(): this {
        this.hook('beforeUnmount');

        this.el.parentElement?.removeChild(this.el);

        this.hook('afterUnmount');

        return this;
    }

    /**
     * Dispatch the event and call the method that corresponds to given hook.
     */
    protected hook(key: string, ...args): void {
        if(key in this.face) {
            this.face[key](this, ...args);
        }
        
        if(key in this.theme) {
            this.theme[key](this, ...args);
        }

        this.emitter.emit(key, this, ...args);
    }
}