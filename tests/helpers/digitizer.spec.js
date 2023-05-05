import { useDigitizer } from '../../src/helpers/digitizer';

test('digitizing and undigitize a string without spaces', () => {
    const { digitize, undigitize } = useDigitizer();

    expect(digitize('123')).toEqual([['1', '2', '3']]);
    expect(undigitize([['1', '2', '3']])).toEqual('123');
});

test('digitizing and undigitize "hello world"', () => {
    const { digitize, undigitize } = useDigitizer();

    expect(digitize('hello world')).toEqual([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']]);
    expect(undigitize([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']])).toEqual('hello world');
});

test('digitizing and undigitize "hello" with 11 minimum digits', () => {
    const { digitize, undigitize } = useDigitizer({
        minimumDigits: 8
    });

    expect(digitize('hello')).toEqual([
        String.fromCharCode(0),
        String.fromCharCode(0),
        String.fromCharCode(0),
        ['h', 'e', 'l', 'l', 'o']
    ]);
})