import {getMockObjectGetter} from './test';

export class LogToken { }

export class TestLog implements Ktsp.Internal.ILog {
  public log: string[];

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

export var getLogMock = getMockObjectGetter<Ktsp.Internal.ILog>(TestLog);