import {INodeExecutor} from './node-executor';
import {getMockObjectGetter} from './util/test';
import {ICommandLineArgumentsFormatter} from './command-line-arguments-formatter';

export class NodeExecutorWithArgumentsToken { }

export interface INodeExecutorWithArguments {
  execute(command: string, args: any): Promise<string[]>;
}

export class NodeExecutorWithArguments implements INodeExecutorWithArguments {
  private _nodeExecutor: INodeExecutor;
  private _commandLineArgumentsFormatter: ICommandLineArgumentsFormatter;

  constructor(nodeExecutor: INodeExecutor,
              commandLineArgumentsFormatter: ICommandLineArgumentsFormatter) {
    this._nodeExecutor = nodeExecutor;
    this._commandLineArgumentsFormatter = commandLineArgumentsFormatter;
  }

  execute(command: string, args: any): Promise<string[]> {
    var formattedArgs = this._commandLineArgumentsFormatter.formatArguments(args);
    
    return this._nodeExecutor.execute(`${command} ${formattedArgs}`);
  }
}

export var getMockNodeExecutorWithArguments = getMockObjectGetter<INodeExecutorWithArguments>(NodeExecutorWithArguments);