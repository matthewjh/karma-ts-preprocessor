export interface ILog {
	debug(message: string);
	info(message: string);
	warn(message: string);
	error(message: string);
}

export class LogToken {}

export class TestLog implements ILog {
	private log: string[];

	constructor() {
		this.log = [];
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
		this.log.push(`${type}: ${message}`);
	}
}