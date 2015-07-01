/// <reference path="../definitions/es6-promise.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import promiseModule = require('es6-promise');
import logModule = require('./util/log');
import compilerModule = require('./compiler');

export class Preprocessor implements Ktsp.Internal.IPreprocessor {
	constructor(private log: Ktsp.Internal.ILog,
				private compiler: Ktsp.Internal.ICompiler) {
	}

	processFile(content: string, file: Ktsp.Internal.IFile): Promise<string> {
		this.log.info(`preprocessing: ${file} ---\n ${content}`);

		return this.compiler.compile(file.path).then((logs) => {
			logs.forEach((log) => {
				this.log.info(log);
			});

			return null;
		}, (error) => {
			this.log.error(error);
		});
	}

	private handleError(error: any) {
		this.log.error(error);
	}
}