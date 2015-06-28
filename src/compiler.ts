import {Promise} from 'es6-promise';

export interface ICompiler {
	compile(filePath: string): Promise<string[]>;
}

export class CompilerToken {}

var sys = require('sys');
var exec = require('child_process').exec;

export class CommandLineCompiler implements ICompiler {
	compile(filePath: string): Promise<string[]> {
		var promise = new Promise((resolve, reject) => {
			exec('node_modules/.bin/tsc', (error, stdout, stderr) => {
				resolve([stdout]);

				if (error !== null) {
					reject(error);
				}
			});
		});

		return promise;
	}
}