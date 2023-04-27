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
     */
    constructor(attributes: Partial<FlipClock> = {}) { 
        if(!attributes.face) {
            throw new Error('You must define a face property.');
        }
        
        this.face = attributes.face;
        this.face.on('change', () => this.render());
        
        this.timer = Timer.make(prop(attributes.timer, 1000));
        
        if(attributes.el) {
            this.mount(attributes.el);
        }
    }

    /**
     * Mount the clock instance to the DOM.
     */
    mount(el?: Element): this {
        // If no element, then ignore this method call..     
        if(!el) {
            return this;   
        }

        this.face.hook('beforeMount', this);
        this.el = el;
        this.render();
        this.face.hook('afterMount', this);

        if(this.face.autoStart && this.timer.isStopped) {
            window.requestAnimationFrame(() => this.start());
        }

        return this;
    }

    /**
     * Render the clock instance.
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
     */
    start(fn?: Function): this {
        const callback = () => {
            this.face.hook('interval', this);
            
            call(fn);

            return callback;
        };

        this.face.hook('beforeStart', this);
        this.timer.start(callback());
        this.face.hook('afterStarted', this);

        return this;
    }

    /**
     * Stop the clock instance.
     */
    stop(fn?: Function): this {
        this.face.hook('beforeStop', this);
        this.timer.stop(fn);
        this.face.hook('afterStop', this);

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
        this.face.hook('beforeUnmount', this);
        this.el.parentElement?.removeChild(this.el);
        this.face.resetWatchers();
        this.face.hook('afterUnmount', this);

        return this;
    }
}