import { FaceValue } from '../../src/FaceValue';
import { count, useDigitizer } from '../../src/helpers/digitizer';

test('digitizing and undigitizing values', () => {
    const { digitize, undigitize } = useDigitizer();

    expect(count(digitize('hello world'))).toEqual(10);
    expect(digitize('123')).toEqual([['1', '2', '3']]);
    expect(digitize(['123'])).toEqual([['1', '2', '3']]);
    expect(undigitize([['1', '2', '3']])).toEqual('123');
    expect(undigitize([['1', ['2', '3']]])).toEqual('1 23');
    expect(undigitize([['1', ['2', ['3']]]])).toEqual('1 2 3');
    expect(digitize('hello world')).toEqual([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']]);
    expect(undigitize([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']])).toEqual('hello world');
});

test('digitizing and undigitize "hello" with 8 minimum digits', () => {
    const { digitize } = useDigitizer({
        minimumDigits: 8,
    });

    expect(digitize('hello'))
        .toEqual([[' ', ' ', ' ', 'h', 'e', 'l', 'l', 'o']]);

    expect(digitize(['a', ['b']]))
        .toEqual([' ', ' ', ' ', ' ', ' ', ' ', 'a', ['b']]);

    expect(digitize([[[], ['a'], 'b'], 'c']))
        .toEqual([[[], [' ', ' ', ' ', ' ', ' ', 'a'], 'b'], 'c']);
        
    expect(digitize([[[]], ['c']]))
        .toEqual([[[]], [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'c']]);

    expect(digitize([['a', 'b', ['c']]]))
        .toEqual([[' ', ' ', ' ', ' ', ' ', 'a', 'b', ['c']]]);

    expect(digitize([[['a', 'b', 'c']]]))
        .toEqual([[[' ', ' ', ' ', ' ', ' ', 'a', 'b', 'c']]]);
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

test('comparing face values', () => {
    expect(new FaceValue('hello world').compare(new FaceValue('hello world'))).toBe(true);
    expect(new FaceValue('hello').compare(new FaceValue('world'))).toBe(false);
    expect(new FaceValue(['a', ['b', ['c']]]).compare(new FaceValue(['a', ['b', ['c']]]))).toBe(true);
})