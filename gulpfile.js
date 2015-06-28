var gulp = require('gulp');
var lodash = require('lodash');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var replace = require('gulp-replace');

var SOURCE_FILES_GLOB = [
	'src/**/*.ts',
	'definitions/**/*.d.ts',
	'node_modules/typeioc/d.ts/typeioc.d.ts'
];

var BASE_TYPESCRIPT_COMPILER_CONFIG = {
	noImplicitAny: true,
	typescript: require('typescript')
};

gulp.task('default', ['package-compile.es3'], function() {
	gulp.start('make-cjs-imports-dot-relative');
});

gulp.task('test', [
	'test-compile.es3'
]);

gulp.task('clean-build-folder', function() {
	return gulp.src('built/**/*', {read: false})
		.pipe(rimraf());
});

gulp.task('make-cjs-imports-dot-relative', function() {
	return gulp.src('built/**/*.js')
		.pipe(replace(/require\(\'([a-zA-Z]+)/g, 'require(\'./$1'))
		.pipe(gulp.dest('built'));
});

gulp.task('package-compile.es3', ['clean-build-folder'], function() {
	var config = lodash.create(BASE_TYPESCRIPT_COMPILER_CONFIG, {
		module: 'commonjs'
	});

	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(config));

	return tsResult.js.pipe(gulp.dest('built'));
});

gulp.task('test-compile.es3', ['clean-build-folder'], function() {
	var config = lodash.create(BASE_TYPESCRIPT_COMPILER_CONFIG, {
		module: 'amd'
	});

	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(config));

	return tsResult.js.pipe(gulp.dest('built'));
});