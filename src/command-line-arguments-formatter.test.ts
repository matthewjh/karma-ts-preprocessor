/// <reference path="../definitions/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');
import commandLineArgumentsFormatterModule = require('./command-line-arguments-formatter');

var commandLineArgumentsFormatter: commandLineArgumentsFormatterModule.ICommandLineArgumentsFormatter;

export = {
  setUp: function(done: nodeunit.ICallbackFunction) {
    commandLineArgumentsFormatter = new commandLineArgumentsFormatterModule.CommandLineArgumentsFormatter();
    done();
  },
  
  'formatArguments': {
    'it should correctly format arguments': function(test: nodeunit.Test) {
      var args = {
        arg1: 'arg1-value',
        arg2: 'arg2-value'
      };
      var formattedArgs = '--arg1 arg1-value --arg2 arg2-value';
      var result = commandLineArgumentsFormatter.formatArguments(args);
    
      test.equal(formattedArgs, result);
      test.done();
    }
  }
};