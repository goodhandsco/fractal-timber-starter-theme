const merge = require('webpack-merge');
const FractalWebpackPlugin = require('fractal-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/'
  },
  plugins: [
    new FractalWebpackPlugin({
      mode: 'server',
      sync: true
    })
  ]
});
