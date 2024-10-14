module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['myplugin'],
    rules: {
        'myplugin/my-rule': 'error',
    },
}