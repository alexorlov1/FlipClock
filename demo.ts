import { trackChanges } from './src/helpers/structure';


const track = trackChanges((changes, value) => {
    return Array.isArray(value) ? value.shift() : value;
});

track(['a']);
track('a');
