import {getPreprocessorFactory} from 'publisher';
import {IPreprocessorConstructor, IPreprocessor} from 'preprocessor';
import {File} from 'util/file';
import {ILog, TestLog, LogToken} from 'util/log';

let preprocessCalled: boolean;
let preprocessArgs: any[];
let preprocessorLog: ILog;
let testLog = new TestLog();

beforeEach(() => {
	preprocessorLog = null;
	preprocessCalled = false;
	preprocessArgs = [];
});

class KarmaLogger {
	create(name: string) {
		return testLog;
	}
}

class TestPreprocessor implements IPreprocessor {
	constructor(log: ILog) {
		preprocessorLog = log;
	}

	processFile(content: string, file: File, done: Function) {
		preprocessCalled = true;
		preprocessArgs = [content, file, done];
	}
}

describe('getPreprocessorFactory', () => {
	let preprocessorFactory: any;

	beforeEach(() => {
		var cb = typeioc.createBuilder();
		cb.register<ILog>(TestLog)
			.as(() => new TestLog());
		cb.register<IPreprocessor>(TestPreprocessor)
			.as((c) => {
				return new TestPreprocessor(
					c.resolve(TestLog)
				);
			});

		preprocessorFactory = getPreprocessorFactory(cb, TestPreprocessor);
	});

	it('should be a factory in the correct format', () => {
		expect(preprocessorFactory.length).toBe(2);
		expect(preprocessorFactory[0]).toEqual('factory');
		expect(preprocessorFactory[1] instanceof Function).toBe(true);
	});

	it('should have the correct di annotation', () => {
		expect(preprocessorFactory[1].$inject).toEqual(['logger']);
	});

	describe('the preprocess function returned by the factory fn', () => {
		let preprocess;

		beforeEach(() => {
			preprocess = preprocessorFactory[1](new KarmaLogger());
		});

		it('should pass through the logger instance to the Preprocessor ctor', () => {
			expect(preprocessorLog).toBe(testLog);
		});

		it('should call through to TestPreprocessor#processFile', () => {
			let content = 'content';
			let file = 'file';
			let done = () => { };

			preprocess(content, file, done);

			expect(preprocessCalled).toBe(true);
			expect(preprocessArgs).toEqual([content, file, done]);
		});
	});
});