module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'plugins': [
    '@typescript-eslint',
    "react",
    "react-hooks"
  ],
  'rules': {
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": "off",
    "no-extra-boolean-cast": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/display-name": "off",
    "arrow-spacing": "error",
    "require-await": "warn",
    quotes: [2, "double", { avoidEscape: true }],
    "object-curly-spacing": [2, "always"],
    "new-cap": 0,
    "require-jsdoc": 0,
    "no-unused-vars": "off",
  },
};
