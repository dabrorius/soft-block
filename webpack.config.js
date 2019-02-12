const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  node: false,
  entry: {
    options: "./src/options.js",
    blockPage: "./src/blockPage.js",
    onDocumentStart: "./src/onDocumentStart.js",
    assets: "./src/assets.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ],
        type: "javascript/auto"
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png|\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Soft Block Options",
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      title: "Soft Blocked",
      filename: "blockPage.html",
      chunks: ["blockPage"]
    })
  ]
};
