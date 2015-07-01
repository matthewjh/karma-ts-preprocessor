/// <reference path="../definitions/es6-promise.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import promiseModule = require('es6-promise');
import logModule = require('./util/log');
import compilerModule = require('./compiler');

export class Preprocessor implements Ktsp.Internal.IPreprocessor {
	private _log: Ktsp.Internal.ILog;
	private _compiler: Ktsp.Internal.ICompiler;
	
	constructor(log: Ktsp.Internal.ILog,
				compiler: Ktsp.Internal.ICompiler) {
		this._log = log;
		this._compiler = compiler;
	}

	processFile(content: string, file: Ktsp.Internal.IFile): Promise<string> {
		this._log.info(`preprocessing: ${file} ---\n ${content}`);

		return this._compiler.compile(file.path).then((logs) => {
			logs.forEach((log) => {
				this._log.info(log);
			});

			return null;
		}, (error) => {
			this._log.error(error);
			
			return Promise.reject(error);
		});
	}
}