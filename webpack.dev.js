const webpack = require("webpack");
const path = require("path");

var BUILD_DIR = path.resolve(__dirname, "./build");
var APP_DIR = path.resolve(__dirname, "./src/client");
//TODO: SET UP DEV SERVER
//TODO: ADD SASS COMPILE, INSTALL TACHYONS, HTML PLUGIN
const config = {
    entry: {
        main: APP_DIR + "/index.js"
    },
    output: {
        filename: "js/bundle.js",
        path: BUILD_DIR
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
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
                  loader: "style-loader"
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
    mode: "development",
    target: "web",
    watch:true,
    devServer: {
        hot: true,
        inline: true,
        host: 'localhost', // Defaults to `localhost`
        port: 3000, // Defaults to 8080
        proxy: {
          '/**': {
            target: 'http://localhost:8000/',
            secure: false
          }
        }
    }
};

module.exports = config;
