import {Preprocessor} from 'preprocessor';

export class TypeScriptPreprocessor implements Preprocessor {
	constructor() {
	}

	processFile(content: string, file: any, done: Function) {
		console.log(content);
	}
}