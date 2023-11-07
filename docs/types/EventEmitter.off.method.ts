off<K extends keyof Required<T>>(key: K): void;
off<K extends keyof Required<T>>(key: K, fn: T[K]): void;