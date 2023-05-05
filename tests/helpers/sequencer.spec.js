import { FaceValue } from '../../src/FaceValue';
import { castDigitizedGroup, castDigitizedString, castDigitizedValues, matchDataType, useSequencer } from '../../src/helpers/sequencer';

test('incrementing a face value', () => {
    let value = new FaceValue('a'), target = new FaceValue('z');

    const { increment } = useSequencer();

    expect(increment(value, target).digits).toStrictEqual([['b']]);
    expect(increment(value, target, 2).digits).toStrictEqual([['d']]);
    expect(increment(value, target, 100).digits).toStrictEqual([['z']]);
});

test('decrementing a face value', () => {
    let value = new FaceValue('z'), target = new FaceValue('a');

    const { decrement } = useSequencer();

    expect(decrement(value, target).digits).toStrictEqual([['y']]);
    expect(decrement(value, target, 2).digits).toStrictEqual([['w']]);
    expect(decrement(value, target, 100).digits).toStrictEqual([['a']]);
});

test('casting a string to a digitized string', () => {
    expect(castDigitizedString('1')).toBe('1');
    expect(castDigitizedString(['1'])).toBe('1');
    expect(castDigitizedString([['1']])).toBe('1');
    expect(castDigitizedString(undefined)).toBe(undefined);
})

test('casting a string to a digitized values', () => {
    expect(castDigitizedValues('1')).toStrictEqual(['1']);
    expect(castDigitizedValues(['1'])).toStrictEqual(['1']);
    expect(castDigitizedValues([['1']])).toStrictEqual(['1']);
    expect(castDigitizedValues(undefined)).toStrictEqual([undefined]);
})

test('casting a string to digitized values', () => {
    expect(castDigitizedGroup('1')).toStrictEqual([['1']]);
    expect(castDigitizedGroup(['1'])).toStrictEqual([['1']]);
    expect(castDigitizedGroup([['1']])).toStrictEqual([['1']]);
    expect(castDigitizedGroup(undefined)).toStrictEqual([[]]);
})

test('matching data types', () => {
    expect(matchDataType('1', '1')).toStrictEqual('1');
    expect(matchDataType(['1'], '1')).toStrictEqual('1');
    expect(matchDataType([['1']], '1')).toStrictEqual('1');

    expect(matchDataType('1', ['1'])).toStrictEqual(['1']);
    expect(matchDataType(['1'], ['1'])).toStrictEqual(['1']);
    expect(matchDataType([['1']], ['1'])).toStrictEqual(['1']);

    expect(matchDataType('1', [['1']])).toStrictEqual([['1']]);
    expect(matchDataType(['1'], [['1']])).toStrictEqual([['1']]);
    expect(matchDataType([['1']], [['1']])).toStrictEqual([['1']]);
})