import { DigitizedValue, DigitizedValues } from "./digitizer";

export type StopFunction = (current?: DigitizedValue) => void;

export type WalkerResponse = any;
export type WalkerDirection = 'backwards' | 'forwards'

export type WalkerOptions = {
    direction?: WalkerDirection
}

export type WalkerFunction<T> = (subject: DigitizedValues | DigitizedValue, context: T) => WalkerResponse
export type WalkerChange<T> = { current: DigitizedValue, context: T, to: WalkerResponse }
export type WalkerChanges<T> = WalkerChange<T>[]
export type UseWalkerFunction<T> = (subject: DigitizedValue, context: T) => WalkerResponse

/**
 * Create a walker function that can be used with `walk()`. This utility
 * function adds some abstract logic to stop the walker at arbitrary times.
 */
export function useWalker<T = DigitizedValue>(fn: UseWalkerFunction<T>, stopFn?: StopWalkerFunction<T>) {
    let count = 0, changes: WalkerChanges<T> = [], isStopped: boolean = false;

    function ctx(context: T, count: number, changes: WalkerChanges<T>) {
        return Object.assign({ count, changes }, context) as T & StopWalkerContext<T>;
    }

    function handleResponse(current: DigitizedValue, context: T, to: WalkerResponse) {
        if (current !== to) {
            changes.push({ current, context, to })
        }

        if (stopFn && stopFn(current, ctx(context, count, changes), to)) {
            isStopped = true;
        }

        return to;
    }

    return (current: DigitizedValue, context: T) => {
        if (isStopped) {
            return current;
        }

        return handleResponse(current, context, fn(current, ctx(context, count, changes)));
    }
}

export type WalkFunction<T = unknown> = <D = DigitizedValues>(subject: DigitizedValues, fn: WalkerFunction<T>) => D

export type UseContextFunction<T> = (context: T, i: number) => T

export type ContextDefinition<T = unknown> = {
    context?: T
    useContext: UseContextFunction<T>
}

/**
 * Define a use context function that will pass the context to the child in the
 * walker. This function is used to cascade contexts down from the parent to the
 * child. Its assumed the context is a key/value pair, with the key being the
 * variable name, and the value is a matching array subject to the walker. * 
 */
export function defineContext<T = unknown>(context?: T): ContextDefinition<T> {
    const useContext: UseContextFunction<T> = (ctx: T, i: number) => {
        const child: Partial<T> = {};

        for (let key in ctx) {
            child[key] = ctx[key]?.[i];
        }

        return child as T;
    }

    return {
        context,
        useContext
    }
}


export type WalkerFactoryFunction<T> = (ctx?: ContextDefinition<T>, direction?: WalkerDirection) => WalkFunction<T>

/**
 * Create a walk function that can go in either direction. The walk function
 * can cascade contexts down from the parent to the children. The contexts are
 * assumed to be key/value pairs, with the key the name of the variable,
 * and the value a matching structure to the array being walked.
 */
export function createWalker<T>(): WalkFunction<T>
export function createWalker<T>(direction: WalkerDirection): WalkFunction<T>
export function createWalker<T>(ctx: ContextDefinition<T>): WalkFunction<T>
export function createWalker<T>(ctx: ContextDefinition<T>, direction: WalkerDirection): WalkFunction<T>
export function createWalker<T>(ctx?: ContextDefinition<T> | WalkerDirection, direction: WalkerDirection = 'forwards'): WalkFunction<T> {
    let $ctx: ContextDefinition<T> | undefined = undefined;
    let $direction: WalkerDirection = direction;

    if(typeof ctx === 'object') {
        $ctx = ctx;
    }
    else if(ctx) {
        $direction = ctx;
    }

    const forwards = $direction === 'forwards';
    const context = $ctx?.context || ({} as T);
    const useContext = $ctx?.useContext || ((ctx: T) => ctx);

    function walk<D>(subject: DigitizedValues, fn: WalkerFunction<T>): D {
        function recurse(subject: DigitizedValues | DigitizedValue, context?: T, i: number = 0) {
            if (Array.isArray(subject)) {
                subject = subject.slice();

                for (let i = forwards ? 0 : subject.length - 1; forwards ? i < subject.length : i >= 0; forwards ? i++ : i--) {
                    subject[i] = recurse(subject[i], useContext(context, i))
                }

                return fn(subject, useContext(context, i));
            }

            return fn(subject as DigitizedValue, useContext(context, i));
        }

        return recurse(subject, context);
    }

    return walk;
}

export type StopWalkerContext<T = unknown> = { count: number, changes: WalkerChanges<T> };
export type StopWalkerFunction<T = unknown> = (current: DigitizedValue, context: T & StopWalkerContext<T>, to: WalkerResponse) => boolean;

/**
 * Stop the walker after a certain number of changes.
 */
export function stopAfterChanges<T = unknown>(totalChanges?: number | undefined): StopWalkerFunction<T> {
    return (_, context) => {
        if (totalChanges === undefined) {
            return false;
        }

        return context.changes.length === totalChanges
    }
}