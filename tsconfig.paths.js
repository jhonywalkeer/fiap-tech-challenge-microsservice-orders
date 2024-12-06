const tsconfig = require('./tsconfig.json');
const tsconfigpaths = require('tsconfig-paths');

const baseUrl = './dist';
tsconfigpaths.register({
  baseUrl,
  paths: tsconfig.compilerOptions.paths,
});
