import eslint from "@eslint/js"
import tseslintParser from "@typescript-eslint/parser"
import prettier from "eslint-config-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
      },
      parser: tseslintParser,
    },
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      ...reactHooks.configs.recommended.rules,
    },
    files: ["**/*.{ts,tsx,js,jsx}"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
]
