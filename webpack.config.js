const path = require('path')
const merge = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, argv) => {
  const common = {
    entry: path.join(__dirname, 'src/js/script.ts'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'assets/script.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json'
              }
            },
            {
              loader: 'tslint-loader',
              options: {
                typeCheck: true,
                fix: true,
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html'
      })
    ],
    resolve: {
      plugins: [
        new TsconfigPathsPlugin()
      ],
      extensions: ['.js', '.ts', '.html']
    }
  }

  if (argv.mode === 'production') {
    return merge(common, {
      mode: 'production'
    });
  }

  if (argv.mode === 'development') {
    return merge(common, {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        port: 9000,
        watchContentBase: true
      }
    });
  }
}