module.exports = {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Turn off the rule for using 'any'
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused vars starting with an underscore
    },
  };
  