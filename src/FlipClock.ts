import Face from "./Face";
import { call, diff, language, prop } from "./functions";
import { aliases, dictionary } from "./languages/en-us";
import Timer from "./Timer";
import VNode from "./VNode";

language(aliases, dictionary);

/**
 * The FlipClock class starts, stops, resets, mounts, and unmounts the clock.
 * The clock also tracks the time and renders the clock with each interval.
 * 
 * @public
 */
export default class FlipClock {
    
    /**
     * The element the count is mounted.
     */
    public el: Element
    
    /**
     * The face used to display the clock.
     */
    public face: Face
    
    /**
     * The face value displayed on the clock.
     */
    public timer: Timer
    
    /**
     * Construct the FlipClock.
     * 
     * @param attributes - The options passed to the instance.
     */
    constructor(attributes: Partial<FlipClock> = {}) { 
        if(!attributes.face) {
            throw new Error('You must define a face property.');
        }
        
        this.face = attributes.face;
        this.face.on('render', () => this.render());
        this.timer = Timer.make(prop(attributes.timer, 1000));
        
        if(attributes.el) {
            this.mount(attributes.el);
        }
    }

    /**
     * Mount the clock instance to the DOM.
     * 
     * @param el - The DOM element used to mount the clock.
     * @returns The `FlipClock` instance.
     */
    mount(el?: Element): this {
        // If no element, then ignore this method call..     
        if(!el) {
            return this;   
        }

        this.face.beforeMount(this);
        this.el = el;
        this.render();
        this.face.mounted(this);

        if(this.face.autoStart && this.timer.isStopped) {
            window.requestAnimationFrame(() => this.start());
        }

        return this;
    }

    /**
     * Render the clock instance.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode {
        this.face.hook('beforeCreate', this);

        const vnode: VNode = this.face.render();

        this.face.hook('afterCreate', this, vnode);
        
        this.face.hook('beforeAnimation', this, vnode);

        setTimeout(() => {
            diff(vnode, this.el);

            setTimeout(() => {
                this.face.hook('afterRender', this, vnode);
            });
            
            setTimeout(() => {
                this.face.hook('afterAnimation', this, vnode);
            }, this.face.animationRate);
        });

        return vnode;
    }

    /**
     * Start the clock instance.
     *
     * @param fn - A function that is called after the clock starts.
     * @returns The `FlipClock` instance.
     */
    start(fn?: Function): this {
        const callback = () => {
            this.face.hook('interval', this, fn);

            call(fn);

            return callback;
        };

        this.timer.start(callback());
        this.face.hook('started', this);

        return this;
    }

    /**
     * Stop the clock instance.
     *
     * @param fn - A function that is called after the clock stops.
     * @returns The `FlipClock` instance.
     */
    stop(fn?: Function): this {
        this.timer.stop(fn);
        this.face.hook('stopped', this);

        return this;
    }

    /**
     * Toggle starting/stopping the clock instance.
     *
     * @param fn - A function that is called after the clock stops.
     * @returns The `FlipClock` instance.
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
     * 
     * @returns The `FlipClock` instance.
     */
    unmount(): this {
        this.face.hook('beforeUnmount', this);
        this.el.parentElement?.removeChild(this.el);
        this.face.resetWatchers();
        this.face.hook('unmounted', this);

        return this;
    }
}