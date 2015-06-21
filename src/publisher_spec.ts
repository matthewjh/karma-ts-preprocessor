import {getPreprocessorFactory} from 'publisher';
import {PreprocessorConstructor, Preprocessor} from 'preprocessor';
import {File} from 'util/file';
import {Log, TestLog} from 'util/log';

let preprocessCalled: boolean;
let preprocessArgs: any[];
let preprocessorLog: Log;

beforeEach(() => {
	preprocessorLog = null;
	preprocessCalled = false;
	preprocessArgs = [];
});

class TestPreprocessor implements Preprocessor {
	constructor(log: Log) {
		preprocessorLog = log;
	}

	processFile(content: string, file: File, done: Function) {
		preprocessCalled = true;
		preprocessArgs = [content, file, done];
	}
}

describe('getPreprocessorFactory', () => {
	let preprocessorFactory: any;
	let log;

	beforeEach(() => {
		log = new TestLog();
		preprocessorFactory = getPreprocessorFactory(TestPreprocessor);
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
			preprocess = preprocessorFactory[1](log);
		});

		it('should pass through the logger instance to the Preprocessor ctor', () => {
			expect(preprocessorLog).toBe(log);
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