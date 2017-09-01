const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const buildPath = path.resolve(__dirname, './dist');

module.exports = {
    context: path.resolve(__dirname, './app'),  /* 如果不写可能没有办法解析部分插件 */
    entry: path.resolve(__dirname, './app/index.js'),
    output: {
        path: buildPath,
        filename: 'index.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:['react']
                }
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },{
                test: /\.mp3$/,
                loader:'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            },{
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader', //如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl
                query: {
                    name: '[path][name].[ext]', //css图片目录
                    limit: 100
                }
            },{
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                localIndentName: '[sx][hash:base64:8]',
                                modules: true,
                                camelCase: true
                            }
                        },{
                            loader: 'px2rem-loader',
                            options: {
                                remUnit:75,
                                remPrecision: 8
                            }
                        },{
                            loader: 'less-loader'
                        }
                    ]

                })

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                from: './music',
                to:'./music'
            },
            {
                from: './libs',
                to: './libs'
            }
        ]),
        new ExtractTextPlugin({filename: '[name].min.css',allChunks: true})
    ]
};