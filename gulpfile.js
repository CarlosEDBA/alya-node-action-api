const { src, dest, parallel, series, watch } = require('gulp')
const fs = require('fs')
const path = require('path')
const clean = require('gulp-clean')

function logFile(file, cb) {
  console.log(file)
  cb(null, file)
}

function copyToTcc() {
  return src([
    './**/*.js',
  ])
    .pipe(dest('../alya-finance/node_modules/alya-node-action-api'))
}

exports.dev = series(
  copyToTcc,
  function () {
    watch([
      './**/*.js',
    ], series(
      copyToTcc
    ))
  }
)