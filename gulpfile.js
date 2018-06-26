const gulp = {
  gulp: require('gulp'),
  rename: require('gulp-rename'),
  rm: require('gulp-rm'),
  plumber: require ('gulp-plumber'),
  sourcemaps: require ('gulp-sourcemaps'),
  notify: require('gulp-notify'),
  del: require('del'),
  autoprefixer: require ('gulp-autoprefixer'),
  stylus: require('gulp-stylus'),
  responsive: require('gulp-responsive'),
  concat: require('gulp-concat'),
  imagemin: require('gulp-imagemin'),
  gutil: require('gulp-util'),
  browserify: require('browserify'),
  babelify: require('babelify'),
  source: require('vinyl-source-stream'),
  env: require('babel-preset-env'),
  browserSync: require('browser-sync').create(),
  historyApiFallback: require('connect-history-api-fallback')
}

const config = {
  src: 'app/',
  dist: 'public/'
}

gulp.gulp.task('clean', () => {
  return gulp.del(config.dist).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'))
  })
})


gulp.gulp.task('default', ['dev'])
gulp.gulp.task('dev', ['watch'])

gulp.gulp.task('styles', () => {
  return gulp.gulp.src(`${config.src}assets/styles/main.styl`)
    .pipe(gulp.plumber({errorHandler: gulp.notify.onError('Styles error:  <%= error.message %>')}))
    .pipe(gulp.sourcemaps.init())
    .pipe(gulp.stylus())
    .pipe(gulp.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.sourcemaps.write())
    .pipe(gulp.gulp.dest(`${config.dist}assets/css/`))
})


gulp.gulp.task('scripts', () => {
  gulp.browserify({
    entries: `${config.src}assets/scripts/app.js`,
    debug: true
  })
  .transform(gulp.babelify, { presets: [gulp.env] })
  .bundle()
  .on('error', gulp.gutil.log)
  .pipe(gulp.source('app.js'))
  .on('error', gulp.gutil.log)
  .pipe(gulp.rename('app.js'))
  .pipe(gulp.gulp.dest(`${config.dist}assets/js`))
})

gulp.gulp.task('app', () => {
  return gulp.gulp.src(`${config.src}**/*.html`)
    .pipe(gulp.plumber({errorHandler: gulp.notify.onError('App error:  <%= error.message %>')}))
    .pipe(gulp.gulp.dest(`${config.dist}`))  
})

gulp.gulp.task('fonts', () => {
  return gulp.gulp.src(`${config.src}assets/fonts/*`)
    .pipe(gulp.plumber({errorHandler: gulp.notify.onError('Fonts copy error:  <%= error.message %>')}))
    .pipe(gulp.gulp.dest(`${config.dist}assets/fonts`))
})

gulp.gulp.task('images', () => {
  return gulp.gulp.src(`${config.src}assets/images/**`)
    .pipe(gulp.plumber({errorHandler: gulp.notify.onError('Images copy error:  <%= error.message %>')}))
    .pipe(gulp.gulp.dest(`${config.dist}assets/images`))
})

gulp.gulp.task('apache', () => {
  return gulp.gulp.src(`${config.src}.htaccess`)
    .pipe(gulp.plumber({errorHandler: gulp.notify.onError('Copy error:  <%= error.message %>')}))
    .pipe(gulp.gulp.dest(`${config.dist}`))
})

gulp.gulp.task('medias', () => {
  return gulp.gulp.src(`${config.src}medias/*.*`)
    .pipe(gulp.plumber({errorHandler: gulp.notify.onError('Medias error:  <%= error.message %>')}))
    .pipe(gulp.gulp.dest(`${config.dist}medias`))  
})

gulp.gulp.task('browsersync', () => {
  gulp.browserSync.init({
    server: {
      baseDir: "./public",
      middleware: [ gulp.historyApiFallback() ]
    },
    notify: false
  })
})

gulp.gulp.task('watch', ['app', 'styles', 'scripts', 'fonts', 'images', 'apache', 'browsersync'], () => {
  gulp.gulp.watch(`${config.src}*.html`, ['app']).on('change', gulp.browserSync.reload)
  gulp.gulp.watch(`${config.src}assets/styles/**/*.styl`, ['styles']).on('change', gulp.browserSync.reload)
  gulp.gulp.watch(`${config.src}assets/scripts/**/*.js`, ['scripts']).on('change', gulp.browserSync.reload)
  gulp.gulp.watch(`${config.src}assets/images/**`, ['images']).on('change', gulp.browserSync.reload)
  gulp.gulp.watch(`${config.src}assets/fonts/**`, ['fonts']).on('change', gulp.browserSync.reload)
})