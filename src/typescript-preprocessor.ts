import {Preprocessor} from 'preprocessor';
import {File} from 'util/file';
import {Log} from 'util/log';

export class TypeScriptPreprocessor implements Preprocessor {
	constructor(private log: Log) {
	}

	processFile(content: string, file: File, done: Function) {
		this.log.info(`preprocessing: ${file} ---\n ${content}`);
	}
}