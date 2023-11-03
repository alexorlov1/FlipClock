type AlphanumericProps = {
    value: FaceValue<string | DigitizedValues>;
    direction?: 'auto' | 'forwards' | 'backwards';
    targetValue?: FaceValue<string | DigitizedValues>;
    sequencer?: UseSequencer | SequencerOptions;
    skipChars?: number;
};