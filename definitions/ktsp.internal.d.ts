/// <reference path="./es6-promise.d.ts"/>

declare module Ktsp.Internal {
	interface IFile {
		path: string;
	}	
}

interface Function {
	$inject?: string[];
}