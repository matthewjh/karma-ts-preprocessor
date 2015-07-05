/// <reference path="../definitions/es6-promise.d.ts"/>
/// <reference path="../definitions/node.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

export class CompilerToken { }

import testUtilModule = require('./util/test');
import nodeExecutorModule = require('./node-executor');

export class CommandLineCompiler implements Ktsp.Internal.ICompiler {
  private _nodeExecutor: Ktsp.Internal.INodeExecutor;

  constructor(nodeExecutor: Ktsp.Internal.INodeExecutor) {
    this._nodeExecutor = nodeExecutor;
  }

  compile(filePath: string): Promise<string[]> {
    var promise = this._nodeExecutor.execute(`tsc ${filePath}`);

    return promise;
  }
}

export var getMockCompiler = testUtilModule.getMockObjectGetter<Ktsp.Internal.ICompiler>(CommandLineCompiler);