/** 
 * The duration represents the amount of time passed between two subjects.
 * 
 * @public 
 */
export default interface Duration {
    /**
     * The number of years passed.
     */
    years?: number,

    /**
     * The number of months passed.
     */
    months?: number,

    /**
     * The number of weeks passed.
     */
    weeks?: number,

    /**
     * The number of days passed.
     */
    days?: number,

    /**
     * The number of hours passed.
     */
    hours?: number,

    /**
     * The number of minutes passed.
     */
    minutes?: number,

    /**
     * The number of seconds passed.
     */
    seconds?: number,

    /**
     * The number of milliseconds passed.
     */
    milliseconds?: number,
}