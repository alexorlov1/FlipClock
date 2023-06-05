export type UseContextFunction<T> = (i: number) => Context<T>

export type ContextDefinition<T> = {
    value: RawContext,
    useContext: UseContextFunction<T>
}

export type RawContext = Record<string, any>

export type Context<T> = Record<string, any | ContextDefinition<T>>

/**
 * Determines if the subject is a context definition.
 */
export function isContextDefinition(subject: unknown): boolean {
    return !Array.isArray(subject)
        && typeof subject === 'object'
        && 'value' in subject
        && 'useContext' in subject
        && typeof subject.useContext === 'function';
}

/**
 * Recursively get the raw context from the subject.
 */
export function value<T>(subject: Context<T> | ContextDefinition<T>): RawContext {
    if(isContextDefinition(subject)) {
        return subject.value;
    }
    
    const copy: Context<T> = {};

    for(let key in subject) {
        copy[key] = isContextDefinition(subject[key])
            ? subject[key].value
            : subject[key];
    }

    return copy;
}

/**
 * A class to represent the given context and to retrieve its raw state.
 */
export class Ctx<T extends Context<T>> {
    constructor(
        public readonly ctx: T
    ) {
        //
    }

    use(index: number) {
        function use<T extends Context<T>>(ctx: T, i: number) {
            const copy: Context<T> = {};
        
            for(let key in ctx) {
                copy[key] = isContextDefinition(ctx[key])
                    ? use(ctx[key].useContext(i), i)
                    : ctx[key];
            }
        
            return context(copy);
        }
        
        return use(this.ctx, index);
    }

    get value() {
        return value(this.ctx);
    }
}

/**
 * Create a new context definition. A context is a key/value object. A context
 * may contains other contexts and even structured contexts, which means
 * contexts are inherently recursive.
 */
export function context<T extends Context<T>>(value: T): ContextDefinition<T> {
    const ctx = new Ctx(value);

    return {
        get value() {
            return ctx.value
        },
        useContext(i: number) {
            return ctx.use(i);
        }
    }
}

export type StructuredContent = (any | StructuredContent)[];

/**
 * A class to represent structured context and to retrieve its raw state.
 */
export class StructuredCtx<T extends StructuredContent> {
    constructor(
        public readonly ctx: T
    ) {
        //
    }

    use(index: number) {
        return isContextDefinition(this.ctx[index])
            ? this.ctx[index]
            : structured(this.ctx[index]);
    }

    get value() {
        if(Array.isArray(this.ctx)) {
            return this.ctx.map(ctx => isContextDefinition(ctx) ? value(ctx) : ctx);
        }

        return this.ctx;
    }
}

/**
 * Create a new structured context definition. Structured contexts should be
 * the same structure as the face value. So if the face value is
 * `[['x'], ['x']]`, the expected structure match the array.
 */
export function structured<T extends StructuredContent>(value: T): ContextDefinition<T> {
    const ctx = new StructuredCtx(value);

    return {
        get value() {
            return ctx.value
        },
        useContext(i: number) {
            return ctx.use(i);
        }
    }
}