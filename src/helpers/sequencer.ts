import { FaceValue } from "../FaceValue";
import { CharsetContext, CharsetOptions, useCharset } from "./charset";
import { DigitizedValue, DigitizedValues } from "./digitizer";
import { StopWalkerFunction, WalkerDirection, WalkerFunction, WalkerOptions, stopAfterChanges, useWalker } from "./walker";

/**
 * Cast a value to a string.
 */
export function castDigitizedString(value: SequenceValue): DigitizedValue {
    if (Array.isArray(value)) {
        return castDigitizedString(value[0]);
    }

    return value;
}

/**
 * Cast a value to an array of strings.
 */
export function castDigitizedValues(value: SequenceValue): DigitizedValue[] {
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
export function castDigitizedGroup(value: SequenceValue): DigitizedValues {
    if (isDigitizedGroup(value)) {
        return value as DigitizedValues;
    }

    if(Array.isArray(value)) {
        return [value];
    }

    if (value === undefined) {
        return [[]]
    }

    return [[value]];
}

/**
 * Determines if the value is an array of digitized strings.
 */
export function isDigitizedValues(value: SequenceValue) {
    return Array.isArray(value) && !isDigitizedGroup(value);
}   

/**
 * Determines if the value is a digitized group, which is an array of digitized
 * values.
 */
export function isDigitizedGroup(value: DigitizedValues | DigitizedValue) {
    if (!Array.isArray(value) || !value.length) {
        return false;
    }

    for(const i in value) {
        if(Array.isArray(value[i])) {
            return true;
        }
    }

    return false
}

/**
 * This method will match the structure of the current array against the target.
 * This method will not match the length of the DigitizedValue[] arrays, but
 * match lengths for groups. To ensure all structures have the same length, 
 * run matchStructureLength() after this method.
 *
 */

type MatchArrayWalkerContext = {
    target: DigitizedValue
}

export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, fn?: WalkerFunction<MatchArrayWalkerContext>): DigitizedValues
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, options: WalkerOptions, fn?: WalkerFunction<MatchArrayWalkerContext>): DigitizedValues
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, options: WalkerOptions | WalkerFunction<MatchArrayWalkerContext>, fn?: WalkerFunction<MatchArrayWalkerContext>): DigitizedValues {
    // Allow for the method overloading. If options is a function, assign it.
    if(typeof options === 'function') {
        fn = options;
        options = {};
    }
    else if(!options) {
        options = {};
    }
    
    // 'forwards' will walk through the array left to right. 'backwards' will
    // walk through the array right to left.
    const direction: WalkerDirection = options.direction || 'forwards';

    // Is the direction 'forwards'. Used to make ternary's shorter.
    const forwards = direction === 'forwards';
        
    function recurse(current: DigitizedValues | DigitizedValue, target: DigitizedValues | DigitizedValue): DigitizedValues | DigitizedValue{
        // If target is a digit group, then loop through them and recursively
        // iterate over the groups.
        if(isDigitizedGroup(target)) {
            // Cast the current value to a digitized group.
            current = castDigitizedGroup(current);
            
            // Loop through the target array. We could implement this backwards
            // if it becomes necessary. No reason it has to go forwards...            
            for (let i = forwards ? 0 : target.length - 1; forwards ? i < target.length : i >= 0; forwards ? i++ : i--) {
                // If the current value doesn't exist, recurively match the
                // target array against an empty array to match the structure.
                // If the current value exists recursively match against target.
                current[i] = !current[i]
                    ? recurse([], target[i])
                    : recurse(current[i], target[i]);
            }
            
            // Remove the undefined items in the array. Use this instead of
            // filter to avoid copy the array.
            for(let i = 0; i < current.length; i++) {
                if(current[i] === undefined) {
                    current.splice(i, 1);
                }
            }
    
            return current;
        }

        // If the target is an array of digitized values, then recursively
        // force the current value to be an array of digitized values.
        if(isDigitizedValues(target)) {
            current = castDigitizedValues(current);

            // Loop over the existing digitized value to ensure the digits are
            // valid and gives the walker a chance to touch it. The walker will
            // touch the existing digits before adding new ones or removing
            // excess digits.
            let i = 0;

            while (i < current.length) {
                const currentIndex = forwards ? i : current.length - 1 - i;
                const targetIndex = forwards ? i : target.length - 1 - i;

                current[currentIndex] = recurse(
                    current[currentIndex], target[targetIndex]
                );

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
            ? fn(castDigitizedString(current), { target: target as DigitizedValue })
            : (target === undefined ? undefined : castDigitizedString(current)); 
    }

    // Recursively match the current and target array structures.
    return recurse(current, target) as DigitizedValues;
}

export type SequencerOptions = {
    charset?: CharsetContext | CharsetOptions,
    stopAfter?: StopWalkerFunction
    stopAfterChanges?: number
}

export type SequenceValue = DigitizedValue | DigitizedValues | undefined;

export type DecrementFunction = (current: FaceValue, target: FaceValue, count?: number) => FaceValue
export type IncrementFunction = (current: FaceValue, target: FaceValue, count?: number) => FaceValue

export type SequencerContext = {
    charset: string[],
    decrement: DecrementFunction,
    increment: IncrementFunction,
}

type SequencerWalkerContext = {
    target: DigitizedValue
}


/**
 * Use the sequencer to increment and decrement values until it reaches its
 * target value.
 */
export function useSequencer(options: SequencerOptions = {}) {
    const { charset, next, prev } = (
        'next' in (options.charset || {})
            ? options.charset
            : useCharset(options.charset as CharsetOptions)
    ) as CharsetContext;

    /**
     * Decrement the current face towards the target value. The count determines
     * how many digits are skipped. If the array structures differ, they will be
     * matched.
     */
    function decrement(current: FaceValue, target: FaceValue, count: number = 1): FaceValue {
        const walker = useWalker<SequencerWalkerContext>((current, context) => {
            return prev(current, context.target, count);
        }, options.stopAfter || stopAfterChanges<SequencerWalkerContext>(options.stopAfterChanges));

        const response = matchArrayStructure(
            current.digits.slice(), target.digits, { direction: 'backwards' }, walker
        );

        return new FaceValue(response);
    }

    /**
     * Increment the current face towards the target value. The count determines
     * how many digits are skipped. If the array structures differ, they will be
     * matched.
     */
    function increment(current: FaceValue, target: FaceValue, count: number = 1): FaceValue {
        const walker = useWalker<SequencerWalkerContext>((current, context) => {
            return next(current, context.target, count);
        }, options.stopAfter || stopAfterChanges<SequencerWalkerContext>(options.stopAfterChanges));

        const response = matchArrayStructure(
            current.digits.slice(), target.digits, walker
        );
        
        return new FaceValue(response);
    }

    return {
        charset,
        decrement,
        increment,
    }
}