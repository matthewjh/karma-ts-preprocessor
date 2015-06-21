import {PreprocessorConstructor} from 'preprocessor';

interface DIableFactory {
	call(...args: any[]);

	$inject?: string[];
}

export function getPreprocessorFactory(PreprocessorCtor: PreprocessorConstructor): any {
	var factory: DIableFactory = () => {
		var preprocessor = new PreprocessorCtor();

		return (content, file, done) => {
			preprocessor.processFile(content, file, done);
		};
	};

	factory.$inject = [];

	return ['factory', factory];
}
