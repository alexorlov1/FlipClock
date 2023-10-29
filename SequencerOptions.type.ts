type SequencerOptions = {
    charset?: CharsetContext | CharsetOptions;
    matchArray?: MatchArrayStructureOptions;
    stopWhen?: StopPredicateFunction<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues]>;
    stopAfterChanges?: number;
};