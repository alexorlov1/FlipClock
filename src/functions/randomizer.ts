import FaceValue from "../FaceValue";
import { CharsetParams, useCharset } from "./charset";
import { DigitizedValue, DigitizedValues } from "./digitizer";

export type RandomizerParams = {
    charset?: CharsetParams,
    chunkSize?: number
}

export type RandomizerFunction = (value: FaceValue, targetValue?: FaceValue) => FaceValue;

/**
 * A use function to capture the state of the spin cycle so that random
 * characters may be generated for each digit without repeats. When the random
 */
export function useRandomizer(params: RandomizerParams = {}): RandomizerFunction {
    return function run(value: FaceValue, targetValue?: FaceValue): FaceValue {
        const { get, chars, isWhitelisted } = useCharset(params.charset);

        function castArray(value?: DigitizedValues|DigitizedValue): DigitizedValues {
            if(value === undefined) {
                return [];
            }

            return Array.isArray(value) ? value : [value];
        }

        function matchArrayLength<T>(value: DigitizedValues, targetValue: DigitizedValues, fillValue?: DigitizedValue): T {
            if (value.length === targetValue.length) {
                return value as T;
            }

            if(value.length < targetValue.length) {
                const newItems = new Array(
                    targetValue.length - value.length
                ).fill(fillValue);

                return newItems.concat(value) as T;
            }
            
            return value.slice(0, targetValue.length) as T;
        }

        function matchValueType<T>(
            value: DigitizedValues | DigitizedValue,
            targetValue?: DigitizedValues | DigitizedValue,
            fillValue?: DigitizedValue
        ): T {
            
            // Ensure the value is an array.
            if(Array.isArray(targetValue)) {
                return matchArrayLength<T>(
                    castArray(value),
                    castArray(targetValue),
                    fillValue
                );
            }

            // Esure the value is a string.
            return value?.[0] as T;
        }

        function next(key: string, value?: DigitizedValue, targetValue?: DigitizedValue, after?: DigitizedValue) {
            if (value === targetValue || isWhitelisted(targetValue)) {
                return targetValue;
            }
            
            const possibleChars = chars(
                key,
                params.chunkSize || 1,
                after === undefined ? value : after
            );

            if (possibleChars.includes(targetValue)) {
                return targetValue;
            }
            
            return possibleChars[possibleChars.length - 1]
        }

        let parentTargetValue: DigitizedValues;

        function recurse(
            value: DigitizedValues | DigitizedValue,
            targetValue?: DigitizedValues | DigitizedValue,
            key: string = 'root'
        ): DigitizedValues | DigitizedValue {
            if (Array.isArray(targetValue)) {
                parentTargetValue = targetValue;

                value = matchValueType<DigitizedValues>(value, targetValue, String.fromCharCode(0));

                for (let index = targetValue.length - 1; index >= 0; index--) {
                    const response = recurse(
                        value[index], targetValue[index], `${key}.${index}`
                    );
 
                    if (!Array.isArray(targetValue[index]) && Array.isArray(value[index])) {
                        const responseCopy = [].concat(response);

                        const nextValue = next(
                            undefined,
                            typeof value[index] === 'string' ? value[index] as string : undefined,
                            typeof targetValue[index] === 'string' ? targetValue[index] as string : undefined,
                        )

                        const items = matchArrayLength<DigitizedValues>(
                            responseCopy, parentTargetValue, nextValue
                        );
                        
                        return items;
                    }

                    value[index] = response;
                }

                return [].concat(value);
            }

            value = matchValueType<DigitizedValue>(value, targetValue);

            if(value === undefined) {
                return next(key);
            }

            return next(key, value, targetValue);     
        }

        const digits = recurse(
            value.digits, targetValue.digits
        ) as DigitizedValue[];

        return FaceValue.make(digits, {
            digits
        });
    }
    
    return run
}