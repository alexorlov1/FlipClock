import { faceValue } from '../src/FaceValue';

test('various functions on faceValue()', () => {
    const value = faceValue(0);

    expect(value.value).toBe(0);
    expect(value.digits).toStrictEqual(['0']);

    value.value = 1;

    expect(value.value).toBe(1);
    expect(value.digits).toStrictEqual(['1']);

    expect(faceValue(1).compare(value)).toBe(true);

    expect(value.copy().value).toBe(1);
    expect(value.copy(2).value).toBe(2);

    expect(faceValue([1, [2, [3]]]).length).toBe(3);


    expect(faceValue([['hello wold'], ['nice to meet you']]).compare(
        faceValue([['hello wold'], ['nice to meet you']])
    )).toBe(true);
});