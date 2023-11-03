import { Face } from '../Face';
import { FaceValue, faceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { watchEffect } from '../helpers/signal';

/**
 * The `Counter` face options.
 * 
 * @public
 */
export type CounterProps = {
     countdown?: boolean;
     format?: (number: number) => string;
     formatter?: Intl.NumberFormat,
     value: FaceValue<number>;
     step?: number;
     targetValue?: FaceValue<number>;
}

/**
 * This face is designed to increment and decrement values. Usually this face
 * is used as a counter for 0, 1, 2, 3, 4 (etc) for something like page views.
 * 
 * @public
 */
export class Counter implements Face {

     /**
      * Should the face count down instead of up.
      * 
      * @public
      */
     public countdown: boolean = false;

     /**
      * The number to increment/decrement in the interval.
      * 
      * @public
      */
     public step: number = 1;

     /**
      * The formatted face value to display on the clock.
      * 
      * @protected
      */
     protected formattedValue: FaceValue<string>;

     /**
      * The target value determines when the counter should stop.
      * 
      * @public
      */
     public targetValue?: FaceValue<number>;

     /**
      * The current face value.
      * 
      * @public
      */
     public value: FaceValue<number>;

     /**
      * A format callback. If the `formatter` is defined, this prop is ignored.
      * 
      * @public
      */
     public format?: (number: number) => string;

     /**
      * An `Intl.NumberFormat` instance used to format the number into a string.
      * 
      * @public
      */
     public formatter?: Intl.NumberFormat;

     /**
      * Instantiate the clock face.
      * 
      * @public
      */
     constructor(props: CounterProps) {
          this.value = props.value;
          this.targetValue = props.targetValue;
          this.format = props.format;
          this.formatter = props.formatter;
          this.formattedValue = faceValue('');

          watchEffect(() => {
               this.formattedValue.value = this.formattedString
          });

          if (typeof props.countdown === 'boolean') {
               this.countdown = props.countdown;
          }

          if (typeof props.step === 'number') {
               this.step = props.step;
          }
     }

     /**
      * Get the number as a formatted string.
      * 
      * @public
      */
     get formattedString() {
          if(this.formatter) {
               return this.formatter.format(this.value.value);
          }

          if(this.format) {
               return this.format(this.value.value);
          }

          return this.value.value.toString()
     }

     /**
     * The face's current value.
      * 
      * @public
      */
     faceValue(): FaceValue<string> {
         return this.formattedValue;
     }

     /**
      * Substract the face value by the given value.
      * 
      * @public
      */
     public decrement(value: number = 1): void {
          this.value.value = this.value.value - value;
     }

     /**
      * Add to the face value by the given value.
      * 
      * @public
      */
     public increment(value: number = 1): void {
          this.value.value = this.value.value + value;
     }

     /**
      * This method is called with every interval, or every time the clock
      * should change, and handles the actual incrementing and decrementing the
      * clock's `FaceValue`.
      * 
      * @public
      */
     public interval(instance: FlipClock<Counter>): void {
          if (this.countdown) {
               this.decrement();
          }
          else {
               this.increment();
          }

          if (this.value.compare(this.targetValue)) {
               instance.stop();
          }
     }

}

/**
 * Instantiate a new `Counter` instance.
 * 
 * @public
 */
export function counter(props: CounterProps) {
     return new Counter(props);
}