var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../web/static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", '@babel/react']
        }
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name:'[name].[ext]',
          outputPath:'/styles/fonts' //the icons will be stored in dist/assets folder
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [".js", ".json", ".jsx", ".css"]
  }
}
