interface Face<T extends Face<T> = any> extends FaceHooks<T> {
    /**
     * The face's value to display. When this value changes the clock will
     * automatically re-render.
     *
     * @public
     */
    value: FaceValue<any>;
    /**
     * This method is called with every timer interval. The purpose of method is
     * to return a new value. Each time the value changes, the clock is be
     * re-rendered.
     *
     * @public
     */
    interval(instance: FlipClock<T>): void;
}