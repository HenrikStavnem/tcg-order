const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('styles', () => {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./dist/css/'));
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./dist/js'))
  });

gulp.task('clean', () => {
	return del([
		'css/main.css',
	]);
});

gulp.task('watch', () => {
	gulp.watch('src/scss/**/*.scss', (done) => {
		gulp.series(['clean', 'styles'])(done);
	});

	gulp.watch('src/js/**/*.js', (done) => {
		gulp.series(['scripts'])(done);
	});
});

gulp.task('default', gulp.series(['watch', 'clean', 'styles', 'scripts']));