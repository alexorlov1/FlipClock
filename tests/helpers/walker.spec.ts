import VNode from "../../src/VNode";
import { DomElement, h } from "../../src/helpers/dom";
import { createWalker, defineContext } from "../../src/helpers/walker";
import { FlipClockThemeLabels } from "../../src/themes/flipclock";
import Card from "../../src/themes/flipclock/Card";
import Group from "../../src/themes/flipclock/Group";
import { DigitizedValues } from './../../src/helpers/digitizer';

test('walking through the array and passing some context', () => {
    const currentValue: DigitizedValues = ['2', ['3', ['4']]];
    const targetValue: DigitizedValues = ['3', ['4', ['5']]];
    const lastValue: DigitizedValues = ['1', ['2', ['3']]];

    const found = {
        targetValues: [],
        lastValues: []
    }

    const walk = createWalker(defineContext<{
        targetValue: DigitizedValues,
        lastValue: DigitizedValues
    }>({
        targetValue,
        lastValue
    }), 'backwards');

    const walked = walk(currentValue.slice(), (value, context) => {
        if(Array.isArray(value)) {
            return value;
        }
        
        found.targetValues.push(context.targetValue)
        found.lastValues.push(context.lastValue);

        return String(parseInt(value) + 1);
    })

    expect(walked).toStrictEqual(['3', ['4', ['5']]])
    expect(found.targetValues).toStrictEqual(['5', '4', '3'])
    expect(found.lastValues).toStrictEqual(['3', '2', '1'])
})

test('walking through the array like a theme would', () => {
    const currentValue: DigitizedValues = ['a', ['b']];

    const ctx = defineContext<{
        labels: FlipClockThemeLabels,
    }>({
        labels: ['1', ['2']]
    });

    const walk = createWalker(ctx);

    const walked = walk<Group>(currentValue.slice(), (value, context) => {
        if(Array.isArray(value)) {
            return new Group({
                label: typeof context.labels === 'string'
                    ? context.labels
                    : undefined,
                items: value as unknown as DomElement[]
            })
        }

        return new Card(value);
    });

    expect(h(walked)).toBeInstanceOf(VNode)
    expect(walked).toBeInstanceOf(Group)
    expect(walked.label).toBe('1')
    expect(walked.items).toHaveLength(2)
    expect(walked.items[0]).toBeInstanceOf(Card)
    expect(walked.items[1]).toBeInstanceOf(Group)
    expect((walked.items[1] as Group).label).toBe('2')
    expect((walked.items[1] as Group).items[0]).toBeInstanceOf(Card)
})