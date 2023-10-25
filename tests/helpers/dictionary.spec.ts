import { useDictionary } from '../../src/helpers/dictionary';

test('using the dictionary to translate to spanish', () => {
    const { define, unset, translate } = useDictionary({
        'Monday': 'Lunes'
    })

    unset('test')

    expect(translate('Monday')).toBe('Lunes');
    expect(translate('Tuesday')).toBe('Tuesday');

    // The setter syntax
    define('Tuesday', 'Martes');

    // The object key/value syntax.
    define({
        'Wednesday': 'Miercoles',
        'Thursday': () => 'Jueves'
    })

    expect(translate('Tuesday')).toBe('Martes');

    unset('Tuesday');
    unset(['Wednesday']);
    
    expect(translate('Tuesday')).toBe('Tuesday');
    expect(translate('Wednesday')).toBe('Wednesday');
    expect(translate('Thursday')).toBe('Jueves');
});