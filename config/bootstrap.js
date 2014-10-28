/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special chalkic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

/*
  Gulpify-Sails by Sabbir Ahmed
  Requires Spwan and Chalk
 */

var sp = require('child_process').spawn;
var chalk = require('chalk');

/*
Print pretty logging (Requires 'chalk' module)
 */

var print = function (data) {
  console.log(chalk.cyan('Gulp :: '), chalk.magenta(data));
};

/*
Logs gulp process outputs
 */
function GulpiFy(Options) {
    Options = Options || {};
    var gulp = '';
    if (sails.config.environment != "development") {
      /*
      Runs in production.
       */
      gulp = sp('gulp', [Options.dist]);
    } else {
      /*
      Development environment with logging enabled.
       */
      gulp = sp('gulp', [Options.build]);
      log(gulp);
    }
  }

/* Logging outputs to the console */

var log = function (gulp) {
  gulp.stdout.on('data', function (data) {
    print(data);
  });

  gulp.stderr.on('data', function (data) {
    print(data);
  });

  gulp.on('close', function (data) {
    print(data);
  });
};

module.exports.bootstrap = function (cb) {
 GulpiFy({
     build : 'build',
     dist : 'build'
 });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
