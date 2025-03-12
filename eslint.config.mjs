import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {files: ["src/**/*.{js,mjs,cjs,ts}"]},
  globalIgnores(["dist", "prisma"]),
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {rules: {
    semi: 'error'
  }},
]);

