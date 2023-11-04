import { createSignal } from './signal';

/**
 * @public
 */
export type Ref<T> = {
	value: T
}

/**
 * Create a ref.
 * 
 * @public
 */
export function ref<T>(value: T): Ref<T>
export function ref<T>(value?: T): Ref<T|undefined>
export function ref<T>(value: T): Ref<T|undefined> {
    const [ getValue, setValue ] = createSignal(value);

    return new Proxy({ value }, {
        get() {
            return getValue();
        },
        set(target, _, value: T) {
            target.value = value;

            setValue(value);

            return true;
        }
    });
}

/**
 * A computed getter.
 * 
 * @public
 */
export type ComputedGetter<T> = () => T;

/**
 * A computed getter and setter.
 * 
 * @public
 */
export type ComputedGetterSetter<T> = {
	get(): T,
	set(value: T): void
};

/**
 * A computed ref.
 * 
 * @public
 */
export type ComputedRef<T> = Readonly<Ref<T>>

/**
 * A writeable computed ref.
 * 
 * @public
 */
export type WriteableComputedRef<T> = Ref<T>

export function computed<T>(proxy: ComputedGetterSetter<T>): WriteableComputedRef<T>
export function computed<T>(fn: ComputedGetter<T>): ComputedRef<T>
export function computed<T>(fn: ComputedGetter<T> | ComputedGetterSetter<T>) {
    return typeof fn === 'function' ? {
        get value() {
            return fn();
        }
    } : {
        get value() {
            return fn.get();
        },
        set value(value) {
            fn.set(value);
        }
    };
}