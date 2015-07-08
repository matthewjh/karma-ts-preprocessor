import testUtilModule = require('./util/test');

export class CommandLineArgumentsFormatterToken {}

export interface ICommandLineArgumentsFormatter {
  formatArguments(args: any): string;
}

export class CommandLineArgumentsFormatter implements ICommandLineArgumentsFormatter {
  formatArguments(args: any): string {
    var str = '';
    
    Object.keys(args).forEach((key) => {
      var value = args[key];
      str += `${this._getArgumentString(key, value)} `;
    });
   
    
    return str.trim();
  }
  
  _getArgumentString(key: any, value: any): string {
    var argumentString = '';
    var isBooleanArgument = false;
    
    if (value === true || value === false) {
      isBooleanArgument = true;    
    }
    
    if (isBooleanArgument) {
      if (value) {
        argumentString = `--${key}`;
      }
    } else {
      argumentString = `--${key} ${value}`;
    }
    
    return argumentString;
  }
}

export var getMockCommandLineArgumentsFormatter = testUtilModule.getMockObjectGetter<ICommandLineArgumentsFormatter>(CommandLineArgumentsFormatter);