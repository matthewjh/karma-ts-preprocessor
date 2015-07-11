import {getMockObjectGetter} from './util/test';
import fileSystemModule = require('fs');

export interface IFileReader {
  readFile(filePath: string, encoding?: string): Promise<string>;
}

export class FileReaderToken {}

export class NodeFileReader implements IFileReader {
  readFile(filePath: string, encoding: string = 'utf8'): Promise<string> {
    return new Promise((resolve, reject) => {
      fileSystemModule.readFile(filePath, {encoding: encoding}, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
} 

export var getMockFileReader = getMockObjectGetter<IFileReader>(NodeFileReader);