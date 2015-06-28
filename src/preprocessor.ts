export interface IPreprocessorConstructor {
	new(...args: any[]): IPreprocessor;
}

export interface IPreprocessor {
	processFile(content: string, file: any, done: Function);
}