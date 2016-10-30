var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const {
  NODE_ENV = 'development',
  PORT = 3000
} = process.env;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://localhost:${PORT}/`);
});
