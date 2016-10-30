const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const {
  NODE_ENV = 'development',
  PORT = 3000
} = process.env;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', (err, result) => {
  if (err) {
    return console.log('ERROR:', err);
  }

  console.log(`Listening at http://localhost:${PORT}/\nENV: ${NODE_ENV}`);
  return result;
});
