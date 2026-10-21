const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const stylistic = require('@stylistic/eslint-plugin');
const eslintConfigPrettier = require('eslint-config-prettier');

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
      eslintConfigPrettier,
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

      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, eslintConfigPrettier],
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',

      '@angular-eslint/template/eqeqeq': 'warn',
    },
  },
]);
