const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  'parser': 'babel-eslint',

  'env': {
    'browser': true,
    'jest': true,
    'node': true,
  },

  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'modules': true,
    },
  },

  'extends': 'eslint:recommended',

  'globals': {
    'Promise': true,
    'Uint8Array': true,
  },

  'rules': {
    'array-bracket-spacing': [ERROR, 'never'],
    'array-callback-return': ERROR,
    'brace-style': [ERROR, 'stroustrup', {'allowSingleLine': true}],
    'camelcase': ERROR,
    'comma-dangle': [ERROR, 'always-multiline'],
    'comma-spacing': [ERROR, {'before': false, 'after': true}],
    'dot-notation': ERROR,
    'eqeqeq': ERROR,
    'id-length': [ERROR, {'min': 2, 'exceptions': ['i', 'j', 'k', 'x', 'y']}],
    'indent': [ERROR, ERROR, {'SwitchCase': WARNING}],
    'key-spacing': [ERROR, {'beforeColon': false, 'afterColon': true}],
    'keyword-spacing': [ERROR, {'before': true, 'after': true}],
    'max-len': [ERROR, 80, 4, {'ignoreUrls': true}],
    'new-cap': [OFF, {'newIsCap': true, 'capIsNew': true}],
    'newline-per-chained-call': [ERROR, {'ignoreChainWithDepth': 3}],
    'no-array-constructor': ERROR,
    'no-cond-assign': ERROR,
    'no-console': [ERROR, {'allow': ['warn', 'error']}],
    'no-dupe-keys': ERROR,
    'no-dupe-args': ERROR,
    'no-implicit-coercion': ERROR,
    'no-loop-func': ERROR,
    'no-multiple-empty-lines': ERROR,
    'no-nested-ternary': ERROR,
    'no-new-func': ERROR,
    'no-new-object': ERROR,
    'no-param-reassign': ERROR,
    'no-shadow-restricted-names': ERROR,
    'no-trailing-spaces': ERROR,
    'no-undef': ERROR,
    'no-unreachable': ERROR,
    'no-unused-expressions': ERROR,
    'no-unused-vars': ERROR,
    'no-use-before-define': [ERROR, {'functions': false, 'classes': false}],
    'object-curly-spacing': [ERROR, 'never'],
    'one-var': [ERROR, 'never'],
    'operator-linebreak': [ERROR, 'after'],
    'padded-blocks': [ERROR, 'never'],
    'prefer-rest-params': ERROR,
    'quotes': [ERROR, 'single', 'avoid-escape'],
    'quote-props': [ERROR, 'as-needed'],
    'semi': ERROR,
    'space-before-blocks': [ERROR, 'always'],
    'space-before-function-paren': [
      ERROR, {'anonymous': 'always', 'named': 'never'}
    ],
    'spaced-comment': [ERROR, 'always'],
    'space-infix-ops': ERROR,
    'space-in-parens': [ERROR, 'never'],
    'space-unary-ops': [ERROR, {'words': true, 'nonwords': false}],
    'wrap-iife': [ERROR, 'inside'],

    // ES6
    'arrow-parens': [ERROR, 'always'],
    'arrow-spacing': [ERROR, {'before': true, 'after': true}],
    'constructor-super': ERROR,
    'no-case-declarations': ERROR,
    'no-confusing-arrow': ERROR,
    'no-const-assign': ERROR,
    'no-dupe-class-members': ERROR,
    'no-duplicate-imports': ERROR,
    'no-var': ERROR,
    'no-useless-constructor': ERROR,
    'object-shorthand': [ERROR, 'methods'],
    'prefer-arrow-callback': ERROR,
    'prefer-const': [
        OFF, {'destructuring': 'any', 'ignoreReadBeforeAssign': true}
    ],
    'prefer-spread': ERROR,
    'prefer-template': ERROR,
  },
};