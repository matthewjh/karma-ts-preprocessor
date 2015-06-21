import {Preprocessor} from 'preprocessor';
import {File} from 'util/file';
import {Log} from 'util/log';

var sys = require('sys');
var exec = require('child_process').exec;

export class TypeScriptPreprocessor implements Preprocessor {
	constructor(private log: Log) {
	}

	processFile(content: string, file: File, done: Function) {
		this.log.info(`preprocessing: ${file} ---\n ${content}`);

		// var result = tsc.compile([file.path], 
		// 	['--module', 'amd',
		// 	 '--outDir', '.tsc'],
		// 	(error) => {
		// 		this.handleError(error);
		// 	});

		// result.errors.forEach((error) => {
		// 	this.handleError(error);
		// });

		var childProcess = exec('node_modules/typescript/tsc', (error, stdout, stderr) => {
			this.log.info(stdout);

			if (error !== null) {
				this.log.error(error);
			}
		});

		done(null, content);
	}

	private handleError(error: any) {
		this.log.error(error);
	}
}