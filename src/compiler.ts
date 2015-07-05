/// <reference path="../definitions/es6-promise.d.ts"/>
/// <reference path="../definitions/node.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

export class CompilerToken { }

export interface ICompiler {
  compile(filePath: string, args: any): Promise<string[]>;
}

import testUtilModule = require('./util/test');
import nodeExecutorWithArgumentsModule = require('./node-executor-with-arguments');

export class CommandLineCompiler implements ICompiler {
  private _nodeExecutorWithArguments: nodeExecutorWithArgumentsModule.INodeExecutorWithArguments;

  constructor(nodeExecutorWithArguments: nodeExecutorWithArgumentsModule.INodeExecutorWithArguments) {
    this._nodeExecutorWithArguments = nodeExecutorWithArguments;
  }

  compile(filePath: string, args: any): Promise<string[]> {
    var promise = this._nodeExecutorWithArguments.execute(`tsc ${filePath}`, args);

    return promise;
  }
}

export var getMockCompiler = testUtilModule.getMockObjectGetter<ICompiler>(CommandLineCompiler);