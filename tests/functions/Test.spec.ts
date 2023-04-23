import { diff, h } from '../../src/functions';
import VNode from '../../src/VNode';

test('creating a VNode with a single string', () => {
    const vnode: VNode = h('div', 'test');

    console.log(vnode);

    expect(vnode.tagName).toBe('div');
    expect(vnode.attributes).toBe({});
    expect(vnode.childNodes).toBe([{
        tagName: 'text',
        textContent: 'test'
    }]);
});

test('creating a VNode with an array of children', () => {
    const vnode: VNode = h('div', [
        'a',
        'b',
        'c'
    ]);

    expect(vnode.tagName).toBe('div');
    expect(vnode.attributes).toBe({});
    expect(vnode.childNodes).toBe([{
        tagName: 'text',
        textContent: 'a'
    },{
        tagName: 'text',
        textContent: 'b'
    },{
        tagName: 'text',
        textContent: 'c'
    }]);
});
