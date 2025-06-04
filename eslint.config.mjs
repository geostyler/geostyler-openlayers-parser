import eslint from '@eslint/js'
import eslintTerrestris from '@terrestris/eslint-config-typescript'
import tsEslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import stylisticPlugin from '@stylistic/eslint-plugin'
import globals from 'globals'

export default tsEslint.config({
  extends: [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.stylistic,
    importPlugin.flatConfigs.recommended
  ],
  files: [
    'src/**/*.{js,mjs,cjs,ts,jsx,tsx}'
  ],
  plugins: {
    '@stylistic': stylisticPlugin,
  },
  languageOptions: {
    globals: globals.browser,
    ecmaVersion: 'latest',
    parserOptions: {
      project: [
        './tsconfig.json',
        './tsconfig.test.json',
      ],
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: {
    ...eslintTerrestris.rules,
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'no-underscore-dangle': 'off',
    camelcase: [
      'off',
      {
        ignoreImports: true
      }
    ]
  },
});
