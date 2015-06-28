import {Promise} from 'es6-promise';

export interface IPreprocessorConstructor {
	new(...args: any[]): IPreprocessor;
}

export interface IPreprocessor {
	processFile(content: string, file: any): Promise<string>;
}