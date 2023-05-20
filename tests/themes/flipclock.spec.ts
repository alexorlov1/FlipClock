import { FaceValue } from "../../src/FaceValue";
import FlipClock from "../../src/FlipClock";
import Alphanumeric from "../../src/faces/Alphanumeric";
import { h, render } from "../../src/helpers/dom";
import { useFlipClockTheme } from "../../src/themes/flipclock";
import Card from "../../src/themes/flipclock/Card";
import Divider from "../../src/themes/flipclock/Divider";
import Group from "../../src/themes/flipclock/Group";
import { Label } from "../../src/themes/flipclock/Label";

test('rendering labels within a nested groups', () => {
    const el = document.createElement('div');

    const theme = useFlipClockTheme({
        labels: ['a', ['b']]
    });

    const face = new Alphanumeric({
        currentValue: new FaceValue(['a', ['b']]),
        targetValue: new FaceValue(['a', ['b']])
    });

    const clock = new FlipClock({
        el,
        face,
        theme,
        timer: 100,
        autoStart: false,
    });

    clock.render();

    // const labels = el.querySelectorAll('.flip-clock-label');

    // expect(labels).toHaveLength(2);
    // expect(labels?.[0].textContent).toBe('a');
    // expect(labels?.[1].textContent).toBe('b');
});

test('rendering a clock using the theme', () => {
    jest.useFakeTimers();

    const el = document.createElement('div');

    const theme = useFlipClockTheme({
        // animationRate: 100
    });

    const face = new Alphanumeric({
        value: new FaceValue('b')
    });

    const clock = new FlipClock({
        el,
        face,
        theme,
        timer: 100
    })

    expect(el.classList).toContain('flip-clock')
    
    jest.advanceTimersByTime(100)
    
    expect(el.querySelector('.active')?.children[0]?.children[0]?.textContent).toBe('a')
    expect(el.querySelector('.active')?.children[0]?.children[1]?.textContent).toBe('a')
    expect(el.querySelector('.before')?.children[0]?.children[0]?.textContent).toBe(' ')
    expect(el.querySelector('.before')?.children[0]?.children[1]?.textContent).toBe(' ')

    jest.advanceTimersByTime(100)

    expect(el.querySelector('.active')?.children[0]?.children[0]?.textContent).toBe('b')
    expect(el.querySelector('.active')?.children[0]?.children[1]?.textContent).toBe('b')
    expect(el.querySelector('.before')?.children[0]?.children[0]?.textContent).toBe('a')
    expect(el.querySelector('.before')?.children[0]?.children[1]?.textContent).toBe('a')
});

test('creating a label', () => {
    const el = render<HTMLElement>(h(new Label('test')));

    expect(el.classList).toContain('flip-clock-label');
    expect(el.textContent).toBe('test')
});

test('creating a group', () => {
    const el = render<HTMLElement>(
        h(new Group({
            label: 'Hello!',
            items: [
                h('div', 0),
                h('div', 1)
            ]
        }))
    );

    expect(el.classList).toContain('flip-clock-group');
    expect(el.children[0].classList).toContain('flip-clock-label');
    expect(el.children[0].textContent).toBe('Hello!');
    expect(el.children[1].classList).toContain('flip-clock-group-items');
    expect(el.children[1].children[0].textContent).toBe('0')
    expect(el.children[1].children[1].textContent).toBe('1')
});

test('creating a card with items', () => {
    const el = render<HTMLElement>(
        h(new Card('a', ' '))
    );

    expect(el.classList).toContain('flip-clock-card');
    expect(el.children).toHaveLength(2);

    expect(el.children[0].classList).toContain('flip-clock-card-item')
    expect(el.children[0].children[0].classList).toContain('flip-clock-card-item-inner');
    expect(el.children[0].children[0].children[0].textContent).toBe('a')
    expect(el.children[0].children[0].children[1].textContent).toBe('a')

    expect(el.children[1].classList).toContain('flip-clock-card-item')
    expect(el.children[1].children[0].classList).toContain('flip-clock-card-item-inner');
    expect(el.children[1].children[0].children[0].textContent).toBe(' ')
    expect(el.children[1].children[0].children[1].textContent).toBe(' ')
})

test('creating a divider', () => {
    const el = render<HTMLElement>(
        h(new Divider('-'))
    );

    expect(el.classList).toContain('flip-clock-divider');
    expect(el.children).toHaveLength(1);
    expect(el.children[0].classList).toContain('flip-clock-divider-inner')
    expect(el.children[0].textContent).toContain('-')
})