/// <reference path="../definitions/es6-promise.d.ts"/>

import testUtilModule = require('./util/test');
import commandLineArgumentsFormatterModule = require('./command-line-arguments-formatter');

export class NodeExecutorWithArgumentsToken { }

export interface INodeExecutorWithArguments {
  execute(command: string, args: any): Promise<string[]>;
}

export class NodeExecutorWithArguments implements INodeExecutorWithArguments {
  private _nodeExecutor: Ktsp.Internal.INodeExecutor;
  private _commandLineArgumentsFormatter: commandLineArgumentsFormatterModule.ICommandLineArgumentsFormatter;

  constructor(nodeExecutor: Ktsp.Internal.INodeExecutor,
              commandLineArgumentsFormatter: commandLineArgumentsFormatterModule.ICommandLineArgumentsFormatter) {
    this._nodeExecutor = nodeExecutor;
    this._commandLineArgumentsFormatter = commandLineArgumentsFormatter;
  }

  execute(command: string, args: any): Promise<string[]> {
    var formattedArgs = this._commandLineArgumentsFormatter.formatArguments(args);

    return this._nodeExecutor.execute(`${command} ${formattedArgs}`);
  }
}

export var getMockNodeExecutorWithArguments = testUtilModule.getMockObjectGetter<INodeExecutorWithArguments>(NodeExecutorWithArguments);