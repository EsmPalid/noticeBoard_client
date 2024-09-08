const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "/src/index.js",
    output: {
        path: "/var/www/build",
        filename: "test.js",
        // 만약 , npx webpack으로 번들링을 했는대 내용이 바뀌지 않는다면
        // bundle.js를 다른 이름으로 바꿔보자
        // 원리는 나도 모르겠다...
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader",
                options: { limit: false },
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".jsx", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
    ],

    devtool: "source-map",
    devServer: {
        compress: true,
        port: 9000,
    },
};
