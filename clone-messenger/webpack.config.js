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
        path: path.resolve(__dirname, "build"), // có thể thay build -> dist. Tùy tên folder muốn tạo khi build (run start/run build)
        filename: "bundle.js",
        publicPath: "/", // Path để truy cập đối với những thành phần public như ico,...
        // filename: "[name].bundle.js",
        // path: path.resolve(__dirname, "./dist"),
        // publicPath: "",
    },
    resolve: {
        //build luôn cả cái file có đuôi dưới khi dùng webpack
        extensions: ["*", ".jsx", ".js"],
        modules: ["node_modules"],
    },
    devServer: {
        open: true, //Setting open browser when buid/start == --open been package.jsx
        port: 3000,
        hot: false, // Setting auto reload when update/change code
        liveReload: true,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
        }, //=> use this to write/create to dist(build - setting path above "output") when developing (run start)
        static: {
            directory: path.join(__dirname, "dist"),
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
                //Load scss 
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
                //Load css từ node module
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
        new CopyPlugin({
            patterns: [
                { from: "./public/messenger.ico", to: "./public/messenger.ico" }, //Giải thích ở dưới HtmlWebpackPlugin
                // { from: "src", to: "dist" },
                // { from: "public", to: "dist" },
            ],
        }),
        new webpack.DefinePlugin({
            "process.env": {
                API_URL: JSON.stringify("https://localhost:44344/api"),
            },
        }),
        new HtmlWebpackPlugin({
            // favicon: "./public/messenger.ico",
            //có dòng copyplugin thì khỏi cần dòng này
            //Dòng này là webpack gen tự động dòng link ref icon trong index.html khi build
            // Còn dòng Copyplugin là copy file khi build + tự viết dòng link ref icon trong index.html
            template: "./public/index.html",
        }),
        new webpack.ProvidePlugin({
            // Đặt những này thành goblal variable => ko cần declare trong từn component
            $: "jquery",
            "window.jQuery": "jquery",
            jQuery: "jquery",
            react: "React",
        }),
    ],
};
