import {TypeScriptPreprocessor} from 'typescript-preprocessor';
import {getPreprocessorFactory} from 'publisher';
import {configureContainerBuilder} from 'ioc';
import * as typeioc from 'typeioc';

// TypeScript only allows you to export types, so here we export an object directly via module.exports
declare var module: any;

var cb = typeioc.createBuilder();
configureContainerBuilder(cb);


module.exports = {
	'preprocessor:typescript': getPreprocessorFactory(cb, TypeScriptPreprocessor)
};