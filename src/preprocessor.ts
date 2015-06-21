export interface PreprocessorConstructor {
	new(...args: any[]): Preprocessor;
}

export interface Preprocessor {
	processFile(content: string, file: any, done: Function);
}