import url from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  {
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
      ["import"]: importPlugin,
      ["jsx-a11y"]: jsxA11yPlugin,
      ["react-hooks"]: reactHooksPlugin,
      ["eslint-comments"]: eslintCommentsPlugin,
      ["react"]: reactPlugin,
      ["simple-import-sort"]: simpleImportSortPlugin,
      ["unicorn"]: unicornPlugin,
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "eslint.config.js",
      "postcss.config.js",
      "worker-configuration.d.ts",
      "build/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      "eslint-comments/disable-enable-pair": [
        "error",
        {
          allowWholeFile: true,
        },
      ],
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-unused-enable": "error",
      "eslint-comments/no-use": [
        "error",
        {
          allow: [
            "eslint-disable",
            "eslint-disable-line",
            "eslint-disable-next-line",
            "eslint-enable",
            "global",
          ],
        },
      ],
      "import/consistent-type-specifier-style": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-absolute-path": "error",
      "import/no-amd": "error",
      "import/no-default-export": "error",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      "import/no-mutable-exports": "error",
      "import/no-named-default": "error",
      "import/no-named-export": "off",
      "import/no-self-import": "error",
      "import/prefer-default-export": "off",
      "simple-import-sort/imports": "error",
      "unicorn/no-typeof-undefined": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts,js,jsx}"],
    extends: [
      ...compat.config(jsxA11yPlugin.configs.recommended),
      ...compat.config(reactPlugin.configs.recommended),
      ...compat.config(reactHooksPlugin.configs.recommended),
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
);
