import { h } from "./functions";
import Label from "./Label";
import VNode, { DomElement } from "./VNode";

/**
 * The Group class groups DOM elements together.
 */
export default class Group implements DomElement {

    /**
     * The children in the group.
     */
    public readonly items: DomElement[];
    
    /**
     * The group's label.
     */
    public readonly label?: string;
    
    /**
     * Construct the Group.
     */
    constructor(attributes: Partial<Group>) {
        this.items = attributes.items || [];
        this.label = attributes.label;
    }
    
    /**
     * Render the VNode.
     */
    render(): VNode {
        return h('div', {
            class: 'flip-clock-group'
        }, [
            this.label && new Label(this.label),
            h('div', {
                class: 'flip-clock-group-items'
            }, this.items)
        ])
    }
}