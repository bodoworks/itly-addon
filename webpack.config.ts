import path from "path";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration } from "webpack";
import ZipPlugin from "zip-webpack-plugin";

import { version as PACKAGE_VERSION } from "./package.json";

const WEBPACK_MODES = {
    development: "development",
    production: "production",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (env: any, argv: any): Configuration => {
    const mode = argv.mode || WEBPACK_MODES.production;
    const isProd = mode === WEBPACK_MODES.production;

    return {
        devtool: isProd ? "source-map" : "inline-source-map",

        entry: {
            background: "./src/views/background/index.ts",
            content: "./src/views/content/index.ts",
            "dev-panel": "./src/views/dev-panel/index.tsx",
            "dev-tools": "./src/views/dev-tools/index.ts",
            options: "./src/views/options/index.tsx",
        },

        module: {
            rules: [
                {
                    test: /\.([tj])sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                    },
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                    },
                },
            ],
        },

        output: {
            filename: "bundle_[name].js",
            path: path.resolve(__dirname, "dist"),
        },

        plugins: [
            new CleanWebpackPlugin({
                // on rebuild do not delete stale assets as these include
                // css and html files
                cleanStaleWebpackAssets: false,
            }),

            new MiniCssExtractPlugin(),

            new webpack.DefinePlugin({
                VERSION: JSON.stringify(PACKAGE_VERSION),
            }),

            new CopyPlugin({
                patterns: [
                    {
                        from: "src/assets/",
                        to: ".",
                        transform(
                            content: Buffer,
                            path: string
                        ): string | Buffer {
                            if (path.includes("manifest.json")) {
                                const manifest = JSON.parse(content.toString());
                                manifest.version = PACKAGE_VERSION;
                                return JSON.stringify(manifest, null, 2);
                            }

                            return content;
                        },
                    },
                ],
            }),

            new HtmlWebpackPlugin({
                filename: "dev-panel.html",
                chunks: ["dev-panel"],
                template: "src/views/dev-panel/index.html",
            }),

            new HtmlWebpackPlugin({
                filename: "dev-tools.html",
                chunks: ["dev-tools"],
            }),

            new HtmlWebpackPlugin({
                filename: "options.html",
                chunks: ["options"],
                template: "src/views/options/index.html",
            }),

            new ZipPlugin({
                filename: `itly-addon-${PACKAGE_VERSION}.zip`,
            }),
        ],

        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
    };
};
