const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vendor: ['axios', 'lodash', 'react', 'react-dom', 'react-redux', 'redux', 'redux-thunk', 'react-helmet', 'react-router-dom', 'toastr']
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_library',
      context: path.join(__dirname, '..')
    })
  ],
  performance: {
    hints: false
  }
};
