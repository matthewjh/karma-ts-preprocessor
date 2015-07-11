import * as sinon from 'sinon';


interface Static<T> {
  new (...args: any[]): T;
  prototype: any;
}

export function getMockObjectGetter<T>(staticInstance: Static<T>): () => T {
  return () => {
    var mockObject: any = {};

    Object.keys(staticInstance.prototype).forEach((k: string) => {
      if (staticInstance.prototype[k] instanceof Function) {
        mockObject[k] = sinon.stub();
      } else {
        mockObject[k] = null;
      }
    });

    return <T>mockObject;
  }
}