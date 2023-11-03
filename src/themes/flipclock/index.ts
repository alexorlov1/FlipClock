import { type FaceValue } from '../../FaceValue';
import { type FlipClock } from "../../FlipClock";
import { type DigitizedValue, type DigitizedValues } from "../../helpers/digitizer";
import { classes, el, type HTMLClassAttribute } from "../../helpers/dom";
import { debounce } from "../../helpers/functions";

/**
 * @public
 */
export type Dividers = RegExp | string | string[];

/**
 * The FlipClock theme options.
 * 
 * @public
 */
export type FlipClockThemeOptions = {
    labels?: DigitizedValues,
    dividers?: Dividers
}

/**
 * The theme's factory function.
 * 
 * @public
 */
export function theme(options: FlipClockThemeOptions = {}) {
    return {
        render: (instance: FlipClock<any>) => render({
            el: instance.el,
            labels: options.labels,
            dividers: options.dividers,
            value: instance.face.faceValue(),
        })
    }
}

/**
 * @public
 */
export type ClockOptions = {
    dividers?: Dividers,
    el?: Element | null,
    labels?: DigitizedValues | string,
    value: FaceValue<unknown>,
}

/**
 * Renders a FlipClock.
 * 
 * @public
 */
export function render(options: ClockOptions) {
    function regexp(dividers?: Dividers): RegExp|undefined {
        if(divider === undefined) {
            return;
        }

        if(dividers instanceof RegExp) {
            return dividers;
        }

        return new RegExp(
            `[${(Array.isArray(dividers) ? dividers : [dividers]).join('|')}]`
        );
    }
    
    function isDivider(value: DigitizedValue, dividers?: Dividers) {
        const pattern = regexp(dividers);

        if(!pattern) {
            return false;
        }

        return value.match(pattern);
    }


    function walk(digits: DigitizedValues | string, el?: Element | null, labels?: string | DigitizedValues): Element {
        if(Array.isArray(digits)) {
            const nextLabel = typeof labels === 'string'
                ? undefined
                : labels?.shift();
            
            return group({
                el,
                label: typeof nextLabel === 'string' ? nextLabel : undefined,
                children: parent => digits.map((digits, i) => {
                    return walk(
                        digits,
                        parent?.children.item(i),
                        nextLabel,
                    );
                })
            });
        }
        
        if(isDivider(digits, options.dividers)) {
            return divider({
                el,
                value: digits
            });
        }

        return card({
            el,
            value: digits
        })
    }

    const labels = Array.isArray(options.labels)
        ? structuredClone(options.labels)
        : options.labels;
    
    return el({
        el: options.el,
        tagName: 'div',
        class: {
            'flip-clock': true
        },
        children: options.value.digits.map((digits, i) => walk(
            digits,
            options?.el?.children.item(i),
            labels
        ))
    });
}

/**
 * @public
 */
export type FlipClockGroupOptions = {
    el?: Element | null,
    label?: string,
    depth?: number,
    children: ((parent: Element) => Element[])
}

/**
 * Renders a group element.
 * 
 * @public
 */
export function group(options: FlipClockGroupOptions): Element {
    return el({
        el: options.el,
        tagName: 'div',
        class: 'flip-clock-group',
        children: parent => [
            !!options.label && el({
                el: parent.querySelector('.flip-clock-label'),
                tagName: 'div',
                class: 'flip-clock-label',
                children: [ options.label ]
            }),
            el({
                el: parent.querySelector('.flip-clock-group-items'),
                tagName: 'div',
                class: 'flip-clock-group-items',
                children: options.children
            })
        ]
    })
}

/**
 * @public
 */
export type CardOptions = {
    el?: Element | null,
    value: string
}

/**
 * Renders a card element.
 * 
 * @public
 */
export function card(options: CardOptions): Element {
    const lastValue = options.el?.getAttribute('data-value');

    const element = el({
        el: options.el,
        tagName: 'div',
        attrs: {
            'data-value': options.value
        },
        class: {
            'flip-clock-card': true,
            'animate': options.el?.getAttribute('data-value') !== options.value
        },
        events: {
            onanimationend() {
                debounced();
            }
        },
        children: parent => {
            const active = cardItem({
                el: parent.children.item(0),
                value: options.value,
                class: 'active'
            });

            const before = cardItem({
                el: parent.children.item(1),
                value: lastValue,
                class: 'before'
            })

            return [
                active,
                before
            ]
        }
    });

    const debounced = debounce(() => {
        element.classList.remove('animate')
    }, 100);

    return element;
}

/**
 * @public
 */
export type CardItemOptions = {
    el?: Element | null,
    value?: string | null,
    class?: HTMLClassAttribute
}

/**
 * Renders a card item.
 * 
 * @public
 */
export function cardItem(options: CardItemOptions): Element {
    return el({
        el: options.el,
        tagName: 'div',
        class: {
            'flip-clock-card-item': true,
            [classes(options?.class)]: !!options?.class
        },
        children: parent => {
            return [
                el({
                    el: parent.children.item(0),
                    tagName: 'div',
                    class: 'flip-clock-card-item-inner',
                    children: parent =>[
                        el({
                            el: parent.children.item(0),
                            tagName: 'div',
                            class: 'top',
                            children: [options?.value ?? ' ']
                        }),
                        el({
                            el: parent.children.item(1),
                            tagName: 'div',
                            class: 'bottom',
                            children: [options?.value ?? ' ']
                        })       
                    ]
                })
            ]
        }
    });
}

/**
 * @public
 */
export type DividerOptions = {
    el?: Element | null,
    value: string
}

/**
 * Renders a divider.
 * 
 * @public
 */
export function divider(options: DividerOptions) {
    return el({
        el: options.el,
        tagName: 'div',
        class: 'flip-clock-divider',
        children: parent => [
            el({
                el: parent.childNodes.item(0),
                tagName: 'div',
                class: 'flip-clock-divider-inner',
                children: [
                    options.value
                ]
            })
        ]
    });
}