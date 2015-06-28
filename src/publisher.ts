import {IPreprocessorConstructor} from 'preprocessor';
import {LogToken, ILog} from 'util/log';
import {configureContainerBuilder} from 'ioc';
import * as typeioc from 'typeioc';

interface DIableFactory {
	call(...args: any[]);

	$inject?: string[];
}

/*
* Takes a preprocessor constructor and returns a DI-compatible factory which will
* return a valid karma preprocessor that calls the processFile method of the preprocessor
* created through the ctor
*/
export function getPreprocessorFactory(cb: typeioc.IContainerBuilder, PreprocessorCtor: IPreprocessorConstructor): any {
	var factory: DIableFactory = (logger) => {
		cb.register<ILog>(LogToken)
			.as(() => logger.create('preprocessor.typescript'));

		var container = cb.build();
		var preprocessor = container.resolve(PreprocessorCtor);

		return (content, file, done) => {
			preprocessor.processFile(content, file, done).then((processedContents) => {
				done(processedContents);
			});
		};
	};

	factory.$inject = ['logger'];

	return ['factory', factory];
}
