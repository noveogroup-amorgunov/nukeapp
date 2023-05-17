module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "@feature-sliced/eslint-config/rules/layers-slices",
    // "@feature-sliced/eslint-config/rules/public-api",
    "plugin:storybook/recommended"
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    },
    "react": {
      "version": "detect"
    }
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling"],
      "pathGroups": [{
        "pattern": "react",
        "group": "external",
        "position": "before"
      }, {
        pattern: '*.css',
        group: 'index',
        patternOptions: {
          matchBase: true
        },
        position: 'after'
      }, {
        pattern: '@/**',
        group: 'external',
        position: 'after'
      }],
      // "pathGroupsExcludedImportTypes": ["react"],
      "newlines-between": "never",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }],
    "import/no-default-export": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    // "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
    "@typescript-eslint/promise-function-async": "off",

    // feature-sliced/layers-slices
    "boundaries/element-types": "error",

    // feature-sliced/public-api
    // "import/no-internal-modules": "warn" // ~ 1,

    // disallow import @/shared/lib/server
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "@/shared/lib/server",
        "message": "Not allowed use server modules in client"
      }],
    }]
  },
  "overrides": [
    {
      "files": ["*.stories.tsx"],
      "rules": {
        "import/no-default-export": "off",
        "no-restricted-imports": "off",
      }
    },
    {
      "files": ["**/__mocks__/**/*.ts"],
      "rules": {
        "no-restricted-imports": "off",
      }
    }
  ]
};
