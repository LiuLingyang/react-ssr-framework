module.exports = {
  presets: [
    [
      "@babel/preset-env", { "modules": false }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@loadable/babel-plugin",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ],
  env: {
    "development": {
      "plugins": ["react-hot-loader/babel"]
    }
}
}