module.exports = {
  extends: 'airbnb/base',
  env: {
    browser: true
  },
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': false }],
    'no-param-reassign': ['error', { 'props': false }]
  }
};
