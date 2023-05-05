
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

    if (value) {
        return [[value]];
    }

    return [[]];
}

export function isDigitizedValues(value: SequenceValue) {
    return Array.isArray(value) && !isDigitizedGroup(value);
}   

export function isDigitizedGroup(value: DigitizedValues | DigitizedValue | undefined) {
    return Array.isArray(value) && value.length > 0 && Array.isArray(value[0]);
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

export function matchArrayLength(current: DigitizedValues, target: DigitizedValues, char?: string): DigitizedValues {
    if(current.length === target.length) {
        return current;   
    }

    current = current.slice(0, target.length);

    if(target.length > current.length) {
        current.unshift(...Array(target.length - current.length).fill(
            isDigitizedGroup(target) ? [] : char
        ));
    }

    return current;
}


export function matchGroupLength(current: DigitizedValues, target: DigitizedValues, char?: string): DigitizedValues {
    if(current.length === target.length) {
        return current;   
    }
}

export function matchStructure(current: DigitizedValues, target: DigitizedValues, char?: DigitizedValue) {
    function recurse(current: DigitizedValues | DigitizedValue, target: DigitizedValues | DigitizedValue) {
        if (!Array.isArray(target)) {
            return current;
        }
        
        current = isDigitizedGroup(target)
            ? matchDataType(current, target) as DigitizedValues
            : matchDataType(current, target) as DigitizedValue[];

        if(char) {
            current = matchArrayLength(current, target, char);
        }
        
        for (let x = target.length - 1; x >= 0; x--) {
            const response = recurse(
                matchDataType(current[x], target[x]), target[x]
            );

            if(response === undefined) {
                continue
            }
            
            current[x] = response;
        }
        
        return current
    }

    return recurse(current.slice(0), target);
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
        const current = matchStructure(
            value.digits, targetValue.digits, options.emptyChar || ' '
        ) as DigitizedValues;

        const digits = walk(current, targetValue.digits, (current, target) => {
            return current === target ? current : prev(current, target, count);
        });

        return value.copy(digits);
    }

    function increment(value: FaceValue, targetValue: FaceValue, count: number = 1) {
        const current = matchStructure(
            value.digits, targetValue.digits, options.emptyChar || ' '
        ) as DigitizedValues;

        const digits = walk(current, targetValue.digits, (current, target) => {
            return current === target ? current : next(current, target, count);
        });

        return value.copy(digits);
    }

    return {
        charset,
        decrement,
        increment,
    }
}