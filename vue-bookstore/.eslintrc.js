module.exports = {
  extends: [
    // add more generic or Vue-specific rules
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser', // or 'babel-eslint' for older setups
    requireConfigFile: false,
  },
  // Your existing configurations...
};
