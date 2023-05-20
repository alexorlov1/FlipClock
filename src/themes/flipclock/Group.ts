import VNode from "../../VNode";
import { h } from "../../helpers/dom";
import { DomElement } from './../../helpers/dom';
import { Label } from "./Label";

export type GroupProps = Pick<Group, 'items'|'label'>

/**
 * The Group class groups DOM elements together.
 */
export default class Group implements DomElement {

    /**
     * The children in the group.
     */
    public readonly items: (VNode | DomElement)[];
    
    /**
     * The group's label.
     */
    public readonly label?: string;
    
    /**
     * Construct the Group.
     */
    constructor(attrs: GroupProps) {
        this.items = attrs.items;
        this.label = attrs.label;
    }
    
    /**
     * Render the VNode.
     */
    render(): VNode {
        return h('div', {
            class: 'flip-clock-group',
            type: 'flip-clock-group'
        }, [
            this.label && h(new Label(this.label)),
            h('div', {
                class: 'flip-clock-group-items'
            }, this.items)
        ])
    }
}