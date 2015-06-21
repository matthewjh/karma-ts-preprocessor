import {TypeScriptPreprocessor} from 'typescript-preprocessor';
import {getPreprocessorFactory} from 'publisher';

// TypeScript only allows you to export types, so here we export an object directly via module.exports
declare var module: any;
module.exports = {
	'preprocessor:typescript': getPreprocessorFactory(TypeScriptPreprocessor)
};