import * as childProcess from 'child_process';
import {getMockObjectGetter} from './util/test';

export class NodeExecutorToken { }

export class NodeExecutor implements Ktsp.Internal.INodeExecutor {
  execute(command: string): Promise<string[]> {
    var promise = new Promise((resolve, reject) => {
      console.log(command);
      childProcess.exec(`$(npm bin)/${command}`, (error, stdout, stderr) => {
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

export var getMockNodeExecutor = getMockObjectGetter<Ktsp.Internal.INodeExecutor>(NodeExecutor);