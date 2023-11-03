type CounterProps = {
    countdown?: boolean;
    format?: (number: number) => string;
    formatter?: Intl.NumberFormat;
    value: FaceValue<number>;
    step?: number;
    targetValue?: FaceValue<number>;
};