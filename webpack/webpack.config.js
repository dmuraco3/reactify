const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WebExtension = require("webpack-target-webextension");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        background: path.resolve(__dirname, "..", "src", "background.ts"),
        content: path.resolve(__dirname, "..", "src", "content.ts"),
        popup: path.resolve(__dirname, "..", "src", "popup.ts"),
        CursorSelectCallback: path.resolve(__dirname, "..", "src", "CursorSelectCallback.ts"),
        AllSelectCallback: path.resolve(__dirname, "..", "src", "AllSelectCallback.ts"),
        FormSelectCallback: path.resolve(__dirname, "..", "src", "FormSelectCallback.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
        publicPath: '/dist/',
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }],
        }),
        new WebExtension({
            background: {
                entry: "background",
                manifest: 3,
            }
        }), 
    ],
    watch: true,
};
