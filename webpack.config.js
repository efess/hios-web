var path = require('path');
var cssExtractor = require("extract-text-webpack-plugin")

module.exports = {
  entry: './src/app/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel-loader',
        // don't transform node_modules folder (which don't need to be compiled)
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: cssExtractor.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          }
        }
      },
      { 
        test: /\.css$/, loader: "style-loader!css-loader" 
      }
    ]
  },
  plugins: [
    new cssExtractor("assets/style.css")
  ]
};