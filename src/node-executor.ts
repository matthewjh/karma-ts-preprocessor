/// <reference path="../definitions/es6-promise.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>
/// <reference path="../definitions/node.d.ts"/>

import childProcessModule = require('child_process');
import testUtilModule = require('./util/test');

export class NodeExecutorToken {}

export class NodeExecutor implements Ktsp.Internal.INodeExecutor {
  execute(command: string): Promise<string[]> {
    var promise = new Promise((resolve, reject) => {
      childProcessModule.exec(`$(npm bin)/${command}`, (error, stdout, stderr) => {
          if (error === null) {
            resolve(stdout);
          } else {
            reject(stdout);
          }
      });
    });
    
    return promise;
  }
}

export var getMockNodeExecutor = testUtilModule.getMockObjectGetter<Ktsp.Internal.INodeExecutor>(NodeExecutor);