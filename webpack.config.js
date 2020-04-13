const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
    mode: 'development',
    entry: ['regenerator-runtime/runtime', './src/server/index.js'],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [ nodeExternals() ]
};

const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: [ 'babel-polyfill', './src/client/index.js' ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                        // options: {
                        //   modules: true,
                        //   importLoaders: 1,
                        //   localIdentName: '[sha1:hash:hex:4]'
                        // }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.scss', '.css']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js')
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}

module.exports = [ serverConfig, clientConfig ];
