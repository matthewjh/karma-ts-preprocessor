/// <reference path="../definitions/nodeunit.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import nodeunit = require('nodeunit');
import preprocessorModule = require('./preprocessor');
import compilerModule = require('./compiler');
import logModule = require('./util/log');

var preprocessor: Ktsp.Internal.IPreprocessor;
var mockCompiler: compilerModule.ICompiler;
var mockLog: Ktsp.Internal.ILog;

var logs: string[] = ['log1', 'log2'];
var file: Ktsp.Internal.IFile;
var contents: string;

export function setUp(done: nodeunit.ICallbackFunction) {
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

export function test_process_file_when_compiler_compile_promise_is_resolved(test: nodeunit.Test) {
  var compilerCompilePromise: Promise<string[]>;

  compilerCompilePromise = Promise.resolve(logs);
  mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);

  preprocessor.processFile(contents, file).then(() => {
    test.ok(mockLog.info.withArgs(logs[0]).called);
    test.ok(mockLog.info.withArgs(logs[1]).called);
    test.done();
  });
}

export function test_process_file_when_compiler_compile_promise_is_rejected(test: nodeunit.Test) {
  var error: any = {};
  var compilerCompilePromise: Promise<string[]>;

  compilerCompilePromise = Promise.reject(error);
  mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);

  preprocessor.processFile(contents, file).catch((actualError) => {
    test.ok(mockLog.error.withArgs(error).called);
    test.equal(error, actualError);
    test.done();
  });
}