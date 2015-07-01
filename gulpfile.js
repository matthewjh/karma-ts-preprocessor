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

var ABSOLUTE_IMPORTS = [
	'typeioc',
	'sys',
	'child_process',
	'es6-promise',
	'sinon'
];

var BASE_TYPESCRIPT_COMPILER_CONFIG = {
	noImplicitAny: true,
	typescript: require('typescript'),
	rootDir: './'
};

gulp.task('default', ['package-compile'], function() {
	gulp.start('make-cjs-imports-dot-relative');
});

gulp.task('test', [
	'test-compile'
]);

gulp.task('clean-build-folder', function() {
	return gulp.src('built/**/*', {read: false})
		.pipe(rimraf());
});

gulp.task('make-cjs-imports-dot-relative', function() {
	var matchRegex = /require\(\'([\/0-9a-zA-Z_\-]+)/g;

	return gulp.src('built/**/*.js')
		.pipe(replace(matchRegex, function(match, a) {
			var moduleName = match.substr(match.indexOf('\'') + 1);

			if (false && ABSOLUTE_IMPORTS.indexOf(moduleName) === -1) {
				var slashes = moduleName.match(/\//g);
				var depth = slashes ? slashes.length : 0;
				var prefix = '';

				if (depth === 0) {
					prefix = './';
				} else {
					for (var i = 0; i < depth; i++) {
						prefix += '../';
					}
				}

				return match.replace(matchRegex, 'require(\'' + prefix + '$1');
			} else {
				return match;
			}
		}))
		.pipe(gulp.dest('built'));
});

gulp.task('package-compile', ['clean-build-folder'], function() {
	var config = lodash.create(BASE_TYPESCRIPT_COMPILER_CONFIG, {
		module: 'commonjs'
	});

	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(config));

	return tsResult.js.pipe(gulp.dest('built'));
});

gulp.task('test-compile', ['clean-build-folder'], function() {
	var config = lodash.create(BASE_TYPESCRIPT_COMPILER_CONFIG, {
		module: 'amd'
	});

	var tsResult = gulp.src(SOURCE_FILES_GLOB)
		.pipe(ts(config));

	return tsResult.js.pipe(gulp.dest('built'));
});