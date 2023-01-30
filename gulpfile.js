const { src, dest } = require('gulp');
const concat = require('gulp-concat');

const merge = () =>
  src([
    'dist/*.js'
  ])
  .pipe(concat('full.bundle.js'))
  .pipe(dest('src/bundles'));

exports.merge = merge;