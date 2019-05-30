'use strict';
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const utils = require('./utils');
const config = require('../config');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    app: ['babel-polyfill', utils.resolve('src/entry-client.js')]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@shared': utils.resolve('shared'),
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
        include: [utils.resolve('src')],
        loader: 'happypack/loader?id=happybabel',
        exclude: /node_modules/
      },
      {
        test: /\.(html|htm)$/,
        loader: 'html-loader',
        options: {
          attrs: ['data-src']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    // webpack dll
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin([
      {
        from: utils.resolve('static'),
        to: config.dev.assetsSubDirectory
      }
    ]),
    // 此插件在输出目录中生成 loadable-stats.json
    // 客户端清单
    new LoadablePlugin()
  ],
  performance: {
    hints: false
  }
};
