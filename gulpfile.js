const { src, dest } = require('gulp');
const concat = require('gulp-concat');

const merge = () =>
  src([
    'dist/*.js'
  ])
  .pipe(concat('mergedScripts.js'))
  .pipe(dest('src/bundles'));

exports.merge = merge;