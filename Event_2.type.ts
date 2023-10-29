declare type Event_2<T, K extends keyof T> = {
    key: keyof T;
    fn: EventEmitterCallback<T, K>;
    unwatch: Function;
};