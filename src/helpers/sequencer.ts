import { FaceValue } from "../FaceValue";
import { CharsetContext, CharsetOptions, useCharset } from "./charset";
import { DigitizedValue, DigitizedValues } from "./digitizer";
import { MatchArrayStructureOptions, StopPredicateFunction, matchArrayStructure, stopWhen } from './structure';

export type SequencerOptions = {
    charset?: CharsetContext | CharsetOptions,
    matchArray?: MatchArrayStructureOptions,
    stopWhen?: StopPredicateFunction<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues ]>,
    stopAfterChanges?: number,
}

export type DecrementFunction = (current: FaceValue<any>, target: FaceValue<any>, count?: number, backwards?: boolean) => FaceValue<any>
export type IncrementFunction = (current: FaceValue<any>, target: FaceValue<any>, count?: number, backwards?: boolean) => FaceValue<any>

export type SequencerContext = {
    charset: string[],
    decrement: DecrementFunction,
    increment: IncrementFunction,
}

/**
 * A composable that creates or uses a charset to increment and decrement
 * face values.
 * 
 * @public
 */
export function useSequencer(options?: SequencerOptions): SequencerContext {
    const { charset, next, prev } = (
        options?.charset && 'next' in (options.charset)
            ? options.charset
            : useCharset(options?.charset as CharsetOptions)
    ) as CharsetContext;
    
    /**
     * Decrement the current face towards the target value. The count determines
     * how many digits are skipped. If the array structures differ, they will be
     * matched.
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
                if(options?.stopWhen) {
                    return options.stopWhen(changes, current, target);
                }

                if(options?.stopAfterChanges) {
                    return changes.length < options.stopAfterChanges
                }

                return true;
            }, (current, target) => {
                if(current === target) {
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
                if(options?.stopWhen) {
                    return options?.stopWhen(changes, current, target)
                }

                if(options?.stopAfterChanges) {
                    return changes.length < options.stopAfterChanges
                }

                return true;
            }, (current, target) => {
                if(current === target) {
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
    } as const
}