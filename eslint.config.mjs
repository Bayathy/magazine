import tslint from "typescript-eslint";

export default tslint.config(
  {
    plugins: {
      ["@typescript-eslint"]: tslint.plugin,
    },
  },

  ...tslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  }
);
