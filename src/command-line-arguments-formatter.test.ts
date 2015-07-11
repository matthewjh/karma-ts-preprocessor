import * as nodeunit from 'nodeunit';
import {ICommandLineArgumentsFormatter, CommandLineArgumentsFormatter} from './command-line-arguments-formatter';

var commandLineArgumentsFormatter: ICommandLineArgumentsFormatter;

export = {
  setUp: function(done: nodeunit.ICallbackFunction) {
    commandLineArgumentsFormatter = new CommandLineArgumentsFormatter();
    done();
  },
  
  'formatArguments': {
    'it should correctly format arguments': function(test: nodeunit.Test) {
      var args = {
        arg1: 'arg1-value',
        arg2: 'arg2-value',
        boolArg: true,
        boolArg2: false
      };
      var formattedArgs = '--arg1 arg1-value --arg2 arg2-value --boolArg';
      var result = commandLineArgumentsFormatter.formatArguments(args);
    
      test.equal(formattedArgs, result);
      test.done();
    }
  }
};