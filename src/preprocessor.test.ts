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

export = {
  setUp: function(done: nodeunit.ICallbackFunction) {
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
  },
  
  'processFile': {
    'when the compiler.compile promise is resolved, it should process the file': function(test: nodeunit.Test) {
      var compilerCompilePromise: Promise<string[]>;
    
      compilerCompilePromise = Promise.resolve(logs);
      mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);
    
      preprocessor.processFile(contents, file).then(() => {
        test.ok(mockLog.info.withArgs(logs[0]).called);
        test.ok(mockLog.info.withArgs(logs[1]).called);
        test.done();
      });
    },
    
    'when the compiler.compile promise is rejected, it should process the file': function(test: nodeunit.Test) {
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
  }
};