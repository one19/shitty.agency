var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  NODE_ENV = 'development',
  PORT = 3000
} = process.env;
const styleLoader = 'css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader';

const config = {
  entry: [
    './app.js' // Your appʼs entry point
  ],
  output: {
    path: __dirname + "/docs",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      {
        test: /fonts\/.*?\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  postcss: [
    autoprefixer,
    precss
  ]
};

if (NODE_ENV === 'development') {
  config.entry.push(`webpack-dev-server/client?http://0.0.0.0:${PORT}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server');                                     // "only" prevents reload on syntax errors)
  config.module.loaders.push(
    { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] },
    { test: /\.css$/, loader: `style-loader!${styleLoader}`}
  );
  config.plugins = [
    new webpack.HotModuleReplacementPlugin()
  ]
} else {
  config.module.loaders.push(
    { test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', styleLoader) }
  );
  config.plugins = [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
      mangle: true
    })
  ]
}

module.exports = config;
