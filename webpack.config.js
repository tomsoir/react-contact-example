// To run app: $ npm run dev

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

module.exports = {
    entry   : './src/app.jsx',
    module  : {
        loaders : [{
            test    : /.jsx?$/,
            loader  : 'babel-loader',
            exclude : /node_modules/,
            query   : {presets: ['es2015', 'react']}
        },{ 
            test    : /\.css$/, 
            loader  : "style-loader!css-loader" 
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template    : 'src/app.tmp',
            filename    : 'index.html',
            inject      : 'body'
        }),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ]
};
