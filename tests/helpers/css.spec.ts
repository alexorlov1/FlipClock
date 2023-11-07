import { cssToJs, jsToCss, mergeCss, sheet, useCss } from '../../src/helpers/css';

test('converting from string to object and back to string', () => {
    expect(cssToJs('')).toStrictEqual({});

    const css = `
        html, body {
            font-size: 12px;
        }
        .wrapper {
            border: 1px solid red;

            .inner {
                border-color: red;
            }

            .blue {
                color: blue;
            }

            .blue & {
                color: blue;
            }
        }
    `;

    const cssObj = cssToJs(css);

    expect(cssObj).toStrictEqual({
        'html, body': {
            fontSize: '12px'
        },
        '.wrapper': {
            border: '1px solid red',
            '.inner': {
                borderColor: 'red',
            },
            '.blue': {
                color: 'blue'
            },
            '.blue &': {
                color: 'blue'
            }
        },
    });

    expect(jsToCss(cssObj)).toBe('html, body{font-size:12px;}.wrapper{border:1px solid red;}.wrapper .inner{border-color:red;}.wrapper .blue{color:blue;}.blue .wrapper{color:blue;}');
});

test('merging two css objects', () => {
    const source = {
        background: 'red',
        width: '50%',
        'div': {
            color: 'red'
        }
    };

    const target = {
        background: 'green',
        height: '50%',
        'div': {
            color: 'green'
        }
    };
    
    expect(mergeCss(source, target)).toStrictEqual({
        background: 'green',
        div: {
            color: 'green'
        },
        height: '50%',
        width: '50%',
    });
});

test('creating sheets()', () => {
    const foo = useCss({
        '@font-face': {
            fontFamily: 'sans-serif'
        },

        '.foo': {
            color: 'red'
        }
    });

    expect(foo.toString()).toBe('@font-face{font-family:sans-serif;}.fc209888310 .foo{color:red;}');

    expect(sheet().innerHTML).toBe('@font-face{font-family:sans-serif;}.fc209888310 .foo{color:red;}');
   
    foo.merge({
        '.foo': {
            color: 'blue'
        }
    });

    expect(sheet().innerHTML).toBe('@font-face{font-family:sans-serif;}.fc209888310 .foo{color:red;}@font-face{font-family:sans-serif;}.fc4002438535 .foo{color:blue;}');

    const bar = foo.extend({
        '.bar': {
            color: 'red'
        }
    });

    expect(sheet().innerHTML).toBe('@font-face{font-family:sans-serif;}.fc209888310 .foo{color:red;}@font-face{font-family:sans-serif;}.fc4002438535 .foo{color:blue;}@font-face{font-family:sans-serif;}.fc1828510312 .foo{color:blue;}.fc1828510312 .bar{color:red;}');
});