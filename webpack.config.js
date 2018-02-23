/**
 * Created by lmislm on 2018/2/20- 14:10.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './public/js/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
           $:'jquery',
           jQuery:'jquery'
        }),
    ]
};