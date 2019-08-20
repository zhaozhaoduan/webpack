const path = require('path');

//插件都是一个类，所以我们命名的时候尽快用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');

//拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

//打包前先清空dist目录
let {CleanWebpackPlugin} = require('clean-webpack-plugin');


//简写
let styleLess = new ExtractTextWebpackPlugin('css/login.css');


//热更新
let webpack = require('webpack');

module.exports = {
    entry: './src/index.js', //入口文件

    //多入口文件的打包方式
    // entry: ['./src/index.js', './src/login.js'], //把多个没有关系的文件通过数组的方式打包成一个文件

    // entry: {
    //     //真正的实现多入口和多出口需要写成对象的方式
    //     index: './src/index.js',
    //     login: './src/login.js'
    // },

    output: {
        //出口文件，添加hash可以防止文件缓存，每次都会生成4为hash串
        filename: "bundle.[hash:4].js",//打包后的文件名称
        path: path.resolve('dist')
    },
    //对应真正的多入口文件的出口文件写法
    // output:{
    //     filename: "[name].js", //打包后会生成index.js和login.js
    //     path: path.resolve('dist')
    // },

    module: {
        //处理对应模块
        rules: [
            //正常写法
            // {
            //     test: /\.css$/, //解析css
            //     use: ['style-loader', 'css-loader'] //从右向左解析
            //     /**
            //         也可以这样写，这种方式方便写一些配置参数
            //         use: [
            //             {loader: 'style-loader'},
            //             {loader: 'css-loader'}
            //         ]
            //      */
            // },
            // {
            //     test: /\.less$/, //解析less
            //     use: ['style-loader', 'css-loader', 'less-loader'] //从右向左解析
            // }

            //拆分css的写法
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader'],
                    //将css用link方式引入就不再需要style-loader
                    //postcss-loader是添加css3前缀的,需要的话可以添加
                    publicPath: '../' //相对入口文件的路径
                })
            },
            {
                test: /\.less$/,
                use: styleLess.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            //处理css中的样式图片
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192, //小于8k的图片自动转为base64格式，并且不会存在实体图片
                            outputPath: 'images/' //图片打包后存放的目录
                        }
                    }
                ]
            },
            //处理页面中的img标签
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },
            //处理字体文件
            {
                test: /\.(eot|ttg|woff|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/, //只转化src目录下的js
                exclude: /node_modules/ //排除掉node_modules，优化打包速度
            }
        ]
    },
    plugins: [
        //对应的插件
        //打包前清空
        new CleanWebpackPlugin(),

        //通过 new 一下这个类来使用插件
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            //在src目录下创建一个 index.html 页面当做模板来用
            template: "./src/index.html",

            //会在打包后的bundle.js后面加上hash串
            // hash: true
        }),
        //如果是多页面开发
        // new HtmlWebpackPlugin({
        //     template: './src/login.html',
        //     filename: 'login.name',
        //     chunks: ['login'] //对应关系，login.js对应的是login.html
        // }),

        //拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css'),
        styleLess,

        new webpack.HotModuleReplacementPlugin() //webpack自带的热更新插件
    ],

    //resolve解析：用来配置别名和省略后缀名
    resolve: {
        extensions: ['.js', '.json', '.css', '.less']
    },
    devServer: {
        //开发服务器配置
        // contentBase: './dist',
        // host: 'localhost',
        // port: 3000,
        // open: true, //自动打开浏览器
        // hot: true //开启热更新
    },
    mode: "development" //模式配置
};