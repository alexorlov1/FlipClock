function computed<T>(proxy: ComputedGetterSetter<T>): WriteableComputedRef<T>;
function computed<T>(fn: ComputedGetter<T>): ComputedRef<T>;