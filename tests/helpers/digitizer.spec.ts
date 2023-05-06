import { count, useDigitizer } from '../../src/helpers/digitizer';

test('digitizing and undigitize a string without spaces', () => {
    const { digitize, undigitize } = useDigitizer();

    expect(count(digitize('hello world'))).toEqual(10);
    expect(digitize('123')).toEqual([['1', '2', '3']]);
    expect(digitize(['123'])).toEqual([['1', '2', '3']]);
    expect(undigitize([['1', '2', '3']])).toEqual('123');
});

test('digitizing and undigitize "hello world"', () => {
    const { digitize, undigitize } = useDigitizer();

    expect(digitize('hello world')).toEqual([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']]);
    expect(undigitize([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']])).toEqual('hello world');
});

test('digitizing and undigitize "hello" with 8 minimum digits', () => {
    const { digitize } = useDigitizer({
        minimumDigits: 8
    });

    expect(digitize('hello')).toEqual([
        String.fromCharCode(0),
        String.fromCharCode(0),
        String.fromCharCode(0),
        ['h', 'e', 'l', 'l', 'o']
    ]);
})

test('checking if a value is a digitized array', () => {
    const { isDigitized } = useDigitizer();

    expect(isDigitized('1')).toBe(false);
    expect(isDigitized(1)).toBe(false);
    expect(isDigitized(['1', 1])).toBe(false);
    expect(isDigitized(['1', ['2', ['3', []]]])).toBe(true);
    expect(isDigitized(['1', ['2', ['3', ['45']]]])).toBe(false);
    expect(isDigitized(['not', ['v', 'a', 'l', 'i', 'd']])).toBe(false);
})