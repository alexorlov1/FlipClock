interface FaceHooks<T extends Face<T>> {
    /**
     * The `afterCreate` hook.
     *
     * After the clock has been created.
     */
    afterCreate?: (instance: FlipClock<T>) => void;
    /**
     * The `beforeMount` hook.
     */
    beforeMount?: (instance: FlipClock<T>) => void;
    /**
     * The `afterMount` hook.
     */
    afterMount?: (instance: FlipClock<T>) => void;
    /**
     * The `beforeUnmount` hook.
     */
    beforeUnmount?: (instance: FlipClock<T>) => void;
    /**
     * The `afterUnmount` hook.
     */
    afterUnmount?: (instance: FlipClock<T>) => void;
    /**
     * The `beforeInterval` hook.
     */
    beforeInterval?: (instance: FlipClock<T>) => void;
    /**
     * The `afterInterval` hook.
     */
    afterInterval?: (instance: FlipClock<T>) => void;
    /**
     * The `beforeStart` hook.
     */
    beforeStart?: (instance: FlipClock<T>) => void;
    /**
     * The `afterStart` hook.
     */
    afterStart?: (instance: FlipClock<T>) => void;
    /**
     * The `beforeStop` hook.
     */
    beforeStop?: (instance: FlipClock<T>) => void;
    /**
     * The `afterStop` hook.
     */
    afterStop?: (instance: FlipClock<T>) => void;
}