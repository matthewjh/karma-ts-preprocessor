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
      str += `--${key} ${value} `;
    });
    
    return str.trim();
  }
}

export var getMockCommandLineArgumentsFormatter = testUtilModule.getMockObjectGetter<ICommandLineArgumentsFormatter>(CommandLineArgumentsFormatter);