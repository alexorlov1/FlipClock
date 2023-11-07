import { debounce } from '../../src/helpers/functions';
import { parse } from '../../src/helpers/parser';
import { Change, trackChanges } from '../../src/helpers/structure';

test('the array to string parser', () => {
    expect(parse('hello world')).toStrictEqual(['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']);
    expect(parse('[1]')).toStrictEqual([['1']]);
    expect(parse('[1]2')).toStrictEqual([['1'], '2']);
    expect(parse('[1][2]')).toStrictEqual([['1'], ['2']]);
    expect(parse('1[2]')).toStrictEqual(['1', ['2']]);
    expect(parse('1[2]')).toStrictEqual(['1', ['2']]);
});

test('the array to string parser errors', () => {
    expect(() => parse('[1')).toThrow('Expected \"[\", \"]\", or any character but end of input found.');
    expect(() => parse('[[1]')).toThrow('Expected \"[\", \"]\", or any character but end of input found.');
    expect(() => parse('1]')).toThrow('Expected \"[\" or end of input but \"]\" found.');
    expect(() => parse('[1]]')).toThrow('Expected \"[\" or end of input but \"]\" found.');
    expect(() => parse('[1]]')).toThrow('Expected \"[\" or end of input but \"]\" found.');
    expect(() => parse('[1][2')).toThrow('Expected \"[\", \"]\", or any character but end of input found.');
    expect(() => parse('1[2]', { startRule: 'array' })).toThrow();

    try {
        parse('[1][2', { grammarSource: 'test.md' });
    }
    catch (e) {
        expect(e.format([{ source: 'test.md', text: '[1][2' }]).replace(/\n/g, '')).toBe('Error: Expected \"[\", \"]\", or any character but end of input found. --> test.md:1:6  |1 | [1][2  |      ^');
    }
});

test('tracking changes', () => {
    let changes: Change<undefined|number|number[]>[] = [];
    
    const track = trackChanges<[number|number[]], number|number[]>((a, value) => {
        changes = a;

        return Array.isArray(value) ? (value.shift() ?? 0) + 1 : [value + 1];
    });

    track([1]);
    track(2);

    expect(changes).toStrictEqual([{ 'from': [], 'to': 2 }, { 'from': 2, 'to': [3] }]);
});

test('debounce()', () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    
    const debouncer = debounce(fn, 100);

    debouncer();
    debouncer();
    debouncer();
    
    jest.runAllTimers();

    debouncer();
    debouncer();
    debouncer();

    jest.runAllTimers();

    expect(fn).toBeCalledTimes(2);
});