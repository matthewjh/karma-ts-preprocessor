/// <reference path="../definitions/es6-promise.d.ts"/>
/// <reference path="../definitions/node.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

export class CompilerToken {}

import childProcessModule = require('child_process');
import testUtilModule = require('./util/test');

export class CommandLineCompiler implements Ktsp.Internal.ICompiler {
	compile(filePath: string): Promise<string[]> {
		var promise = new Promise((resolve, reject) => {
			childProcessModule.exec(`tsc ${filePath}`, (error, stdout, stderr) => {
				resolve([stdout]);

				if (error !== null) {
					reject(error);
				}
			});
		});

		return promise;
	}
}

export var getMockCompiler = testUtilModule.getMockObjectGetter<Ktsp.Internal.ICompiler>(CommandLineCompiler);