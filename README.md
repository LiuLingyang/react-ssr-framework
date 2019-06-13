# react-ssr-framework

> 简单的服务端渲染框架

## 工程命令

### 本地启动工程

``` bash
# 安装依赖
npm install

# 初次配置需要执行，生成 vendor.dll 文件
npm run dll

# 启动工程
npm run dev
```

### 执行打包

```bash
# 使用生产环境配置打包
npm run build

# 启动工程
npm run start
```

# 规范
- 缩进采用 2 个空格，不允许使用 tab 字符
- 不允许提交包含 eslint 错误的代码
- 避免使用 componentWillMount componentWillUpdate componentWillReceiveProps


# 目录结构
```html
react-ssr-framework   -主工程目录
|---build   - 工程构建目录，包含了，开发，测试以及上线中所用到的构建脚本及插件
    |---plugins   - 构建中所用到的自定义插件
    |---webpack.base.config.js    - 通用 webpack 配置
    |---webpack.dev.config.js     - 客户端开发环境 webpack 配置
    |---webpack.prod.config.js    - 客户端生产环境 webpack 配置
    |---webpack.dll.config.js     - 客户端 webpack dll 配置
    |---webpack.server.config.js  - 服务端 webpack 配置
    |---webpack.test.config.js    - 客户端测试环境 webpack 配置
|---config  - 构建配置文件，包含静态资源路径，接口代理地址等
|---dist    - 打包后文件路径
|---node_modules    - node 依赖目录
|---server  - 工程启动目录
    |---dev-server.js    - 开发环境配置文件
    |---index.js         - 工程启动文件
    |---renderer.js      - 服务端生成 html 配置文件
|---shared          - 客户端、服务端共享资源
|---src
    |---assets       - 静态资源目录
    |---components   - 业务通用组件
    |---router       - 路由相关目录
    |---views        - 路由页面入口
    |---service      - request 请求仓库
    |---store        - 单项数据流目录
    |---util         - 通用 util
    |---App.jsx           - 根组件
    |---entry-client.js   - 客户端打包入口
    |---entry-server.js   - 服务端打包入口
|---static  - 不参与webpack打包的静态资源
    |---css - 不参与webpack打包的静态css
    |---js  - 不参与webpack打包的静态js
|---.babelrc.js     - babel 配置文件
|---.eslintrc.js    - eslint 配置文件
|---index.html      - 模版 html
|---package.json
|---README.md
```

### 单向数据流使用指南&&规范

#### 目录结构
```html
|---store   - 单向数据流相关目录
    |---actions      - 全局actions
    |---constants    - actions常量
    |---enhancers    - reducers增强
    |---middlewares  - 中间件
    |---reducers     - 全局reducers
    |---store.js     - 创建 store 入口
```

1. 大多数情况，使用单向数据流时请求请交给 action 处理，react 组件只需要 dispatch(action) 即可，
不要将太多的 request 逻辑写入组件中，简单来说，将数据请求，UI组件隔离。

2. 只允许 dispatch(action) 提交 store 修改，store 数据是不可变数据结构，reducer 一定是纯函数。

3. 注意 state 的拆分和 reducers 的组织，可以借助 combineReducers 实现。

4. middleware 提供位于 action 被发起之后，到达 reducer 之前的扩展点，用来记录日志，调用异步接口等。

5. enhancer 统一处理数据，undo redo 也在这里完成。

For a detailed explanation on how things work, check out the [guide](http://cn.redux.js.org/).
