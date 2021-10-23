const merge = require('webpack-merge');
const FractalWebpackPlugin = require('fractal-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = env => {
  const plugins = [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif)$/i,
      optipng: { optimizationLevel: 7 }
    })
  ];

  if (env && env.ci) {
    plugins.push(
      new FractalWebpackPlugin({
        mode: 'build'
      })
    );
  }

  return merge(common, {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            output: { beautify: false, comments: false }
          }
        }),
        new OptimizeCssAssetsPlugin({})
      ]
    },
    plugins
  });
};
