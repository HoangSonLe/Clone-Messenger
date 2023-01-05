var path = require("path");
var webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    target: "web",
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: ["*", ".jsx", ".js"],
        modules: ['node_modules'],
    },
    devServer: {
        open: true,
        port: 3000,
        hot: false,
        liveReload: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
          },
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                include: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         // { from: "./public/favicon.ico", to: "./public/favicon.ico" },
        //         // { from: "src", to: "dist" },
        //         { from: "public", to: "dist" },
        //     ],
        // }),
        new webpack.DefinePlugin({
            "process.env": {
                API_URL: JSON.stringify("https://localhost:44344/api"),
            },
        }),
        new HtmlWebpackPlugin({
            favicon: "./public/messenger.ico",
            template: "./public/index.html",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            "window.jQuery": "jquery",
            jQuery: "jquery",
            react: "React",
        }),
    ],
};
