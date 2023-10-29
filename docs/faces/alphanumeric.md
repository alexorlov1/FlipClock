<script setup lang="ts">
import Alphanumeric from '../components/Alphanumeric.vue';
import AlphanumericSkip from '../components/AlphanumericSkip.vue';
</script>

# Alphanumeric

The `Alphanumeric` displays abritrary values and flips to the next value in sequence (or randomly), similar to a mechanical flip board at a train station. Alphanumeric clocks make heavy use [Sequences](@/advanced/sequences) and [Charsets](@/advanced/charsets). Refer to the documentation for more details on how these things work.

<<< @/types/AlphanumericProps.type.ts{TS}

## Basic Example

Start with nothing and increment every digit until the clock reaches "hello world".

<Alphanumeric />

<<< @/components/Alphanumeric.vue#import{TS}
<<< @/components/Alphanumeric.vue#example{TS}

## Skipping Characters

Start with nothing and increment only 3 digits simultaneously, while skipping 3 characters in the sequence randomly until the clock reaches its target.

<AlphanumericSkip />

<<< @/components/AlphanumericSkip.vue#import{TS}
<<< @/components/AlphanumericSkip.vue#example{TS}