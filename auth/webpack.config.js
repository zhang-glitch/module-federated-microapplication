const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const packageJSON = require("./package.json")

module.exports = {
  mode: "development",
  output: {
    // /auth/ 我们根路由被指定为auth，所以要改变所有静态文件引入前缀
    publicPath: "http://localhost:8082/"
  },
  devServer: {
    port: 8082,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap.js"
      },
      shared: packageJSON.dependencies
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
