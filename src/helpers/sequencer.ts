import { FaceValue } from "../FaceValue";
import { CharsetContext, useCharset } from "./charset";
import { DigitizedValue, DigitizedValues } from "./digitizer";
import { StopWalkerCallbackFunction, WalkerDirection, WalkerFunction, WalkerOptions, stopAfterChanges, useWalker } from "./walker";

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
export function castDigitizedValues(value: SequenceValue, direction: WalkerDirection = 'forwards'): DigitizedValue[] {
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

// /**
//  * Force the value to have the same data type as the target.
//  */
// export function matchDataType(value: SequenceValue, target: SequenceValue): DigitizedValues | DigitizedValue {
//     if(isDigitizedGroup(target)) {
//         return castDigitizedGroup(value);
//     }

//     if (isDigitizedValues(target)) {
//         return castDigitizedValues(value);
//     }

//     return castDigitizedString(value);   
// }

/**
 * This method will match the structure of the current array against the target.
 * This method will not match the length of the DigitizedValue[] arrays, but
 * match lengths for groups. To ensure all structures have the same length, 
 * run matchStructureLength() after this method.
 *
 */
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, fn?: WalkerFunction): DigitizedValues
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, options: WalkerOptions, fn?: WalkerFunction): DigitizedValues
export function matchArrayStructure(current: DigitizedValues, target: DigitizedValues, options: WalkerOptions | WalkerFunction, fn?: WalkerFunction): DigitizedValues {
    // Allow for the method overloading. If options is a function, assign it.
    if(typeof options === 'function') {
        fn = options;
        options = {};
    }
    else if(!options) {
        options = {};
    }
    
    const direction = options.direction || 'forwards';
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
            current = castDigitizedValues(current, direction);

            // Loop over the existing digitized value to ensure the digits are
            // valid and gives the walker a chance to touch it.

            if(forwards) {
                let i = 0;

                while(i < current.length) {
                    current[i] = recurse(current[i], target[i]);

                    if(current[i] === undefined) {
                        current.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
            }
            else {
                let i = 0;

                while (i < current.length) {
                    current[current.length - 1 - i] = recurse(
                        current[current.length - 1 - i],
                        target[target.length - 1 - i]
                    );

                    if (current[current.length - 1 - i] === undefined) {
                        current.splice(current.length - 1 - i, 1);
                    }
                    else {
                        i++;
                    }
                }
            }

            // let i = 0;

            // while(i < current.length) {
            //     current[forwards ? i : current.length - 1 - i] = forwards
            //         ? recurse(current[i], target[i])
            //         : recurse(current[current.length - 1 - i], target[target.length - 1 - i]);

            //     if(current[i] === undefined) {
            //         current.splice(i, 1);
            //     }
            //     else {
            //         i++;
            //     }
            // }


            // for(let i = forwards ? 0 : current.length - 1; forwards ? i < current.length : i >= 0; forwards ? i++ : i--) {
            //     current[i] = recurse(current[i], target[i]);

            //     const response = recurse(current[i], target[i]);

            //     // If response is undefined, then remove it. Otherwise assign
            //     // the response back to the current value.
            //     if (response === undefined) {
            //         current.splice(i, 1);
            //     }
            //     else {
            //         current[i] = response;
            //     }
            // }
            

            // If the current length is less than the target length, recursively
            // loop through it an add the digits. If a walker is used, it can
            // incrementall add the values.
            for (let i = forwards ? current.length : target.length; forwards ? i < target.length : i >= current.length; forwards ? i++ : i--) {
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

// export function matchArrayStructureReverse(current: DigitizedValues, target: DigitizedValues, fn?: WalkerFunction): DigitizedValues {
//     function recurse(current: DigitizedValues | DigitizedValue, target: DigitizedValues | DigitizedValue): DigitizedValues | DigitizedValue {
//         // If target is a digit group, then loop through them and recursively
//         // iterate over the groups.
//         if (isDigitizedGroup(target)) {
//             // Cast the current value to a digitized group.
//             current = castDigitizedGroup(current);

//             // Loop through the target array. We could implement this backwards
//             // if it becomes necessary. No reason it has to go forwards...
//             for (let i = target.length - 1; i >= 0; i--) {
//                 // If the current value doesn't exist, recursively match the
//                 // target array against an empty array to match the structure.
//                 // If the current value exists recursively match against target.
//                 current[i] = !current[i]
//                     ? recurse([], target[i])
//                     : recurse(current[i], target[i]);
//             }

//             // Remove the undefined items in the array. Use this instead of
//             // filter to avoid copy the array.
//             for (let i = 0; i < current.length; i++) {
//                 if (current[i] === undefined) {
//                     current.splice(i, 1);
//                 }
//             }

//             return current;
//         }

//         // If the target is an array, ensure current is an array. Splice the
//         // length of current to match target.
//         if (isDigitizedValues(target)) {
//             current = castDigitizedValues(current);

//             // Loop over the existing digitized value to ensure the digits are
//             // valid and gives the walker a chance to touch it.
//             for (let i = current.length - 1; i >= 0; i--) {
//                 const response = recurse(current[i], target[i]);

//                 // If response is undefined, then remove it. Otherwise assign
//                 // the response back to the current value.
//                 if (response === undefined) {
//                     current.splice(i, 1);
//                 }
//                 else {
//                     current[i] = response;
//                 }
//             }

//             // If the current length is less than the target length, recursively
//             // loop through it an add the digits. If a walker is used, it can
//             // incrementally add the values.
//             for (let i = target.length; i >= current.length; i--) {
//                 const response = recurse(undefined, target[i]);

//                 // If the response gets undefined, just break the array and
//                 // assume the manipulation has finished.
//                 if (response === undefined) {
//                     break;
//                 }

//                 // If we are still here, the push the response 
//                 current.push(response);
//             }

//             return current;
//         }

//         // If the callback is defined, use it to walk through the digits. The
//         // walker can modify the digits. If used with `useWalker()` you can
//         // limit the total changes that can be made to the structure. This
//         // is useful for incrementing/decrementing the sequence X changes at a
//         // time.
//         return fn
//             ? fn(castDigitizedString(current), target)
//             : (target === undefined ? undefined : castDigitizedString(current));
//     }

//     // Recursively match the current and target array structures.
//     return recurse(current, target) as DigitizedValues;
// }

type SequencerOptions = {
    charset?: CharsetContext,
    stopAfter?: StopWalkerCallbackFunction
    stopAfterChanges?: number
}

type SequenceValue = DigitizedValue | DigitizedValues | undefined;

/**
 * Use the sequencer to increment and decrement values until it reaches its
 * target value.
 */
export function useSequencer(options: SequencerOptions = {}) {
    const { charset, next, prev } = options.charset || useCharset();

    function decrement(value: FaceValue, targetValue: FaceValue, count: number = 1) {
        const walker = useWalker((current, target) => {
            return prev(current, target, count);
        }, options.stopAfter || stopAfterChanges(options.stopAfterChanges));

        const response = matchArrayStructure(
            value.copy().digits, targetValue.digits, {direction: 'backwards'}, walker
        );

        return new FaceValue(response);
    }

    function increment(value: FaceValue, targetValue: FaceValue, count: number = 1) {
        const walker = useWalker((current, target) => {
            return next(current, target, count);
        }, options.stopAfter || stopAfterChanges(options.stopAfterChanges));

        const response = matchArrayStructure(
            value.copy().digits, targetValue.digits, walker
        );
        
        return new FaceValue(response);
    }

    return {
        charset,
        decrement,
        increment,
    }
}