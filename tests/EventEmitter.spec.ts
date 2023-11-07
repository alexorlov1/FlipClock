import { EventEmitter } from '../src/EventEmitter';

test('binding and unbinding events to an emitter', () => {
    const emitter = new EventEmitter<{
        foo: () => void
        bar: () => void
    }>();

    const foo = jest.fn();
    const bar = jest.fn();

    emitter.on('foo', foo);
    emitter.on('bar', bar);
    emitter.once('foo', foo);

    const unwatch = emitter.on('foo', foo);

    emitter.emit('foo');
    
    expect(foo).toBeCalledTimes(2);

    unwatch();

    emitter.emit('foo');

    expect(foo).toBeCalledTimes(3);

    emitter.off('foo', foo);
    emitter.emit('foo');
    
    expect(foo).toBeCalledTimes(3);

    emitter.on('bar', bar);
    emitter.emit('bar');

    expect(bar).toBeCalledTimes(2);
    
    emitter.reset();
    
    emitter.emit('bar');

    expect(bar).toBeCalledTimes(2);
});