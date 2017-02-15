'use strict';

let browserSync = null;
let cssnano = require('gulp-cssnano');
let eslint = require('gulp-eslint');
let gulp = require('gulp');
let gulpif = require('gulp-if');
let gutil = require('gulp-util');
let uglify = require('gulp-uglify');
let webpack = require('webpack');
let sourcemaps = require('gulp-sourcemaps');

let dev = process.env.NODE_ENV === 'dev';

if (dev) {
  browserSync = require('browser-sync').create();
}

let dirs = {
  src: 'client',
  dist: 'public/assets',
  images: 'images',
  imagesDist: 'images',
  js: 'scripts',
  jsDist: '',
};

let files = {
  mainJs: 'app',
  mainJsDist: 'app',
  mainStyles: 'style',
  mainStylesDist: 'style'
};

let webpackDevtool = 'source-map';
let webpackWatch = false;

let proxyPath = 'localhost:8080';

if (dev) {
  webpackDevtool = 'eval-source-map';
  webpackWatch = true;
}


let webpackConfig = {
  devtool: webpackDevtool,
  entry: [
    'babel-polyfill',
    './' + dirs.src + '/' + dirs.js + '/' + files.mainJs + '.js'
  ],
  output: {
    filename: './' + dirs.dist + '/' + dirs.jsDist + '/' + files.mainJsDist + '.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-2', 'es2015'],
          plugins: ['transform-react-jsx', 'transform-runtime']
        },
        exclude: /node_modules/
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/ 
      }
    ],
    postLoaders: [
      {
        loader: 'transform/cacheable?envify'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  watch: webpackWatch
};

gulp.task('browsersync', () => {
  browserSync.init({
    online: true,
    open: false,
    port: 4200,
    proxy: proxyPath,
    serveStatic: ['.', './public/assets']
  });
});

gulp.task('eslint', () => {
  return gulp.src([dirs.src + '/' + dirs.js + '/**/*', '!node_modules/**', '!bower_components/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('images', () => {
  return gulp.src(dirs.src + '/' + dirs.images + '/**/*')
    .pipe(gulp.dest(dirs.dist + '/' + dirs.imagesDist));
});

gulp.task('minify-js', ['webpack'], () => {
  return gulp.src(dirs.dist + '/' + dirs.jsDist + '/' + files.mainJs + '.js')
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .pipe(gulp.dest(dirs.dist + '/' + dirs.jsDist));
});

gulp.task('reload', () => {
  if (dev) {
    browserSync.reload();
  }
});

gulp.task('watch', () => {
  gulp.watch(dirs.src + '/' + dirs.js + '/**/*', ['eslint']);
});


gulp.task('webpack', (callback) => {
  let isFirstRun = true;

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      children: false,
      chunks: false,
      colors: true,
      modules: false,
      timing: true
    }));

    if (isFirstRun) {
      isFirstRun = false;
      callback();
    } else {
      if (dev) {
        browserSync.reload();
      }
    }
  });
});

gulp.task('default', ['webpack', 'images']);

gulp.task('dist', ['default', 'minify-js']);

gulp.task('livereload', ['webpack', 'images', 'browsersync', 'watch']);
