import { FaceValue } from '../../src/FaceValue';
import { useCharset } from '../../src/helpers/charset';
import { castDigitizedGroup, castDigitizedString, castDigitizedValues, matchArrayStructure, useSequencer } from '../../src/helpers/sequencer';
import { stopAfterChanges, useWalker } from '../../src/helpers/walker';
import { DigitizedValue } from './../../src/helpers/digitizer';

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
    expect(castDigitizedValues(undefined)).toStrictEqual([]);
})

test('casting a string to digitized values', () => {
    expect(castDigitizedGroup('1')).toStrictEqual([['1']]);
    expect(castDigitizedGroup(['1'])).toStrictEqual([['1']]);
    expect(castDigitizedGroup([['1']])).toStrictEqual([['1']]);
    expect(castDigitizedGroup(undefined)).toStrictEqual([[]]);
})

test('matching array structure going left to right', () => {
    expect(matchArrayStructure([], [])).toStrictEqual([]);
    expect(matchArrayStructure(['1', '2', '3'], ['1', '2', '3'])).toStrictEqual(['1', '2', '3']);

    expect(matchArrayStructure(['1'], ['1', '2', '3'])).toStrictEqual(['1']);
    expect(matchArrayStructure(['1', '2'], ['1', '2', '3'])).toStrictEqual(['1', '2']);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', '2', '3'])).toStrictEqual(['1', '2', '3']);
    expect(matchArrayStructure(['1', ['2', ['3']]], ['1', '2', '3'])).toStrictEqual(['1', '2', '3']);

    expect(matchArrayStructure(['1', '2', '3'], ['1'])).toStrictEqual(['1']);
    expect(matchArrayStructure(['1', '2', '3'], ['1', '2'])).toStrictEqual(['1', '2']);
    expect(matchArrayStructure(['1', '2', '3'], ['1', ['2', '3']])).toStrictEqual(['1', []]);
    expect(matchArrayStructure(['1', '2', '3'], ['1', ['2', ['3']]])).toStrictEqual(['1', [[]]]);

    expect(matchArrayStructure(['1', ['2']], ['1', ['2', '3']])).toStrictEqual(['1', ['2']]);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', ['2', '3']])).toStrictEqual(['1', ['2', '3']]);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', ['2']])).toStrictEqual(['1', ['2']]);

    expect(matchArrayStructure(['1', [['2'], '3']], ['1', ['2', '3']])).toStrictEqual(['1', ['2', '3']]);
    expect(matchArrayStructure(['1', [['2'], '3']], ['1', [['2'], '3']])).toStrictEqual(['1', [['2'], '3']]);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', ['2', ['3']]])).toStrictEqual(['1', ['2', []]]);
})

test('matching array structure going right to left', () => {
    expect(matchArrayStructure([], [], { direction: 'backwards' })).toStrictEqual([]);
    expect(matchArrayStructure(['1', '2', '3'], ['1', '2', '3'], { direction: 'backwards' })).toStrictEqual(['1', '2', '3']);

    expect(matchArrayStructure(['1'], ['1', '2', '3'], { direction: 'backwards' })).toStrictEqual(['1']);
    expect(matchArrayStructure(['1', '2'], ['1', '2', '3'], { direction: 'backwards' })).toStrictEqual(['1', '2']);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', '2', '3'], { direction: 'backwards' })).toStrictEqual(['1', '2', '3']);
    expect(matchArrayStructure(['1', ['2', ['3']]], ['1', '2', '3'], { direction: 'backwards' })).toStrictEqual(['1', '2', '3']);

    expect(matchArrayStructure(['1', '2', '3'], ['1', '2'], { direction: 'backwards' })).toStrictEqual(['2', '3']);
    expect(matchArrayStructure(['1', '2', '3'], ['1', ['2', '3']], { direction: 'backwards' })).toStrictEqual(['1', []]);
    expect(matchArrayStructure(['1', '2', '3'], ['1', ['2', ['3']]], { direction: 'backwards' })).toStrictEqual(['1', [[]]]);

    expect(matchArrayStructure(['1', ['2']], ['1', ['2', '3']], { direction: 'backwards' })).toStrictEqual(['1', ['2']]);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', ['2', '3']], { direction: 'backwards' })).toStrictEqual(['1', ['2', '3']]);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', ['2']], { direction: 'backwards' })).toStrictEqual(['1', ['3']]);

    expect(matchArrayStructure(['1', [['2'], '3']], ['1', ['2', '3']], { direction: 'backwards' })).toStrictEqual(['1', ['2', '3']]);
    expect(matchArrayStructure(['1', [['2'], '3']], ['1', [['2'], '3']], { direction: 'backwards' })).toStrictEqual(['1', [['2'], '3']]);
    expect(matchArrayStructure(['1', ['2', '3']], ['1', ['2', ['3']]], { direction: 'backwards' })).toStrictEqual(['1', ['2', []]]);
})

test('incrementing the array walker after 1 change', () => {
    const { next } = useCharset();

    function walker() {
        return useWalker<{target: DigitizedValue}>((current, { target }) => next(current, target), stopAfterChanges(1));
    }

    const subject = [], target = ['a', 'b', 'c'];

    expect(matchArrayStructure(subject, target, walker())).toStrictEqual(['a']);
    expect(matchArrayStructure(subject, target, walker())).toStrictEqual(['a', 'a']);
    expect(matchArrayStructure(subject, target, walker())).toStrictEqual(['a', 'b']);
    expect(matchArrayStructure(subject, target, walker())).toStrictEqual(['a', 'b', 'a']);
    expect(matchArrayStructure(subject, target, walker())).toStrictEqual(['a', 'b', 'b']);
    expect(matchArrayStructure(subject, target, walker())).toStrictEqual(['a', 'b', 'c']);
})

test('decrementing the array walker after 1 change', () => {
    const { prev } = useCharset();

    function walker() {
        return useWalker<{ target: DigitizedValue }>((current, { target }) => prev(current, target), stopAfterChanges(1));
    }

    const subject = ['a', 'b', 'c'], target = [];

    expect(matchArrayStructure(subject, target, { direction: 'backwards' }, walker())).toStrictEqual(['a', 'b', 'b']);
    expect(matchArrayStructure(subject, target, { direction: 'backwards' }, walker())).toStrictEqual(['a', 'b', 'a']);
    expect(matchArrayStructure(subject, target, { direction: 'backwards' }, walker())).toStrictEqual(['a', 'b', ' ']);
})

test('incrementing towards "hello" 2 changes at a time', () => {
    const { increment } = useSequencer({
        stopAfterChanges: 2
    });
    
    let subject = new FaceValue(''), target = new FaceValue('hello');

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['b', 'b']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['d', 'd']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['f', 'e']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'b']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'd', 'b']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'f', 'd']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'h', 'f']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'j', 'h']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'j']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'b']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'd']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'f']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'h']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'j']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'l']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'n']);

    subject = increment(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'o']);
})

test('decrementing from "hello" 2 changes at a time', () => {
    const { decrement } = useSequencer({
        stopAfterChanges: 2
    });

    let subject = new FaceValue('hello'), target = new FaceValue('');

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'l', 'o']);
    
    subject = decrement(subject, target, 2);
    
    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'j', 'm']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'h', 'k']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'f', 'i']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'd', 'g']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'b', 'e']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', ' ', 'c']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'l', 'a']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'e', 'j']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'c', 'h']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'a', 'f']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['h', 'd']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['f', 'b']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['d', ' ']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual(['b']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual([' ']);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual([]);

    subject = decrement(subject, target, 2);

    expect(subject.digits).toStrictEqual([]);
})

test('incrementing a value using a custom stop function', () => {
    const { decrement, increment } = useSequencer({
        stopAfter: stopAfterChanges(2)
    });

    let subject = new FaceValue(''), target = new FaceValue('abc');

    subject = increment(subject, target);

    expect(subject.digits).toStrictEqual(['a', 'a']);

    subject = increment(subject, target);

    expect(subject.digits).toStrictEqual(['a', 'b', 'a']);
    
    target = new FaceValue([])

    subject = decrement(subject, target);

    expect(subject.digits).toStrictEqual(['a', 'a', ' ']);

    subject = decrement(subject, target);

    expect(subject.digits).toStrictEqual(['a', ' ']);

    subject = decrement(subject, target);

    expect(subject.digits).toStrictEqual([' ']);

    subject = decrement(subject, target);

    expect(subject.digits).toStrictEqual([]);
});