import {getMockObjectGetter} from './util/test';
import pathModule = require('path');

export interface IPathResolver {
  getJoinedPath(componentOne: string, componentTwo: string): string;
  getAbsolutePath(base: string, path: string): string;
  getRelativePath(base: string, path: string): string;
}

export class PathResolverToken {}

export class NodePathResolver implements IPathResolver {
  getJoinedPath(componentOne: string, componentTwo: string): string {
    return pathModule.join(componentOne, componentTwo);
  }
  
  getAbsolutePath(from: string, to: string) {
    return pathModule.resolve(from, to);
  }
  
  getRelativePath(from: string, to: string) {
    return pathModule.relative(from, to);
  }
} 

export var getMockPathResolver = getMockObjectGetter<IPathResolver>(NodePathResolver);