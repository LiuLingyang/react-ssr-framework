const config = require('../config');
const opn = require('opn');
const chalk = require('chalk');
const fs = require('fs');
const express = require('express');
const proxy = require('express-http-proxy');
const ServerRenderer = require('./renderer');
const { BASEURL } = require('../shared/consts');
const app = express();

// 静态资源映射到dist路径下
app.use(express.static('dist'));

// Node Api 代理功能实现代码
app.use('/v8', proxy(BASEURL, {
  proxyReqPathResolver: function (req) {
    return `${req.baseUrl}/${req.url}`;
  }
}));

const isProd = process.env.NODE_ENV === 'production';
let renderer;
let readyPromise;
let template = fs.readFileSync('./index.html', 'utf-8');
if (isProd) {
  let bundle = require('../dist/server-bundle.json');
  let stats = require('../dist/loadable-stats.json');
  renderer = new ServerRenderer(bundle, template, stats);
} else {
  readyPromise = require('./dev-server')(app, (bundle, stats) => {
    renderer = new ServerRenderer(bundle, template, stats);
  });
}

const render = (req, res) => {
  console.log(chalk.cyan('visit url: ' + req.url));

  renderer.renderToString(req).then(({ error, html }) => {
    if (error) {
      if (error.url) {
        res.redirect(error.url);
      } else if (error.code) {
        res.status(error.code).send('error code：' + error.code);
      }
    }
    res.send(html);
  }).catch(error => {
    console.log(error);
    res.status(500).send('Internal server error');
  });
};

app.get('*', isProd ? render : (req, res) => {
  // 等待客户端和服务端打包完成后进行render
  readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const uri = 'http://localhost:' + port;
const ip = 'http://' + require('ip').address() + ':' + port;

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(chalk.cyan('\n' + '- Local: ' + uri + '\n'));
  console.log(chalk.cyan('- On your Network: ' + ip + '\n'));

  if (autoOpenBrowser) {
    opn(uri);
  }
});
