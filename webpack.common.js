const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const globImporter = require("node-sass-glob-importer");

const SRC_DIR = './assets/';
const PUB_DIR = './public';

module.exports = {
  entry: {
    main: [path.resolve(SRC_DIR, 'scripts/main.js')]
  },
  output: {
    path: path.resolve(PUB_DIR),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(SRC_DIR, 'scripts'),
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(SRC_DIR, 'scripts'),
        use: ['babel-loader']
      },
      {
        test: /\.svg$/,
        include: path.resolve(SRC_DIR, 'icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'images/icons.svg',
              symbolId: 'icon-[name]',
              esModule: false
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./postcss.config.js"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              importer: globImporter(),
              implementation: require('sass'),
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        loader: 'url-loader',
        include: path.resolve(SRC_DIR, 'images'),
        options: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'public']),
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_DIR, '_fractal'),
        to: path.resolve(PUB_DIR, '_fractal')
      }, // Fractal style overrides
      {
        from: path.resolve(SRC_DIR, 'images'),
        to: path.resolve(PUB_DIR, 'images')
      },
      { from: path.resolve(SRC_DIR, 'meta'), to: path.resolve(PUB_DIR, '') }
    ])
  ]
};
