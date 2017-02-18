import zip from 'gulp-zip';
import gulp from 'gulp';

gulp.task('package', () =>
  gulp.src([
    // what to includes
    '.ebextensions/**/*',
    '.*',
    '*.*',
    'src/**/*',
    'webpack/**/*',
    'gulp/**/*',
    'build/**/*',
    // what to exclude
    '!.elasticbeanstalk',
    '!theapp.zip',
  ], { base: './' })
    .pipe(zip('theapp.zip'))
    .pipe(gulp.dest('./'))
);
