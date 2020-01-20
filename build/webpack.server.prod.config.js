'use strict';
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.server.base.config');

module.exports = merge(webpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.server.prod
    })
  ]
});
