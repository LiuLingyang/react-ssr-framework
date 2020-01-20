const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const clientConfig = require('../build/webpack.client.dev.config');
const serverConfig = require('../build/webpack.server.dev.config');

module.exports = function setupDevServer(app, callback) {
  let bundle;
  let loadableStats;
  let resolve;
  const readyPromise = new Promise(r => {
    resolve = r;
  });
  const update = () => {
    if (bundle && loadableStats) {
      callback(bundle, loadableStats);
      resolve(); // resolve Promise让服务端进行render
    }
  };

  const readFile = (fs, fileName) => {
    return fs.readFileSync(path.join(clientConfig.output.path, fileName), 'utf-8');
  };

  // 客户端打包
  const clientCompiler = webpack(clientConfig);

  // 使用webpack-dev-middleware中间件服务webpack打包后的资源文件
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    logLevel: 'warn'
  });
  app.use(devMiddleware);

  clientCompiler.hooks.done.tap('done', stats => {
    const info = stats.toJson();
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }
    loadableStats = JSON.parse(readFile(devMiddleware.fileSystem, 'loadable-stats.json'));
    update();
  });

  // 热更新中间件
  app.use(require('webpack-hot-middleware')(clientCompiler));

  // 监视服务端打包入口文件，有更改就更新
  const serverCompiler = webpack(serverConfig);
  // 使用内存文件系统
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    const info = stats.toJson();
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }

    bundle = JSON.parse(readFile(mfs, 'server-bundle.json'));
    update();
  });

  return readyPromise;
};
