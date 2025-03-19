// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const boundaries = require("eslint-plugin-boundaries");
const { from } = require("rxjs");

module.exports = tseslint.config(
  {
    plugins: { boundaries },
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      // @ts-ignore
      boundaries.configs.strict,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "boundaries/no-unknown-files": "off",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "core/components",
              allow: ["core/**", "common/**"],
            },
            {
              from: "features/operations",
              allow: ["features/operations/**", "common/**"],
            },
            {
              from: "features/clients",
              allow: ["features/clients/**", "common/**"],
            },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/elements": [
        {
          type: "core/components",
          pattern: "src/app/core/components",
        },
        {
          type: "core/services",
          pattern: "src/app/core/services",
        },
        {
          type: "common/services",
          pattern: "src/app/common/services",
        },
        {
          type: "features/operations",
          pattern: "src/app/features/operations",
        },
        {
          type: "features/clients",
          pattern: "src/app/features/clients",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
