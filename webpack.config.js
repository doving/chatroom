const webpack = require('webpack');
const basepath = './public/javascripts/';

module.exports = {
    entry: './public/javascripts/index.js',
    output: {
        path: './public/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}