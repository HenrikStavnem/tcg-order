const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const concat = require('gulp-concat');

gulp.task('styles', () => {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./dist/css/'));
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
});

gulp.task('default', gulp.series(['watch', 'clean', 'styles']));