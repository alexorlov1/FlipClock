import { el } from '../../src/helpers/dom';

test('creating and updating a div', () => {
    const dev = el({
        tagName: 'div',
        attrs: {
            id: 'test'
        },
        class: {
            test: true
        },
        style: {
            background: 'red'
        },
        children: [
            'test'
        ]
    });

    expect(dev).toBeInstanceOf(HTMLDivElement);
    expect(dev.outerHTML).toBe('<div id="test" class="test" style="background:red">test</div>');

    el({
        el: dev,
        tagName: 'div',
        attrs: {
            ['data-test']: 'test'
        },
        class: {
            test: false
        }
    });

    expect(dev.outerHTML).toBe('<div data-test=\"test\"></div>');

    el({
        el: dev,
        tagName: 'div',
        children: [
            '1',
            el({
                tagName: 'div',
                class: 'test',
                children: [
                    '2'
                ]
            })
        ]
    });

    expect(dev.outerHTML).toBe('<div>1<div class=\"test\">2</div></div>');

    el({
        el: dev,
        tagName: 'div'
    });

    expect(dev.outerHTML).toBe('<div></div>');
});

test('something', () => {
    const onclick = jest.fn();

    const a = el({
        tagName: 'div',
        style: {
            background: 'red'
        },
        events: {
            onclick
        },
        children: [
            '1',
            '2',
            '3'
        ]
    });

    a.click();

    expect(onclick).toBeCalledTimes(1);

    const b = el({
        el: a,
        tagName: 'div',
        style: undefined,
        class: ['a', 'b'],
        children: [
            '1',
            '2'
        ]
    });

    expect(b.outerHTML).toBe('<div class="a b">12</div>');

    const c = el({
        el: b,
        tagName: 'div',
        style: 'background: red',
        children: [
            '1'
        ]
    });

    expect(b.outerHTML).toBe('<div style=\"background: red\">1</div>');
});