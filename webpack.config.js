const path = require('path');
const webpack = require('webpack');

const env = process.env.WEBPACK_ENV;
const appEntrypoint = path.resolve(__dirname, 'app/index.js');
const widgetEntrypoint = path.resolve(__dirname, 'widget/index.js');
const outputPath = path.join(__dirname, 'dist');
const baseConfig = {
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html?$/, loader: 'html' },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
const devConfig = Object.assign({}, baseConfig, {
  devtool: 'inline-source-map',
  entry: {
    app: [
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      appEntrypoint,
    ],
    widget: [
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      widgetEntrypoint,
    ],
  },
  devServer: {
    contentBase: outputPath,
    // hot: true,
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
});
const buildConfig = Object.assign({}, baseConfig, {
  entry: { app: appEntrypoint, widget: widgetEntrypoint },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
});
const webpackConfig = env === 'build' ? buildConfig : devConfig;

module.exports = webpackConfig;
