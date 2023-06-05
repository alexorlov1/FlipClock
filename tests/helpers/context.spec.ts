import { context, structured } from '../../src/helpers/context';

test('using a structured context', () => {
    const ctx = structured([['1', ['2', ['3']]]]);
    
    expect(ctx.useContext(0).value).toStrictEqual(['1', ['2', ['3']]]);
    expect(ctx.useContext(0).useContext(0).value).toStrictEqual('1');
    expect(ctx.useContext(0).useContext(1).value).toStrictEqual(['2', ['3']]);
    expect(ctx.useContext(0).useContext(1).useContext(0).value).toStrictEqual('2');
    expect(ctx.useContext(0).useContext(1).useContext(1).value).toStrictEqual(['3']);
    expect(ctx.useContext(0).useContext(1).useContext(1).useContext(0).value).toStrictEqual('3');
});

test('using a context', () => {
    const ctx = context({
        a: context({
            some: 'value'
        }),
        b: structured([
            1, 2
        ]),
        c: structured([
            context({id: 1}),
            context({id: 2})
        ]),
        d: 'test'
    });

    expect(ctx.value).toStrictEqual({
        a: { some: 'value' },
        b: [1, 2],
        c: [{id: 1}, {id: 2}],
        d: 'test'
    });

    expect(ctx.useContext(0).value).toStrictEqual({
        a: { some: 'value' },
        b: 1,
        c: {id: 1},
        d: 'test'
    });

    expect(ctx.useContext(1).value).toStrictEqual({
        a: { some: 'value' },
        b: 2,
        c: {id: 2},
        d: 'test'
    });

    expect(ctx.useContext(2).value).toStrictEqual({
        a: { some: 'value' },
        b: undefined,
        c: undefined,
        d: 'test'
    });
});