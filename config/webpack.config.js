const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/public/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: 'sourcemap',
  entry: path.resolve(__dirname, '../src/app/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
        {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: "file-loader"
        },
        { 
            test: /\.jsx?$/, 
            loader: 'babel-loader', 
            exclude: /node_modules/,
            options: {
                extends: path.resolve(__dirname, './.babelrc'),
            }
        },
        {
            test: /\.scss$/,
            loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ],
            exclude: /node_modules/,
        }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}