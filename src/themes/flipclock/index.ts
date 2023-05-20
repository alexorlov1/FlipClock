import { FaceState } from "../../Face";
import FlipClock from "../../FlipClock";
import VNode from "../../VNode";
import { DigitizedValue, DigitizedValues } from "../../helpers/digitizer";
import { DomElement, h } from "../../helpers/dom";
import { WalkerDirection, WalkerFactoryFunction, createWalker, defineContext } from "../../helpers/walker";
import { Theme, ThemeContext } from "../../types";
import Card from "./Card";
import Group from "./Group";

export type FlipClockThemeLabels = DigitizedValues;

export type FlipClockThemeOptions = {
    animationRate?: number,
    labels?: FlipClockThemeLabels,
    direction?: WalkerDirection
    createWalker?: WalkerFactoryFunction<FlipClockThemeContext>
}

export type FlipClockThemeContext = ThemeContext & {
    labels?: FlipClockThemeLabels
};

/**
 * The FlipClock theme.
 * 
 * @public
 */
export function useFlipClockTheme(options: FlipClockThemeOptions): Theme {
    // const animationRate = options.animationRate || 100;

    function render<T extends FaceState = FaceState>(instance: FlipClock, context: T): VNode {
        const ctx = defineContext<FlipClockThemeContext>({
            labels: options.labels,
            currentValue: context.currentValue.digits,
            lastValue: context.lastValue.digits,
            targetValue: context.targetValue.digits
        });

        const walk = createWalker(ctx);

        const tree = walk<Group>(context.currentValue.digits, (value, context) => {
            if (Array.isArray(value)) {
                return new Group({
                    label: typeof context.labels === 'string'
                        ? context.labels
                        : undefined,
                    items: value as unknown as DomElement[]
                })
            }

            return new Card(value, (context.lastValue as DigitizedValue || ' '));
        });
        
        return h('div', {
            class: 'flip-clock',
            // style: `animation-duration: ${animationRate}ms; animation-delay: ${animationRate / 2}ms`,
            type: 'flip-clock'
        }, [ h(tree) ]);
    }

    return {
        render
    }
}

// /**
//  * Get the label using the given flag.
//  */
// function label(format: string | undefined, x: number, y: number): string | undefined {
//     // If there are no labels, then just return undefined.
//     if (options.labels === undefined) {
//         return;
//     }

//     // If labels is an array, then try to extract the labels from the x,y
//     // coordinates of the multi-dimensional array.
//     if (Array.isArray(options.labels)
//         && options.labels[x]
//         && typeof options.labels[x][y] === 'string') {
//         return options.labels[x][y] as string;
//     }

//     // Get the flag groups
//     const flagGroups: string[] = String(format).split(/\s+/);

//     // Split the flag group using the pattern to match dividers.
//     const flagGroup: string[] = flagGroups[x]?.split(pattern);

//     // From the flag group, use the offset to get the current flag
//     const flag: string = flagGroup[y];

//     return options.labels[flag];
// }
