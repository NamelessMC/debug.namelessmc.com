module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/semi': ['error', 'always'],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', 'never'],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
