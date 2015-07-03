/// <reference path="../definitions/nodeunit.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import nodeunit = require('nodeunit');
import preprocessorModule = require('./preprocessor');
import compilerModule = require('./compiler');
import logModule = require('./util/log');

var preprocessor: Ktsp.Internal.IPreprocessor;
var mockCompiler: Ktsp.Internal.ICompiler;
var mockLog: Ktsp.Internal.ILog;

var logs: string[] = ['log1', 'log2'];
var file: Ktsp.Internal.IFile;
var contents: string;

export function setUp (done: nodeunit.ICallbackFunction) {
	mockLog = logModule.getLogMock();
	mockCompiler = compilerModule.getMockCompiler();
	
	file = {
		path: 'some-file-path'
	};
	
	contents = 'some-contents';
	
	preprocessor = new preprocessorModule.Preprocessor(
		mockLog,
		mockCompiler
	);
	
	done();
}

export function testProcessFileWhenCompilerCompilePromiseIsResolved (test: nodeunit.Test) {
	var compilerCompilePromise: Promise<string[]>;
	
	compilerCompilePromise = Promise.resolve(logs);
	mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);

	preprocessor.processFile(contents, file).then(() => {
		test.done();
	});
}

export function testProcessFileWhenCompilerCompilePromiseIsRejected (test: nodeunit.Test) {
	var error: any = {};
	var compilerCompilePromise: Promise<string[]>;
	
	compilerCompilePromise = Promise.reject(error);
	mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);

	preprocessor.processFile(contents, file).catch((actualError) => {
		test.equal(error, actualError);
		test.done();
	});
}