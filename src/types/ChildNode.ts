import VNode from "../VNode";
import DomElement from "./DomElement";

/** 
 * The ChildNode type defines what is renderable DOM node.
 * 
 * @public 
 */
type ChildNode = VNode|DomElement|string|number;

export default ChildNode;