const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const deploy = require('gulp-gh-pages');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

const reload = browserSync.reload;

gulp.task('views', () => {
  return gulp.src('./src/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./build/'))
    .pipe(reload({stream: true}));
});

gulp.task('styles', () => {
  return gulp.src('./src/sass/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });

  gulp.watch('./src/**/*.pug', ['views']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/sass/**/*.scss', ['styles']);
});

gulp.task('deploy', () => {
  return gulp.src('./build/**/*')
    .pipe(deploy())
});

gulp.task('dev', ['views', 'styles', 'scripts', 'serve']);
gulp.task('build', ['views', 'styles', 'scripts']);

