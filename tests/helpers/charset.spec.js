import { characterRange, defaultCharset, range, useCharset } from "../../src/helpers/charset";

test('using a charset', () => {
    const { chunk, isBlacklisted, isWhitelisted, next, prev } = useCharset({
        whitelist: '!',
        blacklist: '#'
    });

    expect(chunk('a', 1)).toStrictEqual(['b']);
    expect(chunk('a', 5)).toStrictEqual(['b', 'c', 'd', 'e', 'f']);

    expect(chunk('z', -1)).toStrictEqual(['y']);
    expect(chunk('z', -5)).toStrictEqual(['u', 'v', 'w', 'x', 'y']);

    expect(isWhitelisted('!')).toEqual(true)
    expect(isBlacklisted('#')).toEqual(true)

    expect(next('.', '.')).toBe('.');
    expect(next('!', '!')).toBe('!');
    expect(next('#', '!')).toBe('0');
    expect(next('a', 'z', 1)).toBe('b');
    expect(next('a', 'z', 5)).toBe('f');
    expect(next('a', 'z', 100)).toBe('z');

    expect(prev('.', '.')).toBe('.');
    expect(prev('!', '!')).toBe('!');
    expect(prev('#', '!')).toBe('0');
    expect(prev('z', 'a', 1)).toBe('y');
    expect(prev('z', 'a', 5)).toBe('u');
    expect(prev('z', 'a', 100)).toBe('a');
})

test('using a randomize charset', () => {
    const { chunk } = useCharset({
        shuffle: true
    });

    expect(chunk('a', 1)).not.toStrictEqual(['b']);
    expect(chunk('a', 5)).not.toStrictEqual(['b', 'c', 'd', 'e', 'f']);
})

test('using a custom charset', () => {
    const { chunk } = useCharset({
        charset: () => ['a', 'b', 'c', 'd', 'e', 'f']
    });

    expect(chunk('a', 1)).toStrictEqual(['b']);
    expect(chunk('a', 5)).toStrictEqual(['b', 'c', 'd', 'e', 'f']);
    expect(chunk('a', 100)).toStrictEqual(['b', 'c', 'd', 'e', 'f', 'a']);
})

test('the default charset', () => {
    expect(defaultCharset()).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
})

test('creating character ranges', () => {
    expect(characterRange('a', 'b')).toEqual(['a', 'b'])
    expect(characterRange('a', 'c')).toEqual(['a', 'b', 'c'])
    expect(characterRange('a', 'z')).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
})

test('creating ranges', () => {
    expect(range(5, 1)).toEqual([5])
    expect(range(5, 2)).toEqual([5, 6])
    expect(range(5, 5)).toEqual([5, 6, 7, 8, 9])
    expect(range(5, 10)).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
})