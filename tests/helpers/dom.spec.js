import { diff, h, instersectAttributes, render } from '../../src/helpers/dom';


test('creating a div', () => {
    const onClick1 = jest.fn();

    const el = document.createElement('div');

    const div1 = h('div', { class: 'test', 'data-test': 1}, '1');

    expect(div1.tagName).toBe('div');
    expect(div1.attributes.class).toBe('test');
    expect(div1.childNodes).toHaveLength(1);
    expect(div1.childNodes[0].textContent).toBe('1');

    diff(el, div1);

    expect(el.textContent).toBe('1');
    expect(el.getAttribute('class')).toBe('test');
    expect(el.getAttribute('data-test')).toBe('1');

    const div2 = h('div', { class: 'test2', onClick: onClick1 }, ['2']);

    diff(el, div2);

    expect(el.textContent).toBe('2');
    expect(el.getAttribute('class')).toBe('test2');
    expect(el.getAttribute('data-test')).toBe(null);

    el.click();

    const div3 = h('div', {'data-test': 0}, ['3', '4']);

    diff(el, div3);

    expect(el.textContent).toBe('34');
    expect(el.getAttribute('data-test')).toBe('0');

    expect(onClick1).toHaveBeenCalledTimes(1);
});

test('creating a dom tree that represents a bulleted list', () => {
    const ul = h('ul', [
        h('li', 'item 1'),
        h('li', 'item 2'),
        h('li', 'item 3')
    ]);

    expect(ul.tagName).toBe('ul');
    expect(ul.childNodes).toHaveLength(3);
    expect(ul.childNodes[0].tagName).toBe('li');
    expect(ul.childNodes[0].childNodes[0].textContent).toBe('item 1');
    expect(ul.childNodes[1].tagName).toBe('li');
    expect(ul.childNodes[1].childNodes[0].textContent).toBe('item 2');
    expect(ul.childNodes[2].tagName).toBe('li');
    expect(ul.childNodes[2].childNodes[0].textContent).toBe('item 3');

    const el = render(ul);

    expect(el.outerHTML).toBe('<ul><li>item 1</li><li>item 2</li><li>item 3</li></ul>');
});

test('adding and removing attributes', () => {
    let vnode = h('div', { ['data-id']: 'some-id' }, 'some text');

    const el = render(vnode);

    expect(el.outerHTML).toBe('<div data-id="some-id">some text</div>');

    vnode = h('div', { id: 'some-id' }, 'some text');

    diff(el, vnode);

    expect(el.outerHTML).toBe('<div id="some-id">some text</div>');
});

test('creating 2 vnode and diff\'ing them between making changes', () => {
    const ul = h('ul', [
        h('li', { ['data-id']: '1'}, 'item 1'),
        h('li', { ['data-id']: '2' }, 'item 2'),
        h('li', { ['data-id']: '3' }, 'item 3')
    ]);

    const el = render(ul);

    expect(el.outerHTML).toBe('<ul><li data-id="1">item 1</li><li data-id="2">item 2</li><li data-id="3">item 3</li></ul>');

    const change1 = h('ul', [
        h('li', { class: 'odd' }, 'item 1'),
        h('li', { class: 'even' }, 'item 2'),
        h('li', { class: 'odd' }, 'item 3'),
        h('li', { class: 'even' }, 'item 4')
    ]);

    diff(el, change1);

    expect(el.outerHTML).toBe('<ul><li class="odd">item 1</li><li class="even">item 2</li><li class="odd">item 3</li><li class="even">item 4</li></ul>');

    const change2 = h('ul', [
        h('li', { class: 'odd' }, 'item 1'),
        h('li', { class: 'even' }, 'item 2'),
        h('li', { class: 'odd' }, 'item 3'),
        h('li', { class: 'even' }, 'item 4'),
        h('li', { class: 'odd' }, 'item 5')
    ]);

    diff(el, change2);

    expect(el.outerHTML).toBe('<ul><li class="odd">item 1</li><li class="even">item 2</li><li class="odd">item 3</li><li class="even">item 4</li><li class="odd">item 5</li></ul>');
    
    const change3 = h('ul', [
        h('li', { class: 'odd' }, 'item 1'),
        h('li', { class: 'odd' }, 'item 3'),
        h('li', { class: 'odd' }, 'item 5')
    ]);

    diff(el, change3);

    expect(el.outerHTML).toBe('<ul><li class="odd">item 1</li><li class="odd">item 3</li><li class="odd">item 5</li></ul>');

    const change4 = h('ul', [
        h('li', { class: 'even' }, [
            h('span', 'item 2'),
        ]),
        h('li', { class: 'even' }, [
            h('span', 'item 4'),
        ]),
        h('li', { class: 'even' }, [
            h('span', 'item 6')
        ])
    ]);

    diff(el, change4);

    expect(el.outerHTML).toBe('<ul><li class="even"><span>item 2</span></li><li class="even"><span>item 4</span></li><li class="even"><span>item 6</span></li></ul>');
})

test('interecting a vnode with a dom element', () => {
    const vnode = h('div', { class: 'test' }, 'test');

    const el = render(vnode);

    el.setAttribute('id', 'added');
    el.setAttribute('class', 'changed');
    
    vnode.attributes['data-id'] = 'added';

    const { added, modified, removed } = instersectAttributes(el, vnode);

    expect(added).toStrictEqual([{ attribute: 'data-id', value: 'added' }]);
    expect(removed).toStrictEqual([{ attribute: 'id', value: 'added'  }]);
    expect(modified).toStrictEqual([{
        attribute: 'class',
        from: 'changed',
        to: 'test'
    }]);
})