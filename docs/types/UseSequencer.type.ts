type UseSequencer = {
    charset: string[];
    decrement: (current: FaceValue<any>, target: FaceValue<any>, count?: number, backwards?: boolean) => FaceValue<any>;
    increment: (current: FaceValue<any>, target: FaceValue<any>, count?: number, backwards?: boolean) => FaceValue<any>;
};