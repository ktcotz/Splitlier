module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/e2e/steps/**/*.ts', 'tests/e2e/support/**/*.ts'],
    format: ['progress'],
    paths: ['tests/e2e/features/**/*.feature'],
    publishQuiet: true,
    'ts-node': { project: 'tsconfig.e2e.json' },
  },
};
