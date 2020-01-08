const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: join(__dirname, 'src', 'app.js'),
    output: {
        path: join(__dirname, 'build'),
        filename: 'app.bundled.js',
        publicPath: '/build'
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true // index.html will be served instead of 404 responses
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(), // to enable hot-reloading
        new VueLoaderPlugin(), // needed for our vue files
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            title: 'Vue with webpack',
            template: join(__dirname, 'index.html')
        }),
    ]
};