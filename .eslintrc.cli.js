module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        'quotes': [2, 'single', {
            'avoidEscape': true
        }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
        }],
        'indent': ['error', 4],
        'semi': [2, 'always'],
        'key-spacing': ['error', { 'afterColon': true }],
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': ['error', 'always'],
        'object-property-newline': ['error', {
            'allowAllPropertiesOnSameLine': false
        }],
        'object-curly-newline': ['error', {
            'ObjectExpression': 'always',
            'ObjectPattern': { 'multiline': true },
            'ImportDeclaration': 'never',
            'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
        }]
    }
};