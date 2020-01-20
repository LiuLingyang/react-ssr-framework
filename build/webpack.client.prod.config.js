'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.client.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');

function generateVersion() {
  const now = new Date();
  const version =
    'v' +
    now.getFullYear() +
    (String(Math.floor(now.getMonth() / 10)) + String((now.getMonth() % 10) + 1)) +
    (String(Math.floor(now.getDate() / 10)) + String(now.getDate() % 10)) +
    `.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;
  return version;
}

const version = generateVersion();

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    publicPath: config.build.assetsPublicPath,
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.devtool,
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        chunks: 'initial',
        vendor: {
          test: /([\\/]node_modules[\\/])/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 3,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: { inline: false }
        }
      })
    ]
  },
  plugins: [
    new SentryCliPlugin({
      include: config.build.assetsRoot,
      release: version,
      urlPrefix: '~/',
      configFile: './sentry.prod.properties'
    }),
    new webpack.DefinePlugin({
      'process.env.RELEASE_VERSION': JSON.stringify(version)
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});
