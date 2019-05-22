'use strict';
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const prodWebpackConfig = require('./webpack.prod.config');

module.exports = merge(prodWebpackConfig, {
  devtool: config.test.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.test.env
    })
  ]
});
