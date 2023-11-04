import { FaceValue } from '../FaceValue';
import { UseCharset, UseCharsetOptions, useCharset } from './charset';
import { DigitizedValue, DigitizedValues } from './digitizer';
import { MatchArrayStructureOptions, StopPredicateFunction, matchArrayStructure, stopWhen } from './structure';

/** 
 * The options for `useSequencer()`.
 * 
 * @public
 */
export type SequencerOptions = {
    charset?: UseCharset | UseCharsetOptions,
    matchArray?: MatchArrayStructureOptions,
    stopWhen?: StopPredicateFunction<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues ]>,
    stopAfterChanges?: number,
}

/**
 * The return type for `useSequencer()`.
 * 
 * @public
 */
export type UseSequencer = {
    charset: string[],
    decrement: (current: FaceValue<any>, target: FaceValue<any>, count?: number, backwards?: boolean) => FaceValue<any>,
    increment: (current: FaceValue<any>, target: FaceValue<any>, count?: number, backwards?: boolean) => FaceValue<any>,
}

/**
 * A composable that creates or uses a charset to increment and decrement
 * face values.
 * 
 * @public
 */
export function useSequencer(options?: SequencerOptions): UseSequencer {
    const { charset, next, prev } = (
        options?.charset && 'next' in (options.charset)
            ? options.charset
            : useCharset(options?.charset as UseCharsetOptions)
    ) as UseCharset;
    
    /**
     * Decrement the current face towards the target value. The count determines
     * how many digits are skipped. If the array structures differ, they will be
     * matched.
     * 
     * @public
     */
    function decrement(current: FaceValue<any>, target: FaceValue<any>, count: number = 1, backwards: boolean = false): FaceValue<any> {
        const walkerOptions: MatchArrayStructureOptions = {
            backwards, ...options?.matchArray
        };

        current.digits = matchArrayStructure(
            current.digits,
            target.digits,
            walkerOptions,
            stopWhen((changes, current, target) => {
                if (options?.stopWhen) {
                    return options.stopWhen(changes, current, target);
                }

                if (options?.stopAfterChanges) {
                    return changes.length < options.stopAfterChanges;
                }

                return true;
            }, (current, target) => {
                if (current === target) {
                    return current;
                }

                return prev(current ?? '', target, count);
            })
        );

        return current;
    }

    /**
     * Increment the current face towards the target value. The count determines
     * how many digits are skipped. If the array structures differ, they will be
     * matched.
     * 
     * @public
     */
    function increment(current: FaceValue<any>, target: FaceValue<any>, count: number = 1, backwards: boolean = false): FaceValue<any> {
        const walkerOptions: MatchArrayStructureOptions = {
            backwards, ...options?.matchArray
        };

        current.digits = matchArrayStructure(
            current.digits,
            target.digits,
            walkerOptions,
            stopWhen((changes, current, target) => {
                if (options?.stopWhen) {
                    return options?.stopWhen(changes, current, target);
                }

                if (options?.stopAfterChanges) {
                    return changes.length < options.stopAfterChanges;
                }

                return true;
            }, (current, target) => {
                if (current === target) {
                    return current;
                }

                return next(current, target, count);
            })
        );

        return current;
    }
    
    return {
        charset,
        decrement,
        increment,
    } as const;
}