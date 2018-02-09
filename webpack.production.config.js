const path = require('path');
// const merge = require('webpack-merge');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

//const TARGET = process.env.;
const ROOT_PATH = path.resolve(__dirname);
const MODULES_PATH = path.resolve(__dirname, 'node_modules');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const BUNDLE_PATH = path.join(PUBLIC_PATH, '');
const SRC_PATH = path.join(ROOT_PATH, 'src');
const ASSETS_PATH = path.join(SRC_PATH, 'assets', '/');

module.exports = {
  entry: {
    'app': [
      'babel-polyfill',
      './src/index.js'
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: BUNDLE_PATH,
    publicPath: './',
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Open 3D Object Viewer',
      filename: 'index.html',
      showErrors: true,
      template: './src/index.html',
      inject: false,
      minify: {minifyCSS: true, minifyJS: true}
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin(), //minify everything
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT: JSON.stringify(process.env.CLIENT),
      }
    }),
    new ExtractTextPlugin({ filename: './static/css/[name].css', allChunks: true}),
    new Webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new Webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new Webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
      minimize: true,
      compress: {
          warnings: false,
      },
      sourceMap: false,
    })
  ],

  module: {
    loaders: [
      { 
        test: /\.js$|\.jsx$/, 
        loaders: ['babel-loader'], 
        include: [
          SRC_PATH
        ],
        exclude: MODULES_PATH
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
        ]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=./[name].[ext]',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'file-loader?name=./static/media/[name].[ext]',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./static/media/[name].[ext]'
      }
    ]
  }
};