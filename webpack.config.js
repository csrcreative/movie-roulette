var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client');
//TODO: SET UP DEV SERVER
//TODO: ADD SASS COMPILE, INSTALL TACHYONS
const config = {
   entry: {
     main: APP_DIR + '/index.js'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
   },
   module: {
    rules: [
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ["@babel/preset-env","@babel/preset-react"] // Transpiles JSX and ES6
         }
       }]
     }
    ],

  },
  mode: "development",
  target: 'node'
};

module.exports = config;