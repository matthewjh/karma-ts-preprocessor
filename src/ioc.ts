/// <reference path="../node_modules/typeioc/d.ts/typeioc.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import preprocessorModule = require('./preprocessor');
import compilerModule = require('./compiler');
import logModule = require('./util/log');

export function configureContainerBuilder(cb: Typeioc.IContainerBuilder): void {
	cb.register<Ktsp.Internal.IPreprocessor>(preprocessorModule.Preprocessor)
		.as((c) => {
			return new preprocessorModule.Preprocessor(
				c.resolve(logModule.LogToken),
				c.resolve(compilerModule.CompilerToken)
			);
		});

	cb.register<Ktsp.Internal.ICompiler>(compilerModule.CompilerToken)
		.as(() => new compilerModule.CommandLineCompiler());
}