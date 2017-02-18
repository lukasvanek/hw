// Bootstrap environment
require('babel-register');
require('babel-polyfill');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const config = require('./config');
const rootDir = require('path').resolve(__dirname, '..', '..');
const webpackIsomorphicAssets = require('../../webpack/assets');

if (!process.env.NODE_ENV) {
  throw new Error(
    'Environment variable NODE_ENV must be set to development or production.'
  );
}

global.Promise = require('../common/_configs/configureBluebird');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .development(!config.isProduction)
  .server(rootDir, () => {
    require('./main');
  });
