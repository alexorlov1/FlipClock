import { FaceValue } from "../../FaceValue";
import { FlipClock } from "../../FlipClock";
import { DigitizedValues } from "../../helpers/digitizer";
import { HTMLClassAttribute, classes, el } from "../../helpers/dom";
import { debounce } from "../../helpers/functions";
import { watchEffect } from '../../helpers/signal';

export type FlipClockThemeOptions = {
    labels?: DigitizedValues
}

export function theme(options: FlipClockThemeOptions = {}): Theme {
    function render(instance: FlipClock) {
        watchEffect(() => clock({
            el: instance.el,
            labels: options.labels,
            value: instance.face.value,
        }))
    }

    return {
        render
    }
}

export type ClockOptions = {
    value: FaceValue<unknown>,
    el?: Element | null,
    labels?: DigitizedValues
}

export function clock(options: ClockOptions) {
    return el({
        el: options.el,
        tagName: 'div',
        class: {
            'flip-clock': true
        },
        children: parent => [
            group({
                el: parent.children.item(0),
                values: options.value.digits,
                labels: options.labels?.[0]
            })
        ]
    });
}

export type FlipClockGroupOptions = {
    el?: Element|null,
    labels?: DigitizedValues | string,
    values: DigitizedValues,
    depth?: number
}

export function group(options: FlipClockGroupOptions): Element {
    return el({
        el: options.el,
        tagName: 'div',
        class: 'flip-clock-group',
        children: parent => {
            return [
                typeof options.labels === 'string' && el({
                    tagName: 'div',
                    el: parent.querySelector('.flip-clock-group-label'),
                    class: 'flip-clock-label',
                    textContent: options.labels
                }),
                el({
                    el: parent.querySelector('.flip-clock-group-items'),
                    tagName: 'div',
                    class: 'flip-clock-group-items',
                    children: parent => options.values.map((value, i) => {
                        if(Array.isArray(value)) {
                            return group({
                                el: parent.children.item(i),
                                values: value,
                                labels: options.labels?.[i],
                                depth: options.depth ?? 1 + 1
                            });
                        }
        
                        return card({
                            el: parent.children.item(i),
                            value
                        });
                    })
                })
            ];
        }
    });
}

export type CardOptions = {
    el?: Element | null,
    value: string
}

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

export type CardItemOptions = {
    el?: Element|null,
    value?: string | null,
    class?: HTMLClassAttribute
}

export function cardItem(options: CardItemOptions): Element {
    return el({
        el: options.el,
        tagName: 'div',
        class: {
            'flip-clock-card-item': true,
            [classes(options?.class)]: !!options?.class
        },
        children: (parent) => {
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
                            textContent: options?.value ?? ' '
                        }),
                        el({
                            el: parent.children.item(1),
                            tagName: 'div',
                            class: 'bottom',
                            textContent: options?.value ?? ' '
                        })       
                    ]
                })
            ];
        }
    });
}