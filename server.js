/*eslint-disable no-console, no-var */

import express from 'express'
import webpack from 'webpack'
import WebpackConfig from './webpack.config.babel'

let app = express()

let compiler = webpack(WebpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '',
    noInfo: false,
    stats: {
        colors: true
    }
}))

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + '/build'))

let port = 8000

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})