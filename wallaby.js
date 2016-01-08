module.exports = function (wallaby) {
  return {
    files: [
      '*.js'
    ],

    tests: [
      'test/*Spec.js'
    ],
    env: {
      type: 'node',
      runner: 'node'  
    }
  };
};
