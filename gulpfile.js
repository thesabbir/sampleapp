'use strict';
var gulp = require('gulp'),
  server = require('gulp-webserver'),
  prefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  inject = require("gulp-inject"),
  angularFilesort = require('gulp-angular-filesort'),
  rimraf = require('gulp-rimraf'),
  bowerFiles = require('main-bower-files'),
  ngAnnotate = require('gulp-ng-annotate');


function fileTypeFilter(files, extension) {
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}
var files = {
  vendorsJs: [
    './frontend/vendors/js/jquery.js',
    './frontend/vendors/js/angular.js',
    './frontend/vendors/js/sails.io.js',
    './frontend/vendors/js/ui-bootstrap-tpls.js',
    './frontend/vendors/js/angular-translate.js',
    './frontend/js/jq.js',
    './frontend/vendors/**/*.js',
    '!./frontend/vendors/js/bootstrap.js'
  ],

  vendorsCss: [
    './frontend/vendors/css/bootstrap.css',
    './frontend/vendors/**/*.css'
  ],
  appCss: [
    './frontend/styles/*.css'
  ],
  appJs: [
    './frontend/js/**/*.js',
      '!./frontend/js/io.settings.js',
    './frontend/js/app.js'
  ]
};

//Build injections
var htmlInject = function (files, iOptions) {
  iOptions = iOptions || {};

  var options = {
    ignorePath: iOptions.ip || 'frontend'
  };
  if (iOptions.vendor || false) options.starttag = '<!-- inject:vendor:{{ext}} -->';

  var filesStream = gulp.src(files, {read: iOptions.sort || false});
  if (iOptions.sort || false) {
    filesStream = filesStream.pipe(angularFilesort());
  }

  return inject(filesStream, options);
};

/*
 * Cleaning
 * */

gulp.task('clean:vendors', function () {
  return gulp.src([
    './frontend/vendors/css',
    './frontend/vendors/js'
  ])
    .pipe(rimraf());
});


/*
 * Watch Tasks
 */

gulp.task('watch', function () {
  gulp.watch('./frontend/styles/**/*.less', ['build-css']);
});

gulp.task('build-css', function () {
  return gulp.src(['./frontend/styles/less/app.less'])
    .pipe(less())
    .pipe(prefixer('last 10 version'))
    .pipe(gulp.dest('./frontend/styles'));
});

/*
 * Get file from vendors installed by Bower.
 * */


gulp.task('vendors-css', function () {
  var vendorsCss = fileTypeFilter(bowerFiles(), 'css');
  if (vendorsCss.length) {
    return gulp.src(vendorsCss)
      .pipe(gulp.dest('./frontend/vendors/css'));
  }
});

gulp.task('vendors-js', function () {
  var vendorsJS = fileTypeFilter(bowerFiles(), 'js');
  if (vendorsJS.length) {
    return gulp.src(vendorsJS)
      .pipe(gulp.dest('./frontend/vendors/js'));
  }
});

gulp.task('vendors-fonts', function () {
  var vendorsFonts = fileTypeFilter(bowerFiles(), '(eot|svg|ttf|woff|otf)');
  if (vendorsFonts.length) {
    return gulp.src(vendorsFonts)
      .pipe(gulp.dest('./frontend/vendors/fonts'));
  }
});
/*
Build Task
 */
gulp.task('build', ['build-css', 'vendors-css', 'vendors-js', 'vendors-fonts' ], function () {
  gulp.src('./frontend/index.html')
    .pipe(htmlInject(files.appJs, { sort: true}))
    .pipe(htmlInject(files.appCss))
    .pipe(htmlInject(files.vendorsJs, {vendor: true}))
    .pipe(htmlInject(files.vendorsCss, {vendor: true}))
    .pipe(gulp.dest('./frontend'));
});
/*
 Main Tasks
 */
gulp.task('default', ['build', 'watch'], function () {
  gulp.src('frontend')
    .pipe(server({
      livereload: true,
      open: true
    }));
});
