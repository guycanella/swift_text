import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import wxtAutoImports from './.wxt/eslint-auto-imports.mjs';

export default defineConfig([
  globalIgnores(['.output/**', '.wxt/**', 'node_modules/**']),
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.recommended,
      wxtAutoImports,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: '19.2' },
    },
  },
  {
    files: ['*.config.{js,ts}', 'vite-plugins/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['components/ui/**/*.tsx', 'lib/**/*.{ts,tsx}', 'entrypoints/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  prettierConfig,
]);
