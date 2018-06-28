const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "./build");
var APP_DIR = path.resolve(__dirname, "./src/client");

const config = {
    entry: {
        main: APP_DIR + "/index.js"
    },
    output: {
        filename: "js/bundle.js",
        path: BUILD_DIR
    },
    optimization: {
        minimizer: [
          new UglifyJSPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ] // Transpiles JSX and ES6
                        }
                    }
                ]
            },
            {
              test: /\.scss$/,
              use: [{
                  loader: MiniCssExtractPlugin.loader
              }, {
                  loader: "css-loader"
              }, {
                  loader: "sass-loader",
                  options: {
                      includePaths: ["node_modules/tachyons-sass/"]
                  }
              }]
          }
        ]
    },
    mode: "production",
    target: "web"
};

module.exports = config;
