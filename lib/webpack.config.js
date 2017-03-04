const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const root = process.cwd()

module.exports = {
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        loader: `ngtemplate-loader?relativeTo=${path.resolve(root, 'client')}/!html-loader`
      },
      {
        test: /\.(png|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'source-map',
  entry: {
    main: path.resolve(root, 'client/index.js')
  },
  output: {
    publicPath: '/',
    filename: '[chunkhash].[name].js',
    path: path.resolve(root, 'client/build')
  },
  plugins: [
    new CleanWebpackPlugin(['client/build'], {root}),
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'client/index.ejs')
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: 'manifest'
    }),
    new ExtractTextPlugin('[chunkhash].styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],
  devServer: {
    compress: true,
    port: 5000
  }
}
