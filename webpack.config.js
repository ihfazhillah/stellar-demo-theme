const path = require("path");

const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: __dirname + "/stellar/index.js",
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "react"
    },
    "react-router": {
      commonjs: "react-router",
      commonjs2: "react-router",
      amd: "react-router",
      root: "react-router"
    },
    "font-awesome": {
      commonjs: "font-awesome",
      commonjs2: "font-awesome",
      amd: "react-router"
    }
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname + "/images")],
    alias: {
      "react-router": "react-router-dom",
      images: path.resolve(__dirname + "/images")
    }
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: "babel-loader",
        options: {
          presets: ["react-app"]
        }
      },

      {
        test: /\.(svg|png|jpeg|gif|jpg)/,
        loader: "file-loader",
        options: {
          name: "/img/[name].[ext]"
        }
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff2?)(\?.*$|$)/,

        loader: "file-loader",
        options: {
          name: "/font/[name].[ext]"
        }
      }
    ],
    loaders: []
  },

  output: {
    path: __dirname + "/dist",
    filename: "stellar.js",
    library: "stellar",
    libraryTarget: "umd",
    publicPath: "https://shopkeeper-lionel-47443.netlify.com"
  },
  plugins: [new ExtractTextPlugin("style.css")]
};

module.exports = config;
