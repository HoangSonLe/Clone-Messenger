var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    target: "web",
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: ["*", ".jsx", ".js"],
    },
    devServer: {
        port: 3000,
        hot: false,
        liveReload: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "url-loader",
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "API_URL": JSON.stringify("https://localhost:44344/api"),
            },
        }),
        new HtmlWebpackPlugin({
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
