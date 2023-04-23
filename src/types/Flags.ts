import Duration from "./Duration";

/** @public */
type Flags = {
    [flag: string]: (duration: Duration, length: number) => string
};

export default Flags