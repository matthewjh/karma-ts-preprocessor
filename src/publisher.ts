/// <reference path="../node_modules/typeioc/d.ts/typeioc.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import preprocessorModule = require('preprocessor');
import logModule = require('./util/log');

/*
* Takes a preprocessor constructor and returns a DI-compatible factory which will
* return a valid karma preprocessor that calls the processFile method of the preprocessor
* created through the ctor
*/
export function getPreprocessorFactory(cb: Typeioc.IContainerBuilder, PreprocessorCtor: Ktsp.Internal.IPreprocessorConstructor): any {
	var factory = (logger) => {
		cb.register<Ktsp.Internal.ILog>(logModule.LogToken)
			.as(() => logger.create('preprocessor.typescript'));

		var container = cb.build();
		var preprocessor = container.resolve(PreprocessorCtor);

		return (content, file, done) => {
			preprocessor.processFile(content, file, done).then((processedContents) => {
				done(processedContents);
			}, () => {
				done(null);
			});
		};
	};

	factory.$inject = ['logger'];

	return ['factory', factory];
}
