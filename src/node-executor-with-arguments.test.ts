/// <reference path="../definitions/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');
import nodeExecutorWithArgumentsModule = require('./node-executor-with-arguments');
import commandLineArgumentsFormatterModule = require('./command-line-arguments-formatter');
import nodeExecutorModule = require('./node-executor');

var nodeExecutorWithArguments: nodeExecutorWithArgumentsModule.INodeExecutorWithArguments;
var nodeExecutor: Ktsp.Internal.INodeExecutor;
var commandLineArgumentsFormatter: commandLineArgumentsFormatterModule.ICommandLineArgumentsFormatter;

var command: string;
var args: any;

export = {
  setUp: function (done: nodeunit.ICallbackFunction) {
    command = 'cmd';
    args = {
      arg1: 'arg1-value',
      arg2: 'arg2-value'
    };
  
    nodeExecutor = nodeExecutorModule.getMockNodeExecutor();
    commandLineArgumentsFormatter = commandLineArgumentsFormatterModule.getMockCommandLineArgumentsFormatter();
  
    nodeExecutorWithArguments = new nodeExecutorWithArgumentsModule.NodeExecutorWithArguments(
      nodeExecutor,
      commandLineArgumentsFormatter
    );
  
    done();
  },
  
  'execute': {
    'when the promise is resolved,it should execute the command': function(test: nodeunit.Test) {
      var resolveValue: any = {};
    
      commandLineArgumentsFormatter.formatArguments.withArgs(args).returns('formatted-args');
      nodeExecutor.execute.withArgs('cmd formatted-args').returns(Promise.resolve(resolveValue));
    
      nodeExecutorWithArguments.execute(command, args).then((actualResolveValue) => {
        test.equal(resolveValue, actualResolveValue);
        test.done();
      });
    },
    
    'when the promise is rejected, it should execute the command': function(test: nodeunit.Test) {
      var rejectValue: any = {};
    
      commandLineArgumentsFormatter.formatArguments.withArgs(args).returns('formatted-args');
      nodeExecutor.execute.withArgs('cmd formatted-args').returns(Promise.reject(rejectValue));
    
      nodeExecutorWithArguments.execute(command, args).catch((actualRejectValue) => {
        test.equal(rejectValue, actualRejectValue);
        test.done();
      });
    }
  }
}
