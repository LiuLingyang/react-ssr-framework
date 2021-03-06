'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.client.base.config');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(
    baseWebpackConfig.entry[name]
  );
});

const createLintingRule = () => ({
  test: /\.(ts|tsx|js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: config.dev.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: [
      createLintingRule(),
      ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true, extract: false })
    ]
  },
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
