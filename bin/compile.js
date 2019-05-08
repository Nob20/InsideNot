/* eslint-disable no-undef */
const fs = require('fs-extra')
const webpack = require('webpack')
const debug = require('debug')('app:bin:compile')
const webpackWebConfig = require('../config/webpack.web.config')
const webpackServerConfig = require('../config/webpack.server.config')
const project = require('../config/project.config')

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

process.on('uncaughtException', function (err) {
  console.error(err)
})
// Wrapper around webpack to promisify its compiler and supply friendly logging
const webpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      debug('Webpack compile completed.')
      debug(stats.toString(project.compiler_stats))

      if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })

const compile = () => {
  debug('Starting UI compilation.')
  return Promise.resolve()
    .then(() => webpackCompiler(webpackWebConfig))
    .then(stats => {
      if (stats.warnings.length && project.compiler_fail_on_warning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".')
      }
      debug('Copying UI static assets to dist folder.')
      fs.copySync(project.paths.public(), project.paths.dist())
    })
    .then(() => {
      debug('UI Compilation completed successfully.')
    })
    .then((resolve, reject) => {
      return new Promise((resolve, reject) => {
        webpack(webpackServerConfig, (err, stats) => {
          if (err) {
            debug('Server webpack compiler encountered a fatal error.', err)
            return reject(err)
          }
          debug('done with compiling of the Server Code')
          resolve(stats)
        })
      })
    })
    .then(stats => {
      if (stats.warnings && stats.warnings.length && project.compiler_fail_on_warning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".')
      }
      debug('Copying UI assets to server folder.', project.paths.dist(), ' : ', project.paths.server_dist())
      fs.copySync(project.paths.dist(), project.paths.server_dist())
      // need to rename index.html as it interfers with express.static
      fs.moveSync(project.paths.server_dist() + '/index.html', project.paths.server_dist() + '/ui-index.html')
    })
    .catch((err) => {
      debug('Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()

