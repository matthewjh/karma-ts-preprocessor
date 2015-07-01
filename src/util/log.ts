/// <reference path="../../definitions/ktsp.internal.d.ts"/>

export class LogToken {}

export class TestLog implements Ktsp.Internal.ILog {
	private _log: string[];

	constructor() {
		this._log = [];
	}

	debug(message: string) {
		this.logMessage('debug', message);
	}

	info(message: string) {
		this.logMessage('info', message);
	}

	warn(message: string) {
		this.logMessage('warn', message);
	}

	error(message: string) {
		this.logMessage('error', message);
	}

	private logMessage(type: string, message: string) {
		this._log.push(`${type}: ${message}`);
	}
}