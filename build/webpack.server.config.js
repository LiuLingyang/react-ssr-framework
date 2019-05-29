'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SSRServerPlugin = require('./plugins/server-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: utils.resolve('src/entry-server.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'entry-server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node', // 指定node运行环境
  devtool: config.server.devtool,
  externals: [
    nodeExternals({
      whitelist: [ /\.(css|sass)$/ ] // 忽略css，让webpack处理
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': utils.resolve('src'),
      '@components': utils.resolve('src/components'),
      '@service': utils.resolve('src/service'),
      '@util': utils.resolve('src/util'),
      '@store': utils.resolve('src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                'dynamic-import-node',
                '@loadable/babel-plugin',
                ['@babel/plugin-proposal-decorators', { 'legacy': true }]
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.server.env
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件
    new SSRServerPlugin({
      filename: 'server-bundle.json'
    })
  ]
};
