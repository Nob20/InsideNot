const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const production = process.env.NODE_ENV === 'production'
const resolvePaths = [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, '..', 'node_modules')]
const webpackConfig = {
  name    : 'server',
  context: path.resolve(__dirname, '.'),
  devtool: production ? false : 'inline-sourcemap',
  entry: path.resolve(__dirname, '..', 'server-app/server.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '..', 'dist/server'),
    filename: 'scripts.min.js'
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.json'],
    enforceModuleExtension: false,
    modules: resolvePaths
  },
  resolveLoader: {
    modules: resolvePaths
  },
  module: {
    loaders: [
      {
        test    : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel-loader',
        query   : {
          cacheDirectory : true,
          plugins        : ['transform-runtime'],
          presets        : ['env', 'react', 'stage-2']
        }
      }, {
        test   : /\.json$/,
        loader : 'json-loader'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      }, {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__ : !production,
      __API__URL__ : production ? "'https://api.insidenot.com'" : "'http://localhost:8000'",
      __FACEBOOK__APP__ID__ : production ? "'317281115364305'" : "'1845694059025059'",
      __GOOGLE__CLIENT__ID__ : "'1014168593052-rev99naivrrtmvau40gf5gnfng7cl725.apps.googleusercontent.com'",
      __STRIPE_KEY__ : production ? "'pk_live_hlt1IfbeCCkXNt6OLwTNCOxe'" : "'pk_test_q6bJnoTS1zbUpxHmtxYFSpCK'",
      __STRIPE_CLIENT_ID__ : production ? "'ca_B23AehgaclaBgZ86Eq2JR0bRmiaWQG7D'" : "'ca_B23AbmHyitIQiUTopnpNngRempXSdcbo'"
    }),
    new ExtractTextPlugin('style.css')
  ]
}

module.exports = webpackConfig
