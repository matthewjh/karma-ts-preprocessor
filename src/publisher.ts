import {IPreprocessor} from './preprocessor';
import {LogToken} from './util/log';

interface IPreprocessorStatic {
  new(...args: any[]): IPreprocessor;
}

/*
* Takes a preprocessor constructor and returns a DI-compatible factory which will
* return a valid karma preprocessor that calls the processFile method of the preprocessor
* created through the ctor
*/
export function getPreprocessorFactory(cb: Typeioc.IContainerBuilder, preprocessorStatic: IPreprocessorStatic): any {
  var factory = (logger) => {
    cb.register<Ktsp.Internal.ILog>(LogToken)
      .as(() => logger.create('preprocessor.typescript'));

    var container = cb.build();
    var preprocessor = <IPreprocessor>container.resolve(preprocessorStatic);

    return (content, file, done) => {
      preprocessor.processFile(content, file).then((processedContents) => {
        done(processedContents);
      }, () => {
        done(null);
      });
    };
  };

  factory.$inject = ['logger'];

  return ['factory', factory];
}
