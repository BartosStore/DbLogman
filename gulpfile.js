/*global require*/
var gulp = require('gulp'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    eslint = require('gulp-eslint');

var path = {
  MINIFIED_OUT: 'build.min.js',
  OUTPUT_NAME: 'app.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/app.js',
  ALL: [
    'src/js/*.jsx',
    'src/js/*.js',
    'src/js/core/*.js'
  ],
  MODULES: [
    'node_modules',
    '../system_components'
  ]
};

function build() {
  var bundler = browserify(path.ENTRY_POINT, {
    paths: path.MODULES,
    debug: true,
    transform: [
      babelify.configure({
        presets: ["es2015", "react"]
      })
    ]
  });

  return bundler
    .bundle()
    .pipe(source(path.OUTPUT_NAME))
    .pipe(gulp.dest(path.DEST_BUILD));
}

function minify() {
  return gulp
    .src(path.DEST_BUILD.concat('/').concat(path.OUTPUT_NAME))
    .pipe(uglify())
    .pipe(rename({extname: path.MINIFIED_OUT}))
    .pipe(gulp.dest(path.DEST_SRC));
}

function lint() {
  return gulp
    .src(path.ALL)
    .pipe(eslint())
    .pipe(eslint.format());
}

function watch() {
  return gulp.watch(path.ALL, ['build']);
}

/* Zakladni rutiny */
gulp.task('lint', lint);
gulp.task('hook', build);

/* Zavisle rutiny */
gulp.task('build', ['lint'], build);
gulp.task('minify', ['build'], minify);
gulp.task('watch', ['build'], watch);

/* Konecne rutiny */
gulp.task('dev', ['lint', 'build', 'watch']);
gulp.task('dist', ['build', 'minify']);
