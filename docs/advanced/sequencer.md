# Sequencer

The sequencer essentially bind the `charset` and the `digitizer` together. The sequencer is responsible for incrementing and decrementing an array of `DigitizedValues`. The sequencer also will match two array structures together and do it `n` changes at a time. Sequencers are used in the `Alphanumeric` face.

## Signatures

<<< @/types/useSequencer.function.ts{TS}
<<< @/types/SequencerOptions.type.ts{TS}
<<< @/types/StopPredicateFunction.type.ts{TS}

- `charset` - The set of character used in the sequencer.
- `matchArray` - The options passed to `matchArrayStructure`.
- `stopWhen` - A `StopPredicateFunction` for when to stop the sequencer.
- `stopAfterChanges` - Stop the sequencer after `n` changes.

## Returns

<<< @/types/UseSequencer.type.ts{TS}