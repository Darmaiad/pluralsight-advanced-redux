const webpack = require('webpack');
const path = require('path');
module.exports = {
    module: {
        loaders: [
            {
                loader: "babel-loader",
                exclude: [
                    /(node_modules)/,
                ],
                query: {
                    presets: ['env', 'react'],
                    plugins: ['transform-object-rest-spread']
                },
            },
            // When there is a linting error webpack will not load the page
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            // { 
            //     test: /(\.css)$/, loaders: ['style', 'css'] 
            // },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // Plug-in that when you have an error does not reload the page. Does not play well with eslint
        // new webpack.NoErrorsPlugin(), 
    ],
    stats: {
        colors: true,
    },
    watch: true,
    entry: {
        "index": [
            'babel-regenerator-runtime',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            './src/main',
        ]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets",
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    devServer: { inline: true },
    devtool: 'source-map',
};
