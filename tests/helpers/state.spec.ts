import { useState } from "../../src/helpers/state";

test('using the state', () => {
    const fn1 = jest.fn(), fn2 = jest.fn(), fn3 = jest.fn(), fn4 = jest.fn();

    const state = useState<{
        count: number;
    }>({ count: 0 });

    state.watch(fn1);
    state.watch(fn2);
    state.watch(fn3);
    state.once(fn4);

    expect(state.count).toBe(0)

    state.update({
        count: state.count + 1
    });

    state.off(fn1);

    expect(state.count).toBe(1)

    state.update({
        count: state.count + 1
    });

    state.off(fn2);

    state.update({
        count: state.count + 1
    });

    expect(state.count).toBe(3)

    state.unwatch();

    state.update({
        count: state.count + 1
    });
    
    expect(state.count).toBe(4)
    expect(fn1).toBeCalledTimes(1);
    expect(fn2).toBeCalledTimes(2);
    expect(fn3).toBeCalledTimes(3);
    expect(fn4).toBeCalledTimes(1);
});