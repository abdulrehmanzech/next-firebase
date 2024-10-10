module.exports = {
  parser: '@typescript-eslint/parser', 
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Disable specific rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off', 
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off', 
  },
};
