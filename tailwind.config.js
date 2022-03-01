module.exports = {
    purge: {
        content: [
            './public/**/*.html',
            './src/**/*.vue',
            './src/assets/style.css',
            './src/utils.js',
        ],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
