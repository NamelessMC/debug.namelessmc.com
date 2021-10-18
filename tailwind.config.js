module.exports = {
    purge: {
        content: [
            './public/**/*.html',
            './src/**/*.vue'
        ],
        safeList: [
            'md:grid-cols-2',
            'md:grid-cols-3',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
