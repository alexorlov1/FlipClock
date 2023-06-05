import { createEffect, createSignal, defineState } from "../../src/helpers/signal";

test('defining a state', () => {
    const state = defineState({
        count: 0
    });

    const fn = jest.fn(() => {
        console.log(state.count);
    });

    createEffect(fn);

    expect(state.count).toBe(0);

    state.count = 1;

    expect(state.count).toBe(1);

    state.count = 2;

    expect(state.count).toBe(2);

    expect(fn).toBeCalledTimes(3);
})

test('using a signal', () => {
    const [ getCount, setCount ] = createSignal(0);

    let calls = 0;

    createEffect(() => calls = getCount());

    expect(calls).toBe(0);

    setCount(1);

    expect(getCount()).toBe(1);

    setCount(2);

    expect(getCount()).toBe(2);
    
    setCount(3);

    expect(getCount()).toBe(3);

    expect(calls).toBe(3);
});
