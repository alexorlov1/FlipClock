type SequencerOptions = {
    charset?: UseCharset | UseCharsetOptions;
    matchArray?: MatchArrayStructureOptions;
    stopWhen?: StopPredicateFunction<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues]>;
    stopAfterChanges?: number;
};