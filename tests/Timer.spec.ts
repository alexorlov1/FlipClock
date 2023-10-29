import { timer } from '../src/Timer';

jest.useFakeTimers();

test('if can the timer be started and stopped.', () => {
    const instance = timer(500);

    expect(instance.elapsed).toBe(0);
    expect(instance.elapsedSinceLastLoop).toBe(0);
    expect(instance.interval === 500).toBe(true);
    expect(instance.isRunning).toBe(false);
    expect(instance.isStopped).toBe(true);
    expect(instance.started).toBe(undefined);

    const startCallback = jest.fn();

    instance.start(startCallback);

    expect(instance.count).toBe(1);
    expect(instance.elapsed).toBe(0);
    expect(instance.elapsedSinceLastLoop).toBe(0);
    expect(instance.isRunning).toBe(true);
    expect(instance.isStopped).toBe(false);
    expect(instance.started).toBeInstanceOf(Date);

    const resetCallback = jest.fn();

    instance.reset(resetCallback);

    expect(instance.count).toBe(1);

    const stopCallback = jest.fn();

    instance.stop(stopCallback);

    expect(instance.isRunning).toBe(false);
    expect(instance.isStopped).toBe(true);

    jest.runAllTimers();

    expect(startCallback).toHaveBeenCalledTimes(1);
    expect(resetCallback).toHaveBeenCalledTimes(1);
    expect(stopCallback).toHaveBeenCalledTimes(1);

    expect(instance.isStopped).toBe(true);   
});
