import webpack from 'webpack'
import fs from 'fs'
import path from 'path'
import {
    minify as HtmlMinify
} from 'html-minifier'

let production = process.env.NODE_ENV === 'production'

let js_dir = path.join(__dirname, 'js')

let config = {
    devtool: !production ? 'inline-source-map' : false,

    entry: fs.readdirSync(js_dir).reduce(function (entries, dir) {
        
        if (fs.statSync(path.join(js_dir, dir)).isDirectory()) {
            var app_js = path.join(js_dir, dir, 'app.js')

            if (fs.existsSync(app_js)) {

                entries[dir] = [app_js]
            }
        }

        return entries
    }, {}),

    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
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
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        // 其他插件
        function () {

            this.plugin('done', stats => {
                let files = ['editor.html', 'story.html']

                function process_html(i) {
                    if (i < 0 || i >= files.length) {
                        return;
                    }

                    let file = files[i]

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
                            if (i + 1 == files.length) {
                                !err && console.log(`Pack Finish: ${new Date().toTimeString()}`)
                            } else {
                                process_html(i + 1)
                            }
                        })
                    });
                }

                process_html(0)
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