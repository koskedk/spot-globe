const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.(scss|sass|css)$/, loader: ["style-loader", "css-loader", "sass-loader"]},
            {test: /\.(png|svg|jpg|jpeg|gif|ico)$/, loader: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, loader: ['file-loader']}
        ],
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        proxy: {
            '/api': 'http://localhost:4710'
        },
        port: 4711
    },
    devtool: 'source-map',
    externals: [],
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),

        // Compress CSS files
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: false
                }
            }
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(APP_PATH, 'index.html'),
            favicon: path.join(APP_PATH, 'favicon.ico'),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ]
};
