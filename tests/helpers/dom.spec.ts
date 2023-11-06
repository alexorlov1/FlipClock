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