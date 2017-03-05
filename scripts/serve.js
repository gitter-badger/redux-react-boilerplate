const exec = require('child_process').exec
const browserSync = require('browser-sync')
const pkg = require('../package.json')

module.exports = dev => {
  if (dev) {
    const bs = browserSync.create()
    bs.init({
      server: './docs',
      port: pkg.devPort,
      open: false
    })
    bs.watch('./docs/main.css', (event, file) => {
      if (event === 'change') {
        bs.reload(file)
      }
    })
  } else {
    exec(`cd docs && http-server -p ${pkg.devPort}`, err => {
      if (err) {
        throw err
      }
    })
  }
}
