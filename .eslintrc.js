module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  extends: ['plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.ts']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts'],
      parserOptions: {
        project: ['./tsconfig.json']
      },
      rules: {
        'prefer-const': 'error',
        curly: 'off',
        'comma-dangle': [
          'error',
          { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'never' }
        ],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
          { blankLine: 'always', prev: 'directive', next: '*' },
          { blankLine: 'any', prev: 'directive', next: 'directive' }
        ],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will']
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: { regex: '^I[A-Z]', match: true }
          },
          { selector: 'class', format: ['PascalCase'] },
          { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
          { selector: 'memberLike', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'allow' },
          { selector: 'typeLike', format: ['PascalCase', 'UPPER_CASE'] }
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'import/no-unused-modules': ['off', { unusedExports: true }],
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^@nestjs', '^[a-z]', '^@'],
              ['^@/'],
              // Packages starting with `~`
              ['^~'],
              ['^@/configs'],
              ['^@/common/interfaces'],
              ['^@/common/constants'],
              ['^@/common/utils'],
              ['^@/common/interceptors'],
              ['^@/common/decorators'],
              ['^@/common/validators'],
              ['^@/common/middlewares'],
              ['^@/database'],
              ['^@/modules'],
              // Imports starting with `./`
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Side effect imports
              ['^\\u0000']
            ]
          }
        ]
      }
    }
  ]
};
