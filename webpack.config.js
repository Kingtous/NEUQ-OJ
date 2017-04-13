const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const proxy = require('http-proxy-middleware')

const dflPort = 8080  // 配置端口
const context = [`/*`]

module.exports = {
    // 配置服务器
  devServer: {
    port: dflPort,
    contentBase: path.join(__dirname, './app'),
    historyApiFallback: true,
    inline: true,
    noInfo: false,
    open: true,
    stats: { colors: true },
    overlay: {
      warnings: true,
      errors: true
    },
    // host: 'localhost',
    // proxy: [
    //   {
    //     context: context,
    //     target: 'http://192.168.1.189:3000',
    //     secure: false
    //   }
    // ]
  },
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + dflPort,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/app/src/main.js')
  ],
  output: {
    path: '/dist/assets',
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'react-hot-loader!babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loaders: [
          'url-loader?limit=10000&name=[hash:8].[name].[ext]'
        ]
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer]
        }
      }
    }),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
}
