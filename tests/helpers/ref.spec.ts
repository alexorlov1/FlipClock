import { computed, ref } from '../../src/helpers/ref';

test('reactivity functions', () => {
    const foo = ref(1);
    const bar = computed(() => {
        return foo.value.toString();
    });

    const writeable = computed({
        get() {
            return bar.value;
        },
        set(value: string) {
            foo.value = parseInt(value);
        }
    });

    expect(foo.value).toBe(1);
    expect(writeable.value).toBe('1');

    foo.value++;

    expect(foo.value).toBe(2);
    expect(writeable.value).toBe('2');

    writeable.value = '3';

    expect(foo.value).toBe(3);
    expect(writeable.value).toBe('3');
});