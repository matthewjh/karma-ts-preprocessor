import {getMockObjectGetter} from './util/test';

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
  
  private _getArgumentString(argName: any, argValue: any): string {
    var argumentString = '';
    var isBooleanArgument = false;
    
    if (argValue === true || argValue === false) {
      isBooleanArgument = true;    
    }
    
    if (isBooleanArgument) {
      if (argValue) {
        argumentString = `--${argName}`;
      }
    } else {
      argumentString = `--${argName} ${argValue}`;
    }
    
    return argumentString;
  }
}

export var getMockCommandLineArgumentsFormatter = getMockObjectGetter<ICommandLineArgumentsFormatter>(CommandLineArgumentsFormatter);