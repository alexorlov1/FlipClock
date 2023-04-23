/** 
 * The duration formatting flags and their meanings.
 * 
 * @public 
 */
enum DurationFlags {
    /**
     * 'Y' outputs the number of years.
     */
    'Y' = 'years',

    /**
     * 'M' outputs the number of months.
     */
    'M' = 'months',
    
    /**
     * 'W' outputs the number of weeks.
     */
    'W' = 'weeks',
    
    /**
     * 'D' outputs the number of days.
     */
    'D' = 'days',
    
    /**
     * 'h' outputs the number of hours.
     */
    'h' = 'hours',
    
    /**
     * 'm' outputs the number of minutes.
     */
    'm' = 'minutes',
    
    /**
     * 's' outputs the number of seconds.
     */
    's' = 'seconds',
    
    /**
     * 'v' outputs the number of milliseconds.
     */
    'v' = 'milliseconds',
}

export default DurationFlags;