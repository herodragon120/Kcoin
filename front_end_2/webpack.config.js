var webpack = require('webpack');
module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/js/foundation.min.js',
        './src/app.js'
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery'
        })
    ],
    resolve: {
        root: __dirname,
        alias: {
            App:    'src/components/app.js',
            HomePage: 'src/components/HomePage.js',
            Account: 'src/components/account_page.js',
            Main: 'src/components/Main.js',
            Nav: 'src/components/Nav.js',
            Transaction: 'src/components/Transaction.js',
            SignIn: 'src/components/SignIn.js',
            AccountInfo: 'src/components/account_info.js',
            SignUp: 'src/components/SignUp.js'
        }
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /node_modules/
            }
        ]
    }
};