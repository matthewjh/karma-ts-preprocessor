import * as nodeunit from 'nodeunit';
import {getMockNodeExecutor} from './node-executor';
import {INodeExecutorWithArguments, NodeExecutorWithArguments} from './node-executor-with-arguments';
import {ICommandLineArgumentsFormatter, getMockCommandLineArgumentsFormatter} from './command-line-arguments-formatter';

var nodeExecutorWithArguments: INodeExecutorWithArguments;
var nodeExecutor: Ktsp.Internal.INodeExecutor;
var commandLineArgumentsFormatter: ICommandLineArgumentsFormatter;

var command: string;
var args: any;

export = {
  setUp: function (done: nodeunit.ICallbackFunction) {
    command = 'cmd';
    args = {
      arg1: 'arg1-value',
      arg2: 'arg2-value'
    };
  
    nodeExecutor = getMockNodeExecutor();
    commandLineArgumentsFormatter = getMockCommandLineArgumentsFormatter();
  
    nodeExecutorWithArguments = new NodeExecutorWithArguments(
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
