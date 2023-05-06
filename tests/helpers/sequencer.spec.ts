import { FaceValue } from '../../src/FaceValue';
import { castDigitizedGroup, castDigitizedString, castDigitizedValues, matchArrayStructure, matchDataType, matchStructureLength, useSequencer, walk } from '../../src/helpers/sequencer';

test('incrementing a face value', () => {
    let value = new FaceValue(['a', ['b', ['c']]]),
        target = new FaceValue(['1', ['2', ['3']]]);

    const { increment } = useSequencer();

    expect(increment(value, target).digits).toStrictEqual(['b', ['c', ['d']]]);
    expect(increment(value, target, 2).digits).toStrictEqual(['d', ['e', ['f']]]);
    expect(increment(value, target, 100).digits).toStrictEqual(['1', ['2', ['3']]]);
});

test('incrementing a face value with a character not in the charset', () => {
    let value = new FaceValue('test'),
        target = new FaceValue('hello!');

    const { increment } = useSequencer();

    expect(increment(value, target).digits).toStrictEqual([['u', 'e', 't', 'u', 'a', 'a']]);
    expect(increment(value, target, 5).digits).toStrictEqual([['z', 'e', 'y', 'z', 'f', 'f']]);
    expect(increment(value, target, 100).digits).toStrictEqual([['h', 'e', 'l', 'l', 'o', '!']]);
});

test('decrementing a face value', () => {
    let value = new FaceValue(['1', ['2', ['3']]]),
        target = new FaceValue(['a', ['b', ['c']]]);

    const { decrement } = useSequencer();

    expect(decrement(value, target).digits).toStrictEqual(['0', ['1', ['2']]]);
    expect(decrement(value, target, 2).digits).toStrictEqual(['Y', ['Z', ['0']]]);
    expect(decrement(value, target, 100).digits).toStrictEqual(['a', ['b', ['c']]]);
});

test('decrementing a face value with a character not in the charset', () => {
    let value = new FaceValue('test'),
        target = new FaceValue('hello!');

    const { decrement } = useSequencer();

    expect(decrement(value, target).digits).toStrictEqual([['s', 'e', 'r', 's', '?', '?']]);
    expect(decrement(value, target, 5).digits).toStrictEqual([['n', 'e', 'm', 'n', '8', '!']]);
    expect(decrement(value, target, 2000).digits).toStrictEqual([['h', 'e', 'l', 'l', 'o', '!']]);
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

test('matching array lengths', () => {
    expect(matchArrayStructure(['1'], ['1'])).toStrictEqual(['1']);
    expect(matchArrayStructure(['1'], ['1', '2'])).toStrictEqual(['1']);
    expect(matchArrayStructure(['1'], [['1', '2']])).toStrictEqual([['1']]);
    expect(matchArrayStructure(['1'], [['1', '2'], ['3', '4']])).toStrictEqual([['1'], []]);
    expect(matchArrayStructure(['1'], [['1'], ['2']])).toStrictEqual([['1'], []]);

    expect(matchArrayStructure(['1', '2'], ['1'])).toStrictEqual(['1']);
    expect(matchArrayStructure([['1', '2']], ['1'])).toStrictEqual(['1']);
    expect(matchArrayStructure([['1', '2'], ['3', '4']], ['1'])).toStrictEqual(['1']);
    expect(matchArrayStructure([['1'], ['2']], ['1'])).toStrictEqual(['1']);

    expect(matchArrayStructure(['1', ['2']], [['1'], '2'])).toStrictEqual([['1'], '2']);
    expect(matchArrayStructure([['1'], '2'], ['1', ['2']])).toStrictEqual(['1', ['2']]);
    expect(matchArrayStructure([['1', '2'], '2'], ['1', '3', ['2']])).toStrictEqual(['1', '2', []]);
})

test('matching structure', () => {
    expect(matchStructureLength(['1'], ['1', '2'], ' ')).toStrictEqual(['1', ' ']);
    expect(matchStructureLength(['1', '2'], ['1', '2'], ' ')).toStrictEqual(['1', '2']);
    expect(matchStructureLength(['1', ['2']], ['1', ['2', '3']], ' ')).toStrictEqual(['1', ['2', ' ']]);
    expect(matchStructureLength(['1', ['2', '4']], ['1', ['2', '3']], ' ')).toStrictEqual(['1', ['2', '4']]);


    expect(matchStructureLength(['1'], ['1', '2'], ' ', 'left')).toStrictEqual([' ', '1']);
    expect(matchStructureLength(['1', '2'], ['1', '2'], ' ', 'left')).toStrictEqual(['1', '2']);
    expect(matchStructureLength(['1', ['2']], ['1', ['2', '3']], ' ', 'left')).toStrictEqual(['1', [' ', '2']]);
    expect(matchStructureLength(['1', ['2', '4']], ['1', ['2', '3']], ' ', 'left')).toStrictEqual(['1', ['2', '4']]);
})

test('walking through arrays', () => {
    let stopped = false;

    function tick(value: string) {
        return stopped ? value : String(parseInt(value) + 1)
    }

    function createWalker(fn?: Function) {
        return jest.fn((value, target) => {
            if(typeof fn === 'function') {
                return fn(value, target);
            }

            return tick(value)
        });
    };

    function stopAfter(times: number) {
        let count = 0;

        return (value, target) => {
            count++;

            if (count >= times) {
                return false;
            }
            
            return value;
        }
    }

    const subject = ['1', ['2', ['3']]];

    const walker = createWalker();

    walk(subject, walker);

    expect(walker).toHaveBeenCalledTimes(3);
    expect(subject).toStrictEqual(['2', ['3', ['4']]]);

    const walker2 = createWalker(() => {
        return true;
    });

    walk(subject, walker2);

    expect(walker2).toHaveBeenCalledTimes(3);
    expect(subject).toStrictEqual(['2', ['3', ['4']]]);

    const walker3 = createWalker(stopAfter(2));

    walk(subject, walker3);

    expect(walker3).toHaveBeenCalledTimes(2);
    expect(subject).toStrictEqual(['2', ['3', ['4']]]);

    const walker4 = createWalker((value) => [value].concat('1'));

    walk(subject, walker4);

    expect(subject).toStrictEqual([['2', '1'], [['3', '1'], [['4', '1']]]]);
})