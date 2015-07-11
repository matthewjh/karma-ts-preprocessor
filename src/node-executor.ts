import * as childProcess from 'child_process';
import {getMockObjectGetter} from './util/test';

export class NodeExecutorToken { }

export interface INodeExecutor {
  execute(command: string): Promise<string[]>;
}

export class NodeExecutor implements INodeExecutor {
  execute(command: string): Promise<string[]> {
    var promise = new Promise((resolve, reject) => {
      childProcess.exec(`$(npm bin)/${command}`, (error, stdout, stderr) => {
        if (error === null) {
          resolve(stdout ? stderr : []);
        } else {
          reject(stdout);
        }
      });
    });

    return promise;
  }
}

export var getMockNodeExecutor = getMockObjectGetter<INodeExecutor>(NodeExecutor);