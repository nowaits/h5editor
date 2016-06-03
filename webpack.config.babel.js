import webpack from 'webpack'
import fs from 'fs'
import {
    minify as HtmlMinify
} from 'html-minifier'

let production = process.env.NODE_ENV === 'production'

let config = {
    devtool: !production ? 'inline-source-map' : false,

    entry: {
        editor: ['./js/app.js']
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        publicPath: '/build/'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        // 其他插件
        function () {

            this.plugin('done', stats => {
                let file = 'editor.html'
                fs.readFile(file, (err, data) => {
                    var strings = data.toString().replace(/\[hash\]/g, `${stats.hash}`)

                    if (production) {
                        strings = HtmlMinify(strings, {
                            removeComments: true,
                            collapseWhitespace: true,
                            minifyJS: true,
                            minifyCSS: true,
                            removeAttributeQuotes: true,
                            removeEmptyAttributes: true,
                            removeRedundantAttributes: true,
                            removeTagWhitespace: true
                        })
                    }

                    fs.writeFile(`build/${file}`, strings, err => {
                        !err && console.log(`Pack Finish: ${new Date().toTimeString()}`)
                    })
                });
            })
        }
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', ".json", ".css"]
    }
}

if (production) {
    config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
        beautify: true,
        minimize: true,
        compress: {
            warnings: false
        },
        output: {
            comments: false
        },
        except: ['$super', '$']
    }), new webpack.optimize.DedupePlugin(), new webpack.NoErrorsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }))
} else {
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    Object.keys(config.entry).forEach(function (name) {
        config.entry[name].unshift('webpack-hot-middleware/client');
    });
}

module.exports = config