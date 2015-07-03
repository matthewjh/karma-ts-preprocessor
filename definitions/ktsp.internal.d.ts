/// <reference path="./es6-promise.d.ts"/>

declare module Ktsp.Internal {
	interface ILog {
		debug(message: string);
		info(message: string);
		warn(message: string);
		error(message: string);
	}
	
	interface IFile {
		path: string;
	}	
	
	interface IPreprocessor {
		processFile(content: string, file: IFile): Promise<void>;
	}
	
	interface ICompiler {
		compile(filePath: string): Promise<string[]>;
	}
	
	interface IPreprocessorConstructor {
		new(...args: any[]): IPreprocessor;
	}
}

interface Function {
	$inject?: string[];
}