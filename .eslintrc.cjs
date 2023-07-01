module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "no-empty-pattern": "off",
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
  },
};
