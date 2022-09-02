import Duration from "./Duration";

type Flags = {
    [flag: string]: (duration: Duration, length: number) => string
};

export default Flags