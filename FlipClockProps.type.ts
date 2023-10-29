type FlipClockProps<T extends Face<T>> = {
    autoStart?: boolean;
    face: T;
    theme?: Theme<T>;
    timer?: Timer | number;
    el?: Element | null;
};