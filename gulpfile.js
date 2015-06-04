var gulp = require('gulp');
var ts = require('gulp-typescript');

var SOURCE_FILES_GLOB = 'src/**/*.ts';
var BASE_TYPESCRIPT_COMPILER_CONFIG = {
	module: 'amd',
	noImplicitAny: true
};

gulp.task('default', [
	'compile.es3'
]);

gulp.task('compile.es3', function() {
	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(BASE_TYPESCRIPT_COMPILER_CONFIG));

	return tsResult.js.pipe(gulp.dest('built'))
});