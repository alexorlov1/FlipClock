import { Face } from "./Face";
import Timer from "./Timer";
import { call } from "./functions";
import { diff } from "./helpers/dom";
import { Reactive, useState } from "./helpers/state";
import { FlipClockThemeOptions, useTheme } from "./themes/flipclock";
import { ThemeTemplateFunction } from "./types";

export type FlipClockProps = {
    face: Face,
    theme?: ThemeTemplateFunction | FlipClockThemeOptions
} & Pick<FlipClock, 'el' | 'timer'>;

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
    public autoStart: boolean = false

    /**
     * The element the count is mounted.
     */
    public el?: Element

    /**
     * The face used to display the clock.
     */
    public state: Reactive<{face: Face}>

    /**
     * The face used to display the clock.
     */
    public theme: ThemeTemplateFunction
    
    /**
     * The face value displayed on the clock.
     */
    public timer?: Timer
    
    /**
     * Construct the FlipClock.
     */
    constructor(props: FlipClockProps) {
        this.state = useState({
            face: props.face
        })

        this.el = props.el
        
        this.theme = typeof props.theme === 'function'
            ? props.theme
            : useTheme(props.theme);
            
        this.timer = props.timer || new Timer(1000);
        
        if(this.el) {
            this.mount(this.el);
        }
    }

    get face() {
        return this.state.face;
    }

    set face(face: Face) {
        face.state.watch(() => this.render());

        this.state.face = face;
        this.render();
    }

    /**
     * Mount the clock instance to the DOM.
     */
    mount(el: Element) {
        // // If no element, then ignore this method call..     
        // if(!el) {
        //     return this;   
        // }

        // // this.face.hook('beforeMount', this);

        this.el = el;
        this.render();
        
        // this.face.hook('afterMount', this);

        if(this.autoStart && this.timer.isStopped) {
            window.requestAnimationFrame(() => this.start());
        }

        return this;
    }

    /**
     * Render the clock instance.
     */
    render() {
        // this.face.hook('beforeCreate', this);

        const vnode = this.face.render(this);
        
        diff(this.el, vnode);
        

        // this.face.hook('afterCreate', this, vnode);
        
        // this.face.hook('beforeAnimation', this, vnode);

        // setTimeout(() => {
        //     diff(vnode, this.el);

        //     setTimeout(() => {
        //         this.face.hook('afterRender', this, vnode);
        //     });
            
        //     setTimeout(() => {
        //         this.face.hook('afterAnimation', this, vnode);
        //     }, this.face.animationRate);
        // });

        // return vnode;
    }

    /**
     * Start the clock instance.
     */
    start(fn?: Function): this {
        // const callback = () => {
        //     this.face.hook('interval', this);
            
        //     call(fn);

        //     return callback;
        // };

        // this.face.hook('beforeStart', this);



        this.timer.start(() => {
            this.hook('interval', this);
            this.render();
            
            call(fn);            
        });

        // this.face.hook('afterStarted', this);

        return this;
    }

    /**
     * Stop the clock instance.
     */
    stop(fn?: Function): this {
        // this.face.hook('beforeStop', this);
        // this.timer.stop(fn);
        // this.face.hook('afterStop', this);

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
        // this.face.hook('beforeUnmount', this);
        // this.el.parentElement?.removeChild(this.el);
        // this.face.resetWatchers();
        // this.face.hook('afterUnmount', this);

        return this;
    }

    /**
     * Dispatch the event and call the method that corresponds to given hook.
     */
    protected hook(key: string, ...args): void {
        if(key in this.face) {
            this.face[key](...args);
        }
        
        // this.emit(key, ...args);
    }
}