const gulp         = require('gulp');
const browserify   = require('browserify');
const watchify     = require('watchify');
const uglify       = require('gulp-uglify');
const source       = require('vinyl-source-stream');
const buffer       = require('vinyl-buffer');
const minifycss    = require('gulp-minify-css');
const less         = require('gulp-less');
const concat       = require('gulp-concat');
const notify       = require('gulp-notify');
const envify       = require('loose-envify');

const jsSrc   = './public/src/index.js';
const cssSrc  = './public/src/style/*.*';
const destSrc = './public/dist/';

const bf = browserify({
	entries: jsSrc,
	cache: {},
	packageCache: {},
	plugin: [watchify]
});

bf.on('update', () => {
	gulp.start('reactify');
});

process.env.NODE_ENV = 'production';//设置为生产环境

gulp.task('reactify', () => {
	return bf.transform('babelify', {
			presets: ['es2015', 'react']
		})
		.transform('envify', {
		  	'NODE_ENV': 'production'
		})
		.bundle()
		.on('error', function(e){
			console.log('ERROR::', e.message);
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(destSrc))
		.pipe(notify('reactify task done !'))
});

gulp.task('style', () => 
	gulp.src(cssSrc)
		.pipe(concat('app.css'))
/*		.on('error', e => console.log('ERROR::', e.message))*/
		.pipe(less())
		.pipe(minifycss())
		.pipe(gulp.dest(destSrc))
		.pipe(notify('style task done !'))
);

gulp.task('watch', () => {
	gulp.watch(cssSrc, ['style']);
});

gulp.task('default', ['reactify', 'style', 'watch']);