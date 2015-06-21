import {PreprocessorConstructor} from 'preprocessor';

interface DIableFactory {
	call(...args: any[]);

	$inject?: string[];
}

/*
* Takes a preprocessor constructor and returns a DI-compatible factory which will
* return a valid karma preprocessor that calls the processFile method of the preprocessor
* created through the ctor
*/
export function getPreprocessorFactory(PreprocessorCtor: PreprocessorConstructor): any {
	var factory: DIableFactory = (logger) => {
		var log = logger.create('preprocessor.typescript');
		var preprocessor = new PreprocessorCtor(log);

		return (content, file, done) => {
			preprocessor.processFile(content, file, done);
		};
	};

	factory.$inject = ['logger'];

	return ['factory', factory];
}
