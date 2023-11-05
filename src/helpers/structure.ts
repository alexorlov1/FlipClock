import { type DigitizedValue, type DigitizedValues } from './digitizer';

/**
 * The options for matchArrayStructure().
 * 
 * @public
 */

export type MatchArrayStructureOptions = {
    backwards?: boolean
}

/**
 * The callback for matchArrayStructure().
 * 
 * @public
 */
export type MatchArrayStructureCallback = Callback<[value?: DigitizedValue, target?: DigitizedValue | DigitizedValues], DigitizedValue | undefined>

/**
 * Match the structure of the current value to the target.
 * 
 * @public
 */
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, fn?: MatchArrayStructureCallback): DigitizedValues
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, options: MatchArrayStructureOptions | undefined, fn?: MatchArrayStructureCallback): DigitizedValues
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, options?: MatchArrayStructureOptions | MatchArrayStructureCallback, fn?: MatchArrayStructureCallback): DigitizedValues {
    // Allow for the method overloading. If options is a function, assign it.
    if (typeof options === 'function') {
        fn = options;
        options = {};
    }
    else if (!options) {
        options = {};
    }
    
    const forwards = !options.backwards;
        
    function recurse(current: DigitizedValues | DigitizedValue | undefined, target: DigitizedValues | DigitizedValue): DigitizedValues | DigitizedValue | undefined {
        // If target is a digit group, then loop through them and recursively
        // iterate over the groups.
        if (isDigitizedGroup(target)) {
            // Cast the current value to a digitized group.
            current = castDigitizedGroup(current);

            // Loop through the current using the max length of target and
            // current. This recursively interates through the arrays
            // regardless of which is longer.
            const length = Math.max((target as DigitizedValues).length, current.length);
          
            for (let i = forwards ? 0 : length - 1; forwards ? i < length : i >= 0; forwards ? i++ : i--) {
                // If the current value doesn't exist, recurively match the
                // target array against an empty array to match the structure.
                // If the current value exists recursively match against target.
                const value = !current[i]
                    ? recurse([], target[i])
                    : recurse(current[i], target[i]);

                // This typescript could be improved. It is cast to `any`
                // because `DigitizedValues` doesn't accept `undefined`. We
                // should probably add a placeholder type to accept undefined
                // and recast to `DigitizedValues`. But this hack is fine for
                // now. The loop below removes the undefined so its still
                // guaranteed to be typesafe.
                if (current[i]) {
                    current[i] = value as any;
                }
                else {
                    current.push(value as any);
                }
            }
            
            // Remove the undefined items in the array. Use this instead of
            // filter to avoid copy the array.
            for (let i = 0; i < current.length; i++) {
                if (current[i] === undefined) {
                    current.splice(i, 1);
                }
            }
    
            return current;
        }

        // If the target is an array of digitized values, then recursively
        // force the current value to be an array of digitized values.
        if (Array.isArray(target) && !isDigitizedGroup(target)) {
            current = castDigitizedValues(current);

            // Loop over the existing digitized value to ensure the digits are
            // valid and gives the walker a chance to touch it. The walker will
            // touch the existing digits before adding new ones or removing
            // excess digits.
            let i = 0;

            while (i < current.length) {
                const currentIndex = forwards ? i : current.length - 1 - i;
                const targetIndex = forwards ? i : target.length - 1 - i;

                // Again we type `any` to because we remove undefined below.
                current[currentIndex] = recurse(
                    current[currentIndex], target[targetIndex]
                ) as any;

                if (current[currentIndex] === undefined) {
                    current.splice(currentIndex, 1);
                }
                else {
                    i++;
                }
            }
                        
            // If the current length is less than the target length, recursively
            // loop through it an add the digits. If a walker is used, it can
            // incrementall add the values.
            for (let i = forwards ? current.length : target.length - 1; forwards ? i < target.length : i >= current.length; forwards ? i++ : i--) {
                const response = recurse(undefined, target[i]);

                // If the response gets undefined, just break the array and
                // assume the manipulation has finished.
                if (response === undefined) {
                    break;
                }

                // If we are still here, the push the response 
                current.push(response);
            }
            
            return current;
        }
        
        // If the callback is defined, use it to walk through the digits. The
        // walker can modify the digits. If used with `useWalker()` you can
        // limit the total changes that can be made to the structure. This
        // is useful for incrementing/decrementing the sequence X changes at a
        // time.
        return fn
            ? fn(castDigitizedString(current), target)
            : (target === undefined ? undefined : castDigitizedString(current)); 
    }

    // Recursively match the current and target array structures.
    return recurse(current, target) as DigitizedValues;
}


/**
 * Cast a value to a string.
 */
export function castDigitizedString(value?: DigitizedValue | DigitizedValues): DigitizedValue | undefined {
    if (Array.isArray(value)) {
        return castDigitizedString(value[0]);
    }

    return value;
}

/**
 * Cast a value to an array of strings.
 */
export function castDigitizedValues(value?: DigitizedValue | DigitizedValues): DigitizedValue[] {
    if (isDigitizedGroup(value)) {
        return (value as DigitizedValue[]).flat(Infinity);
    }

    if (Array.isArray(value)) {
        return value as DigitizedValue[];
    }
    
    if (value === undefined) {
        return [];
    }

    return [value];
}

/**
 * Cast a value to a array of digitized arrays.
 */
export function castDigitizedGroup(value?: DigitizedValue | DigitizedValues): DigitizedValues {
    if (isDigitizedGroup(value)) {
        return value as DigitizedValues;
    }

    if (Array.isArray(value)) {
        return [value];
    }

    if (value === undefined) {
        return [[]];
    }

    return [[value]];
}

/**
 * Determines if the value is an array of digitized strings.
 */
export function isDigitizedValues(value: DigitizedValue | DigitizedValues): boolean {
    return Array.isArray(value) && !isDigitizedGroup(value);
}   

/**
 * Determines if the value is a digitized group, which is an array of digitized
 * values.
 */
export function isDigitizedGroup(value: DigitizedValues | DigitizedValue | undefined) {
    if (!Array.isArray(value) || !value.length) {
        return false;
    }

    for (const i in value) {
        if (Array.isArray(value[i])) {
            return true;
        }
    }

    return false;
}

/**
 * Counts the digits recursively.
 * 
 * @public 
 */
export function count(values: DigitizedValues) {
    function recurse(values: DigitizedValues, count: number = 0) {
        for (const value of values) {
            if (Array.isArray(value)) {
                count += recurse(value, count);
            }
            else {
                count += value.length;
            }
        }

        return count;
    }

    return recurse(values);
}


export type Callback<P extends CallbackParams<any[]>, R = undefined> = (...args: P) => R;

export type CallbackParams<T> = T extends any[] ? T : never; 

export type Change<R> = {
    from: R,
    to: R
}

export type Stop = Readonly<{
    stop: true
}>

export function stop(): Stop {
    return { stop: true };
}

export type TrackChangesCallback<P extends any[], R, C = P[0]|undefined> = (changes: Change<C>[], ...args: P) => R | Stop;

/**
 * Create a callback with the values that can be tracked.
 */
export function trackChanges<P extends any[], R>(fn: TrackChangesCallback<P, R>): Callback<P, R> {
    const changes: Change<R>[] = [];

    return (...args: P) => {
        const [ value ] = args;
        
        let originalValue = typeof value === 'object' || Array.isArray(value)
            ? JSON.stringify(value)
            : value;

        const stopOrValue = fn(changes, ...args);

        if (stopOrValue
            && typeof stopOrValue === 'object'
            && 'stop' in stopOrValue
            && stopOrValue.stop === true) {
            return value;
        }

        const response: R = stopOrValue as R;

        let newValue = typeof response === 'object' || Array.isArray(response)
            ? JSON.stringify(response)
            : response;

        if (originalValue !== newValue) {
            changes.push({
                from: value,
                to: response
            });
        }

        return response as R;
    };
}

export type StopPredicateFunction<P extends CallbackParams<any[]> = any[]> = TrackChangesCallback<P, boolean>;

/**
 * Stop the walker using a predicate function. Return `false` to stop and `true`
 * to continue. The predicate is ran before the callback function.
 */
export function stopWhen<P extends CallbackParams<any[]>, R>(predicate: StopPredicateFunction<P>, fn: Callback<P, R>) {
    return trackChanges<P, R>((changes, ...args: P) => {
        if (!predicate(changes, ...args)) {
            return stop();
        }
        
        return fn(...args);
    });
}

/**
 * Stop the walker after X number of changes.
 */
export function stopAfterChanges<P extends CallbackParams<any[]>, R>(totalChanges: number, fn: Callback<P, R>) {
    return stopWhen<P, R>((changes, ..._: P) => {
        return changes.length < totalChanges;
    }, fn);
}