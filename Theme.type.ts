type Theme<T extends Face<T>> = {
    render: (instance: FlipClock<T>) => void;
} & FaceHooks<T>;