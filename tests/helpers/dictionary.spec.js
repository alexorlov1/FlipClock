import { useDictionary } from '../../src/helpers/dictionary';

test('using the dictionary to translate to spanish', () => {
    const { define, undefine, translate } = useDictionary({
        'Monday': 'Lunes'
    })

    expect(translate('Monday')).toBe('Lunes');
    expect(translate('Tuesday')).toBe('Tuesday');

    // The setter syntax
    define('Tuesday', 'Martes');

    // The object key/value syntax.
    define({
        'Wednesday': 'Miercoles',
        'Thursday': 'Jueves'
    })

    expect(translate('Tuesday')).toBe('Martes');

    undefine('Tuesday');
    
    expect(translate('Tuesday')).toBe('Tuesday');
    expect(translate('Wednesday')).toBe('Miercoles');
    expect(translate('Thursday')).toBe('Jueves');
});