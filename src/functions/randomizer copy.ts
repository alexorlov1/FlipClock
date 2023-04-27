import FaceValue from "../FaceValue";
import digitize from "./digitize";

export const SPACE = 32;

/**
 * Shuffles array in place.
 */
export function shuffle(a: string[]) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Get a range of numbers using the given size and starting point.
 */
export function range(size: number, startAt: number = 0): number[] {
    return [...Array(size).keys()].map(i => i + startAt);
}

/**
 * Generates a random array of characters using the given range.
 */
export function characterRange(startChar: string, endChar: string): string[] {
    const nums = range(
        endChar.charCodeAt(0) - startChar.charCodeAt(0), startChar.charCodeAt(0)
    );

    return nums.map(i => String.fromCharCode(i));
}

/**
 * Increment the transition value 1 char code at a time sequentially one at a
 * time for each digit.
 */
export function spinLinear(transitionValue: FaceValue, currentValue: FaceValue): FaceValue {
    const digits = digitize(currentValue.value);
    const totalDigits = digits.length;
    const transitionDigits = digitize(transitionValue.value);

    let totalMatchingDigits = 0;

    while (digits.length) {
        const index = transitionDigits.length - 1 - totalMatchingDigits;
        const digit = digits.pop();
        const digitCode = digit.charCodeAt(0);
        const transitionDigit = transitionDigits[index];
        const transitionDigitCode = transitionDigit?.charCodeAt(0);

        if (digitCode === transitionDigitCode) {
            totalMatchingDigits++;

            continue;
        }
        else if (transitionDigit === undefined) {
            transitionDigits.unshift(String.fromCharCode(SPACE));
        }
        else {
            transitionDigits[index] = String.fromCharCode(transitionDigitCode + 1);
        }

        break;
    }

    return FaceValue.fromDigits(transitionDigits, {
        // minimumDigits: currentValue.minimumDigits
    });
}

/**
 * Extract the impossible characters from the current value. This makes sure
 * that any value in the clock is not used for the character range.
 */
export function extractImpossibleChars(possibleChars: string[], currentValue: FaceValue) {
    const impossibleChars = currentValue.digits.filter(digit => !possibleChars.includes(digit));

    return [
        ...impossibleChars,
        ...possibleChars,
    ];
} 

export type UseSpinGroupParams = {
    possibleChars?: string[]
    threshold?: number
}

/**
 * A use function to capture the state of the spin cycle so that random
 * characters may be generated for each digit without repeats. When the random
 */
export function useRandomizer(params: UseSpinGroupParams = {}) {
    const groups: Record<number, string[]> = {};

    // An array of possible characters to use for the groups.
    const possibleChars = params.possibleChars || [
        ' ',
        ...characterRange('0', '9'),
        ...characterRange('A', 'Z'),
        ...characterRange('a', 'z')
    ];

    // Generate random characters using the index and the corresponding group.
    function randomCharacters(total: number, index: number, currentValue: FaceValue) {
        if (!(index in groups) || !groups[index].length) {
            groups[index] = shuffle(extractImpossibleChars(possibleChars, currentValue));
        }

        return groups[index].splice(0, total);
    }

    // Generate a random character using the index and the current value.
    function randomCharacter(index: number, currentValue: FaceValue) {
        return randomCharacters(1, index, currentValue).pop();
    }
    
    // Check if the current digit matches any of the random characters. This
    // allows us to check multiple digits at once, drastically speeding up the
    // time it takes to find the correct digit.
    function checkMatchingDigit(i: number, currentValue: FaceValue, digitCode: number): true|string[] {
        const chars = randomCharacters(params.threshold || 1, i, currentValue);

        for (const char of chars) {
            if (char.charCodeAt(0) === digitCode) {
                return true;
            }
        }

        return chars;
    }

    // Spin the groups
    function spinGroups(transitionValue: FaceValue, currentValue: FaceValue): FaceValue {
        const digits = digitize(currentValue.value);
        const transitionDigits = digitize(transitionValue.value);

        for (let i = digits.length - 1; i >= 0; i--) {
            const digit = digits[i];
            const digitCode = digit.charCodeAt(0);

            if(!transitionDigits[i]) {
                transitionDigits[i] = randomCharacter(i, currentValue)[0];
            }
            
            const transitionDigit = transitionDigits[i];
            const transitionDigitCode = transitionDigit?.charCodeAt(0);

            if (digitCode === transitionDigitCode) {
                continue;
            }

            const chars = checkMatchingDigit(i, currentValue, digitCode);

            if (chars === true) {
                transitionDigits[i] = digit
            }
            else {
                transitionDigits[i] = chars.pop() || digit;
            }
        }

        return FaceValue.fromDigits(transitionDigits, {
            // minimumDigits: currentValue.minimumDigits
        });
    }

    return {
        spinGroups
    }
}