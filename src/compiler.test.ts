/// <reference path="../definitions/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');
import compilerModule = require('./compiler');
import nodeExecutorWithArgumentsModule = require('./node-executor-with-arguments');

var compiler: compilerModule.ICompiler;
var nodeExecutorWithArguments: nodeExecutorWithArgumentsModule.INodeExecutorWithArguments;

var args: any;
var filePath: string;

export function setUp(done: nodeunit.ICallbackFunction) {
  filePath = 'some-filepath';
  args = {
    arg1: 'arg1-value',
    arg2: 'arg2-value'
  };

  nodeExecutorWithArguments = nodeExecutorWithArgumentsModule.getMockNodeExecutorWithArguments();
  
  compiler = new compilerModule.CommandLineCompiler(
    nodeExecutorWithArguments
  );

  done();
}

export function testCompileWhenPromiseIsResolved(test: nodeunit.Test) {
  var resolveValue = {};
  var expectedCommand = `tsc ${filePath}`;
  
  nodeExecutorWithArguments.execute.withArgs(expectedCommand, args).returns(Promise.resolve(resolveValue));
  
  compiler.compile(filePath, args).then((actualResolveValue) => {
    test.equal(resolveValue, actualResolveValue);
    test.done();
  });
}

export function testCompileWhenPromiseIsRejected(test: nodeunit.Test) {
  var rejectValue = {};
  var expectedCommand = `tsc ${filePath}`;
  
  nodeExecutorWithArguments.execute.withArgs(expectedCommand, args).returns(Promise.reject(rejectValue));
  
  compiler.compile(filePath, args).catch((actualRejectValue) => {
    test.equal(rejectValue, actualRejectValue);
    test.done();
  });
}