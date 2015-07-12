import {IPreprocessor} from './preprocessor';
import {ILog, LogToken} from './util/log';

/*
* Takes a preprocessor constructor and returns a DI-compatible factory which will
* return a valid karma preprocessor that calls the processFile method of the preprocessor
* created through the ctor
*/
export function getPreprocessorFactory(cb: Typeioc.IContainerBuilder, PreprocessorToken: any): any {
  var factory = (logger) => {
    cb.register<ILog>(LogToken)
      .as(() => logger.create('preprocessor.typescript'));

    var container = cb.build();
    var preprocessor = <IPreprocessor>container.resolve(PreprocessorToken);

    return (content, file, done) => {
      preprocessor.preprocessFile(content, file).then((result) => {
        done(result);
      }, (error) => {
        var logger: ILog = container.resolve(LogToken);
        logger.error(error);
        done(null);
      });
    };
  };

  factory.$inject = ['logger'];

  return ['factory', factory];
}
