const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const stylistic = require('@stylistic/eslint-plugin');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  {
    ignores: ['dist/', '.angular/', 'node_modules/'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      angular.configs.tsRecommended,
      prettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      '@stylistic/quotes': [
        'warn',
        'single',
        { avoidEscape: true, allowTemplateLiterals: 'always' },
      ],

      '@stylistic/object-curly-spacing': ['warn', 'always'],

      '@stylistic/semi': ['warn', 'always'],

      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],

      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],

      // Разрешаем const { a, b, ...rest } = obj, где a и b нужны только чтобы исключить поля.
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

      // Эти два правила прямо конфликтуют с Prettier (он убирает пустые строки
      // в начале и конце класса и пробелы внутри ${}), поэтому они отключены
      // последними, как и рекомендует eslint-config-prettier.
      '@stylistic/padded-blocks': 'off',
      '@stylistic/template-curly-spacing': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, prettierRecommended],
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',

      '@angular-eslint/template/eqeqeq': 'warn',
    },
  },
]);
