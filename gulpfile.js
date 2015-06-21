var gulp = require('gulp');
var ts = require('gulp-typescript');
var lodash = require('lodash');

var SOURCE_FILES_GLOB = [
	'src/**/*.ts',
	'definitions/**/*.d.ts'
];
var BASE_TYPESCRIPT_COMPILER_CONFIG = {
	noImplicitAny: true,
	typescript: require('typescript')
};

gulp.task('default', [
	'package-compile.es3'
]);

gulp.task('test', [
	'test-compile.es3'
]);

gulp.task('package-compile.es3', function() {
	var config = lodash.create(BASE_TYPESCRIPT_COMPILER_CONFIG, {
		module: 'commonjs'
	});

	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(config));

	return tsResult.js.pipe(gulp.dest('built'));
});

gulp.task('test-compile.es3', function() {
	var config = lodash.create(BASE_TYPESCRIPT_COMPILER_CONFIG, {
		module: 'amd'
	});

	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(config));

	return tsResult.js.pipe(gulp.dest('built'));
});