import { createSignal, watchEffect } from "../../src/helpers/signal";

test('using a signal', () => {
    const [ getCount, setCount ] = createSignal(0);

    let calls = 0;

    watchEffect(() => calls = getCount());

    expect(calls).toBe(0);

    setCount(1);

    expect(getCount()).toBe(1);

    setCount(2);

    expect(getCount()).toBe(2);
    
    setCount(3);

    expect(getCount()).toBe(3);

    expect(calls).toBe(3);
});
