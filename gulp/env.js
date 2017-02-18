import args from './support/args';
import gulp from 'gulp';
// import { execSync } from 'child_process';

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
  // The app is not a library, so it doesn't make sense to use semver.
  // Este uses appVersion for crash reporting to match bad builds easily.
  const gitIsAvailable = !process.env.SOURCE_VERSION; // Heroku detection.
  if (gitIsAvailable) {
    process.env.appVersion = '70227ca9d89dd68bbde0fde9a0854c598e6b98be';
    // process.env.appVersion = execSync('git rev-parse HEAD').toString().trim();
  }
});
