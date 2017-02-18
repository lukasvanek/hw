/* eslint-disable react/require-extension */
// Bootstrap environment

require('babel-polyfill');
window.Promise = require('../common/_configs/configureBluebird');
require('./main');
