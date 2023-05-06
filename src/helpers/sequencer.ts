
// options: changeTotalDigits chunkSize

import { FaceValue } from "../FaceValue";
import { CharsetOptions, useCharset } from "./charset";
import { DigitizedValue, DigitizedValues } from "./digitizer";

type SequencerOptions = {
    charset?: CharsetOptions,
    changeTotalDigits?: number,
    chunkSize?: number,
    emptyChar?: string,
}

type SequenceValue = DigitizedValue | DigitizedValues | undefined;

export function castDigitizedString(value: SequenceValue): DigitizedValue {
    if (Array.isArray(value)) {
        return castDigitizedString(value[0]);
    }

    return value;
}

export function castDigitizedValues(value: SequenceValue): DigitizedValue[] {
    if (isDigitizedGroup(value)) {
        return value[0] as DigitizedValue[];
    }

    if (Array.isArray(value)) {
        return value as DigitizedValue[];
    }

    return [value];
}

export function castDigitizedGroup(value: SequenceValue): DigitizedValues {
    if (isDigitizedGroup(value)) {
        return value as DigitizedValues;
    }

    if(Array.isArray(value)) {
        return [value];
    }

    if (value === undefined) {
        return [[]];
    }
    
    return [[value]];
}

export function isDigitizedValues(value: SequenceValue) {
    return Array.isArray(value) && !isDigitizedGroup(value);
}   

export function isDigitizedGroup(value: DigitizedValues | DigitizedValue | undefined) {
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

export function padLeft(value: DigitizedValues, length: number, char: string): DigitizedValues {
    value.unshift(
        ...Array(Math.max(0, length - value.length)).fill(char)
    );
    
    return value;
}

export function padRight(value: DigitizedValues, length: number, char: string): DigitizedValues {
    value.push(
        ...Array(Math.max(0, length - value.length)).fill(char)
    );

    return value;
}

export function matchDataType(value: SequenceValue, target: SequenceValue): DigitizedValues | DigitizedValue {
    if(isDigitizedGroup(target)) {
        return castDigitizedGroup(value);
    }

    if (isDigitizedValues(target)) {
        return castDigitizedValues(value);
    }

    return castDigitizedString(value);   
}

/**
 * This method will match the structure of the current array against the target.
 * This method will not match the length of the DigitizedValue[] arrays, but
 * match lengths for groups. To ensure all structures have the same length, 
 * run matchStructureLength() after this method.
 *  
 */
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues): DigitizedValues {
    function recurse(current: DigitizedValues | DigitizedValue, target: DigitizedValues | DigitizedValue): DigitizedValues | DigitizedValue{
        // If target is a digit group, then loop through them and recursively
        // iterate over the groups.
        if(isDigitizedGroup(target)) {
            // Cast the current value to a digitized group.
            current = castDigitizedGroup(current);
            
            // Loop through the target array. We could implement this backwards
            // if it becomes necessary. No reason it has to go forwards...
            for(let i = 0; i < target.length; i++) {
                // If the current value doesn't exist, recurively match the
                // target array against an empty array to match the structure.
                // If the current value exists recursively match against target.
                current[i] = !current[i]
                    ? recurse([], target[i])
                    : recurse(current[i], target[i]);
            }

            return current
        }

        // If the target is an array, ensure current is an array. Slice the
        // length of current to match target.
        if(isDigitizedValues(target)) {
            return castDigitizedValues(current).slice(0, target.length)
        }

        // If the target is a digit, then cast the current value to a digit.
        return castDigitizedString(current);
    }

    // Recursively match the current and target array structures.
    return recurse(current, target) as DigitizedValues;
}

/**
 * This method will match the structure of the current array against the target.
 * This method assumes that each array has the same structure has been sanitized
 * with matchArrayStructure();
 */
export function matchStructureLength(current: DigitizedValues, target: DigitizedValues, char: DigitizedValue, direction: 'left'|'right' = 'right'): DigitizedValues {
    function recurse(current: DigitizedValues, target: DigitizedValues) {
        current = direction === 'right'
            ? padRight(current, target.length, char)
            : padLeft(current, target.length, char);

        for(let i = 0; i < current.length; i++) {
            if(Array.isArray(current[i])) {
                current[i] = matchStructureLength(
                    current[i] as DigitizedValues,
                    target[i] as DigitizedValues,
                    char,
                    direction
                );
            }
        }

        return current;
    }

    return recurse(current, target) as DigitizedValues;
}

export function walk(current: DigitizedValues, target: DigitizedValues, fn: Function) {
    function recurse(current: DigitizedValues | DigitizedValue, target: DigitizedValues | DigitizedValue) {
        if (!Array.isArray(current)) {
            return fn(current, target);
        }

        for (let x = current.length - 1; x >= 0; x--) {
            current[x] = recurse(current[x], target[x]);
        }

        return current;
    }

    return recurse(current, target);
}

export function useSequencer(options: SequencerOptions = {}) {
    const { charset, next, prev } = useCharset(options.charset);

    function decrement(value: FaceValue, targetValue: FaceValue, count: number = 1) {
        const current = matchStructureLength(
            matchArrayStructure(
                value.digits, targetValue.digits
            ), targetValue.digits, options.emptyChar || ' '
        );

        const digits = walk(current, targetValue.digits, (current, target) => {
            return prev(current, target, count);
        });

        return value.copy(digits);
    }

    function increment(value: FaceValue, targetValue: FaceValue, count: number = 1) {
        const structure = matchArrayStructure(
            value.digits, targetValue.digits
        );

        const current = matchStructureLength(
            structure, targetValue.digits, options.emptyChar || ' '
        );

        const digits = walk(current, targetValue.digits, (current, target) => {
            return next(current, target, count);
        });

        return value.copy(digits);
    }

    return {
        charset,
        decrement,
        increment,
    }
}