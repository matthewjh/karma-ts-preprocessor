import {getMockObjectGetter} from './util/test';
import {INodeExecutorWithArguments} from './node-executor-with-arguments';

export class CompilerToken { }

export interface ICompiler {
  compile(filePath: string, args: any): Promise<string[]>;
}

export class CommandLineCompiler implements ICompiler {
  private _nodeExecutorWithArguments: INodeExecutorWithArguments;

  constructor(nodeExecutorWithArguments: INodeExecutorWithArguments) {
    this._nodeExecutorWithArguments = nodeExecutorWithArguments;
  }

  compile(filePath: string, args: any): Promise<string[]> {
    var promise = this._nodeExecutorWithArguments.execute(`tsc ${filePath}`, args);

    return promise;
  }
}

export var getMockCompiler = getMockObjectGetter<ICompiler>(CommandLineCompiler);