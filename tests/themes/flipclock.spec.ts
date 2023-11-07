import { faceValue } from '../../src/FaceValue';
import { flipClock } from '../../src/FlipClock';
import { alphanumeric } from '../../src/faces/Alphanumeric';
import { card, cardItem, divider, group, theme } from '../../src/themes/flipclock/index';

test('creating a divider', () => {
    const el = divider({
        value: ':'
    });

    expect(el.outerHTML).toBe('<div class=\"flip-clock-divider\"><div class=\"flip-clock-divider-inner\">:</div></div>');
});

test('creating a card item', () => {
    const el = cardItem({
        value: 'a'
    });

    expect(el.outerHTML).toBe('<div class=\"flip-clock-card-item\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">a</div><div class=\"bottom\">a</div></div></div>');
});

test('creating a card', () => {
    const el = card({
        value: 'a'
    });

    expect(el.outerHTML).toBe('<div data-value=\"a\" class=\"flip-clock-card animate\"><div class=\"flip-clock-card-item active\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">a</div><div class=\"bottom\">a</div></div></div><div class=\"flip-clock-card-item before\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\"> </div><div class=\"bottom\"> </div></div></div></div>');
});

test('creating a group', () => {
    const el = group({
        children: () => [
            card({
                value: 'a'
            })
        ]
    });

    expect(el.outerHTML).toBe('<div class=\"flip-clock-group\"><div class=\"flip-clock-group-items\"><div data-value=\"a\" class=\"flip-clock-card animate\"><div class=\"flip-clock-card-item active\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">a</div><div class=\"bottom\">a</div></div></div><div class=\"flip-clock-card-item before\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\"> </div><div class=\"bottom\"> </div></div></div></div></div></div>');
});

test('creating an alphanumeric face', () => {
    const el = document.createElement('div');

    const instance = flipClock({
        autoStart: false,
        face: alphanumeric({
            value: faceValue('a'),
            targetValue: faceValue('b'),
            skipChars: 2
        }),
        theme: theme(),
    });

    instance.mount(el);

    expect(el.outerHTML).toBe('<div class=\"flip-clock\"><div data-value=\"a\" class=\"flip-clock-card animate\"><div class=\"flip-clock-card-item active\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">a</div><div class=\"bottom\">a</div></div></div><div class=\"flip-clock-card-item before\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\"> </div><div class=\"bottom\"> </div></div></div></div></div>');

    instance.face.interval(instance);

    expect(el.outerHTML).toBe('<div class=\"flip-clock\"><div class=\"flip-clock-card animate\" data-value=\"b\"><div class=\"flip-clock-card-item active\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">b</div><div class=\"bottom\">b</div></div></div><div class=\"flip-clock-card-item before\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">a</div><div class=\"bottom\">a</div></div></div></div></div>');

    instance.face.interval(instance);

    expect(el.outerHTML).toBe('<div class=\"flip-clock\"><div data-value=\"b\" class=\"flip-clock-card\"><div class=\"flip-clock-card-item active\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">b</div><div class=\"bottom\">b</div></div></div><div class=\"flip-clock-card-item before\"><div class=\"flip-clock-card-item-inner\"><div class=\"top\">b</div><div class=\"bottom\">b</div></div></div></div></div>');
});