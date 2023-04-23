/** 
 * The EmitterEvent defines the event for the EventEmitter.
 * 
 * @public 
 */
export default interface EmitterEvent {
    /**
     * The event's key.
     */
    key: string

    /**
     * The event's callback.
     */
    fn: Function
}