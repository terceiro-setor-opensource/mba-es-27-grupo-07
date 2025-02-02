module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "indent": ["error", 2],
    "max-len": [
      "error",
      100,
      {
        "ignoreUrls": true,
        "ignoreComments": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
      },
    ],
    "object-curly-spacing": ["error", "always"],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
