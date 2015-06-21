import {TypeScriptPreprocessor} from 'ts-preprocessor';
import {PreprocessorConstructor} from 'preprocessor';

interface DIableFactory {
	call(...args: any[]);

	$inject?: string[];
}

function getPreprocessorFactory(PreprocessorCtor: PreprocessorConstructor): any {
	var factory: DIableFactory = () => {
		var preprocessor = new PreprocessorCtor();

		return (content, file, done) => {
			preprocessor.processFile(content, file, done);
		};  
	};

	factory.$inject = [];

	return ['factory', factory];
}

declare var module: any;
module.exports = {
	'preprocessor:typescript': getPreprocessorFactory(TypeScriptPreprocessor)
};