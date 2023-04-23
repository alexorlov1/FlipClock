import { h } from "./functions";
import Label from "./Label";
import ChildNode from "./types/ChildNode";
import DomElement from "./types/DomElement";
import VNode from "./VNode";

/**
 * The Group class groups DOM elements together.
 * 
 * @public
 */
export default class Group implements DomElement {

    /**
     * The children in the group.
     * 
     * @readonly
     */
    public readonly items: ChildNode[];
    
    /**
     * The group's label.
     * 
     * @readonly
     */
    public readonly label?: string;
    
    /**
     * Construct the Group.
     * 
     * @param attributes - The options passed to the instance.
     */
    constructor(attributes: Partial<Group>) {
        this.items = attributes.items || [];
        this.label = attributes.label;
    }
    
    /**
     * Render the VNode.
     * 
     * @returns The rendered VNode.
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