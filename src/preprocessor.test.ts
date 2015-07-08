/// <reference path="../definitions/sinon.d.ts"/>
/// <reference path="../definitions/nodeunit.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import sinon = require('sinon');
import nodeunit = require('nodeunit');
import preprocessorModule = require('./preprocessor');
import compilerModule = require('./compiler');
import logModule = require('./util/log');

var preprocessor: preprocessorModule.IPreprocessor;
var mockCompiler: compilerModule.ICompiler;
var mockLog: Ktsp.Internal.ILog;

var compilerCompilePromise: Promise<string[]>;
var logs: string[] = ['log1', 'log2'];
var file: Ktsp.Internal.IFile;
var contents: string;
var defaultCompilerOptions: any;

export = {
  setUp: function(done: nodeunit.ICallbackFunction) {
    mockLog = logModule.getLogMock();
    mockCompiler = compilerModule.getMockCompiler();
  
    file = {
      path: 'some-file-path'
    };
    
    defaultCompilerOptions = {
      defaultOption: 'some-option-value'
    };
  
    contents = 'some-contents';
  
    preprocessor = new preprocessorModule.Preprocessor(
      mockLog,
      mockCompiler,
      defaultCompilerOptions
    );
  
    done();
  },
  
  'processFile': {
    'when the compiler.compile promise is resolved': {
      setUp: function(done: nodeunit.ICallbackFunction) {
        compilerCompilePromise = Promise.resolve(logs);
        done();
      },
      
      'it should pass default options to the compiler when no custom options are passed': function(test: nodeunit.Test) {
        mockCompiler.compile.withArgs(file.path, defaultCompilerOptions).returns(compilerCompilePromise);
        
        preprocessor.processFile(contents, file).then(() => {
          test.done();
        });
      },
      
      'it should pass augmented default options to the compiler when custom options are passed': function(test: nodeunit.Test) {
        var customOptions = {
          customOption: 'some-option-value'
        };
        
        var expectedOptions = {
          customOption: 'some-option-value',
          defaultOption: 'some-option-value'
        };
        
        mockCompiler.compile.withArgs(file.path, expectedOptions).returns(compilerCompilePromise);
        
        preprocessor.processFile(contents, file, customOptions).then(() => {
          test.done();
        });
      },
      
      'it should resolve the returned promise and log the results': function(test: nodeunit.Test) {
        mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);
      
        preprocessor.processFile(contents, file).then(() => {
          test.ok(mockLog.info.withArgs(logs[0]).called);
          test.ok(mockLog.info.withArgs(logs[1]).called);
          test.done();
        });
      }, 
    },
    
    'when the compiler.compile promise is rejected, it should process the file': function(test: nodeunit.Test) {
      var error: any = {};
    
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